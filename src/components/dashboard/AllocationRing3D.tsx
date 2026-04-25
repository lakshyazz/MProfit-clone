'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface AllocationRing3DProps {
  segments: { name: string; pct: number; colorStart: string; colorEnd: string }[];
  totalStr: string;
  onCategoryClick?: (cat: string | null) => void;
  activeCategory?: string | null;
}

export default function AllocationRing3D({ segments, totalStr, onCategoryClick, activeCategory }: AllocationRing3DProps) {
  const size = 260;
  const strokeWidth = 32;
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const ringSegments = useMemo(() => {
    let currentOffset = 0;

    return segments.map((item, i) => {
      const dash = (item.pct / 100) * circumference;
      const offsetDeg = (currentOffset / circumference) * 360;
      currentOffset += dash;
      return { ...item, dash, offsetDeg, gradId: `grad-ring-${i}` };
    });
  }, [segments, circumference]);

  return (
    <div style={{ 
      height: '300px', 
      width: '100%', 
      position: 'relative', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center' 
    }}>
      <svg 
        width={size} 
        height={size} 
        viewBox={`0 0 ${size} ${size}`} 
        style={{ transform: 'rotate(-90deg)', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))' }}
      >
        <defs>
          {ringSegments.map((seg) => (
            <linearGradient key={seg.gradId} id={seg.gradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={seg.colorStart} />
              <stop offset="100%" stopColor={seg.colorEnd} />
            </linearGradient>
          ))}
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Background track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="rgba(0,0,0,0.03)"
          strokeWidth={strokeWidth}
        />

        {/* Segments */}
        {ringSegments.map((seg, i) => (
          <motion.circle
            key={seg.name}
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={`url(#${seg.gradId})`}
            strokeWidth={seg.name === activeCategory ? strokeWidth + 4 : strokeWidth}
            initial={{ strokeDasharray: `0 ${circumference}`, rotate: seg.offsetDeg }}
            animate={{ 
              strokeDasharray: `${seg.dash} ${circumference}`,
              opacity: activeCategory && activeCategory !== seg.name ? 0.3 : 1,
              scale: seg.name === activeCategory ? 1.02 : 1,
              rotate: seg.offsetDeg
            }}
            transition={{ duration: 1.5, ease: "easeOut", delay: i * 0.1 }}
            style={{ 
              cursor: 'pointer', 
              transition: 'stroke-width 0.3s, opacity 0.3s',
              transformOrigin: 'center'
            }}
            onClick={() => onCategoryClick && onCategoryClick(activeCategory === seg.name ? null : seg.name)}
          />
        ))}
      </svg>
      
      {/* Absolute positioned HTML overlay for the center text */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center',
        pointerEvents: 'none'
      }}>
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            fontSize: '1.5rem',
            fontWeight: 800,
            color: 'var(--color-text-primary)',
            letterSpacing: '-0.02em'
          }}
        >
          {totalStr}
        </motion.div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          style={{
            fontSize: '0.85rem',
            color: 'var(--color-text-secondary)',
            marginTop: '4px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}
        >
          Total Assets
        </motion.div>
      </div>
    </div>
  );
}
