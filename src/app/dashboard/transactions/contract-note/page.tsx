'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './contractNote.module.css';

export default function ContractNoteDetail() {
  const router = useRouter();
  const [buyRows, setBuyRows] = useState(1);
  const [sellRows, setSellRows] = useState(1);

  const handleSave = () => {
    alert('✅ Contract note saved successfully!');
    router.push('/dashboard');
  };

  const handleCancel = () => {
    router.push('/dashboard');
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.pageHeader}>
        <div className={styles.breadcrumbs}>
          <Link href="/dashboard" className={styles.backBtn}>← Back</Link>
          <span>/</span>
          <span>INV</span>
          <span>/</span>
          <span>Stocks & ETFs</span>
          <span>/</span>
          <span>Contract Note Detail</span>
        </div>
        <h1 className={styles.pageTitle}>Contract Note Detail</h1>
      </header>

      <div className={styles.formCard}>
        <div className={styles.topRow}>
          <div className={styles.inputGroup}>
            <label>Date:</label>
            <input type="date" className={styles.inputField} defaultValue="2026-04-19" />
          </div>
          <div className={styles.inputGroup} style={{ flex: 2 }}>
            <label>Broker:</label>
            <select className={styles.inputField}>
              <option>Select Broker</option>
              <option>Zerodha</option>
              <option>Upstox</option>
              <option>ICICI Direct</option>
            </select>
          </div>
          <div className={styles.inputGroup}>
            <label>Cntr. Note:</label>
            <input type="text" className={styles.inputField} />
          </div>
          <div className={styles.inputGroup}>
            <label>Settlement No:</label>
            <input type="text" className={styles.inputField} />
          </div>
        </div>

        <div className={styles.tableSection}>
          <div className={styles.tableContainer}>
            <table className={styles.txTable}>
              <thead>
                <tr>
                  <th>Asset Name ⊕</th>
                  <th>Purchase Quantity</th>
                  <th>Purchase Price</th>
                  <th>Brokerage</th>
                  <th>Purchase Amount</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: buyRows }).map((_, i) => (
                  <tr key={`buy-${i}`}>
                    <td><input type="text" className={styles.inputField} placeholder="Asset Name" /></td>
                    <td><input type="number" className={styles.inputField} placeholder="0" /></td>
                    <td><input type="number" className={styles.inputField} placeholder="0.00" /></td>
                    <td><input type="number" className={styles.inputField} placeholder="0.00" /></td>
                    <td><input type="number" className={styles.inputField} placeholder="0.00" readOnly /></td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={5} style={{ padding: 0 }}>
                    <button className={styles.addRowBtn} onClick={() => setBuyRows(r => r + 1)}>⊕ Add Row ({buyRows} row{buyRows > 1 ? 's' : ''})</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className={styles.tableSection}>
          <div className={styles.tableContainer}>
            <table className={styles.txTable}>
              <thead>
                <tr>
                  <th>Asset Name (Sales) ⊕</th>
                  <th>Sale Quantity</th>
                  <th>Sale Price</th>
                  <th>Brokerage</th>
                  <th>Sale Amount</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: sellRows }).map((_, i) => (
                  <tr key={`sell-${i}`}>
                    <td><input type="text" className={styles.inputField} placeholder="Asset Name" /></td>
                    <td><input type="number" className={styles.inputField} placeholder="0" /></td>
                    <td><input type="number" className={styles.inputField} placeholder="0.00" /></td>
                    <td><input type="number" className={styles.inputField} placeholder="0.00" /></td>
                    <td><input type="number" className={styles.inputField} placeholder="0.00" readOnly /></td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={5} style={{ padding: 0 }}>
                    <button className={styles.addRowBtn} onClick={() => setSellRows(r => r + 1)}>⊕ Add Row ({sellRows} row{sellRows > 1 ? 's' : ''})</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className={styles.bottomSection}>
          <div className={styles.chargesCol}>
            <div className={styles.chargeRow}>
              <span className={styles.chargeLabel}>STT:</span>
              <input type="number" defaultValue="0.00" className={styles.chargeInput} />
            </div>
            <div className={styles.chargeRow}>
              <span className={styles.chargeLabel}>GST / S.Tax:</span>
              <input type="number" defaultValue="0.00" className={styles.chargeInput} />
            </div>
          </div>
          <div className={styles.chargesCol}>
            <div className={styles.chargeRow}>
              <span className={styles.chargeLabel}>Stamp Charges:</span>
              <input type="number" defaultValue="0.00" className={styles.chargeInput} />
            </div>
            <div className={styles.chargeRow}>
              <span className={styles.chargeLabel}>Trans. Charges:</span>
              <input type="number" defaultValue="0.00" className={styles.chargeInput} />
            </div>
          </div>
          <div className={styles.chargesCol}>
            <div className={styles.chargeRow}>
              <span className={styles.chargeLabel}>Other Charges:</span>
              <input type="number" defaultValue="0.00" className={styles.chargeInput} />
            </div>
            <div className={styles.chargeRow}>
              <span className={styles.chargeLabel} style={{ fontWeight: 600, color: '#111827' }}>Total Amount: (Receivable)</span>
              <input type="number" defaultValue="0.00" className={styles.chargeInput} style={{ fontWeight: 600 }} readOnly />
            </div>
          </div>
        </div>

        <div className={styles.formActions}>
          <button className={styles.saveBtn} onClick={handleSave}>Save</button>
          <button className={styles.cancelBtn} onClick={handleCancel}>Cancel</button>
          <label className={styles.checkboxRow} style={{ marginLeft: 'auto' }}>
            <input type="checkbox" /> Automatically transfer charges?
          </label>
        </div>
      </div>
    </div>
  );
}
