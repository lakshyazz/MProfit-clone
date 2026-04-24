'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './AddPortfolioModal.module.css';

interface AddPortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd?: (name: string) => void;
}

export default function AddPortfolioModal({ isOpen, onClose, onAdd }: AddPortfolioModalProps) {
  const [mounted, setMounted] = useState(false);
  const [portfolioName, setPortfolioName] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onAdd && portfolioName) {
      onAdd(portfolioName);
    }
    setPortfolioName('');
    onClose();
  };

  const modalContent = (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Add Portfolio</h2>
          <button className={styles.closeBtn} onClick={onClose}>×</button>
        </div>

        <form className={styles.modalForm} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label>Portfolio Name *</label>
            <input 
              type="text" 
              required 
              className={styles.inputField} 
              value={portfolioName}
              onChange={(e) => setPortfolioName(e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Full Name</label>
            <input type="text" className={styles.inputField} />
          </div>

          <div className={styles.checkboxGroup}>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" className={styles.checkboxInput} />
              Strategy / Goal Portfolio
            </label>
          </div>

          <div className={styles.checkboxGroup}>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" className={styles.checkboxInput} />
              PMS Portfolio
            </label>
          </div>

          <div className={styles.inputGroup}>
            <label>Entity</label>
            <select className={styles.inputField}>
              <option value="individual">Individual</option>
              <option value="huf">HUF</option>
              <option value="company">Company</option>
            </select>
          </div>

          <div className={styles.additionalOptions}>
            <span style={{ fontSize: '1.2rem', lineHeight: '1' }}>+</span> Additional Options
          </div>

          <div className={styles.modalFooter}>
            <button type="submit" className={styles.submitBtn}>Save</button>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
