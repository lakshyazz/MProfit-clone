'use client';
import React, { useState } from 'react';
import styles from './page.module.css';

export default function SaveChangesButton() {
  const [saved, setSaved] = useState(false);

  const handleSaveChanges = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    alert('✅ Settings saved successfully!');
  };

  return (
    <button className={styles.saveBtn} onClick={handleSaveChanges}>
      {saved ? '✓ Saved!' : 'Save Changes'}
    </button>
  );
}
