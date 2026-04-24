'use client';
import React, { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function ThemeToggle() {
  // App is light theme by default, so we default to light
  const [activeTheme, setActiveTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Load theme from localStorage on mount
    const savedTheme = localStorage.getItem('mprofit_theme') as 'light' | 'dark';
    if (savedTheme) {
      setActiveTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    console.log('Applying theme:', activeTheme);
    // Actually apply the theme to the document body to reflect real state
    if (activeTheme === 'dark') {
      document.body.classList.add('dark-theme');
      localStorage.setItem('mprofit_theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('mprofit_theme', 'light');
    }
    console.log('Current body classes:', document.body.className);
  }, [activeTheme]);

  return (
    <div className={styles.themeGroup}>
      <button
        className={`${styles.themeBtn} ${activeTheme === 'light' ? styles.themeActive : ''}`}
        onClick={() => setActiveTheme('light')}
      >
        Light (Default)
      </button>
      <button
        className={`${styles.themeBtn} ${activeTheme === 'dark' ? styles.themeActive : ''}`}
        onClick={() => setActiveTheme('dark')}
      >
        Dark
      </button>
    </div>
  );
}
