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
  lastFetchedPrice?: number;
  transactions?: Transaction[];
}

interface HoldingsContextType {
  holdings: HoldingData[]; // Holdings for the active portfolio
  portfolios: string[];
  activePortfolio: string;
  setActivePortfolio: (name: string) => void;
  addPortfolio: (name: string) => void;
  removePortfolio: (name: string) => void;
  addHolding: (holding: Omit<HoldingData, 'id' | 'absReturn' | 'xirr' | 'transactions'> & { initialDate?: string }) => void;
  removeHolding: (id: number) => void;
  addTransaction: (holdingId: number, txn: Transaction) => void;
}

const defaultHoldings: HoldingData[] = [
  { id: 1, name: 'Reliance Industries (RELIANCE)', class: 'Equity', invested: 1540000, current: 2150000, absReturn: 39.6, xirr: 18.4, transactions: [{ id: 't1', type: 'BUY', date: '12 May 2023', amount: 1540000 }] },
  { id: 3, name: 'Parag Parikh Flexi Cap', class: 'Mutual Fund', invested: 1200000, current: 2450000, absReturn: 104.1, xirr: 22.8, transactions: [{ id: 't2', type: 'BUY', date: '05 Jan 2023', amount: 1200000 }] },
  { id: 12, name: 'Public Provident Fund (PPF)', class: 'Fixed Income', invested: 1500000, current: 1820000, absReturn: 21.3, xirr: 7.1, transactions: [{ id: 't3', type: 'BUY', date: '10 Apr 2023', amount: 1500000 }] },
  { id: 4, name: 'SGB Aug 2028', class: 'Gold', invested: 500000, current: 650000, absReturn: 30.0, xirr: 14.5, transactions: [{ id: 't4', type: 'BUY', date: '20 Aug 2023', amount: 500000 }] }
];

const defaultPortfoliosData: Record<string, HoldingData[]> = {
  'Family Consolidated': defaultHoldings,
  'Rahul (Self)': [],
  'Anjali (Spouse)': []
};

const HoldingsContext = createContext<HoldingsContextType | undefined>(undefined);

