'use client';

import styles from './page.module.css';
import Link from 'next/link';
import Feature3D from '@/components/features/Feature3D';
import { motion, Variants } from 'framer-motion';

export default function Features() {
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className={styles.container}>
      <motion.header 
        className={styles.header}
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.h1 className={styles.title} variants={fadeUp}>
          Powerful Features for <br />
          <span className="text-gradient">Every Investor</span>
        </motion.h1>
        <motion.p className={styles.subtitle} variants={fadeUp}>
          India&apos;s most comprehensive portfolio tracker — from individual portfolios to family offices, MProfit scales with your wealth.
        </motion.p>
      </motion.header>
      
      <div className={styles.content}>
        <div className={styles.mainFeatures}>
 
           {/* ── 1. Multi-Asset Tracking ── */}
           <motion.section 
             className={styles.featureRow} 
             id="multi-asset"
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, margin: "-100px" }}
             variants={fadeUp}
           >
             <div className={styles.featureInfo}>
               <div className={styles.glowingBadge}>Unified</div>
               <h3>Multi-Asset Portfolio Tracking</h3>
               <p>Consolidate your Stocks, Mutual Funds, F&O, Bonds, FDs, NPS, PMS, AIF, Gold, Real Estate and 15+ other asset classes in a single, unified dashboard. Track Absolute Gain and XIRR for every holding.</p>
               <ul className={styles.featureList}>
                 <li>Unified view across Equity, Debt, Commodities &amp; Real Estate</li>
                 <li>Create portfolio groups for family-wise consolidated views</li>
                 <li>Individual, advisor &amp; family office portfolio modes</li>
               </ul>
             </div>
             <div className={styles.featureVisual}>
               <Feature3D type="portfolio" />
             </div>
           </motion.section>
          
          {/* ── 2. Auto Import ── */}
          <motion.section 
            className={`${styles.featureRow} ${styles.reverse}`} 
            id="auto-import"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <div className={styles.featureInfo}>
              <div className={styles.glowingBadge}>Automation</div>
              <h3>Auto-Import from 700+ Brokers</h3>
              <p>Eliminate manual data entry. Directly import contract notes, Mutual Fund CAS statements from CAMSOnline or NSDL, and eNPS statements. Supports PDF, Excel, HTML, CSV, TXT &amp; DBF formats.</p>
              <ul className={styles.featureList}>
                <li>Import Stocks &amp; F&O contract notes from 700+ brokers</li>
                <li>Import Mutual Fund CAS from CAMSOnline or NSDL</li>
                <li>Advisors: Import RTA files from CAMS, Karvy &amp; Franklin</li>
              </ul>
            </div>
            <div className={styles.featureVisual}>
              <Feature3D type="import" reverse={true} />
            </div>
          </motion.section>
          
          {/* ── 3. Tax Reporting ── */}
          <motion.section 
            className={styles.featureRow} 
            id="tax-reporting"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <div className={styles.featureInfo}>
              <div className={styles.glowingBadge}>Compliance</div>
              <h3>ITR-Ready Capital Gains Reports</h3>
              <p>Generate CA-ready tax reports matching Indian Income Tax Return schedules. Long-term, short-term, and intra-day capital gains — auto-calculated with LTCG Grandfathering and Indexation provisions.</p>
              <ul className={styles.featureList}>
                <li>Capital Gain reports in Income Tax Return (ITR) format</li>
                <li>Compatible with ClearTax, Winman, CompuTax &amp; more</li>
                <li>Unrealised capital gains for tax-loss harvesting decisions</li>
              </ul>
            </div>
            <div className={styles.featureVisual}>
              <Feature3D type="tax" />
            </div>
          </motion.section>
          
          {/* ── 4. Live Tracking ── */}
          <motion.section 
            className={`${styles.featureRow} ${styles.reverse}`} 
            id="live-tracking"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <div className={styles.featureInfo}>
              <div className={styles.glowingBadge}>Real-time</div>
              <h3>Live Valuations &amp; Corporate Actions</h3>
              <p>Live price feeds for Stocks &amp; ETFs (15-min delay), daily NAV updates for Mutual Funds, and automatic corporate action adjustments — dividends, bonuses, splits, mergers, and demergers.</p>
              <ul className={styles.featureList}>
                <li>Live stock prices updated during market hours</li>
                <li>Daily NAV updates for Mutual Funds &amp; Listed Bonds</li>
                <li>Auto-adjusted corporate actions (bonus, split, merger)</li>
              </ul>
            </div>
            <div className={styles.featureVisual}>
              <Feature3D type="live" reverse={true} />
            </div>
          </motion.section>

          {/* ── 5. Analytics ── */}
          <motion.section 
            className={styles.featureRow} 
            id="analytics"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <div className={styles.featureInfo}>
              <div className={styles.glowingBadge}>Insights</div>
              <h3>Deep Analytics &amp; Performance</h3>
              <p>XIRR returns at asset, class, and portfolio level. Multi-level asset allocation breakdowns. Income, Due Dates, Holding Period &amp; Transaction reports. Advanced AUM insights for advisors.</p>
              <ul className={styles.featureList}>
                <li>Annualised Return (XIRR) across all levels</li>
                <li>Multi-level asset allocation visualizations</li>
                <li>Comprehensive reporting suite for every need</li>
              </ul>
            </div>
            <div className={styles.featureVisual}>
              <Feature3D type="analytics" />
            </div>
          </motion.section>

          {/* ── 6. Client Access ── */}
          <motion.section 
            className={`${styles.featureRow} ${styles.reverse}`} 
            id="client-access"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <div className={styles.featureInfo}>
              <div className={styles.glowingBadge}>Professional</div>
              <h3>Client Logins &amp; White-Label</h3>
              <p>Wealth professionals can provide dedicated MProfit logins to each client. Enable self-service portfolio tracking with your own branding across web and mobile apps.</p>
              <ul className={styles.featureList}>
                <li>Dedicated MProfit logins for each client</li>
                <li>Custom logo branding in client reports</li>
                <li>Bulk import with sub-broker RTA files</li>
              </ul>
            </div>
            <div className={styles.featureVisual}>
              <Feature3D type="client" reverse={true} />
            </div>
          </motion.section>

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
              <li><a href="#client-access">Client Access</a></li>
            </ul>
          </nav>
        </aside>
      </div>

      {/* Bottom CTA */}
      <motion.div 
        className={styles.bottomCta}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <div className={styles.ctaGlow}></div>
        <h2>Ready to take control of your portfolio?</h2>
        <p>Join thousands of investors and advisors who trust MProfit.</p>
        <div className={styles.bottomActions}>
          <Link href="/dashboard" className={styles.bottomPrimary}>Get Started Free</Link>
          <Link href="/pricing" className={styles.bottomSecondary}>Compare Plans →</Link>
        </div>
      </motion.div>

      <div className={styles.bgGlow}></div>
    </div>
  );
}
