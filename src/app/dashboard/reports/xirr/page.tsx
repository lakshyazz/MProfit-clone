'use client';

import styles from './xirr.module.css';

const MOCK_XIRR_DATA = [
  { id: 1, asset: 'Reliance Industries', category: 'Equity', invested: 240000, currentValue: 380000, xirr: 24.5 },
  { id: 2, asset: 'HDFC Midcap Opportunities', category: 'Mutual Fund', invested: 450000, currentValue: 610000, xirr: 18.2 },
  { id: 3, asset: 'Infosys', category: 'Equity', invested: 100000, currentValue: 95000, xirr: -4.1 },
  { id: 4, asset: 'Axis Bluechip Fund', category: 'Mutual Fund', invested: 300000, currentValue: 420000, xirr: 14.8 },
  { id: 5, asset: 'SGB Aug 2028', category: 'Gold', invested: 50000, currentValue: 64000, xirr: 11.5 },
];

const formatCurrency = (val: number) => 
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Math.abs(val));

export default function XIRRReportPage() {
  const handleExport = () => {
    const csvContent = [
      'Asset,Category,Invested,Current Value,Absolute Gain,XIRR (%)',
      ...MOCK_XIRR_DATA.map(d => {
        const gain = d.currentValue - d.invested;
        return `"${d.asset}","${d.category}",${d.invested},${d.currentValue},${gain},${d.xirr}`;
      })
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.setAttribute('download', 'xirr_report.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className={styles.reportView}>
      <header className={styles.viewHeader}>
        <div>
          <h1 className={styles.pageTitle}>XIRR Report</h1>
          <p className={styles.pageSubtitle}>Track the annualized return of your investments considering multiple cash flows.</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.exportBtn} onClick={handleExport}>Export Report</button>
        </div>
      </header>

      <div className={styles.summaryGrid}>
        <div className={styles.summaryCard}>
          <div className={styles.summaryLabel}>Overall Portfolio XIRR</div>
          <div className={`${styles.summaryValue} ${styles.positiveText}`}>16.4%</div>
          <div className={styles.summarySub}>Above benchmark (12%)</div>
        </div>
        <div className={styles.summaryCard}>
          <div className={styles.summaryLabel}>Best Performing Category</div>
          <div className={styles.summaryValue}>Equity</div>
          <div className={styles.summarySub}>Average 21.3% XIRR</div>
        </div>
        <div className={`${styles.summaryCard} ${styles.highlightCard}`}>
          <div className={styles.summaryLabel}>Total Invested Value</div>
          <div className={styles.summaryValue}>₹ 11,40,000</div>
          <div className={styles.summarySub}>Current: ₹ 15,69,000</div>
        </div>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableHeaderSection}>
          <h3 className={styles.tableTitle}>Asset-wise XIRR Breakdown</h3>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Asset Name</th>
                <th>Category</th>
                <th className={styles.numCol}>Invested Value</th>
                <th className={styles.numCol}>Current Value</th>
                <th className={styles.numCol}>Absolute Gain</th>
                <th className={styles.numCol}>XIRR (%)</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_XIRR_DATA.map((item) => {
                const absoluteGain = item.currentValue - item.invested;
                const isPositive = item.xirr >= 0;
                return (
                  <tr key={item.id}>
                    <td className={styles.assetName}>{item.asset}</td>
                    <td>{item.category}</td>
                    <td className={styles.numCol}>{formatCurrency(item.invested)}</td>
                    <td className={styles.numCol}>{formatCurrency(item.currentValue)}</td>
                    <td className={styles.numCol}>
                      <span className={absoluteGain >= 0 ? styles.positiveText : styles.negativeText}>
                        {absoluteGain >= 0 ? '+' : '-'}{formatCurrency(absoluteGain)}
                      </span>
                    </td>
                    <td className={styles.numCol}>
                      <span className={isPositive ? styles.positiveText : styles.negativeText}>
                        {item.xirr}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