export function HoldingsProvider({ children }: { children: ReactNode }) {
  const [portfoliosData, setPortfoliosData] = useState<Record<string, HoldingData[]>>(defaultPortfoliosData);
  const [activePortfolio, setActivePortfolioState] = useState<string>('Family Consolidated');
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('mprofit_portfolios_data');
    const savedActive = localStorage.getItem('mprofit_active_portfolio');
    
    if (savedData) {
      try {
        setPortfoliosData(JSON.parse(savedData));
      } catch (e) {
        console.error('Failed to load portfolios data from storage', e);
      }
    } else {
      // Migrate old data if exists
      const oldSaved = localStorage.getItem('mprofit_holdings');
      if (oldSaved) {
        try {
          const oldHoldings = JSON.parse(oldSaved);
          setPortfoliosData(prev => ({...prev, 'Family Consolidated': oldHoldings}));
        } catch(e) {}
      }
    }
    
    if (savedActive && Object.keys(JSON.parse(savedData || '{}')).includes(savedActive)) {
      setActivePortfolioState(savedActive);
    } else if (savedActive && Object.keys(defaultPortfoliosData).includes(savedActive)) {
      setActivePortfolioState(savedActive);
    }
    
    setIsInitialized(true);
  }, []);

  // Save to localStorage whenever portfolios change
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('mprofit_portfolios_data', JSON.stringify(portfoliosData));
      localStorage.setItem('mprofit_active_portfolio', activePortfolio);
    }
  }, [portfoliosData, activePortfolio, isInitialized]);

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

  const holdings = portfoliosData[activePortfolio] || [];

  // Real-time API Polling (every 60s)
  useEffect(() => {
    if (!isInitialized) return;

    const fetchPrices = async () => {
      let updatedGlobal = false;
      const newPortfoliosData = { ...portfoliosData };

      for (const portfolioName of Object.keys(newPortfoliosData)) {
        let updatedPortfolio = false;
        const currentHoldings = newPortfoliosData[portfolioName];
        
        const newHoldings = await Promise.all(currentHoldings.map(async (h) => {
          // Only fetch for Equity or Stocks & ETFs
          const assetClass = h.class.toLowerCase();
          if (assetClass !== 'equity' && assetClass !== 'stocks etfs') return h;

          const match = h.name.match(/\(([^)]+)\)/);
          if (!match) return h;
          const symbol = `${match[1]}.NS`;

          try {
            const res = await fetch(`/api/quote?symbol=${symbol}`);
            const data = await res.json();

            if (data.price) {
              const currentPrice = data.price;
              let newCurrent = h.current;
              if (h.lastFetchedPrice && h.lastFetchedPrice > 0) {
                const ratio = currentPrice / h.lastFetchedPrice;
                newCurrent = h.current * ratio;
              }

              const newAbsReturn = h.invested > 0 
                ? parseFloat(((newCurrent - h.invested) / h.invested * 100).toFixed(2)) 
                : 0;

              if (newCurrent !== h.current || currentPrice !== h.lastFetchedPrice) {
                updatedPortfolio = true;
                updatedGlobal = true;
                return {
                  ...h,
                  current: newCurrent,
                  absReturn: isNaN(newAbsReturn) ? 0 : newAbsReturn,
                  lastFetchedPrice: currentPrice
                };
              }
            }
          } catch (e) {
            console.error(`Failed to fetch price for ${symbol}`, e);
          }
          return h;
        }));

        if (updatedPortfolio) {
          newPortfoliosData[portfolioName] = newHoldings;
        }
      }

      if (updatedGlobal) {
        setPortfoliosData(newPortfoliosData);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized]);

  const addPortfolio = (name: string) => {
    if (!portfoliosData[name]) {
      setPortfoliosData(prev => ({ ...prev, [name]: [] }));
      setActivePortfolioState(name);
    }
  };

  const removePortfolio = (name: string) => {
    if (name === 'Family Consolidated') return; // Cannot delete default
    setPortfoliosData(prev => {
      const newData = { ...prev };
      delete newData[name];
      return newData;
    });
    if (activePortfolio === name) {
      setActivePortfolioState('Family Consolidated');
    }
  };

  const setActivePortfolio = (name: string) => {
    if (portfoliosData[name]) {
      setActivePortfolioState(name);
    }
  };

  const addHolding = (newHolding: Omit<HoldingData, 'id' | 'absReturn' | 'xirr' | 'transactions'> & { initialDate?: string }) => {
    const absReturn = newHolding.invested > 0 
      ? parseFloat(((newHolding.current - newHolding.invested) / newHolding.invested * 100).toFixed(2))
      : 0;
    
    const xirr = 0; 
    const dateObj = newHolding.initialDate ? new Date(newHolding.initialDate) : new Date();
    const formattedDate = dateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    
    const initialTransaction: Transaction = {
      id: Date.now().toString(),
      type: 'BUY',
      date: formattedDate,
      amount: newHolding.invested
    };
    
    setPortfoliosData(prev => ({
      ...prev,
      [activePortfolio]: [
        { 
          ...newHolding, 
          id: Date.now(),
          absReturn: isNaN(absReturn) ? 0 : absReturn,
          xirr: xirr,
          transactions: [initialTransaction]
        },
        ...(prev[activePortfolio] || [])
      ]
    }));
  };

  const removeHolding = (id: number) => {
    setPortfoliosData(prev => ({
      ...prev,
      [activePortfolio]: (prev[activePortfolio] || []).filter(h => h.id !== id)
    }));
  };

  const addTransaction = (holdingId: number, txn: Transaction) => {
    setPortfoliosData(prev => ({
      ...prev,
      [activePortfolio]: (prev[activePortfolio] || []).map(h => {
        if (h.id !== holdingId) return h;
        
        const updatedTransactions = [...(h.transactions || []), txn];
        let newInvested = h.invested;
        let newCurrent = h.current;
        
        if (txn.type === 'BUY') {
          newInvested += txn.amount;
          newCurrent += txn.amount;
        } else if (txn.type === 'SELL') {
          const sellRatio = newCurrent > 0 ? txn.amount / newCurrent : 0;
          newInvested = Math.max(0, newInvested - (newInvested * sellRatio));
          newCurrent = Math.max(0, newCurrent - txn.amount);
        }
        
        const absReturn = newInvested > 0 
          ? parseFloat(((newCurrent - newInvested) / newInvested * 100).toFixed(2))
          : 0;
        
        return {
          ...h,
          invested: newInvested,
          current: newCurrent,
          absReturn: isNaN(absReturn) ? 0 : absReturn,
          transactions: updatedTransactions,
        };
      })
    }));
  };

  return (
    <HoldingsContext.Provider value={{ 
      holdings, 
      portfolios: Object.keys(portfoliosData),
      activePortfolio,
      setActivePortfolio,
      addPortfolio,
      removePortfolio,
      addHolding, 
      removeHolding, 
      addTransaction 
    }}>
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
