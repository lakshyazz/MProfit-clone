import styles from './page.module.css';
import Link from 'next/link';

export default function Features() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          Powerful Features for <br />
          <span className="text-gradient">Every Investor</span>
        </h1>
        <p className={styles.subtitle}>
          India&apos;s most comprehensive portfolio tracker — from individual portfolios to family offices, MProfit scales with your wealth.
        </p>
      </header>
      
      <div className={styles.content}>
        <div className={styles.mainFeatures}>

          {/* ── 1. Multi-Asset Tracking ── */}
          <section className={styles.featureRow} id="multi-asset">
            <div className={styles.featureInfo}>
              <h3>Multi-Asset Portfolio Tracking</h3>
              <p>Consolidate your Stocks, Mutual Funds, F&O, Bonds, FDs, NPS, PMS, AIF, Gold, Real Estate and 15+ other asset classes in a single, unified dashboard. Track Absolute Gain and XIRR for every holding.</p>
              <ul className={styles.featureList}>
                <li>Unified view across Equity, Debt, Commodities &amp; Real Estate</li>
                <li>Create portfolio groups for family-wise consolidated views</li>
                <li>Individual, advisor &amp; family office portfolio modes</li>
              </ul>
            </div>
            <div className={styles.isometricMock}>
              {/* Base platform */}
              <div className={`${styles.isoLayer} ${styles.baseLayer}`}></div>
              {/* Data grid layer */}
              <div className={`${styles.isoLayer} ${styles.gridLayer} ${styles.greenTint}`}>
                <div className={styles.miniRows}>
                  <span></span><span></span><span></span><span></span><span></span>
                </div>
              </div>
              {/* Chart layer */}
              <div className={`${styles.isoLayer} ${styles.floatLayer} ${styles.blueTint}`}>
                <div className={styles.miniBars}>
                  <span style={{height: '40%'}}></span>
                  <span style={{height: '65%'}}></span>
                  <span style={{height: '50%'}}></span>
                  <span style={{height: '80%'}}></span>
                  <span style={{height: '55%'}}></span>
                </div>
              </div>
            </div>
          </section>
          
          {/* ── 2. Auto Import ── */}
          <section className={`${styles.featureRow} ${styles.reverse}`} id="auto-import">
            <div className={styles.featureInfo}>
              <h3>Auto-Import from 700+ Brokers</h3>
              <p>Eliminate manual data entry. Directly import contract notes, Mutual Fund CAS statements from CAMSOnline or NSDL, and eNPS statements. Supports PDF, Excel, HTML, CSV, TXT &amp; DBF formats.</p>
              <ul className={styles.featureList}>
                <li>Import Stocks &amp; F&O contract notes from 700+ brokers</li>
                <li>Import Mutual Fund CAS from CAMSOnline or NSDL</li>
                <li>Advisors: Import RTA files from CAMS, Karvy &amp; Franklin</li>
              </ul>
            </div>
            <div className={styles.isometricMock}>
              <div className={`${styles.isoLayer} ${styles.baseLayer}`}></div>
              {/* File stack layer */}
              <div className={`${styles.isoLayer} ${styles.gridLayer} ${styles.tealTint}`}>
                <div className={styles.miniDocs}>
                  <span>PDF</span><span>CSV</span><span>XLS</span>
                </div>
              </div>
              {/* Arrow/flow layer */}
              <div className={`${styles.isoLayer} ${styles.floatLayer} ${styles.greenTint}`}>
                <div className={styles.miniFlow}>
                  <span></span>
                  <span className={styles.flowArrow}>→</span>
                  <span></span>
                </div>
              </div>
            </div>
          </section>
          
          {/* ── 3. Tax Reporting ── */}
          <section className={styles.featureRow} id="tax-reporting">
            <div className={styles.featureInfo}>
              <h3>ITR-Ready Capital Gains Reports</h3>
              <p>Generate CA-ready tax reports matching Indian Income Tax Return schedules. Long-term, short-term, and intra-day capital gains — auto-calculated with LTCG Grandfathering and Indexation provisions.</p>
              <ul className={styles.featureList}>
                <li>Capital Gain reports in Income Tax Return (ITR) format</li>
                <li>Compatible with ClearTax, Winman, CompuTax &amp; more</li>
                <li>Unrealised capital gains for tax-loss harvesting decisions</li>
              </ul>
            </div>
            <div className={styles.isometricMock}>
              <div className={`${styles.isoLayer} ${styles.baseLayer}`}></div>
              {/* Report layer */}
              <div className={`${styles.isoLayer} ${styles.gridLayer} ${styles.amberTint}`}>
                <div className={styles.miniReport}>
                  <span className={styles.reportHeader}></span>
                  <span></span><span></span><span></span>
                </div>
              </div>
              {/* Badge layer */}
              <div className={`${styles.isoLayer} ${styles.floatLayer} ${styles.amberFloat}`}>
                <div className={styles.miniBadge}>ITR</div>
              </div>
            </div>
          </section>
          
          {/* ── 4. Live Tracking ── */}
          <section className={`${styles.featureRow} ${styles.reverse}`} id="live-tracking">
            <div className={styles.featureInfo}>
              <h3>Live Valuations &amp; Corporate Actions</h3>
              <p>Live price feeds for Stocks &amp; ETFs (15-min delay), daily NAV updates for Mutual Funds, and automatic corporate action adjustments — dividends, bonuses, splits, mergers, and demergers.</p>
              <ul className={styles.featureList}>
                <li>Live stock prices updated during market hours</li>
                <li>Daily NAV updates for Mutual Funds &amp; Listed Bonds</li>
                <li>Auto-adjusted corporate actions (bonus, split, merger)</li>
              </ul>
            </div>
            <div className={styles.isometricMock}>
              <div className={`${styles.isoLayer} ${styles.baseLayer}`}></div>
              {/* Pulse line layer */}
              <div className={`${styles.isoLayer} ${styles.gridLayer} ${styles.violetTint}`}>
                <div className={styles.miniPulse}>
                  <svg viewBox="0 0 120 40" className={styles.pulseSvg}>
                    <polyline points="0,30 15,28 30,20 45,25 55,10 65,18 80,8 95,15 110,12 120,14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              {/* Live dot layer */}
              <div className={`${styles.isoLayer} ${styles.floatLayer} ${styles.violetFloat}`}>
                <div className={styles.liveDot}></div>
              </div>
            </div>
          </section>

          {/* ── 5. Analytics ── */}
          <section className={styles.featureRow} id="analytics">
            <div className={styles.featureInfo}>
              <h3>Deep Analytics &amp; Performance</h3>
              <p>XIRR returns at asset, class, and portfolio level. Multi-level asset allocation breakdowns. Income, Due Dates, Holding Period &amp; Transaction reports. Advanced AUM insights for advisors.</p>
              <ul className={styles.featureList}>
                <li>Annualised Return (XIRR) across all levels</li>
                <li>Multi-level asset allocation visualizations</li>
                <li>Comprehensive reporting suite for every need</li>
              </ul>
            </div>
            <div className={styles.isometricMock}>
              <div className={`${styles.isoLayer} ${styles.baseLayer}`}></div>
              {/* Donut chart layer */}
              <div className={`${styles.isoLayer} ${styles.gridLayer} ${styles.pinkTint}`}>
                <div className={styles.miniDonut}>
                  <span className={styles.donutRing}></span>
                </div>
              </div>
              {/* Metrics layer */}
              <div className={`${styles.isoLayer} ${styles.floatLayer} ${styles.pinkFloat}`}>
                <div className={styles.miniMetric}>
                  <span>XIRR</span>
                  <strong>18.4%</strong>
                </div>
              </div>
            </div>
          </section>

          {/* ── 6. F&O Management ── */}
          <section className={`${styles.featureRow} ${styles.reverse}`} id="fo-management">
            <div className={styles.featureInfo}>
              <h3>F&O Position Management</h3>
              <p>Track Futures &amp; Options positions across Stocks, Currency, and Commodities. Import digital contract notes, maintain mark-to-market records, and monitor realised and unrealised P&L.</p>
              <ul className={styles.featureList}>
                <li>Stock, Currency &amp; Commodity F&O positions</li>
                <li>Mark-to-market record keeping</li>
                <li>Realised and Unrealised P&L tracking</li>
              </ul>
            </div>
            <div className={styles.isometricMock}>
              <div className={`${styles.isoLayer} ${styles.baseLayer}`}></div>
              <div className={`${styles.isoLayer} ${styles.gridLayer} ${styles.cyanTint}`}>
                <div className={styles.miniGrid}>
                  <span></span><span></span><span></span>
                  <span></span><span></span><span></span>
                </div>
              </div>
              <div className={`${styles.isoLayer} ${styles.floatLayer} ${styles.cyanFloat}`}>
                <div className={styles.miniPnl}>
                  <span className={styles.pnlUp}>+2.4%</span>
                </div>
              </div>
            </div>
          </section>

          {/* ── 7. Client Access ── */}
          <section className={styles.featureRow} id="client-access">
            <div className={styles.featureInfo}>
              <h3>Client Logins &amp; White-Label</h3>
              <p>Wealth professionals can provide dedicated MProfit logins to each client. Enable self-service portfolio tracking with your own branding across web and mobile apps.</p>
              <ul className={styles.featureList}>
                <li>Dedicated MProfit logins for each client</li>
                <li>Custom logo branding in client reports</li>
                <li>Bulk import with sub-broker RTA files</li>
              </ul>
            </div>
            <div className={styles.isometricMock}>
              <div className={`${styles.isoLayer} ${styles.baseLayer}`}></div>
              <div className={`${styles.isoLayer} ${styles.gridLayer} ${styles.indigoTint}`}>
                <div className={styles.miniUsers}>
                  <span>👤</span><span>👤</span><span>👤</span>
                </div>
              </div>
              <div className={`${styles.isoLayer} ${styles.floatLayer} ${styles.indigoFloat}`}>
                <div className={styles.miniBrand}></div>
              </div>
            </div>
          </section>

        </div>

        {/* ── Sticky TOC ── */}
        <aside className={styles.toc}>
          <nav className={styles.tocNav}>
            <h4 className={styles.tocTitle}>Contents</h4>
            <ul className={styles.tocList}>
              <li><a href="#multi-asset">Portfolio Tracking</a></li>
              <li><a href="#auto-import">Auto Import</a></li>
              <li><a href="#tax-reporting">Tax Reports</a></li>
              <li><a href="#live-tracking">Live Valuations</a></li>
              <li><a href="#analytics">Analytics</a></li>
              <li><a href="#fo-management">F&O Management</a></li>
              <li><a href="#client-access">Client Access</a></li>
            </ul>
          </nav>
        </aside>
      </div>

      {/* Bottom CTA */}
      <div className={styles.bottomCta}>
        <h2>Ready to take control of your portfolio?</h2>
        <p>Join thousands of investors and advisors who trust MProfit.</p>
        <div className={styles.bottomActions}>
          <Link href="/signup" className={styles.bottomPrimary}>Get Started Free</Link>
          <Link href="/pricing" className={styles.bottomSecondary}>Compare Plans →</Link>
        </div>
      </div>

      <div className={styles.bgGlow}></div>
    </div>
  );
}
