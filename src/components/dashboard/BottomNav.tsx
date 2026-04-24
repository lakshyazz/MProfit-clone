'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './BottomNav.module.css';

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className={styles.bottomNav}>
      <Link href="/dashboard" className={`${styles.navItem} ${pathname === '/dashboard' ? styles.active : ''}`}>
        <span className={styles.icon}>📊</span>
        <span className={styles.label}>Today</span>
      </Link>
      <Link href="/dashboard/holdings" className={`${styles.navItem} ${pathname === '/dashboard/holdings' ? styles.active : ''}`}>
        <span className={styles.icon}>💼</span>
        <span className={styles.label}>Holdings</span>
      </Link>
      <Link href="/dashboard/transactions" className={`${styles.navItem} ${pathname === '/dashboard/transactions' ? styles.active : ''}`}>
        <span className={styles.icon}>📋</span>
        <span className={styles.label}>Txns</span>
      </Link>
      <Link href="/dashboard/settings" className={`${styles.navItem} ${pathname === '/dashboard/settings' ? styles.active : ''}`}>
        <span className={styles.icon}>⚙️</span>
        <span className={styles.label}>Settings</span>
      </Link>
    </nav>
  );
}
