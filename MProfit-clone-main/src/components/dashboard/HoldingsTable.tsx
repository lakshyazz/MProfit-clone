'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import styles from './HoldingsTable.module.css';
import AddAssetButton from './AddAssetButton';
import { useHoldings, HoldingData } from '@/context/HoldingsContext';



const formatCurrency = (val: number) => 
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

interface HoldingsTableProps {
  title?: string;
  hideViewAll?: boolean;
  data?: HoldingData[];
  filterCategory?: string | null;
}

export default function HoldingsTable({ title = "Top Holdings", hideViewAll = false, data, filterCategory }: HoldingsTableProps) {
  const { holdings: contextHoldings, removeHolding } = useHoldings();
  const [selectedAsset, setSelectedAsset] = useState<HoldingData | null>(null);

  const displayData = useMemo(() => {
    let sourceData = data || contextHoldings;
    if (filterCategory) {
      sourceData = sourceData.filter(h => {
        const c = h.class.toLowerCase();
        if (filterCategory === 'Equity' && (c.includes('equity') || c.includes('mutual fund') || c.includes('stock'))) return true;
        if (filterCategory === 'Debt' && (c.includes('fixed income') || c.includes('debt') || c.includes('fd') || c.includes('ppf') || c.includes('bond'))) return true;
        if (filterCategory === 'Gold/Alts' && (!c.includes('equity') && !c.includes('mutual fund') && !c.includes('stock') && !c.includes('fixed income') && !c.includes('debt') && !c.includes('fd') && !c.includes('ppf') && !c.includes('bond'))) return true;
        return false;
      });
    }
    return sourceData;
  }, [data, contextHoldings, filterCategory]);

  const handleRowClick = (asset: HoldingData) => {
    setSelectedAsset(asset);
  };

  const closePanel = () => {
    setSelectedAsset(null);
  };

  return (
    <>
      <div className={`glass-panel ${styles.tableContainer}`}>
        <div className={styles.tableHeader}>
          <h3 className={styles.tableTitle}>{title}</h3>
          {!hideViewAll && <button className={styles.viewAllBtn}>View All</button>}
        </div>
        
        <div className={styles.tableWrapper}>
          {displayData.length === 0 ? (
            <div className={styles.emptyTableState}>
              <div className={styles.emptyIcon}>📂</div>
              <h3>No assets found</h3>
              <p>You haven't added any assets to this category yet. Import or add manually to see them here.</p>
              <AddAssetButton className={styles.addAssetBtnFallback} />
            </div>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Asset Name</th>
                  <th>Asset Class</th>
                  <th className={styles.numCol}>Invested</th>
                  <th className={styles.numCol}>Current Value</th>
                  <th className={styles.numCol}>Gain</th>
                  <th className={styles.numCol}>XIRR</th>
                </tr>
              </thead>
              <tbody>
                {displayData.map((hd) => {
                  const gainVal = hd.current - hd.invested;
                  const isPositive = gainVal >= 0;

                  return (
                    <tr key={hd.id} onClick={() => handleRowClick(hd)} className={styles.interactiveRow}>
                      <td data-label="Asset" className={styles.assetName}>{hd.name}</td>
                      <td data-label="Class">
                        <span className={styles.assetClassBadge}>{hd.class}</span>
                      </td>
                      <td data-label="Invested" className={styles.numCol}>{formatCurrency(hd.invested)}</td>
                      <td data-label="Current Value" className={`${styles.numCol} ${styles.currentValue}`}>{formatCurrency(hd.current)}</td>
                      <td data-label="Gain / Loss" className={styles.numCol}>
                        <div className={styles.gainWrapper}>
                          <span className={isPositive ? styles.positiveText : styles.negativeText}>
                            {isPositive ? '+' : ''}{formatCurrency(gainVal)}
                          </span>
                          <span className={styles.subText}>({isPositive ? '+' : ''}{hd.absReturn}%)</span>
                        </div>
                      </td>
                      <td data-label="XIRR" className={styles.numCol}>
                        <span className={isPositive ? styles.positiveBadge : styles.negativeBadge}>
                          {hd.xirr}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Slide Out Panel for Asset Details */}
      {selectedAsset && (
        <div className={styles.slideOutOverlay} onClick={closePanel}>
          <div className={styles.slideOutPanel} onClick={e => e.stopPropagation()}>
            <div className={styles.panelHeader}>
              <div>
                <h2 className={styles.panelTitle}>{selectedAsset.name}</h2>
                <span className={styles.assetClassBadge}>{selectedAsset.class}</span>
              </div>
              <button className={styles.closeBtn} onClick={closePanel}>×</button>
            </div>
            
            <div className={styles.panelBody}>
              <div className={styles.detailGrid}>
                <div className={styles.detailCard}>
                  <div className={styles.detailLabel}>Total Invested</div>
                  <div className={styles.detailValue}>{formatCurrency(selectedAsset.invested)}</div>
                </div>
                <div className={styles.detailCard}>
                  <div className={styles.detailLabel}>Current Value</div>
                  <div className={`${styles.detailValue} ${styles.currentValue}`}>{formatCurrency(selectedAsset.current)}</div>
                </div>
                <div className={styles.detailCard}>
                  <div className={styles.detailLabel}>Absolute Return</div>
                  <div className={`${styles.detailValue} ${selectedAsset.absReturn >= 0 ? styles.positiveText : styles.negativeText}`}>
                    {selectedAsset.absReturn >= 0 ? '+' : ''}{selectedAsset.absReturn}%
                  </div>
                </div>
                <div className={styles.detailCard}>
                  <div className={styles.detailLabel}>XIRR</div>
                  <div className={`${styles.detailValue} ${selectedAsset.xirr >= 0 ? styles.positiveText : styles.negativeText}`}>
                    {selectedAsset.xirr}%
                  </div>
                </div>
              </div>

              <div className={styles.txnHistory}>
                <h3 className={styles.txnTitle}>Transaction History</h3>
                <p className={styles.txnSub}>Recent transactions for {selectedAsset.name}</p>
                <ul className={styles.txnList}>
                  {selectedAsset.transactions && selectedAsset.transactions.length > 0 ? (
                    selectedAsset.transactions.map(txn => (
                      <li key={txn.id} className={styles.txnItem}>
                        <div className={styles.txnLeft}>
                          <span className={txn.type === 'BUY' ? styles.txnTypeBuy : styles.txnTypeSell}>{txn.type}</span>
                          <span className={styles.txnDate}>{txn.date}</span>
                        </div>
                        <div className={styles.txnRight}>
                          {formatCurrency(txn.amount)}
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className={styles.txnItem}>
                      <div className={styles.txnLeft}>
                        <span className={styles.txnDate}>No transactions recorded.</span>
                      </div>
                    </li>
                  )}
                </ul>
              </div>

              <div className={styles.panelActions}>
                {selectedAsset.class === 'Equity' || selectedAsset.class === 'Stocks' ? (
                  <Link href="/dashboard/transactions/contract-note" className={styles.buyBtn} style={{ textDecoration: 'none', textAlign: 'center' }}>
                    + Add Transaction
                  </Link>
                ) : selectedAsset.class === 'Mutual Fund' ? (
                  <Link href="/dashboard/transactions/mutual-funds" className={styles.buyBtn} style={{ textDecoration: 'none', textAlign: 'center' }}>
                    + Add Transaction
                  </Link>
                ) : (
                  <button className={styles.buyBtn}>+ Add Transaction</button>
                )}
                <button className={styles.sellBtn} onClick={() => {
                  if(confirm('Are you sure you want to completely sell/remove this asset from the dashboard?')) {
                    removeHolding(selectedAsset.id);
                    closePanel();
                  }
                }}>- Sell / Remove Asset</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
