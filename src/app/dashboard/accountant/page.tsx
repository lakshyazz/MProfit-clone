'use client';
import styles from './accountant.module.css';

const downloadCSV = (filename: string, rows: string[]) => {
  const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.setAttribute('download', filename);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

export default function AccountantPortal() {
  const handleCapitalGainsCSV = () => {
    downloadCSV('capital_gains_itr2.csv', [
      'Asset,Type,Buy Date,Sell Date,Buy Value,Sell Value,Gain,CG Type',
      '"Reliance Industries","Equity","12-May-2022","15-Aug-2023",240000,280000,40000,LTCG',
      '"Infosys","Equity","10-Jan-2023","05-Sep-2023",75000,82000,7000,STCG',
      '"HDFC Bank","Equity","01-Apr-2023","10-Oct-2023",320000,310000,-10000,STCL',
      '"Axis Midcap Direct","Mutual Fund","20-Feb-2020","22-Nov-2023",450000,620000,170000,LTCG',
    ]);
  };

  const handleDividendCSV = () => {
    downloadCSV('dividend_interest_income.csv', [
      'Asset,Type,Date,Amount (INR),TDS Deducted',
      '"Reliance Industries","Dividend","12-Sep-2023",15000,1500',
      '"HDFC Bank FD","Interest","31-Mar-2024",75000,7500',
      '"ITC Ltd","Dividend","22-Jul-2023",8200,820',
      '"PPF","Interest","31-Mar-2024",106000,0',
    ]);
  };
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          <span className={styles.titleIcon}>#</span> 
          Accountant Export Portal
        </h1>
        <p className={styles.subtitle}>Strict data exports formatted for Tally ERP, Tax Audit, and ITR Filing.</p>
      </header>

      <div className={styles.portalModeAlert}>
        <span style={{fontWeight: 'bold', marginRight: '8px'}}>SYSTEM ALERT:</span> Accountant Mode Active: Aesthetic charts and animations are disabled on this page to prioritize data density and bulk export speed.
      </div>

      <div className={styles.grid}>
        <div className={styles.exportCard}>
          <h2>Capital Gains Extract (ITR-2)</h2>
          <p>Download a master CSV containing all Short-Term and Long-Term Capital Gains/Losses sorted by asset class and Date of Acquisition, mapped to ITR-2 Schedules.</p>
          
          <select className={styles.financialYearSelect}>
            <option>FY 2023-2024 (AY 2024-2025)</option>
            <option>FY 2022-2023 (AY 2023-2024)</option>
          </select>
          
          <button className={`${styles.downloadBtn} ${styles.primary}`} onClick={handleCapitalGainsCSV}>
            <span>⬇</span> Download CSV
          </button>
        </div>

        <div className={styles.exportCard}>
          <h2>Dividend & Interest Income</h2>
          <p>Export a flat ledger of all dividend payouts, bond interest (tax-free and taxable), and FD interest accrued for the selected period.</p>
          
          <select className={styles.financialYearSelect}>
            <option>FY 2023-2024 (AY 2024-2025)</option>
            <option>FY 2022-2023 (AY 2023-2024)</option>
          </select>
          
          <button className={styles.downloadBtn} onClick={handleDividendCSV}>
            <span>⬇</span> Download CSV
          </button>
        </div>

        <div className={styles.exportCard}>
          <h2>Closing Valuation Statement</h2>
          <p>Generate a "Value as on 31st March" statement for auditing Net Worth. Includes ISIN, Quantity, Closing NAV/Price, and Total Value.</p>
          
          <button className={styles.downloadBtn} onClick={() => alert('Generating PDF Statement...')}>
            <span>⬇</span> Download PDF Statement
          </button>
        </div>

        <div className={styles.exportCard}>
          <h2>Tally XML Bridge</h2>
          <p>Export all accounting voucher entries (Purchase, Sale, Dividend, Interest) in a format ready for single-click import into Tally ERP 9 / Prime.</p>
          
          <button className={styles.downloadBtn} onClick={() => alert('Exporting Tally XML payload...')}>
            <span>⬇</span> Generate Tally XML
          </button>
        </div>
      </div>
    </div>
  );
}
