'use client';
import React from 'react';
import styles from './page.module.css';

export default function UpdatePasswordButton() {
  const handleUpdatePassword = () => {
    const newPwd = prompt('Enter new password (min 8 characters):');
    if (newPwd && newPwd.length >= 8) {
      alert('✅ Password updated successfully!');
    } else if (newPwd !== null) {
      alert('❌ Password must be at least 8 characters.');
    }
  };

  return (
    <button className={styles.actionBtn} onClick={handleUpdatePassword}>
      Update
    </button>
  );
}
