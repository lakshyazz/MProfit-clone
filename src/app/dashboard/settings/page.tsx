import styles from './page.module.css';
import SaveChangesButton from './SaveChangesButton';
import ThemeToggle from './ThemeToggle';
import BillingButton from './BillingButton';
import UpdatePasswordButton from './UpdatePasswordButton';
import Enable2FAButton from './Enable2FAButton';

export const metadata = {
  title: 'Settings & Profile | MProfit Next-Gen',
};

export default function SettingsPage() {
  return (
    <div className={styles.settingsView}>
      <header className={styles.viewHeader}>
        <div>
          <h1 className={styles.pageTitle}>Settings & Preferences</h1>
          <p className={styles.pageSubtitle}>Manage your profile, security, and application preferences.</p>
        </div>
        <div className={styles.headerActions}>
          <SaveChangesButton />
        </div>
      </header>

      <div className={styles.settingsGrid}>
        
        {/* Left Column */}
        <div className={styles.leftCol}>
          {/* Profile Card */}
          <section className={`glass-panel ${styles.settingsCard}`}>
            <h3 className={styles.cardTitle}>Personal Information</h3>
            <div className={styles.formGrid}>
              <div className={styles.inputGroup}>
                <label>Full Name</label>
                <input type="text" defaultValue="John Doe" className={styles.inputField} />
              </div>
              <div className={styles.inputGroup}>
                <label>Email Address</label>
                <input type="email" defaultValue="john.doe@example.com" className={styles.inputField} />
              </div>
              <div className={styles.inputGroup}>
                <label>Phone Number</label>
                <input type="tel" defaultValue="+91 98765 43210" className={styles.inputField} />
              </div>
              <div className={styles.inputGroup}>
                <label>PAN Number</label>
                <input type="text" defaultValue="ABCDE1234F" className={styles.inputField} />
              </div>
            </div>
          </section>

          {/* Preferences Card */}
          <section className={`glass-panel ${styles.settingsCard}`}>
            <h3 className={styles.cardTitle}>Application Preferences</h3>
            <div className={styles.prefList}>
              <div className={styles.prefItem}>
                <div className={styles.prefInfo}>
                  <div className={styles.prefName}>Default Currency</div>
                  <div className={styles.prefDesc}>Currency used for all portfolio valuations.</div>
                </div>
                <select className={styles.selectField} defaultValue="INR">
                  <option value="INR">₹ INR (Indian Rupee)</option>
                  <option value="USD">$ USD (US Dollar)</option>
                  <option value="EUR">€ EUR (Euro)</option>
                </select>
              </div>
              
              <div className={styles.prefItem}>
                <div className={styles.prefInfo}>
                  <div className={styles.prefName}>Theme</div>
                  <div className={styles.prefDesc}>Choose the appearance of MProfit.</div>
                </div>
                <ThemeToggle />
              </div>
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className={styles.rightCol}>
          {/* Billing Card */}
          <section className={`glass-panel ${styles.settingsCard} ${styles.highlightCard}`}>
            <h3 className={styles.cardTitle}>Subscription Plan</h3>
            <div className={styles.planBadge}>Standard Plan</div>
            <p className={styles.planDesc}>Free tier. Access portfolio tracking, insights, and basic reports.</p>
            <div className={styles.planDetails}>
              <div>Next Billing: <strong>14-Aug-2024</strong></div>
              <div>Amount: <strong>₹ 3,500/year</strong></div>
            </div>
            <BillingButton />
          </section>

          {/* Security Card */}
          <section className={`glass-panel ${styles.settingsCard}`}>
            <h3 className={styles.cardTitle}>Security</h3>
            <div className={styles.securityList}>
              <div className={styles.prefItem}>
                <div className={styles.prefInfo}>
                  <div className={styles.prefName}>Change Password</div>
                  <div className={styles.prefDesc}>Update your account password.</div>
                </div>
                <UpdatePasswordButton />
              </div>
              <div className={styles.prefItem}>
                <div className={styles.prefInfo}>
                  <div className={styles.prefName}>Two-Factor Auth (2FA)</div>
                  <div className={styles.prefDesc}>Secure your account with an OTP layer.</div>
                </div>
                <Enable2FAButton />
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
