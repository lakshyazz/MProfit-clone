'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import styles from './Sidebar.module.css';
import AddPortfolioModal from './AddPortfolioModal';

export default function Sidebar() {
  const pathname = usePathname();
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);
  const [portfolios, setPortfolios] = useState([
    'Family Consolidated',
    'Rahul (Self)',
    'Anjali (Spouse)'
  ]);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <Link href="/">
          <span className={styles.brandName}>MProfit</span>
          <span className={styles.betaTag}>PRO</span>
        </Link>
      </div>

      <div className={styles.portfolioSelector}>
        <div className={styles.selectorLabel}>ACTIVE PORTFOLIO</div>
        <select className={styles.select}>
          {portfolios.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>

      <nav className={styles.navMenu}>
        <div className={styles.navSection}>
          <h4 className={styles.navTitle}>VIEWS</h4>
          <Link href="/dashboard" className={`${styles.navItem} ${pathname === '/dashboard' ? styles.active : ''}`}>
            Today
          </Link>
          <Link href="/dashboard/holdings" className={`${styles.navItem} ${pathname === '/dashboard/holdings' ? styles.active : ''}`}>
             Holdings
          </Link>
          <Link href="/dashboard/performance" className={`${styles.navItem} ${pathname === '/dashboard/performance' ? styles.active : ''}`}>
             Performance
          </Link>
        </div>

        <div className={styles.navSection}>
          <h4 className={styles.navTitle}>REPORTS & TAX</h4>
          <Link href="/dashboard/reports/capital-gains" className={styles.navItem}>
             Capital Gains
          </Link>
          <Link href="/dashboard/tax-harvesting" className={`${styles.navItem} ${pathname === '/dashboard/tax-harvesting' ? styles.active : ''}`}>
             Tax Optimizer
          </Link>
          <Link href="/dashboard/reports/xirr" className={styles.navItem}>
             XIRR Report
          </Link>
        </div>
      </nav>

      <div className={styles.sidebarFooter}>
        <div className={styles.navSection}>
          <button className={styles.addPortfolioBtn} onClick={() => setIsPortfolioModalOpen(true)}>
             + Add Portfolio
          </button>
          <Link href="/dashboard/accountant" className={`${styles.navItem} ${pathname === '/dashboard/accountant' ? styles.active : ''}`}>
             Accountant Portal
          </Link>
          <Link href="/dashboard/settings" className={`${styles.navItem} ${pathname === '/dashboard/settings' ? styles.active : ''}`}>
             Settings
          </Link>
          <Link href="/dashboard" className={styles.navItem}>
             Help & Support
          </Link>
        </div>
        <Link href="/dashboard/import" className={styles.importBtn}>
          Data Import Center
        </Link>
      </div>
      <AddPortfolioModal 
        isOpen={isPortfolioModalOpen} 
        onClose={() => setIsPortfolioModalOpen(false)} 
        onAdd={(name) => setPortfolios(prev => [...prev, name])}
      />
    </aside>
  );
}
