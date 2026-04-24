'use client';
import styles from './import.module.css';
import { useState } from 'react';

export default function SmartImporterPage() {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // In a real app, we'd process e.dataTransfer.files[0]
    alert("Simulated CAS PDF Upload. Processing transactions...");
  };

  const brokers = [
    { id: 'zerodha', name: 'Zerodha Kite', status: 'API Connected' },
    { id: 'groww', name: 'Groww', status: 'Supports Auto-Sync' },
    { id: 'upstox', name: 'Upstox Pro', status: 'API Connected' },
    { id: 'cams', name: 'CAMS / KFintech', status: 'MF Central Sync' },
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Smart Importer Engine</h1>
        <p className={styles.subtitle}>Automate your portfolio tracking with deep integrations and PDF parsing.</p>
      </header>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h2>CAS & Tax Statement Upload</h2>
          <p>
            Drag and drop your NSDL/CDSL Consolidated Account Statement (CAS), Form 26AS, or generic broker contract notes. Our AI parser maps all transactions automatically.
          </p>
          
          <div 
            className={styles.dropzone}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            style={dragActive ? { borderColor: 'var(--accent-color)', background: 'rgba(100, 255, 218, 0.1)' } : {}}
            onClick={() => alert('Simulated File Picker')}
          >
            <span className={styles.dropIcon}>📄</span>
            <div className={styles.dropText}>Click to upload or drag PDF here</div>
            <div className={styles.dropSub}>Requires password-protected CAS PDF format</div>
          </div>
        </div>

        <div className={styles.card}>
          <h2>Live Broker Sync</h2>
          <p>
            Connect directly to your brokerage accounts via secure Account Aggregator APIs. We sync trades nightly so your portfolio is never out of date.
          </p>

          <div className={styles.brokerList}>
            {brokers.map((broker) => (
              <div key={broker.id} className={styles.brokerItem}>
                <div className={styles.brokerInfo}>
                  <div className={styles.brokerLogo}>{broker.name.charAt(0)}</div>
                  <div>
                    <div className={styles.brokerName}>{broker.name}</div>
                    <div className={styles.brokerStatus}>{broker.status}</div>
                  </div>
                </div>
                <button 
                  className={styles.connectBtn}
                  onClick={() => alert(`Simulating OAuth to ${broker.name}...`)}
                >
                  Connect
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
