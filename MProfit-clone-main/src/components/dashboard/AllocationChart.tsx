'use client';

import { useMemo } from 'react';
import styles from './AllocationChart.module.css';
import { useHoldings } from '@/context/HoldingsContext';

interface AllocationChartProps {
  onCategoryClick?: (category: string | null) => void;
  activeCategory?: string | null;
}

export default function AllocationChart({ onCategoryClick, activeCategory }: AllocationChartProps) {
  const { holdings } = useHoldings();

  const { equityPct, debtPct, goldPct, totalStr } = useMemo(() => {
    let equity = 0;
    let debt = 0;
    let goldAlts = 0;
    let total = 0;

    holdings.forEach(h => {
      total += h.current;
      const c = h.class.toLowerCase();
      if (c.includes('equity') || c.includes('mutual fund')) {
        equity += h.current;
      } else if (c.includes('fixed income') || c.includes('debt') || c.includes('fd') || c.includes('ppf')) {
        debt += h.current;
      } else {
        goldAlts += h.current;
      }
    });

    let eqP = total > 0 ? Math.round((equity / total) * 100) : 0;
    let dtP = total > 0 ? Math.round((debt / total) * 100) : 0;
    let gdP = total > 0 ? Math.round((goldAlts / total) * 100) : 0;
    
    // adjust largest component to ensure sum is exactly 100
    if (total > 0) {
        let diff = 100 - (eqP + dtP + gdP);
        if (diff !== 0) {
            if (eqP >= dtP && eqP >= gdP) eqP += diff;
            else if (dtP >= eqP && dtP >= gdP) dtP += diff;
            else gdP += diff;
        }
    }

    let tStr = "₹ 0";
    if (total >= 10000000) {
      tStr = `₹ ${(total / 10000000).toFixed(2)} Cr`;
    } else if (total >= 100000) {
      tStr = `₹ ${(total / 100000).toFixed(2)} L`;
    } else if (total > 0) {
      tStr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(total);
    }

    return { equityPct: eqP, debtPct: dtP, goldPct: gdP, totalStr: tStr };
  }, [holdings]);

  // CSS-driven pie chart leveraging conic-gradient
  return (
    <div className={`glass-panel ${styles.chartContainer}`}>
      <h3 className={styles.chartTitle}>True Asset Allocation</h3>
      
      <div className={styles.chartVisual}>
        <div 
          className={styles.pie} 
          style={{
            background: `conic-gradient(
              var(--color-emerald) 0% ${equityPct}%, 
              #3B82F6 ${equityPct}% ${equityPct + debtPct}%, 
              #F59E0B ${equityPct + debtPct}% 100%
            )`
          }}
        >
          <div className={styles.pieCenter}>
            <div className={styles.totalValue}>{totalStr}</div>
            <div className={styles.totalLabel}>Total Assets</div>
          </div>
        </div>
      </div>

      <div className={styles.legendContainer}>
        <div 
          className={`${styles.legendItem} ${activeCategory === 'Equity' ? styles.activeLegend : ''}`} 
          onClick={() => onCategoryClick && onCategoryClick(activeCategory === 'Equity' ? null : 'Equity')}
          style={{ cursor: onCategoryClick ? 'pointer' : 'default', opacity: activeCategory && activeCategory !== 'Equity' ? 0.5 : 1 }}
        >
          <div className={styles.legendColor} style={{ background: 'var(--color-emerald)' }}></div>
          <div className={styles.legendDetails}>
            <span className={styles.legendName}>Equity</span>
            <span className={styles.legendValue}>{equityPct}%</span>
          </div>
        </div>
        <div 
          className={`${styles.legendItem} ${activeCategory === 'Debt' ? styles.activeLegend : ''}`} 
          onClick={() => onCategoryClick && onCategoryClick(activeCategory === 'Debt' ? null : 'Debt')}
          style={{ cursor: onCategoryClick ? 'pointer' : 'default', opacity: activeCategory && activeCategory !== 'Debt' ? 0.5 : 1 }}
        >
          <div className={styles.legendColor} style={{ background: '#3B82F6' }}></div>
          <div className={styles.legendDetails}>
            <span className={styles.legendName}>Debt</span>
            <span className={styles.legendValue}>{debtPct}%</span>
          </div>
        </div>
        <div 
          className={`${styles.legendItem} ${activeCategory === 'Gold/Alts' ? styles.activeLegend : ''}`} 
          onClick={() => onCategoryClick && onCategoryClick(activeCategory === 'Gold/Alts' ? null : 'Gold/Alts')}
          style={{ cursor: onCategoryClick ? 'pointer' : 'default', opacity: activeCategory && activeCategory !== 'Gold/Alts' ? 0.5 : 1 }}
        >
          <div className={styles.legendColor} style={{ background: '#F59E0B' }}></div>
          <div className={styles.legendDetails}>
            <span className={styles.legendName}>Gold/Alts</span>
            <span className={styles.legendValue}>{goldPct}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
