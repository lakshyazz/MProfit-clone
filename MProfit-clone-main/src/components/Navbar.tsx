'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

export default function Navbar() {
  const pathname = usePathname();

  // Hide the global navbar on dashboard and auth pages
  if (
    pathname?.startsWith('/dashboard') ||
    pathname === '/login' ||
    pathname === '/signup'
  ) {
    return null;
  }

  return (
    <nav className={`glass-panel ${styles.navbar}`}>
      <div className={styles.logo}>
        <Link href="/">
          <span className={styles.brandName}>MProfit</span>
        </Link>
      </div>
      <div className={styles.navLinks}>
        <Link href="/features">Features</Link>
        <Link href="/integrations">Integrations</Link>
        <Link href="/pricing">Pricing</Link>
      </div>
      <div className={styles.navActions}>
        <Link href="/login" className={styles.loginBtn}>Log In</Link>
        <Link href="/signup" className={styles.signupBtn}>Sign Up</Link>
      </div>
    </nav>
  );
}

