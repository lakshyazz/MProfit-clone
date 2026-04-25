import React from 'react';
import styles from '../AddAssetButton.module.css';
import { useHoldings } from '@/context/HoldingsContext';

interface SubModalProps {
  activeSubModal: string | null;
  setActiveSubModal: (modal: string | null) => void;
  onSave?: (modalId: string, name: string, amount: number, date: string) => void;
}

export default function SubModal({ activeSubModal, setActiveSubModal, onSave }: SubModalProps) {
  const [name, setName] = React.useState('');
  const [amount, setAmount] = React.useState<number | ''>('');
  const [date, setDate] = React.useState(new Date().toISOString().split('T')[0]);

  if (!activeSubModal) return null;

  let subTitle = "Add New";
  let inputs = <></>;

  const handleSave = () => {
    const finalName = name || `New ${subTitle.replace('Add ', '')}`;
    const finalAmount = amount === '' ? 0 : Number(amount);

    if (onSave) {
      onSave(activeSubModal, finalName, finalAmount, date);
    }
    
    // Reset
    setName('');
    setAmount('');
    setActiveSubModal(null);
  };

  switch (activeSubModal) {
    case 'add_bank':
    case 'add_fd':
    case 'add_pe':
    case 'add_property':
    case 'add_stock':
    case 'add_traded_bond':
    case 'add_mutual_fund':
      subTitle = `Add New ${activeSubModal.split('_').pop()?.toUpperCase()}`;
      inputs = (
        <>
          <div className={styles.inputGroup}>
            <label>Name</label>
            <input 
              type="text" 
              className={styles.inputField} 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name..."
              required 
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Initial Investment (₹)</label>
            <input 
              type="number" 
              className={styles.inputField} 
              value={amount}
              onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : '')}
              placeholder="0"
              required 
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Investment Date</label>
            <input 
              type="date" 
              className={styles.inputField} 
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </>
      );
      break;
    case 'add_broker':
    case 'add_agent':
    case 'add_seller':
    case 'add_insurance_company':
      subTitle = `Add ${activeSubModal.split('_')[1].toUpperCase()}`;
      inputs = (
        <>
          <div className={styles.inputGroup}>
            <label>Name</label>
            <input type="text" className={styles.inputField} value={name} onChange={e => setName(e.target.value)} required />
          </div>
        </>
      );
      break;
    default:
      subTitle = "Add Entity";
      inputs = (
        <>
          <div className={styles.inputGroup}>
            <label>Name</label>
            <input type="text" className={styles.inputField} value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className={styles.inputGroup}>
            <label>Amount (₹)</label>
            <input type="number" className={styles.inputField} value={amount} onChange={e => setAmount(e.target.value ? Number(e.target.value) : '')} />
          </div>
        </>
      );
  }

  return (
    <div className={styles.modalOverlay} style={{ zIndex: 1100, background: 'rgba(0,0,0,0.6)' }} onClick={() => setActiveSubModal(null)}>
      <div className={styles.modalContent} style={{ maxWidth: '420px' }} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>{subTitle}</h3>
          <button className={styles.closeBtn} onClick={() => setActiveSubModal(null)}>×</button>
        </div>
        <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
           {inputs}
        </div>
        <div style={{ padding: '0 24px 20px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
           <button type="button" className={styles.cancelBtn} onClick={() => setActiveSubModal(null)}>Cancel</button>
           <button type="button" className={styles.submitBtn} onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
}
