'use client';
import styles from './tax.module.css';

const MOCK_OPPORTUNITIES = [
  { id: 1, name: 'Paytm (One97 Comm)', type: 'Equity', date: '21 Jan 2024', invested: 150000, current: 85000, unrealizedLoss: -65000 },
  { id: 2, name: 'Zomato Ltd', type: 'Equity', date: '14 Nov 2023', invested: 200000, current: 185000, unrealizedLoss: -15000 },
  { id: 3, name: 'HDFC FMP 1120 Days', type: 'Debt Fund', date: '05 Mar 2023', invested: 500000, current: 480000, unrealizedLoss: -20000 }
];

export default function TaxHarvestingPage() {
  const handleExecuteStrategy = () => {
    alert('✅ Strategy Queued! All 3 sell orders for tax harvesting have been sent to your broker for execution. Expected tax saving: ₹15,000');
  };

  const handleProposeSell = (name: string, loss: number) => {
    alert(`📋 Sell Proposal Created for ${name}\nUnrealized Loss: ₹${Math.abs(loss).toLocaleString('en-IN')}\nThis will be offset against your STCG liability. Confirm with your broker to execute.`);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Predictive Tax Harvesting</h1>
          <p className={styles.subtitle}>Offset your capital gains tax liability before March 31st by neutralizing unrealized losses.</p>
        </div>
        <button className={styles.actionBtn} onClick={handleExecuteStrategy}>Execute Strategy</button>
      </header>

      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <h3>Current STCG Liability</h3>
          <div className={`${styles.metricValue} ${styles.danger}`}>₹ 1,25,000</div>
          <div className={styles.metricSub}>Estimated Tax: ₹18,750 (15%)</div>
        </div>
        
        <div className={`${styles.metricCard} ${styles.highlight}`}>
          <h3>Harvestable Losses</h3>
          <div className={`${styles.metricValue} ${styles.success}`}>₹ 1,00,000</div>
          <div className={styles.metricSub}>Across 3 assets</div>
        </div>

        <div className={styles.metricCard}>
          <h3>Tax Saved if Harvested</h3>
          <div className={styles.metricValue}>₹ 15,000</div>
          <div className={styles.metricSub}>Reduces absolute tax payout</div>
        </div>
      </div>

      <div className={styles.tableSection}>
        <h2>Recommended Sell Candidates</h2>
        <table className={styles.harvestTable}>
          <thead>
            <tr>
              <th>Asset Name</th>
              <th>Holding Type</th>
              <th>Invested Value</th>
              <th>Current Value</th>
              <th>Unrealized Loss</th>
              <th className={styles.actionCell}>Action</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_OPPORTUNITIES.map(opp => (
              <tr key={opp.id}>
                <td>{opp.name}</td>
                <td>{opp.type}</td>
                <td>₹{opp.invested.toLocaleString('en-IN')}</td>
                <td>₹{opp.current.toLocaleString('en-IN')}</td>
                <td className={styles.negative}>₹{opp.unrealizedLoss.toLocaleString('en-IN')}</td>
                <td className={styles.actionCell}>
                  <button className={styles.sellBtn} onClick={() => handleProposeSell(opp.name, opp.unrealizedLoss)}>Propose Sell</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
