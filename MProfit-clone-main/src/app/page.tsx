'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.announcement}>
        <span className={styles.badge}>NEW</span>
        <p>Introducing the complete wealth dashboard. <a href="#" className={styles.announceLink}>Learn more →</a></p>
      </div>

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Unify your wealth in <br />
            <span className="text-gradient">one dashboard.</span>
          </h1>
          <p className={styles.heroSubtitle}>
            The premium minimalist platform for individuals, HNIs, and wealth professionals to track stocks, mutual funds, real estate, and more in real-time.
          </p>
          <div className={styles.ctaGroup}>
            <Link href="/signup" className={styles.primaryCta} style={{ textDecoration: 'none' }}>Start Tracking Free</Link>
            <Link href="/dashboard" className={styles.secondaryCta} style={{ textDecoration: 'none' }}>View Demo</Link>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <div 
            className={styles.dashboardMockup}
            style={{
              transform: `perspective(1000px) rotateY(${mousePos.x * 12}deg) rotateX(${-mousePos.y * 12}deg)`
            }}
          >
            <div className={styles.mockupHeader}>
              <div className={styles.mockupTitle}>Total Net Worth</div>
              <div className={styles.mockupValue}>₹ 1,42,85,930 <span className={styles.positiveChange}>+2.4% Today</span></div>
            </div>
            <div className={styles.mockupChart}>
              <svg viewBox="0 0 400 100" className={styles.chartSvg}>
                <path d="M0,80 Q40,40 80,60 T160,30 T240,50 T320,10 T400,20 L400,100 L0,100 Z" fill="url(#chartGradient)" />
                <path d="M0,80 Q40,40 80,60 T160,30 T240,50 T320,10 T400,20" fill="none" stroke="var(--color-emerald-bright)" strokeWidth="3" />
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-emerald-glow)" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className={styles.mockupAssets}>
              <div className={styles.assetCard}>
                <div className={styles.assetIcon} style={{ background: '#111827' }}></div>
                <div className={styles.assetInfo}>
                  <div className={styles.assetName}>Stocks</div>
                  <div className={styles.assetAmount}>₹ 45,20,000</div>
                </div>
              </div>
              <div className={styles.assetCard}>
                <div className={styles.assetIcon} style={{ background: '#374151' }}></div>
                <div className={styles.assetInfo}>
                  <div className={styles.assetName}>Mutual Funds</div>
                  <div className={styles.assetAmount}>₹ 32,15,400</div>
                </div>
              </div>
              <div className={styles.assetCard}>
                <div className={styles.assetIcon} style={{ background: '#6B7280' }}></div>
                <div className={styles.assetInfo}>
                  <div className={styles.assetName}>Real Estate</div>
                  <div className={styles.assetAmount}>₹ 65,50,530</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className={styles.floatingBlur1}></div>
          <div className={styles.floatingBlur2}></div>
        </div>
      </section>

      <section className={styles.socialProof}>
        <p className={styles.socialTitle}>TRUSTED BY OVER 100,000 INVESTORS AND ADVISORS</p>
        <div className={styles.marqueeContainer}>
          <div className={styles.marquee}>
            <div className={styles.marqueeItem}>Zerodha</div>
            <div className={styles.marqueeItem}>HDFC Bank</div>
            <div className={styles.marqueeItem}>Groww</div>
            <div className={styles.marqueeItem}>ICICI Direct</div>
            <div className={styles.marqueeItem}>Angel One</div>
            <div className={styles.marqueeItem}>Upstox</div>
            <div className={styles.marqueeItem}>Motilal Oswal</div>
            {/* Duplicate for seamless infinite scroll */}
            <div className={styles.marqueeItem}>Zerodha</div>
            <div className={styles.marqueeItem}>HDFC Bank</div>
            <div className={styles.marqueeItem}>Groww</div>
            <div className={styles.marqueeItem}>ICICI Direct</div>
            <div className={styles.marqueeItem}>Angel One</div>
            <div className={styles.marqueeItem}>Upstox</div>
            <div className={styles.marqueeItem}>Motilal Oswal</div>
          </div>
        </div>
      </section>

      {/* NEW SECTION: Features */}
      <section className={styles.featuresSection}>
        <div className={styles.sectionHeader}>
          <h2>Everything you need. Nothing you don&apos;t.</h2>
          <p>MProfit simplifies complex wealth management into a single, elegant interface.</p>
        </div>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>⚡</div>
            <h3>Smart Data Importer</h3>
            <p>Automatically sync trades and transactions from 100+ brokers and banks without manual entry.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🏛️</div>
            <h3>Family Office Console</h3>
            <p>Manage multiple family members, entities, and portfolios from a unified command center.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📉</div>
            <h3>Tax-Loss Harvesting</h3>
            <p>Intelligently offset capital gains and minimize your tax liabilities with automated suggestions.</p>
          </div>
        </div>
      </section>

      {/* NEW SECTION: Why Us / Benefits */}
      <section className={styles.benefitsSection}>
        <div className={styles.benefitsContent}>
          <h2>Clarity over complexity.</h2>
          <p>We designed MProfit to get out of your way. Experience financial tracking that feels as smooth as reading a premium magazine. No clutter, just your data beautifully presented.</p>
          <ul className={styles.benefitsList}>
            <li>Bank-grade 256-bit encryption</li>
            <li>Real-time market data synchronization</li>
            <li>Export ready for your accountant</li>
          </ul>
        </div>
        <div className={styles.benefitsVisual}>
          <div className={styles.minimalistCard}>
            <div className={styles.cardRow}>
              <div className={styles.cardCircle}></div>
              <div className={styles.cardLine}></div>
            </div>
            <div className={styles.cardRow}>
              <div className={styles.cardCircle}></div>
              <div className={styles.cardLineLarge}></div>
            </div>
            <div className={styles.cardRow}>
              <div className={styles.cardCircle}></div>
              <div className={styles.cardLineMedium}></div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION: Bottom CTA */}
      <section className={styles.ctaSection}>
        <h2>Ready to master your wealth?</h2>
        <p>Join thousands of investors experiencing the minimal, powerful way to track their net worth.</p>
        <Link href="/signup" className={styles.primaryCta} style={{ textDecoration: 'none', display: 'inline-block' }}>Create Your Free Account</Link>
      </section>
    </main>
  );
}

