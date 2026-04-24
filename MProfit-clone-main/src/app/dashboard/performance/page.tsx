'use client';

import { useMemo } from 'react';
import styles from './page.module.css';
import DownloadReportBtn from './DownloadReportBtn';
import { useHoldings } from '@/context/HoldingsContext';

// Mock data for annual performance heatmap
const annualReturns = [
  { year: 2021, q1: 5.2, q2: 8.4, q3: 12.1, q4: 4.5, total: 30.2 },
  { year: 2022, q1: -2.1, q2: -5.4, q3: 6.2, q4: 8.1, total: 6.8 },
  { year: 2023, q1: 3.4, q2: 9.1, q3: 4.2, q4: 7.5, total: 24.2 },
  { year: 2024, q1: 6.5, q2: 4.2, q3: null, q4: null, total: 10.7 },
];

export default function PerformancePage() {
  const { holdings } = useHoldings();

  const {
    overallXirr,
    absReturn,
    unrealizedGains,
    realizedGains,
    ltcg,
    stcg,
    intraday
  } = useMemo(() => {
    const totalInvested = holdings.reduce((sum, h) => sum + h.invested, 0);
    const totalCurrent = holdings.reduce((sum, h) => sum + h.current, 0);
    const gains = totalCurrent - totalInvested;
    
    const absPct = totalInvested > 0 ? (gains / totalInvested) * 100 : 0;
    const xirr = absPct * 0.45; // Dummy annualized logic
    
    const rGains = gains * 0.22; // Assume 22% of gains have been realized historically
    
    return {
      overallXirr: xirr.toFixed(1),
      absReturn: absPct.toFixed(1),
      unrealizedGains: gains,
      realizedGains: rGains,
      ltcg: gains > 0 ? gains * 0.73 : 0,
      stcg: gains > 0 ? gains * 0.27 : 0,
      intraday: -210000
    };
  }, [holdings]);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Math.abs(val));

  return (
    <div className={styles.performanceView}>
      <header className={styles.viewHeader}>
        <div>
          <h1 className={styles.pageTitle}>Performance & Returns</h1>
          <p className={styles.pageSubtitle}>Deep dive into your portfolio&apos;s historical growth and realized gains.</p>
        </div>
        <div className={styles.headerActions}>
          <select className={styles.timeFilter}>
            <option>All Time</option>
            <option>Last 3 Years</option>
            <option>Last 1 Year</option>
            <option>FY 2023-24</option>
          </select>
        </div>
      </header>

      {/* Hero Metrics */}
      <div className={styles.heroMetrics}>
        <div className={`glass-panel ${styles.metricCard}`}>
          <div className={styles.metricLabel}>Overall XIRR</div>
          <div className={`${styles.metricValue} ${Number(overallXirr) >= 0 ? styles.positive : styles.negative}`}>
            {Number(overallXirr) >= 0 ? '' : '-'}{Math.abs(Number(overallXirr))}%
          </div>
          <div className={styles.metricContext}>Annualized Return</div>
        </div>
        <div className={`glass-panel ${styles.metricCard}`}>
          <div className={styles.metricLabel}>Absolute Return</div>
          <div className={`${styles.metricValue} ${Number(absReturn) >= 0 ? styles.positive : styles.negative}`}>
            {Number(absReturn) >= 0 ? '+' : '-'}{Math.abs(Number(absReturn))}%
          </div>
          <div className={styles.metricContext}>Total growth on capital</div>
        </div>
        <div className={`glass-panel ${styles.metricCard}`}>
          <div className={styles.metricLabel}>Unrealized Gains</div>
          <div className={`${styles.metricValue} ${unrealizedGains >= 0 ? styles.positive : styles.negative}`}>
            {unrealizedGains >= 0 ? '' : '-'}{formatCurrency(unrealizedGains)}
          </div>
          <div className={styles.metricContext}>Current market value surge</div>
        </div>
        <div className={`glass-panel ${styles.metricCard}`}>
          <div className={styles.metricLabel}>Realized Gains</div>
          <div className={`${styles.metricValue} ${realizedGains >= 0 ? styles.positive : styles.negative}`}>
            {realizedGains >= 0 ? '' : '-'}{formatCurrency(realizedGains)}
          </div>
          <div className={styles.metricContext}>Booked profits</div>
        </div>
      </div>

      <div className={styles.mainContentGrid}>
        {/* Left Col: Historical Heatmap & Dividend Yield */}
        <div className={styles.leftCol}>
          <div className={`glass-panel ${styles.heatmapCard}`}>
            <h3 className={styles.cardTitle}>Quarterly Performance Heatmap</h3>
            <div className={styles.heatmapTableWrapper}>
              <table className={styles.heatmapTable}>
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>Q1</th>
                    <th>Q2</th>
                    <th>Q3</th>
                    <th>Q4</th>
                    <th>Total YTD</th>
                  </tr>
                </thead>
                <tbody>
                  {annualReturns.map(row => (
                    <tr key={row.year}>
                      <td className={styles.yearLabel}>{row.year}</td>
                      <td className={row.q1 ? (row.q1 > 0 ? styles.cellPos : styles.cellNeg) : styles.cellEmpty}>
                        {row.q1 ? `${row.q1}%` : '-'}
                      </td>
                      <td className={row.q2 ? (row.q2 > 0 ? styles.cellPos : styles.cellNeg) : styles.cellEmpty}>
                        {row.q2 ? `${row.q2}%` : '-'}
                      </td>
                      <td className={row.q3 ? (row.q3 > 0 ? styles.cellPos : styles.cellNeg) : styles.cellEmpty}>
                        {row.q3 ? `${row.q3}%` : '-'}
                      </td>
                      <td className={row.q4 ? (row.q4 > 0 ? styles.cellPos : styles.cellNeg) : styles.cellEmpty}>
                        {row.q4 ? `${row.q4}%` : '-'}
                      </td>
                      <td className={styles.totalLabel}>
                        <span className={row.total > 0 ? styles.positiveBadge : styles.negativeBadge}>
                          {row.total > 0 ? '+' : ''}{row.total}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className={`glass-panel ${styles.yieldCard}`}>
            <h3 className={styles.cardTitle}>Passive Income (Dividends & Interest)</h3>
            <div className={styles.yieldContent}>
              <div className={styles.yieldBig}>
                <span className={styles.yieldAmount}>₹ 3,45,200</span>
                <span className={styles.yieldDesc}>Earned in last 12 months</span>
              </div>
              <div className={styles.yieldChart}>
                {/* CSS Bar Chart for Dividends */}
                <div className={styles.barWrap}><div className={styles.bar} style={{height: '40%'}}></div><span className={styles.barLabel}>Dec</span></div>
                <div className={styles.barWrap}><div className={styles.bar} style={{height: '20%'}}></div><span className={styles.barLabel}>Jan</span></div>
                <div className={styles.barWrap}><div className={styles.bar} style={{height: '80%'}}></div><span className={styles.barLabel}>Feb</span></div>
                <div className={styles.barWrap}><div className={styles.bar} style={{height: '60%'}}></div><span className={styles.barLabel}>Mar</span></div>
                <div className={styles.barWrap}><div className={styles.bar} style={{height: '95%'}}></div><span className={styles.barLabel}>Apr</span></div>
                <div className={styles.barWrap}><div className={styles.bar} style={{height: '50%'}}></div><span className={styles.barLabel}>May</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Capital Gains Breakdown */}
        <div className={styles.rightCol}>
          <div className={`glass-panel ${styles.gainsCard}`}>
            <h3 className={styles.cardTitle}>Capital Gains Breakdown</h3>
            
            <div className={styles.gainsList}>
              <div className={styles.gainsItem}>
                <div className={styles.gainsInfo}>
                  <div className={styles.gainsName}>Long Term Capital Gains (LTCG)</div>
                  <div className={styles.gainsSub}>Assets held &gt; 1 year</div>
                </div>
                <div className={styles.gainsValueWrap}>
                  <div className={`${styles.gainsValue} ${ltcg >= 0 ? styles.positive : styles.negative}`}>
                    {formatCurrency(ltcg)}
                  </div>
                  <div className={styles.gainsTax}>Est. Tax: {formatCurrency(ltcg * 0.1)}</div>
                </div>
              </div>

              <div className={styles.gainsItem}>
                <div className={styles.gainsInfo}>
                  <div className={styles.gainsName}>Short Term Capital Gains (STCG)</div>
                  <div className={styles.gainsSub}>Assets held &lt; 1 year</div>
                </div>
                <div className={styles.gainsValueWrap}>
                  <div className={`${styles.gainsValue} ${stcg >= 0 ? styles.positive : styles.negative}`}>
                    {formatCurrency(stcg)}
                  </div>
                  <div className={styles.gainsTax}>Est. Tax: {formatCurrency(stcg * 0.15)}</div>
                </div>
              </div>

              <div className={styles.gainsItem}>
                <div className={styles.gainsInfo}>
                  <div className={styles.gainsName}>Intraday / Speculative</div>
                  <div className={styles.gainsSub}>Day trading PnL</div>
                </div>
                <div className={styles.gainsValueWrap}>
                  <div className={`${styles.gainsValue} ${intraday >= 0 ? styles.positive : styles.negative}`}>
                    {intraday >= 0 ? '' : '-'}{formatCurrency(intraday)}
                  </div>
                  <div className={styles.gainsTax}>Carry forward available</div>
                </div>
              </div>
            </div>

            <DownloadReportBtn className={styles.taxReportBtn} />
          </div>
        </div>

      </div>
    </div>
  );
}
