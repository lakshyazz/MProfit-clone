'use client';

import React, { useState, Suspense } from 'react';
import HoldingsTable from '@/components/dashboard/HoldingsTable';
import { useHoldings } from '@/context/HoldingsContext';
import AddAssetButton from '@/components/dashboard/AddAssetButton';
import { useUserState } from '@/hooks/useUserState';
import styles from './page.module.css';

function HoldingsContent() {
  const { holdings } = useHoldings();
  const [activeTab, setActiveTab] = useState('All Assets');
  const { isNewUser, mounted } = useUserState();

  // Exhaustive MProfit-like options as requested
  const tabs = [
    'All Assets',
    'Mutual funds (Equity)',
    'SIF',
    'Mutual funds (Debt.)',
    'Banks',
    'NPS/ULIP',
    'Insurance',
    'Private Equity',
    'FDs',
    'Traded Bonds',
    'NCD/Debntures',
    'Deposits/Loans',
    'PPF/EPF',
    'Post office',
    'Gold',
    'Silver',
    'Jewellery',
    'Property',
    'Art',
    'AIF',
    'Loans'
  ];

  // Map tabs to classes broadly since we updated filtering keys
  const mappedData = holdings.filter(asset => {
    if (activeTab === 'All Assets') return true;
    const tab = activeTab.toLowerCase();
    const cls = asset.class.toLowerCase();
    
    if (tab.includes('equity') && cls.includes('equity')) return true;
    if (tab.includes('mutual fund') && cls.includes('mutual fund')) return true;
    if ((tab.includes('fds') || tab.includes('ppf') || tab.includes('banks')) && cls.includes('fixed income')) return true;
    if ((tab.includes('gold') || tab.includes('silver')) && cls.includes('gold')) return true;
    if (tab.includes('property') && cls.includes('real estate')) return true;
    if (tab.includes('aif') && cls.includes('aif')) return true;
    return false;
  });

  const displayData = isNewUser ? [] : mappedData;

  const handleExportCSV = () => {
    if (displayData.length === 0) {
      alert("No data available to export");
      return;
    }
    const headers = ['Name', 'Class', 'Invested', 'Current', 'Abs Return (%)', 'XIRR (%)'];
    const csvContent = [
      headers.join(','),
      ...displayData.map(asset => 
        `"${asset.name}","${asset.class}",${asset.invested},${asset.current},${asset.absReturn},${asset.xirr}`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'holdings_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!mounted) return null;

  return (
    <div className={styles.holdingsView}>
      <header className={styles.viewHeader}>
        <div>
          <h1 className={styles.pageTitle}>All Holdings</h1>
          <p className={styles.pageSubtitle}>Consolidated view of your entire portfolio</p>
        </div>
        <div className={styles.headerActions}>
          <AddAssetButton />
          <button className={styles.filterBtn} onClick={() => alert('Filter options coming soon!')}>Filter</button>
          <button className={styles.exportBtn} onClick={handleExportCSV}>Export CSV</button>
        </div>
      </header>

      <div className={styles.tabsRow} style={{ overflowX: 'auto', whiteSpace: 'nowrap', paddingBottom: '8px' }}>
        {tabs.map(tab => (
          <button 
            key={tab} 
            className={`${styles.tabBtn} ${activeTab === tab ? styles.active : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className={styles.tableSection}>
        <HoldingsTable 
          title={activeTab === 'All Assets' ? 'Your Portfolio Positions' : `${activeTab} Positions`} 
          hideViewAll={true} 
          data={displayData} 
        />
      </div>
    </div>
  );
}

export default function HoldingsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HoldingsContent />
    </Suspense>
  );
}
