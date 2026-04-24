import React from 'react';
import styles from '../AddAssetButton.module.css';
import { useHoldings } from '@/context/HoldingsContext';

interface SubModalProps {
  activeSubModal: string | null;
  setActiveSubModal: (modal: string | null) => void;
}

export default function SubModal({ activeSubModal, setActiveSubModal }: SubModalProps) {
  const { addHolding } = useHoldings();

  if (!activeSubModal) return null;

  let subTitle = "Add New";
  let inputs = <></>;

  const handleSave = () => {
    const className = activeSubModal.includes('stock') ? 'Equity' : 
                      activeSubModal.includes('mutual_fund') ? 'Mutual Fund' : 
                      activeSubModal.includes('bank') ? 'Fixed Income' : 
                      activeSubModal.includes('property') ? 'Real Estate' : 'Other';
    
    addHolding({
      name: `New ${subTitle.replace('Add ', '')}`,
      class: className,
      invested: 0,
      current: 0
    });
    setActiveSubModal(null);
  };

  switch (activeSubModal) {
    case 'add_broker':
    case 'add_agent':
    case 'add_seller':
    case 'add_insurance_company':
      subTitle = `Add ${activeSubModal.split('_')[1].toUpperCase()}`;
      inputs = (
        <>
          <div className={styles.inputGroup}>
            <label>Name</label>
            <input type="text" className={styles.inputField} required />
          </div>
          <div className={styles.inputGroup}>
            <label>Address</label>
            <input type="text" className={styles.inputField} />
          </div>
        </>
      );
      break;
    case 'add_stock':
    case 'add_traded_bond':
    case 'add_property':
      subTitle = `Add ${activeSubModal.split('_')[1].toUpperCase()}`;
      inputs = (
        <>
           {activeSubModal !== 'add_stock' && activeSubModal !== 'add_traded_bond' && (
              <div style={{ marginBottom: "0.5rem" }}>
                 <label><input type="checkbox" /> New Asset</label>
              </div>
           )}
          <div className={styles.inputGroup}>
            <label>{activeSubModal === 'add_property' ? 'Address' : 'Select Asset'}</label>
            <input type="text" className={styles.inputField} required />
          </div>
          {activeSubModal === 'add_property' && (
             <div className={styles.rowInputs}>
                <div className={styles.inputGroup}>
                   <label>Seller</label>
                   <select className={styles.inputField}><option>Select</option></select>
                </div>
                <div className={styles.inputGroup}>
                   <label>Agent/Broker</label>
                   <select className={styles.inputField}><option>Select</option></select>
                </div>
             </div>
          )}
        </>
      );
      break;
    case 'add_mutual_fund':
    case 'add_sif':
      subTitle = `Add Fund`;
      inputs = (
        <>
          <div className={styles.rowInputs}>
             <div className={styles.inputGroup}>
                <label>Select Asset</label>
                <input type="text" className={styles.inputField} required />
             </div>
             <div className={styles.inputGroup}>
                <label>Folio No</label>
                <input type="text" className={styles.inputField} required />
             </div>
          </div>
          <div className={styles.rowInputs}>
             {activeSubModal !== 'add_sif' && (
                <div className={styles.inputGroup}>
                   <label>Type</label>
                   <select className={styles.inputField}><option>Equity</option><option>Debt</option></select>
                </div>
             )}
             <div className={styles.inputGroup}>
               <label>Lock-in Period</label>
               <div style={{paddingTop: '4px'}}><input type="checkbox" /></div>
             </div>
          </div>
           <div className={styles.inputGroup}>
              <label>Agent/Broker</label>
              <select className={styles.inputField}><option>Select</option></select>
           </div>
        </>
      );
      break;
     case 'add_bank':
      subTitle = `Add Bank`;
      inputs = (
        <>
          <div className={styles.inputGroup}>
            <label>Select Bank</label>
            <select className={styles.inputField}><option>HDFC Bank</option><option>SBI</option></select>
          </div>
          <div className={styles.inputGroup}>
            <label>Account No</label>
            <input type="text" className={styles.inputField} required />
          </div>
        </>
      );
      break;
    default:
      subTitle = "Add Entity";
      inputs = <div className={styles.inputGroup}><label>Name</label><input type="text" className={styles.inputField} /></div>;
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
