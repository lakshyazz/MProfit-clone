'use client';

import AllocationChart from '@/components/dashboard/AllocationChart';
import HoldingsTable from '@/components/dashboard/HoldingsTable';
import styles from './page.module.css';
import { Suspense, useState } from 'react';
import { useUserState } from '@/hooks/useUserState';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import CountUp from 'react-countup';

import AddAssetButton from '@/components/dashboard/AddAssetButton';
import { useHoldings } from '@/context/HoldingsContext';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
};

function DashboardContent() {
  const { isNewUser, mounted } = useUserState();
  const { holdings } = useHoldings();
  const [filterCategory, setFilterCategory] = useState<string | null>(null);

  if (!mounted) return null;

  const totalInvested = holdings.reduce((sum, h) => sum + h.invested, 0);
  const totalCurrent = holdings.reduce((sum, h) => sum + h.current, 0);
  const totalGain = totalCurrent - totalInvested;
  const gainPct = totalInvested > 0 ? (totalGain / totalInvested * 100).toFixed(1) : 0;
  
  // Fake overall XIRR logic based on gain since real XIRR requires cash flow dates
  const overallXirr = (Number(gainPct) * 0.45).toFixed(1);

  // Dynamic widths for benchmark bars
  const maxBenchmark = Math.max(Number(overallXirr), 17.3, 16.8) * 1.2; // 20% headroom
  const portfolioWidth = Math.min((Number(overallXirr) / maxBenchmark) * 100, 100) + '%';
  const niftyWidth = (17.3 / maxBenchmark) * 100 + '%';
  const sensexWidth = (16.8 / maxBenchmark) * 100 + '%';

  const formatNum = (val: number) => new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(val);

  if (isNewUser) {
    return (
      <div className={styles.todayView}>
        <header className={styles.viewHeader}>
          <div>
            <h1 className={styles.pageTitle}>Welcome to MProfit</h1>
            <p className={styles.pageSubtitle}>Let&apos;s set up your portfolio to get started.</p>
          </div>
        </header>

        {/* Empty State Banner */}
        <div className={`glass-panel ${styles.emptyStateBanner}`}>
          <h2>Your Dashboard is Empty</h2>
          <p>You haven&apos;t added any assets yet. Import your portfolio or add an asset manually to see your net worth and insights here.</p>
          <div className={styles.emptyStateActions}>
            <Link href="/dashboard/import" className={styles.primaryBtn}>Import Portfolio</Link>
            <AddAssetButton className={styles.secondaryBtn} text="Add Asset Manually" />
          </div>
        </div>

        {/* Empty Metrics Grid */}
        <div className={styles.metricsGrid}>
          <div className={`glass-panel ${styles.metricCard} ${styles.dimmed}`}>
            <div className={styles.metricLabel}>Total Net Worth</div>
            <div className={styles.metricValue}>₹ 0</div>
            <div className={styles.metricMeta}>
              -
            </div>
          </div>
          <div className={`glass-panel ${styles.metricCard} ${styles.dimmed}`}>
            <div className={styles.metricLabel}>Total Invested</div>
            <div className={styles.metricValue}>₹ 0</div>
            <div className={styles.metricMeta}>
              Across 0 assets
            </div>
          </div>
          <div className={`glass-panel ${styles.metricCard} ${styles.dimmed}`}>
            <div className={styles.metricLabel}>Overall XIRR</div>
            <div className={styles.metricValue}>0.0%</div>
            <div className={styles.metricMeta}>
              -
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If user clears holdings completely manually via "Sell Asset" but not in new user mode
  const isActuallyEmpty = holdings.length === 0;

  // Existing Populated Dashboard
  return (
    <motion.div 
      className={styles.todayView}
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.header className={styles.viewHeader} variants={itemVariants}>
        <div>
          <h1 className={styles.pageTitle}>Today&apos;s Overview</h1>
          <p className={styles.pageSubtitle}>As of {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })} · Market Open</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.syncBtn} onClick={() => alert("Data synced successfully with brokers!")}>⟳ Sync Data</button>
        </div>
      </motion.header>

      {/* Top Metrics Row */}
      <motion.div className={styles.metricsGrid} variants={itemVariants}>
        <div className={`glass-panel ${styles.metricCard}`}>
          <div className={styles.metricLabel}>Total Net Worth</div>
          <div className={styles.metricValue}>
            ₹ <CountUp end={totalCurrent} duration={1.5} separator="," />
          </div>
          <div className={`${styles.metricChange} ${totalGain >= 0 ? styles.positive : styles.negative}`}>
            {totalGain >= 0 ? '+' : ''}₹ {formatNum(totalGain)} ({Math.abs(Number(gainPct))}%) All-Time
          </div>
        </div>
        <div className={`glass-panel ${styles.metricCard}`}>
          <div className={styles.metricLabel}>Total Invested</div>
          <div className={styles.metricValue}>
            ₹ <CountUp end={totalInvested} duration={1.5} separator="," />
          </div>
          <div className={styles.metricMeta}>
            Across {holdings.length} assets
          </div>
        </div>
        <div className={`glass-panel ${styles.metricCard}`}>
          <div className={styles.metricLabel}>Overall XIRR</div>
          <div className={styles.metricValue}>
            <CountUp end={Number(overallXirr)} duration={1.5} decimals={1} />%
          </div>
          <div className={`${styles.metricChange} ${Number(overallXirr) >= 17.3 ? styles.positive : styles.negative}`}>
            {Number(overallXirr) >= 17.3 ? '+' : ''}{(Number(overallXirr) - 17.3).toFixed(1)}% vs Nifty 50
          </div>
        </div>
      </motion.div>

      {/* Middle Row: Charts & Benchmarks */}
      <motion.div className={styles.chartsRow} variants={itemVariants}>
        <div className={styles.allocationCol}>
          <AllocationChart onCategoryClick={setFilterCategory} activeCategory={filterCategory} />
        </div>
        
        <div className={styles.benchmarkCol}>
          <div className={`glass-panel ${styles.benchmarkCard}`}>
            <h3 className={styles.chartTitle}>Benchmark Comparison</h3>
            <div className={styles.benchmarkVisual}>
              <div className={styles.benchBar}>
                <div className={styles.benchLabel}>Your Portfolio</div>
                <div className={styles.benchTrack}>
                  <motion.div 
                    className={styles.benchFill} 
                    style={{ background: 'var(--color-emerald-bright)' }}
                    initial={{ width: 0 }}
                    animate={{ width: portfolioWidth }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
                <div className={styles.benchValue}>{overallXirr}%</div>
              </div>
              <div className={styles.benchBar}>
                <div className={styles.benchLabel}>Nifty 50 (TRI)</div>
                <div className={styles.benchTrack}>
                  <motion.div 
                    className={styles.benchFill} 
                    style={{ background: '#3B82F6' }}
                    initial={{ width: 0 }}
                    animate={{ width: niftyWidth }}
                    transition={{ duration: 1, delay: 0.6 }}
                  />
                </div>
                <div className={styles.benchValue}>17.3%</div>
              </div>
              <div className={styles.benchBar}>
                <div className={styles.benchLabel}>Sensex</div>
                <div className={styles.benchTrack}>
                  <motion.div 
                    className={styles.benchFill} 
                    style={{ background: '#F59E0B' }}
                    initial={{ width: 0 }}
                    animate={{ width: sensexWidth }}
                    transition={{ duration: 1, delay: 0.7 }}
                  />
                </div>
                <div className={styles.benchValue}>16.8%</div>
              </div>
            </div>
            {holdings.length > 0 && (
              <p className={styles.benchmarkNote}>
                Your consolidated family portfolio has {Number(overallXirr) > 17.3 ? 'consistently beaten' : 'trailed'} the Nifty 50 TRI benchmark by {Math.abs(Number((Number(overallXirr) - 17.3).toFixed(1)))}%.
              </p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Bottom Row: Holdings */}
      <motion.div className={styles.holdingsRow} variants={itemVariants}>
        <HoldingsTable filterCategory={filterCategory} />
      </motion.div>

    </motion.div>
  );
}

export default function DashboardToday() {
  return (
    <Suspense fallback={<div>Loading dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
