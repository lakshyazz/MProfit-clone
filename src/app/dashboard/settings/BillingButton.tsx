'use client';
import React from 'react';
import styles from './page.module.css';

export default function BillingButton() {
  const handleManageSubscription = () => {
    alert('💳 Billing portal\n\nPlan: Standard Plan\nStatus: Free / Active');
  };

  return (
    <button className={styles.billingBtn} onClick={handleManageSubscription}>
      Manage Subscription
    </button>
  );
}
