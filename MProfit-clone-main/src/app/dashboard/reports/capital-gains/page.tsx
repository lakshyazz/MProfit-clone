import styles from './page.module.css';
import ExportButtons from './ExportButtons';

export const metadata = {
  title: 'Capital Gains Report | MProfit Next-Gen',
};

const mockTransactions = [
  { id: 'TXN001', asset: 'Reliance Industries', type: 'Equity', buyDate: '12-May-2022', sellDate: '15-Aug-2023', qty: 100, buyValue: 240000, sellValue: 280000, gain: 40000, cgType: 'LTCG' },
  { id: 'TXN002', asset: 'Infosys', type: 'Equity', buyDate: '10-Jan-2023', sellDate: '05-Sep-2023', qty: 50, buyValue: 75000, sellValue: 82000, gain: 7000, cgType: 'STCG' },
  { id: 'TXN003', asset: 'HDFC Bank', type: 'Equity', buyDate: '01-Apr-2023', sellDate: '10-Oct-2023', qty: 200, buyValue: 320000, sellValue: 310000, gain: -10000, cgType: 'STCL' },
  { id: 'TXN004', asset: 'Axis Midcap Direct', type: 'Mutual Fund', buyDate: '20-Feb-2020', sellDate: '22-Nov-2023', qty: 1540.5, buyValue: 450000, sellValue: 620000, gain: 170000, cgType: 'LTCG' },
];

const formatCurrency = (val: number) => 
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Math.abs(val));

export default function CapitalGainsPage() {
  return (
    <div className={styles.reportView}>
      <header className={styles.viewHeader}>
        <div>
          <h1 className={styles.pageTitle}>Capital Gains Report</h1>
          <p className={styles.pageSubtitle}>Tax-ready realized gains breakdown for filing with ITR.</p>
        </div>
        <div className={styles.headerActions}>
          <select className={styles.fyFilter}>
            <option>FY 2023-24</option>
            <option>FY 2022-23</option>
            <option>FY 2021-22</option>
          </select>
          <ExportButtons excelClass={styles.exportBtn} pdfClass={styles.exportBtnPdf} />
        </div>
      </header>

      {/* Tax Summary Grid */}
      <div className={styles.summaryGrid}>
        <div className={`glass-panel ${styles.summaryCard}`}>
          <div className={styles.summaryLabel}>Total LTCG (Equity)</div>
          <div className={`${styles.summaryValue} ${styles.positive}`}>₹ 2,10,000</div>
          <div className={styles.summarySub}>Exempt up to ₹ 1,00,000</div>
        </div>
        <div className={`glass-panel ${styles.summaryCard}`}>
          <div className={styles.summaryLabel}>Total STCG (Equity)</div>
          <div className={`${styles.summaryValue} ${styles.positive}`}>₹ 7,000</div>
          <div className={styles.summarySub}>Taxable at 15%</div>
        </div>
        <div className={`glass-panel ${styles.summaryCard}`}>
          <div className={styles.summaryLabel}>Total STCL (Carried Forward)</div>
          <div className={`${styles.summaryValue} ${styles.negative}`}>- ₹ 10,000</div>
          <div className={styles.summarySub}>Can set off against future CG</div>
        </div>
        <div className={`glass-panel ${styles.summaryCard} ${styles.highlightCard}`}>
          <div className={styles.summaryLabel}>Est. Tax Liability</div>
          <div className={styles.summaryValue}>₹ 17,550</div>
          <div className={styles.summarySub}>*Consult CA before filing</div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className={`glass-panel ${styles.tableCard}`}>
        <div className={styles.tableHeaderSection}>
          <h3 className={styles.tableTitle}>Realized Transactions - FY 2023-24</h3>
          <div className={styles.tableSearch}>
            <input type="text" placeholder="Search asset..." className={styles.searchInput} />
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Asset Name</th>
                <th>Buy Date</th>
                <th>Sell Date</th>
                <th className={styles.numCol}>Qty</th>
                <th className={styles.numCol}>Buy Value</th>
                <th className={styles.numCol}>Sell Value</th>
                <th className={styles.numCol}>Gain / Loss</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {mockTransactions.map((txn) => {
                const isPositive = txn.gain >= 0;
                return (
                  <tr key={txn.id}>
                    <td className={styles.assetName}>{txn.asset}</td>
                    <td className={styles.dateCol}>{txn.buyDate}</td>
                    <td className={styles.dateCol}>{txn.sellDate}</td>
                    <td className={styles.numCol}>{txn.qty}</td>
                    <td className={styles.numCol}>{formatCurrency(txn.buyValue)}</td>
                    <td className={styles.numCol}>{formatCurrency(txn.sellValue)}</td>
                    <td className={styles.numCol}>
                      <span className={isPositive ? styles.positiveText : styles.negativeText}>
                        {isPositive ? '+' : '-'} {formatCurrency(txn.gain)}
                      </span>
                    </td>
                    <td>
                      <span className={`${styles.cgBadge} ${styles[txn.cgType]}`}>
                        {txn.cgType}
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
