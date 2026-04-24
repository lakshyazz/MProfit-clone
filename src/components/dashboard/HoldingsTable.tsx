'use client';

import React, { useState, useMemo, useCallback } from 'react';
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
  const { holdings: contextHoldings, removeHolding, addTransaction } = useHoldings();
  const [selectedAsset, setSelectedAsset] = useState<HoldingData | null>(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showAddTxnForm, setShowAddTxnForm] = useState(false);
  const [txnType, setTxnType] = useState<'BUY' | 'SELL'>('BUY');
  const [txnAmount, setTxnAmount] = useState<number | ''>('');
  const [txnDate, setTxnDate] = useState(new Date().toISOString().split('T')[0]);

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

  // Keep selectedAsset in sync with context updates
  const syncedAsset = useMemo(() => {
    if (!selectedAsset) return null;
    return contextHoldings.find(h => h.id === selectedAsset.id) || null;
  }, [selectedAsset, contextHoldings]);

  const handleRowClick = (asset: HoldingData) => {
    setSelectedAsset(asset);
    setShowConfirmDelete(false);
    setShowAddTxnForm(false);
  };

  const closePanel = () => {
    setSelectedAsset(null);
    setShowConfirmDelete(false);
    setShowAddTxnForm(false);
  };

  const handleDeleteConfirm = useCallback(() => {
    if (syncedAsset) {
      removeHolding(syncedAsset.id);
    }
    setShowConfirmDelete(false);
    closePanel();
  }, [syncedAsset, removeHolding]);

  const handleAddTransaction = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!syncedAsset || txnAmount === '' || txnAmount <= 0) return;

    // Prevent selling more than current value
    if (txnType === 'SELL' && txnAmount > syncedAsset.current) {
      alert(`❌ Cannot sell ₹${txnAmount.toLocaleString('en-IN')} — your current holding is only ₹${syncedAsset.current.toLocaleString('en-IN')}.`);
      return;
    }

    const dateObj = new Date(txnDate);
    const formattedDate = dateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    addTransaction(syncedAsset.id, {
      id: Date.now().toString(),
      type: txnType,
      date: formattedDate,
      amount: txnAmount,
    });

    // Reset form
    setTxnAmount('');
    setTxnType('BUY');
    setTxnDate(new Date().toISOString().split('T')[0]);
    setShowAddTxnForm(false);
  }, [syncedAsset, txnType, txnAmount, txnDate, addTransaction]);

  const activeAsset = syncedAsset || selectedAsset;

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
              <p>You haven&apos;t added any assets to this category yet. Import or add manually to see them here.</p>
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
      {activeAsset && (
        <div className={styles.slideOutOverlay} onClick={closePanel}>
          <div className={styles.slideOutPanel} onClick={e => e.stopPropagation()}>
            <div className={styles.panelHeader}>
              <div>
                <h2 className={styles.panelTitle}>{activeAsset.name}</h2>
                <span className={styles.assetClassBadge}>{activeAsset.class}</span>
              </div>
              <button className={styles.closeBtn} onClick={closePanel}>×</button>
            </div>
            
            <div className={styles.panelBody}>
              <div className={styles.detailGrid}>
                <div className={styles.detailCard}>
                  <div className={styles.detailLabel}>Total Invested</div>
                  <div className={styles.detailValue}>{formatCurrency(activeAsset.invested)}</div>
                </div>
                <div className={styles.detailCard}>
                  <div className={styles.detailLabel}>Current Value</div>
                  <div className={`${styles.detailValue} ${styles.currentValue}`}>{formatCurrency(activeAsset.current)}</div>
                </div>
                <div className={styles.detailCard}>
                  <div className={styles.detailLabel}>Absolute Return</div>
                  <div className={`${styles.detailValue} ${activeAsset.absReturn >= 0 ? styles.positiveText : styles.negativeText}`}>
                    {activeAsset.absReturn >= 0 ? '+' : ''}{activeAsset.absReturn}%
                  </div>
                </div>
                <div className={styles.detailCard}>
                  <div className={styles.detailLabel}>XIRR</div>
                  <div className={`${styles.detailValue} ${activeAsset.xirr >= 0 ? styles.positiveText : styles.negativeText}`}>
                    {activeAsset.xirr}%
                  </div>
                </div>
              </div>

              {/* Add Transaction Inline Form */}
              {showAddTxnForm && (
                <form className={styles.txnForm} onSubmit={handleAddTransaction}>
                  <h3 className={styles.txnFormTitle}>New Transaction</h3>
                  <div className={styles.txnFormGrid}>
                    <div className={styles.txnFormGroup}>
                      <label>Type</label>
                      <select
                        className={styles.txnFormInput}
                        value={txnType}
                        onChange={(e) => setTxnType(e.target.value as 'BUY' | 'SELL')}
                      >
                        <option value="BUY">Buy</option>
                        <option value="SELL">Sell</option>
                      </select>
                    </div>
                    <div className={styles.txnFormGroup}>
                      <label>Date</label>
                      <input
                        type="date"
                        className={styles.txnFormInput}
                        value={txnDate}
                        onChange={(e) => setTxnDate(e.target.value)}
                        required
                      />
                    </div>
                    <div className={styles.txnFormGroup} style={{ gridColumn: '1 / -1' }}>
                      <label>Amount (₹)</label>
                      <input
                        type="number"
                        className={styles.txnFormInput}
                        placeholder="Enter amount..."
                        value={txnAmount}
                        onChange={(e) => setTxnAmount(e.target.value ? Number(e.target.value) : '')}
                        min="1"
                        step="any"
                        required
                      />
                    </div>
                  </div>
                  <div className={styles.txnFormActions}>
                    <button type="button" className={styles.txnFormCancel} onClick={() => setShowAddTxnForm(false)}>Cancel</button>
                    <button type="submit" className={styles.txnFormSubmit}>Save Transaction</button>
                  </div>
                </form>
              )}

              <div className={styles.txnHistory}>
                <h3 className={styles.txnTitle}>Transaction History</h3>
                <p className={styles.txnSub}>Recent transactions for {activeAsset.name}</p>
                <ul className={styles.txnList}>
                  {activeAsset.transactions && activeAsset.transactions.length > 0 ? (
                    activeAsset.transactions.map(txn => (
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
                {activeAsset.class === 'Equity' || activeAsset.class === 'Stocks' ? (
                  <Link href="/dashboard/transactions/contract-note" className={styles.buyBtn} style={{ textDecoration: 'none', textAlign: 'center' }}>
                    + Add Transaction
                  </Link>
                ) : activeAsset.class === 'Mutual Fund' ? (
                  <Link href="/dashboard/transactions/mutual-funds" className={styles.buyBtn} style={{ textDecoration: 'none', textAlign: 'center' }}>
                    + Add Transaction
                  </Link>
                ) : (
                  <button className={styles.buyBtn} onClick={() => setShowAddTxnForm(true)}>+ Add Transaction</button>
                )}
                <button className={styles.sellBtn} onClick={() => setShowConfirmDelete(true)}>- Sell / Remove Asset</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Confirmation Modal */}
      {showConfirmDelete && activeAsset && (
        <div className={styles.confirmOverlay} onClick={() => setShowConfirmDelete(false)}>
          <div className={styles.confirmModal} onClick={e => e.stopPropagation()}>
            <div className={styles.confirmIcon}>⚠️</div>
            <h3 className={styles.confirmTitle}>Remove Asset?</h3>
            <p className={styles.confirmText}>
              Are you sure you want to completely sell/remove <strong>{activeAsset.name}</strong> from your dashboard? This action cannot be undone.
            </p>
            <div className={styles.confirmActions}>
              <button className={styles.confirmCancel} onClick={() => setShowConfirmDelete(false)}>Cancel</button>
              <button className={styles.confirmDelete} onClick={handleDeleteConfirm}>Yes, Remove</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
