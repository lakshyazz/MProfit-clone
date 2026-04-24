import Link from 'next/link';
import styles from './page.module.css';

export const metadata = {
  title: 'Pricing | MProfit Next-Gen',
  description: 'Transparent pricing for investors and wealth professionals. Track all your family portfolios in one place.',
};

export default function Pricing() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          Simple, <span className="text-gradient">transparent</span> pricing.
        </h1>
        <p className={styles.subtitle}>
          No hidden fees. Choose the plan that fits your wealth journey.
        </p>

        {/* CSS-driven toggle wrapper */}
        <div className={styles.toggleWrapper}>
          <input type="checkbox" id="pricing-toggle" className={styles.toggleInput} />
          <label htmlFor="pricing-toggle" className={styles.toggleLabel}>
            <span className={styles.toggleText}>Investors</span>
            <span className={styles.toggleText}>Professionals</span>
            <div className={styles.toggleSwitch}></div>
          </label>

          {/* Investors Pricing Cards */}
          <div className={`${styles.pricingGrid} ${styles.investorsPlans}`}>
            <div className={styles.priceCard}>
              <h3 className={styles.planName}>Free</h3>
              <div className={styles.planPrice}>
                <span className={styles.currency}>₹</span>0
                <span className={styles.period}>/forever</span>
              </div>
              <p className={styles.planDesc}>Perfect for individuals starting their investment journey.</p>
              <ul className={styles.featureList}>
                <li>Track up to ₹50 Lakhs portfolio</li>
                <li>Support for Stocks & Mutual Funds</li>
                <li>Basic capital gains reports</li>
                <li>1 Family portfolio</li>
              </ul>
              <Link href="/signup" className={styles.planBtn} style={{ textDecoration: 'none', display: 'block', textAlign: 'center' }}>Get Started</Link>
            </div>

            <div className={`${styles.priceCard} ${styles.popular}`}>
              <div className={styles.popularBadge}>Most Popular</div>
              <h3 className={styles.planName}>Pro</h3>
              <div className={styles.planPrice}>
                <span className={styles.currency}>₹</span>2,999
                <span className={styles.period}>/year</span>
              </div>
              <p className={styles.planDesc}>For active investors and HNIs managing diverse assets.</p>
              <ul className={styles.featureList}>
                <li>Unlimited portfolio tracking</li>
                <li>All asset classes (F&O, Bonds, RE)</li>
                <li>Advanced Tax & XIRR reports</li>
                <li>Up to 5 Family portfolios</li>
                <li>Priority email support</li>
              </ul>
              <Link href="/signup" className={styles.planBtnPopular} style={{ textDecoration: 'none', display: 'block', textAlign: 'center' }}>Start 14-Day Trial</Link>
            </div>
          </div>

          {/* Professionals Pricing Cards */}
          <div className={`${styles.pricingGrid} ${styles.proPlans}`}>
            <div className={styles.priceCard}>
              <h3 className={styles.planName}>Advisor</h3>
              <div className={styles.planPrice}>
                <span className={styles.currency}>₹</span>9,999
                <span className={styles.period}>/year</span>
              </div>
              <p className={styles.planDesc}>For RIAs and independent financial advisors.</p>
              <ul className={styles.featureList}>
                <li>Manage up to 100 Clients</li>
                <li>Client portal access</li>
                <li>Co-branded reports</li>
                <li>Model portfolios tracking</li>
                <li>Dedicated account manager</li>
              </ul>
              <button className={styles.planBtn}>Contact Sales</button>
            </div>

            <div className={`${styles.priceCard} ${styles.popular}`}>
              <h3 className={styles.planName}>Enterprise</h3>
              <div className={styles.planPrice}>
                <span className={styles.currency}>Custom</span>
              </div>
              <p className={styles.planDesc}>For large family offices and wealth management firms.</p>
              <ul className={styles.featureList}>
                <li>Unlimited Clients</li>
                <li>White-labeled solutions</li>
                <li>Custom API integrations</li>
                <li>Maker-checker workflows</li>
                <li>24/7 Phone support</li>
              </ul>
              <button className={styles.planBtnPopular}>Request Quote</button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
