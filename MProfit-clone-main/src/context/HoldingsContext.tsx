'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface Transaction {
  id: string;
  type: 'BUY' | 'SELL';
  date: string;
  amount: number;
}

export interface HoldingData {
  id: number;
  name: string;
  class: string;
  invested: number;
  current: number;
  absReturn: number;
  xirr: number;
  transactions?: Transaction[];
}

interface HoldingsContextType {
  holdings: HoldingData[];
  addHolding: (holding: Omit<HoldingData, 'id' | 'absReturn' | 'xirr' | 'transactions'> & { initialDate?: string }) => void;
  removeHolding: (id: number) => void;
}

const defaultHoldings: HoldingData[] = [
  // Reduced dummy data for a cleaner start
  { id: 1, name: 'Reliance Industries', class: 'Equity', invested: 1540000, current: 2150000, absReturn: 39.6, xirr: 18.4, transactions: [{ id: 't1', type: 'BUY', date: '12 May 2023', amount: 1540000 }] },
  { id: 3, name: 'Parag Parikh Flexi Cap', class: 'Mutual Fund', invested: 1200000, current: 2450000, absReturn: 104.1, xirr: 22.8, transactions: [{ id: 't2', type: 'BUY', date: '05 Jan 2023', amount: 1200000 }] },
  { id: 12, name: 'Public Provident Fund (PPF)', class: 'Fixed Income', invested: 1500000, current: 1820000, absReturn: 21.3, xirr: 7.1, transactions: [{ id: 't3', type: 'BUY', date: '10 Apr 2023', amount: 1500000 }] },
  { id: 4, name: 'SGB Aug 2028', class: 'Gold', invested: 500000, current: 650000, absReturn: 30.0, xirr: 14.5, transactions: [{ id: 't4', type: 'BUY', date: '20 Aug 2023', amount: 500000 }] }
];

const HoldingsContext = createContext<HoldingsContextType | undefined>(undefined);

export function HoldingsProvider({ children }: { children: ReactNode }) {
  const [holdings, setHoldings] = useState<HoldingData[]>(defaultHoldings);

  // Suppress MetaMask/Extension errors that trigger Next.js error overlay
  useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (
        event.reason &&
        ((typeof event.reason === 'string' && event.reason.toLowerCase().includes('metamask')) ||
         (event.reason.message && event.reason.message.toLowerCase().includes('metamask')) ||
         (event.reason.stack && event.reason.stack.includes('chrome-extension://')))
      ) {
        event.preventDefault();
      }
    };

    const handleError = (event: ErrorEvent) => {
      if (
        event.message?.toLowerCase().includes('metamask') ||
        event.error?.stack?.includes('chrome-extension://') ||
        event.filename?.includes('chrome-extension://')
      ) {
        event.preventDefault();
      }
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    window.addEventListener('error', handleError);

    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      window.removeEventListener('error', handleError);
    };
  }, []);

  const addHolding = (newHolding: Omit<HoldingData, 'id' | 'absReturn' | 'xirr' | 'transactions'> & { initialDate?: string }) => {
    // Generate realistic simulated metrics since we don't have a live market feed
    const absReturn = parseFloat(((newHolding.current - newHolding.invested) / newHolding.invested * 100).toFixed(1));
    const xirr = parseFloat((absReturn * 0.45).toFixed(1)); // Dummy annualized logic
    
    // Create an initial transaction for the newly added asset using the provided date or current date
    const dateObj = newHolding.initialDate ? new Date(newHolding.initialDate) : new Date();
    const formattedDate = dateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    
    const initialTransaction: Transaction = {
      id: Date.now().toString(),
      type: 'BUY',
      date: formattedDate,
      amount: newHolding.invested
    };
    
    setHoldings(prev => [
      { 
        ...newHolding, 
        id: Date.now(),
        absReturn: isNaN(absReturn) ? 0 : absReturn,
        xirr: isNaN(xirr) ? 0 : xirr,
        transactions: [initialTransaction]
      },
      ...prev
    ]);
  };

  const removeHolding = (id: number) => {
    setHoldings(prev => prev.filter(h => h.id !== id));
  };

  return (
    <HoldingsContext.Provider value={{ holdings, addHolding, removeHolding }}>
      {children}
    </HoldingsContext.Provider>
  );
}

export function useHoldings() {
  const context = useContext(HoldingsContext);
  if (context === undefined) {
    throw new Error('useHoldings must be used within a HoldingsProvider');
  }
  return context;
}
