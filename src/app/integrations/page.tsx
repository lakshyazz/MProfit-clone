'use client';
import { useState } from 'react';
import styles from './page.module.css';

const integrations = [
  { name: 'Zerodha', category: 'Brokers', color: '#0088DD', icon: 'Z' },
  { name: 'Groww', category: 'Brokers', color: '#00D09C', icon: 'G' },
  { name: 'Upstox', category: 'Brokers', color: '#4B2A8C', icon: 'U' },
  { name: 'ICICI Direct', category: 'Brokers', color: '#F05230', icon: 'I' },
  { name: 'HDFC Securities', category: 'Brokers', color: '#004C8F', icon: 'H' },
  { name: 'Angel One', category: 'Brokers', color: '#FF6E00', icon: 'A' },
  { name: 'Kotak Securities', category: 'Brokers', color: '#D91724', icon: 'K' },
  { name: 'Motilal Oswal', category: 'Brokers', color: '#E51937', icon: 'M' },
  { name: 'SBI Securities', category: 'Brokers', color: '#00B0D9', icon: 'S' },
  { name: 'CAMS / KFintech', category: 'Mutual Funds', color: '#415281', icon: 'C' },
  { name: 'CAS (NSDL/CDSL)', category: 'Depositories', color: '#0A745C', icon: 'N' },
  { name: 'HDFC Bank', category: 'Banks', color: '#004C8F', icon: 'H' },
];

export default function Import() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredIntegrations = integrations.filter(int => 
    int.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          Sync your wealth seamlessly
        </h1>
        <p className={styles.subtitle}>
          Connect thousands of brokers, banks, and mutual fund houses instantly.
        </p>

        <div className={styles.searchContainer}>
          <input 
            type="text" 
            placeholder="Search brokers, banks, or file types..." 
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <div className={styles.gridContainer}>
        <div className={styles.grid}>
          {filteredIntegrations.map((int, i) => (
            <div key={int.name} className={styles.integrationCard} style={{ animationDelay: `${i * 0.05}s` }}>
              <div className={styles.cardGlow} style={{ background: int.color }}></div>
              <div className={styles.cardContent}>
                <div className={styles.iconWrapper} style={{ backgroundColor: `${int.color}20`, color: int.color, border: `1px solid ${int.color}40` }}>
                  {int.icon}
                </div>
                <div className={styles.details}>
                  <h3 className={styles.intName}>{int.name}</h3>
                  <span className={styles.intCategory}>{int.category}</span>
                </div>
                <button className={styles.connectBtn}>Connect</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
