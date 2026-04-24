'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './mutualFunds.module.css';

export default function MutualFundsTransaction() {
  const router = useRouter();
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => {
      alert('✅ Transaction saved successfully!');
      router.push('/dashboard');
    }, 300);
  };

  const handleCancel = () => {
    router.push('/dashboard');
  };

  const handleAddFund = () => {
    alert('🔍 Fund search would open an AMFI data browser here.');
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.pageHeader}>
        <div className={styles.breadcrumbs}>
          <Link href="/dashboard" className={styles.backBtn}>← Back</Link>
          <span>/</span>
          <span>INV</span>
          <span>/</span>
          <span>Mutual Funds (Equity)</span>
          <span>/</span>
          <span>New Transaction</span>
        </div>
        <h1 className={styles.pageTitle}>Mutual Funds - Buy/Sell</h1>
      </header>

      <div className={styles.formCard}>
        <div className={styles.formGrid}>
          <div className={styles.inputRow}>
            <div className={styles.inputLabel}>Trans. Type</div>
            <select className={styles.inputField}>
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
            </select>
          </div>
          
          <div className={styles.inputRow}>
            <div className={styles.inputLabel}>Date</div>
            <input type="date" className={styles.inputField} defaultValue="2026-04-19" />
          </div>

          <div className={styles.inputRow}>
            <div className={styles.inputLabel}>Fund Name</div>
            <div style={{ flex: 1, display: 'flex', gap: '8px' }}>
              <select className={styles.inputField}>
                <option value="">Select Mutual Fund...</option>
                <option value="parag_parikh">Parag Parikh Flexi Cap Fund</option>
                <option value="axis_midcap">Axis Midcap Direct</option>
              </select>
              <button style={{
                background: 'transparent', 
                border: '1px solid #D1D5DB', 
                borderRadius: '6px', 
                padding: '0 12px',
                color: '#2563EB',
                cursor: 'pointer',
                fontWeight: 'bold'
              }} onClick={handleAddFund}>⊕</button>
            </div>
          </div>

          <div className={styles.inputRow}>
            <div className={styles.inputLabel}>Quantity</div>
            <input type="number" className={styles.inputField} defaultValue="0" />
          </div>

          <div className={styles.inputRow}>
            <div className={styles.inputLabel}>NAV</div>
            <input type="number" className={styles.inputField} defaultValue="0.00" />
          </div>

          <div className={styles.inputRow}>
            <div className={styles.inputLabel}>Net Amount</div>
            <input type="number" className={styles.inputField} defaultValue="0.00" />
          </div>

          <div className={styles.inputRow}>
            <div className={styles.inputLabel}>Stamp Charges</div>
            <input type="number" className={styles.inputField} defaultValue="0.00" />
          </div>

          <div className={styles.inputRow}>
            <div className={styles.inputLabel}>Gross Amount</div>
            <input type="number" className={styles.inputField} defaultValue="0.00" />
          </div>
        </div>

        <div className={styles.formActions}>
          <button className={styles.saveBtn} onClick={handleSave}>Save</button>
          <button className={styles.cancelBtn} onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
