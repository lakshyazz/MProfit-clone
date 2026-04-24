'use client';
import React from 'react';
import styles from './page.module.css';

export default function Enable2FAButton() {
  const handleEnable2FA = () => {
    alert('📱 2FA Setup\n\nAn OTP has been sent to your registered mobile +91 98765 43210.\nEnter it to enable Two-Factor Authentication.');
  };

  return (
    <button className={styles.actionBtn} onClick={handleEnable2FA}>
      Enable
    </button>
  );
}
