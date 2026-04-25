'use client';

import { useMemo } from 'react';
import styles from './AllocationChart.module.css';
import { useHoldings } from '@/context/HoldingsContext';
import AllocationRing3D from './AllocationRing3D';

interface AllocationChartProps {
  onCategoryClick?: (category: string | null) => void;
  activeCategory?: string | null;
}

const CLASS_COLORS: Record<string, { start: string; end: string }> = {
  'Stocks': { start: '#10B981', end: '#059669' },
  'Mutual Funds': { start: '#059669', end: '#047857' },
  'FD': { start: '#3B82F6', end: '#2563EB' },
  'PPF': { start: '#2563EB', end: '#1D4ED8' },
  'EPF': { start: '#1D4ED8', end: '#1E3A8A' },
  'NPS': { start: '#8B5CF6', end: '#6D28D9' },
  'Bonds': { start: '#6366F1', end: '#4338CA' },
  'Gold': { start: '#FACC15', end: '#CA8A04' },
  'Silver': { start: '#9CA3AF', end: '#4B5563' },
  'Real Estate': { start: '#F97316', end: '#C2410C' },
  'Cryptocurrencies': { start: '#F43F5E', end: '#BE123C' },
  'PMS': { start: '#EC4899', end: '#BE185D' },
  'AIF': { start: '#D946EF', end: '#A21CAF' },
  'REITs': { start: '#EAB308', end: '#A16207' },
  'InvITs': { start: '#06B6D4', end: '#0E7490' },
  'ULIPs': { start: '#14B8A6', end: '#0F766E' },
  'SGB': { start: '#F59E0B', end: '#B45309' },
  'Post Office Schemes': { start: '#0EA5E9', end: '#0369A1' },
  'Cash': { start: '#84CC16', end: '#4D7C0F' },
  'Bank Accounts': { start: '#22D3EE', end: '#0891B2' },
  'Other': { start: '#64748B', end: '#334155' }
};

export default function AllocationChart({ onCategoryClick, activeCategory }: AllocationChartProps) {
  const { holdings } = useHoldings();

  const { segments, totalStr } = useMemo(() => {
    let total = 0;
    const classTotals: Record<string, number> = {};

    holdings.forEach(h => {
      total += h.current;
      const c = h.class;
      classTotals[c] = (classTotals[c] || 0) + h.current;
    });

    let segs: { name: string, pct: number, colorStart: string, colorEnd: string, value: number }[] = [];
    
    for (const [c, val] of Object.entries(classTotals)) {
       const lowerC = c.toLowerCase();
       let matchedKey = 'Other';
       
       if (lowerC.includes('gold')) matchedKey = 'Gold';
       else if (lowerC.includes('equity') || lowerC.includes('stock')) matchedKey = 'Stocks';
       else if (lowerC.includes('mutual fund')) matchedKey = 'Mutual Funds';
       else if (lowerC.includes('fixed income') || lowerC.includes('bond')) matchedKey = 'Bonds';
       else if (lowerC.includes('fd') || lowerC.includes('deposit')) matchedKey = 'FD';
       else if (lowerC.includes('ppf')) matchedKey = 'PPF';
       else if (lowerC.includes('epf')) matchedKey = 'EPF';
       else if (lowerC.includes('nps')) matchedKey = 'NPS';
       else if (lowerC.includes('silver')) matchedKey = 'Silver';
       else if (lowerC.includes('real estate')) matchedKey = 'Real Estate';
       else if (lowerC.includes('crypto')) matchedKey = 'Cryptocurrencies';
       else if (lowerC.includes('pms')) matchedKey = 'PMS';
       else if (lowerC.includes('aif')) matchedKey = 'AIF';
       else if (lowerC.includes('reit')) matchedKey = 'REITs';
       else if (lowerC.includes('invit')) matchedKey = 'InvITs';
       else if (lowerC.includes('ulip') || lowerC.includes('insurance')) matchedKey = 'ULIPs';
       else if (lowerC.includes('sgb')) matchedKey = 'SGB';
       else if (lowerC.includes('post office')) matchedKey = 'Post Office Schemes';
       else if (lowerC.includes('cash')) matchedKey = 'Cash';
       else if (lowerC.includes('bank')) matchedKey = 'Bank Accounts';

       const colors = CLASS_COLORS[matchedKey] || CLASS_COLORS['Other'];
       
       segs.push({
           name: c, // Keep original name for display
           value: val,
           pct: 0,
           colorStart: colors.start,
           colorEnd: colors.end
       });
    }

    // Sort by largest allocation first
    segs.sort((a, b) => b.value - a.value);

    let sumPct = 0;
    segs.forEach((s) => {
        let p = total > 0 ? Math.round((s.value / total) * 100) : 0;
        s.pct = p;
        sumPct += p;
    });

    // Ensure it sums to exactly 100% to avoid gaps or overfills
    if (total > 0 && segs.length > 0) {
        let diff = 100 - sumPct;
        if (diff !== 0) {
            segs[0].pct += diff; 
        }
    }

    // Filter out segments that are 0% (or less than 0.5% rounded down)
    segs = segs.filter(s => s.pct > 0);

    let tStr = "₹ 0";
    if (total >= 10000000) {
      tStr = `₹ ${(total / 10000000).toFixed(2)} Cr`;
    } else if (total >= 100000) {
      tStr = `₹ ${(total / 100000).toFixed(2)} L`;
    } else if (total > 0) {
      tStr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(total);
    }

    return { segments: segs, totalStr: tStr };
  }, [holdings]);

  // Render using Framer Motion and 3D Ring
  return (
    <div className={`glass-panel ${styles.chartContainer}`}>
      <h3 className={styles.chartTitle}>True Asset Allocation</h3>
      
      <div className={styles.chartVisual}>
        <AllocationRing3D 
          segments={segments}
          totalStr={totalStr}
          onCategoryClick={onCategoryClick}
          activeCategory={activeCategory}
        />
      </div>

      <div className={styles.legendContainer} style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
        {segments.map((seg) => (
          <div 
            key={seg.name}
            className={`${styles.legendItem} ${activeCategory === seg.name ? styles.activeLegend : ''}`} 
            onClick={() => onCategoryClick && onCategoryClick(activeCategory === seg.name ? null : seg.name)}
            style={{ 
              cursor: onCategoryClick ? 'pointer' : 'default', 
              opacity: activeCategory && activeCategory !== seg.name ? 0.5 : 1,
              margin: '0.5rem'
            }}
          >
            <div className={styles.legendColor} style={{ background: seg.colorStart }}></div>
            <div className={styles.legendDetails}>
              <span className={styles.legendName}>{seg.name}</span>
              <span className={styles.legendValue}>{seg.pct}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
