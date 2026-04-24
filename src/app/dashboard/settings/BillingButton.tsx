'use client';
import React from 'react';
import styles from './page.module.css';

export default function BillingButton() {
  const handleManageSubscription = () => {
    alert('💳 Billing portal\n\nPlan: MProfit PRO\nNext Billing: 14-Aug-2024\nAmount: ₹3,500/year');
  };

  return (
    <button className={styles.billingBtn} onClick={handleManageSubscription}>
      Manage Subscription
    </button>
  );
}
