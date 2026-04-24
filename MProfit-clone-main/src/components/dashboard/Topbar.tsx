'use client';
import { useState, useRef, useEffect } from 'react';
import styles from './Topbar.module.css';

import Link from 'next/link';

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    title: 'HDFC Bank FD Maturing',
    desc: 'Your Fixed Deposit of ₹5,00,000 matures in 7 days.',
    time: '2 hours ago',
    icon: '!',
    unread: true
  },
  {
    id: 2,
    title: 'Dividend Received',
    desc: 'TCS credited ₹12,500 to your linked ICICI Bank account.',
    time: 'Yesterday',
    icon: '+',
    unread: true
  },
  {
    id: 3,
    title: 'SIP Reminder',
    desc: 'Axis Midcap Direct SIP of ₹25,000 is due tomorrow.',
    time: 'Yesterday',
    icon: '›',
    unread: false
  }
];

export default function Topbar() {
  const [inboxOpen, setInboxOpen] = useState(false);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const inboxRef = useRef<HTMLDivElement>(null);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (inboxRef.current && !inboxRef.current.contains(event.target as Node)) {
        setInboxOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className={styles.topbar}>
      <div className={styles.searchBar}>
        <span className={styles.searchIcon}>○</span>
        <input 
          type="text" 
          placeholder="Search ISIN, Ticker, or Asset..." 
          className={styles.searchInput} 
        />
      </div>

      <div className={styles.actions}>
        <div className={styles.inboxWrapper} ref={inboxRef}>
          <div 
            className={styles.bellIcon} 
            onClick={() => setInboxOpen(!inboxOpen)}
          >
            Alerts
            {unreadCount > 0 && <span className={styles.badge}>{unreadCount}</span>}
          </div>

          {inboxOpen && (
            <div className={styles.inboxDropdown}>
              <div className={styles.inboxHeader}>
                <h3>Financial Inbox</h3>
                <button className={styles.markRead} onClick={markAllRead}>Mark all read</button>
              </div>
              <div className={styles.notificationsList}>
                {notifications.map(alert => (
                  <div key={alert.id} className={`${styles.alertItem} ${alert.unread ? styles.unread : ''}`}>
                    <div className={styles.alertIcon}>{alert.icon}</div>
                    <div className={styles.alertContent}>
                      <h4 className={styles.alertTitle}>{alert.title}</h4>
                      <p className={styles.alertDesc}>{alert.desc}</p>
                      <span className={styles.alertTime}>{alert.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/dashboard" className={styles.viewAll} style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>
                View All Alerts
              </Link>
            </div>
          )}
        </div>

        <Link href="/dashboard/settings" className={styles.profileCircle} style={{ textDecoration: 'none' }}>
          R
        </Link>
      </div>
    </header>
  );
}
