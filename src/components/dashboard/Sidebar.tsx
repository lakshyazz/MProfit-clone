'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import styles from './Sidebar.module.css';
import AddPortfolioModal from './AddPortfolioModal';
import { useHoldings } from '@/context/HoldingsContext';

export default function Sidebar() {
  const pathname = usePathname();
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);
  const { portfolios, activePortfolio, setActivePortfolio, addPortfolio, removePortfolio } = useHoldings();
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <Link href="/">
          <span className={styles.brandName}>MProfit</span>
        </Link>
      </div>

      <div className={styles.portfolioSelector} ref={dropdownRef}>
        <div className={styles.selectorLabel}>ACTIVE PORTFOLIO</div>
        
        <div 
          className={styles.customSelectTrigger}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span>{activePortfolio}</span>
          <span className={styles.chevron}>{isDropdownOpen ? '▲' : '▼'}</span>
        </div>

        {isDropdownOpen && (
          <div className={styles.customDropdown}>
            <div className={styles.dropdownList}>
              {portfolios.map(p => (
                <div 
                  key={p} 
                  className={`${styles.dropdownItem} ${p === activePortfolio ? styles.activeDropdownItem : ''}`}
                  onClick={() => {
                    setActivePortfolio(p);
                    setIsDropdownOpen(false);
                  }}
                >
                  <span className={styles.dropdownItemName}>{p}</span>
                  {p !== 'Family Consolidated' && (
                    <button 
                      className={styles.deletePortfolioBtn}
                      onClick={(e) => {
                        e.stopPropagation(); // prevent selecting the item while deleting
                        removePortfolio(p);
                      }}
                      title="Delete Portfolio"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
            
            <div className={styles.dropdownFooter}>
              <button 
                className={styles.dropdownAddBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDropdownOpen(false);
                  setIsPortfolioModalOpen(true);
                }}
              >
                + Add Member / Portfolio
              </button>
            </div>
          </div>
        )}
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
        onAdd={(name) => addPortfolio(name)}
      />
    </aside>
  );
}
