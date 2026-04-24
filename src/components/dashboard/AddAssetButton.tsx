'use client';

import React, { useState, useEffect } from 'react';
import styles from './AddAssetButton.module.css';
import { useHoldings } from '@/context/HoldingsContext';
import SubModal from './AssetForms/SubModal';
import { indianStocks } from '@/data/indianStocks';

interface AddAssetButtonProps {
  className?: string;
  text?: string;
}

export default function AddAssetButton({ className, text = "+ Add Asset" }: AddAssetButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [assetClass, setAssetClass] = useState('stocks_etfs');
  const [transType, setTransType] = useState('Buy');
  const [activeSubModal, setActiveSubModal] = useState<string | null>(null);

  const { addHolding } = useHoldings();

  // Toggles
  const [lockInEnabled, setLockInEnabled] = useState(false);
  const [maturityEnabled, setMaturityEnabled] = useState(false);
  const [autoTransfer, setAutoTransfer] = useState(false);
  const [newAssetChecked, setNewAssetChecked] = useState(false);
  
  // Auto-calculation state
  const [qty, setQty] = useState<number | ''>('');
  const [rate, setRate] = useState<number | ''>('');
  const [amount, setAmount] = useState<number | ''>('');

  useEffect(() => {
    if (qty !== '' && rate !== '') {
      setAmount(Number((qty * rate).toFixed(2)));
    }
  }, [qty, rate]);
  
  const todayStr = new Date().toISOString().split('T')[0];

  useEffect(() => {
    setQty('');
    setRate('');
    setAmount('');
    // Reset trans type on asset group change implicitly assuming defaults
    if (assetClass === 'banks') setTransType('Deposit');
    else if (assetClass === 'fds' || assetClass === 'deposits_loans' || assetClass === 'post_office' || assetClass === 'ppf_epf') setTransType('Investment');
    else if (assetClass === 'nps_ulip' || assetClass === 'insurance') setTransType('New Policy');
    else if (assetClass === 'loans') setTransType('Borrow');
    else if (assetClass === 'traded_bonds') setTransType('Buy'); // Traded Bonds don't have explicit Trans type in the hierarchy, default 'Buy' equivalent logic
    else if (assetClass === 'ncd_debentures' || assetClass === 'private_equity' || assetClass === 'property' || assetClass === 'art' || assetClass === 'gold' || assetClass === 'silver' || assetClass === 'jewellery') setTransType('Buy');
    else setTransType('Buy'); // Mutual funds, Stocks, SIF default
  }, [assetClass]);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    setActiveSubModal(null);
  };

  const handleDropdownAction = (e: React.ChangeEvent<HTMLSelectElement>, targetModal: string) => {
    if (e.target.value === 'ADD_NEW') {
      setActiveSubModal(targetModal);
      e.target.value = ''; // Reset select to prevent stuck state
    }
  };



  const renderDynamicFields = () => {
    switch (assetClass) {
      case 'stocks_etfs':
        return (
          <>
            <div className={styles.rowInputs}>
               <div className={styles.inputGroup}>
                  <label>Date</label>
                  <input type="date" className={styles.inputField} defaultValue={todayStr} required />
               </div>
               <div className={styles.inputGroup}>
                  <label>Broker</label>
                  <select className={styles.inputField} onChange={(e) => handleDropdownAction(e, 'add_broker')}>
                     <option>Select Broker</option>
                     <option value="ADD_NEW">+ Add New</option>
                  </select>
               </div>
            </div>
            <div className={styles.rowInputs}>
               <div className={styles.inputGroup}>
                  <label>Cnt. Note</label>
                  <select className={styles.inputField}><option>Select</option></select>
               </div>
               <div className={styles.inputGroup}>
                  <label>Settlement No</label>
                  <input type="text" className={styles.inputField} />
               </div>
            </div>
            <div className={styles.inputGroup}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{ marginBottom: 0 }}>Asset Name</label>
                  <button 
                     type="button" 
                     onClick={() => setActiveSubModal('add_stock')} 
                     style={{ background: 'none', border: 'none', color: 'var(--color-emerald-bright)', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, padding: 0 }}
                  >
                     + Add New Stock
                  </button>
               </div>
               <input 
                  type="text" 
                  list="stocks-list"
                  className={styles.inputField} 
                  placeholder="Type to search regular stocks and bonds..."
                  required 
               />
               <datalist id="stocks-list">
                  {indianStocks.map(stock => (
                     <option key={stock} value={stock} />
                  ))}
               </datalist>
            </div>
            <div className={styles.rowInputs}>
               <div className={styles.inputGroup}>
                  <label>{transType === 'Sell' ? 'Sale Quantity' : 'Purchase Quantity'}</label>
                  <input type="number" step="any" className={styles.inputField} value={qty} onChange={(e) => setQty(e.target.value ? Number(e.target.value) : '')} required />
               </div>
               <div className={styles.inputGroup}>
                  <label>{transType === 'Sell' ? 'Sale Price' : 'Purchase Price'}</label>
                  <input type="number" step="any" className={styles.inputField} value={rate} onChange={(e) => setRate(e.target.value ? Number(e.target.value) : '')} required />
               </div>
            </div>
            <div className={styles.rowInputs}>
               <div className={styles.inputGroup}>
                  <label>Brokerage</label>
                  <input type="number" step="any" className={styles.inputField} />
               </div>
               <div className={styles.inputGroup}>
                  <label>{transType === 'Sell' ? 'Sale Amount' : 'Purchase Amount'}</label>
                  <input type="number" step="any" className={styles.inputField} value={amount} onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : '')} />
               </div>
            </div>
             <div className={styles.rowInputs}>
               <div className={styles.inputGroup}>
                  <label>STT</label>
                  <input type="number" step="any" className={styles.inputField} />
               </div>
               <div className={styles.inputGroup}>
                  <label>Stamp Charges</label>
                  <input type="number" step="any" className={styles.inputField} />
               </div>
            </div>
            <div className={styles.rowInputs}>
               <div className={styles.inputGroup}>
                  <label>Other Charges</label>
                  <input type="number" step="any" className={styles.inputField} />
               </div>
               <div className={styles.inputGroup}>
                  <label>GST / S.Tax</label>
                  <input type="number" step="any" className={styles.inputField} />
               </div>
            </div>
             <div className={styles.rowInputs}>
               <div className={styles.inputGroup}>
                  <label>Trans. Charges</label>
                  <input type="number" step="any" className={styles.inputField} />
               </div>
               <div className={styles.inputGroup}>
                  <label>Total Amount {(transType === 'Sell') ? '(Receivable)' : '(Payable)'}</label>
                  <input type="number" step="any" className={styles.inputField} readOnly />
               </div>
            </div>
            <div style={{ marginBottom: "1rem" }}>
               <label><input type="checkbox" checked={autoTransfer} onChange={(e) => setAutoTransfer(e.target.checked)} /> Automatically transfer charges?</label>
            </div>
          </>
        );

      case 'mutual_funds_equity':
      case 'mutual_funds_debt':
      case 'sif':
        return (
          <>
            <div className={styles.rowInputs}>
              <div className={styles.inputGroup}>
                <label>Trans. Type</label>
                <select className={styles.inputField} value={transType} onChange={(e) => setTransType(e.target.value)}>
                  <option>Buy</option>
                  <option>Dividend Reinvest</option>
                  <option>Bonus</option>
                  <option>Sell</option>
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label>Date</label>
                <input type="date" className={styles.inputField} defaultValue={todayStr} required />
              </div>
            </div>
            <div className={styles.inputGroup}>
              <label>Fund Name</label>
               <select className={styles.inputField} onChange={(e) => handleDropdownAction(e, assetClass === 'sif' ? 'add_sif' : 'add_mutual_fund')} required>
                  <option value="">Select Fund</option>
                  <option value="ADD_NEW">+ Add New</option>
               </select>
            </div>
            <div className={styles.rowInputs}>
              <div className={styles.inputGroup}>
                <label>Quantity</label>
                 <input type="number" step="any" className={styles.inputField} value={qty} onChange={(e) => setQty(e.target.value ? Number(e.target.value) : '')} required />
              </div>
              <div className={styles.inputGroup}>
                <label>NAV</label>
                 <input type="number" step="any" className={styles.inputField} value={rate} onChange={(e) => setRate(e.target.value ? Number(e.target.value) : '')} required />
              </div>
            </div>
            {assetClass === 'sif' ? (
                <div className={styles.rowInputs}>
                 <div className={styles.inputGroup}>
                   <label>Gross Amount</label>
                   <input type="number" step="any" className={styles.inputField} required />
                 </div>
                 <div className={styles.inputGroup}>
                   <label>Stamp Charges</label>
                   <input type="number" step="any" className={styles.inputField} />
                 </div>
               </div>
            ) : (
                <div className={styles.rowInputs}>
                 <div className={styles.inputGroup}>
                   <label>Net Amount</label>
                   <input type="number" step="any" className={styles.inputField} required />
                 </div>
                 <div className={styles.inputGroup}>
                   <label>Stamp Charges</label>
                   <input type="number" step="any" className={styles.inputField} />
                 </div>
               </div>
            )}
            
            <div className={styles.inputGroup}>
              <label>{assetClass === 'sif' ? 'Net Amount' : 'Gross Amount'}</label>
               <input type="number" step="any" className={styles.inputField} value={amount} onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : '')} required />
            </div>
            {transType === 'Dividend Reinvest' && assetClass === 'mutual_funds_equity' && (
              <div className={styles.rowInputs}>
                 <div className={styles.inputGroup}>
                   <label>TDS</label>
                   <input type="number" step="any" className={styles.inputField} />
                 </div>
                 <div className={styles.inputGroup}>
                   <label>Gross Dividend</label>
                   <input type="number" step="any" className={styles.inputField} required />
                 </div>
              </div>
            )}
          </>
        );

      case 'banks':
        return (
          <>
            <div className={styles.rowInputs}>
              <div className={styles.inputGroup}>
                <label>Trans. Type</label>
                <select className={styles.inputField} value={transType} onChange={(e) => setTransType(e.target.value)}>
                  <option>Deposit</option>
                  <option>Withdrawal</option>
                  <option>Opening Balance</option>
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label>Bank Account</label>
                <select className={styles.inputField} onChange={(e) => handleDropdownAction(e, 'add_bank')} required>
                  <option value="">Select Account</option>
                  <option value="ADD_NEW">+ Add New</option>
                </select>
              </div>
            </div>
            <div className={styles.rowInputs}>
              <div className={styles.inputGroup}>
                <label>Date</label>
                <input type="date" className={styles.inputField} defaultValue={todayStr} required />
              </div>
              <div className={styles.inputGroup}>
                <label>Amount (₹)</label>
                 <input type="number" step="any" className={styles.inputField} value={amount} onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : '')} required />
              </div>
            </div>
             <div className={styles.rowInputs}>
              <div className={styles.inputGroup}>
                <label>Cheque / Ref #</label>
                <input type="text" className={styles.inputField} />
              </div>
              <div className={styles.inputGroup}>
                <label>Narration</label>
                <input type="text" className={styles.inputField} />
              </div>
            </div>
          </>
        );

      case 'nps_ulip':
      case 'insurance':
        return (
          <>
             <div className={styles.rowInputs}>
              <div className={styles.inputGroup}>
                <label>Trans. Type</label>
                <select className={styles.inputField} value={transType} onChange={(e) => setTransType(e.target.value)}>
                  <option>New Policy</option>
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label>Plan / Scheme</label>
                <select className={styles.inputField} onChange={(e) => handleDropdownAction(e, 'add_insurance')} required>
                  <option value="">Select Plan</option>
                  <option value="ADD_NEW">+ Add New</option>
                </select>
              </div>
            </div>
             <div className={styles.rowInputs}>
              <div className={styles.inputGroup}>
                <label>First Premium (₹)</label>
                <input type="number" step="any" className={styles.inputField} required />
              </div>
              <div className={styles.inputGroup}>
                <label>Date</label>
                <input type="date" className={styles.inputField} defaultValue={todayStr} required />
              </div>
             </div>
             <div className={styles.rowInputs}>
              <div className={styles.inputGroup}>
                <label>Insured Name</label>
                <select className={styles.inputField}><option>Select Name</option></select>
              </div>
              <div className={styles.inputGroup}>
                <label>Nominee</label>
                <select className={styles.inputField}><option>Select Nominee</option></select>
              </div>
             </div>
             <div className={styles.rowInputs}>
               <div className={styles.inputGroup}>
                 <label>Sum Assured (₹)</label>
                 <input type="number" step="any" className={styles.inputField} />
               </div>
               <div className={styles.inputGroup}>
                 <label>Narration</label>
                 <input type="text" className={styles.inputField} />
               </div>
             </div>
             <div className={styles.rowInputs}>
               <div className={styles.inputGroup}>
                 <label>Premium Mode</label>
                 <select className={styles.inputField}>
                    <option>Yearly</option>
                    <option>Half Yearly</option>
                    <option>Quarterly</option>
                    <option>Monthly</option>
                    <option>Single Premium</option>
                 </select>
               </div>
               <div className={styles.inputGroup}>
                 <label>Next Premium Due</label>
                 <input type="date" className={styles.inputField} defaultValue={todayStr} />
               </div>
             </div>
              <div className={styles.rowInputs}>
               <div className={styles.inputGroup}>
                 <label>Next Premium Amt</label>
                 <input type="number" step="any" className={styles.inputField} />
               </div>
               <div className={styles.inputGroup}>
                 <label>Term (yrs)</label>
                 <input type="number" step="any" className={styles.inputField} />
               </div>
             </div>
              <div className={styles.rowInputs}>
               <div className={styles.inputGroup}>
                 <label>Maturity Date</label>
                 <input type="date" className={styles.inputField} defaultValue={todayStr} />
               </div>
               <div className={styles.inputGroup}>
                 <label>Premium Term (yrs)</label>
                 <input type="number" step="any" className={styles.inputField} />
               </div>
             </div>
              <div className={styles.inputGroup}>
                 <label>Lock-in Period</label>
                 <input type="date" className={styles.inputField} defaultValue={todayStr} />
              </div>
          </>
        );

      case 'private_equity':
        return (
          <>
             <div className={styles.rowInputs}>
              <div className={styles.inputGroup}>
                <label>Trans. Type</label>
                <select className={styles.inputField} value={transType} onChange={(e) => setTransType(e.target.value)}>
                  <option>Buy</option>
                  <option>Sell</option>
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label>Asset Name</label>
                <select className={styles.inputField} onChange={(e) => handleDropdownAction(e, 'add_pe')} required>
                  <option value="">Select Asset</option>
                  <option value="ADD_NEW">+ Add New</option>
                </select>
              </div>
            </div>
             <div className={styles.rowInputs}>
              <div className={styles.inputGroup}>
                <label>Date</label>
                <input type="date" className={styles.inputField} defaultValue={todayStr} required />
              </div>
              <div className={styles.inputGroup}>
                <label>Quantity</label>
                 <input type="number" step="any" className={styles.inputField} value={qty} onChange={(e) => setQty(e.target.value ? Number(e.target.value) : '')} required />
              </div>
             </div>
             <div className={styles.rowInputs}>
              <div className={styles.inputGroup}>
                <label>Rate (₹)</label>
                 <input type="number" step="any" className={styles.inputField} value={rate} onChange={(e) => setRate(e.target.value ? Number(e.target.value) : '')} required />
              </div>
              <div className={styles.inputGroup}>
                <label>Amount (₹)</label>
                 <input type="number" step="any" className={styles.inputField} value={amount} onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : '')} required />
              </div>
             </div>
              <div className={styles.inputGroup}>
                 <label>Narration</label>
                 <input type="text" className={styles.inputField} />
              </div>
          </>
        );

      case 'fds':
      case 'deposits_loans':
      case 'ncd_debentures':
      case 'post_office':
        return (
          <>
             <div className={styles.rowInputs}>
              <div className={styles.inputGroup}>
                <label>Trans. Type</label>
                <select className={styles.inputField} value={transType} onChange={(e) => setTransType(e.target.value)}>
                  {assetClass === 'ncd_debentures' ? <option>Buy</option> : <option>Investment</option>}
                  <option>Interest (Cumulative)</option>
                  <option>Interest (Payout)</option>
                  {assetClass === 'ncd_debentures' ? <option>Sell</option> : null}
                  {assetClass === 'ncd_debentures' ? <option>Repayment</option> : <option>Withdrawal</option>}
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label>Asset Name</label>
                <select className={styles.inputField} onChange={(e) => handleDropdownAction(e, 'add_fd')} required>
                  <option value="">Select Asset</option>
                  <option value="ADD_NEW">+ Add New</option>
                </select>
              </div>
            </div>
             <div className={styles.rowInputs}>
              <div className={styles.inputGroup}>
                <label>Interest Rate (%)</label>
                <input type="number" step="any" className={styles.inputField} required />
              </div>
              <div className={styles.inputGroup}>
                <label>Interest Type</label>
                <select className={styles.inputField}><option>Cumulative</option><option>Payout</option></select>
              </div>
             </div>
              <div className={styles.inputGroup}>
                <label>Interest Payment</label>
                <select className={styles.inputField}><option>Yearly</option><option>Half Yearly</option><option>Quarterly</option><option>Monthly</option></select>
              </div>
              <div className={styles.rowInputs}>
                 <div className={styles.inputGroup}>
                    <label style={{display:'flex', gap:'8px'}}><input type="checkbox" checked={maturityEnabled} onChange={e=>setMaturityEnabled(e.target.checked)}/> Maturity Date</label>
                    {maturityEnabled && <input type="date" className={styles.inputField} defaultValue={todayStr} />}
                 </div>
                 <div className={styles.inputGroup}>
                    <label style={{display:'flex', gap:'8px'}}><input type="checkbox" checked={lockInEnabled} onChange={e=>setLockInEnabled(e.target.checked)}/> Lock-in Period</label>
                    {lockInEnabled && <input type="date" className={styles.inputField} defaultValue={todayStr} />}
                 </div>
              </div>
               <div className={styles.rowInputs}>
                <div className={styles.inputGroup}>
                  <label>Date</label>
                  <input type="date" className={styles.inputField} defaultValue={todayStr} required />
                </div>
                 {assetClass === 'ncd_debentures' ? (
                   <div className={styles.inputGroup}>
                     <label>Quantity</label>
                 <input type="number" step="any" className={styles.inputField} value={qty} onChange={(e) => setQty(e.target.value ? Number(e.target.value) : '')} required />
                   </div>
                 ) : (
                    (transType === 'Investment') && (
                       <div className={styles.inputGroup}>
                       <label>Amount</label>
                 <input type="number" step="any" className={styles.inputField} value={amount} onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : '')} required />
                       </div>
                    )
                 )}
               </div>

               {assetClass === 'ncd_debentures' && (
                  <div className={styles.rowInputs}>
                     <div className={styles.inputGroup}>
                       <label>Rate</label>
                 <input type="number" step="any" className={styles.inputField} value={rate} onChange={(e) => setRate(e.target.value ? Number(e.target.value) : '')} />
                     </div>
                     <div className={styles.inputGroup}>
                       <label>Face Value</label>
                       <input type="number" step="any" className={styles.inputField} />
                     </div>
                  </div>
               )}
                {assetClass === 'ncd_debentures' && (
                  <div className={styles.inputGroup}>
                     <label>Amount</label>
                 <input type="number" step="any" className={styles.inputField} value={amount} onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : '')} />
                  </div>
               )}

               {transType === 'Withdrawal' && assetClass !== 'ncd_debentures' && (
                  <>
                     <div className={styles.rowInputs}>
                       <div className={styles.inputGroup}>
                         <label>Principal Amt</label>
                         <input type="number" step="any" className={styles.inputField} />
                       </div>
                       <div className={styles.inputGroup}>
                         <label>Interest</label>
                         <input type="number" step="any" className={styles.inputField} />
                       </div>
                     </div>
                     <div className={styles.rowInputs}>
                       <div className={styles.inputGroup}>
                         <label>TDS</label>
                         <input type="number" step="any" className={styles.inputField} />
                       </div>
                       <div className={styles.inputGroup}>
                         <label>Net Amount</label>
                         <input type="number" step="any" className={styles.inputField} />
                       </div>
                     </div>
                  </>
               )}
                <div className={styles.inputGroup}>
                  <label>Narration</label>
                  <input type="text" className={styles.inputField} />
                </div>
          </>
        );

      case 'traded_bonds':
        return (
          <>
             <div className={styles.rowInputs}>
               <div className={styles.inputGroup}>
                  <label>Date</label>
                  <input type="date" className={styles.inputField} defaultValue={todayStr} required />
               </div>
               <div className={styles.inputGroup}>
                  <label>Broker</label>
                  <select className={styles.inputField} onChange={(e) => handleDropdownAction(e, 'add_broker')}>
                     <option>Select Broker</option>
                     <option value="ADD_NEW">+ Add New</option>
                  </select>
               </div>
            </div>
            <div className={styles.rowInputs}>
               <div className={styles.inputGroup}>
                  <label>Cnt. Note</label>
                  <select className={styles.inputField}><option>Select</option></select>
               </div>
               <div className={styles.inputGroup}>
                  <label>Settlement No</label>
                  <input type="text" className={styles.inputField} />
               </div>
            </div>
            <div className={styles.inputGroup}>
               <label>Asset Name</label>
               <select className={styles.inputField} onChange={(e) => handleDropdownAction(e, 'add_traded_bond')} required>
                  <option value="">Select Asset</option>
                  <option value="ADD_NEW">+ Add New</option>
               </select>
            </div>
            <div className={styles.rowInputs}>
               <div className={styles.inputGroup}>
                  <label>{transType === 'Sell' ? 'Sale Quantity' : 'Purchase Quantity'}</label>
                  <input type="number" step="any" className={styles.inputField} value={qty} onChange={(e) => setQty(e.target.value ? Number(e.target.value) : '')} required />
               </div>
               <div className={styles.inputGroup}>
                  <label>{transType === 'Sell' ? 'Sale Price' : 'Purchase Price'}</label>
                  <input type="number" step="any" className={styles.inputField} value={rate} onChange={(e) => setRate(e.target.value ? Number(e.target.value) : '')} required />
               </div>
            </div>
            <div className={styles.rowInputs}>
               <div className={styles.inputGroup}>
                  <label>Brokerage</label>
                  <input type="number" step="any" className={styles.inputField} />
               </div>
               <div className={styles.inputGroup}>
                  <label>{transType === 'Sell' ? 'Sale Amount' : 'Purchase Amount'}</label>
                  <input type="number" step="any" className={styles.inputField} value={amount} onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : '')} />
               </div>
            </div>
             <div className={styles.rowInputs}>
               <div className={styles.inputGroup}>
                  <label>STT</label>
                  <input type="number" step="any" className={styles.inputField} />
               </div>
               <div className={styles.inputGroup}>
                  <label>Stamp Charges</label>
                  <input type="number" step="any" className={styles.inputField} />
               </div>
            </div>
            <div className={styles.rowInputs}>
               <div className={styles.inputGroup}>
                  <label>Other Charges</label>
                  <input type="number" step="any" className={styles.inputField} />
               </div>
               <div className={styles.inputGroup}>
                  <label>GST / S.Tax</label>
                  <input type="number" step="any" className={styles.inputField} />
               </div>
            </div>
             <div className={styles.rowInputs}>
               <div className={styles.inputGroup}>
                  <label>Trans. Charges</label>
                  <input type="number" step="any" className={styles.inputField} />
               </div>
               <div className={styles.inputGroup}>
                  <label>Total Amount {(transType === 'Sell') ? '(Receivable)' : '(Payable)'}</label>
                  <input type="number" step="any" className={styles.inputField} readOnly />
               </div>
            </div>
            <div style={{ marginBottom: "1rem" }}>
               <label><input type="checkbox" checked={autoTransfer} onChange={(e) => setAutoTransfer(e.target.checked)} /> Automatically transfer charges?</label>
            </div>
          </>
        );

       case 'ppf_epf':
        return (
          <>
             <div className={styles.rowInputs}>
              <div className={styles.inputGroup}>
                <label>Trans. Type</label>
                <select className={styles.inputField} value={transType} onChange={(e) => setTransType(e.target.value)}>
                  <option>Investment</option>
                  <option>Interest (Cumulative)</option>
                  <option>Withdrawal</option>
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label>Asset Name</label>
                <select className={styles.inputField}><option>Select Asset</option></select>
              </div>
            </div>
             <div className={styles.rowInputs}>
              <div className={styles.inputGroup}>
                <label>Interest Rate (%)</label>
                <input type="number" step="any" className={styles.inputField} required />
              </div>
              <div className={styles.inputGroup}>
                  <label style={{display:'flex', gap:'8px'}}><input type="checkbox" checked={maturityEnabled} onChange={e=>setMaturityEnabled(e.target.checked)}/> Maturity Date</label>
                  {maturityEnabled && <input type="date" className={styles.inputField} defaultValue={todayStr} />}
               </div>
             </div>
             <div className={styles.rowInputs}>
               <div className={styles.inputGroup}>
                  <label style={{display:'flex', gap:'8px'}}><input type="checkbox" checked={lockInEnabled} onChange={e=>setLockInEnabled(e.target.checked)}/> Lock-in Period</label>
                  {lockInEnabled && <input type="date" className={styles.inputField} defaultValue={todayStr} />}
               </div>
               <div className={styles.inputGroup}>
                  <label>Date</label>
                  <input type="date" className={styles.inputField} defaultValue={todayStr} required />
               </div>
             </div>
             <div className={styles.inputGroup}>
               <label>Amount (₹)</label>
                 <input type="number" step="any" className={styles.inputField} value={amount} onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : '')} required />
             </div>
             <div className={styles.inputGroup}>
                <label>Narration</label>
                <input type="text" className={styles.inputField} />
              </div>
          </>
        );

       case 'gold':
       case 'silver':
        return (
           <>
              <div className={styles.rowInputs}>
                 <div className={styles.inputGroup}>
                   <label>Trans. Type</label>
                   <select className={styles.inputField}><option>Buy</option><option>Sell</option></select>
                 </div>
                  <div className={styles.inputGroup}>
                   <label>Lot Description</label>
                   <select className={styles.inputField} onChange={(e) => handleDropdownAction(e, 'add_gold')}>
                     <option>Select Lot</option>
                     <option value="ADD_NEW">+ Add New</option>
                   </select>
                 </div>
              </div>
              <div className={styles.rowInputs}>
                 <div className={styles.inputGroup}>
                   <label>Date</label>
                   <input type="date" className={styles.inputField} defaultValue={todayStr} required />
                 </div>
                  <div className={styles.inputGroup}>
                   <label>Quantity ({assetClass === 'silver' ? 'kgs' : 'gms'})</label>
                   <input type="number" step="any" className={styles.inputField} value={qty} onChange={(e) => setQty(e.target.value ? Number(e.target.value) : '')} required />
                 </div>
              </div>
              <div className={styles.rowInputs}>
                 <div className={styles.inputGroup}>
                   <label>Rate per {assetClass === 'silver' ? 'kg' : 'gm'}</label>
                   <input type="number" step="any" className={styles.inputField} value={rate} onChange={(e) => setRate(e.target.value ? Number(e.target.value) : '')} required />
                 </div>
                  <div className={styles.inputGroup}>
                   <label>Amount (₹)</label>
                   <input type="number" step="any" className={styles.inputField} value={amount} onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : '')} required />
                 </div>
              </div>
              <div className={styles.inputGroup}>
                 <label>Narration</label>
                 <input type="text" className={styles.inputField} />
              </div>
           </>
        );

       case 'jewellery':
       case 'art':
         return (
           <>
              <div className={styles.rowInputs}>
                 <div className={styles.inputGroup}>
                   <label>Trans. Type</label>
                   <select className={styles.inputField}><option>Buy</option><option>Sell</option></select>
                 </div>
                  <div className={styles.inputGroup}>
                   <label>Title</label>
                   <select className={styles.inputField} onChange={(e) => handleDropdownAction(e, 'add_art')}>
                     <option>Select Title</option>
                     {assetClass === 'art' && <option value="ADD_NEW">+ Add New</option>}
                   </select>
                 </div>
              </div>
              <div className={styles.rowInputs}>
                 <div className={styles.inputGroup}>
                   <label>Date</label>
                   <input type="date" className={styles.inputField} defaultValue={todayStr} required />
                 </div>
                  <div className={styles.inputGroup}>
                   <label>Amount (₹)</label>
                 <input type="number" step="any" className={styles.inputField} value={amount} onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : '')} required />
                 </div>
              </div>
              <div className={styles.inputGroup}>
                 <label>Narration</label>
                 <input type="text" className={styles.inputField} />
              </div>
           </>
         );
       
       case 'property':
         return (
           <>
              <div className={styles.rowInputs}>
                 <div className={styles.inputGroup}>
                   <label>Trans. Type</label>
                   <select className={styles.inputField}><option>Buy</option><option>Sell</option></select>
                 </div>
                  <div className={styles.inputGroup}>
                   <label>Property Name</label>
                   <select className={styles.inputField} onChange={(e) => handleDropdownAction(e, 'add_property')}>
                     <option>Select Property</option>
                     <option value="ADD_NEW">+ Add New</option>
                   </select>
                 </div>
              </div>
              <div className={styles.rowInputs}>
                 <div className={styles.inputGroup}>
                   <label>Date</label>
                   <input type="date" className={styles.inputField} defaultValue={todayStr} required />
                 </div>
                  <div className={styles.inputGroup}>
                   <label>Area</label>
                 <input type="number" step="any" className={styles.inputField} value={qty} onChange={(e) => setQty(e.target.value ? Number(e.target.value) : '')} required />
                 </div>
              </div>
               <div className={styles.rowInputs}>
                 <div className={styles.inputGroup}>
                   <label>Rate/Unit Area</label>
                 <input type="number" step="any" className={styles.inputField} value={rate} onChange={(e) => setRate(e.target.value ? Number(e.target.value) : '')} required />
                 </div>
                  <div className={styles.inputGroup}>
                   <label>Amount (₹)</label>
                 <input type="number" step="any" className={styles.inputField} value={amount} onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : '')} required />
                 </div>
              </div>
              <div className={styles.inputGroup}>
                 <label>Narration</label>
                 <input type="text" className={styles.inputField} />
              </div>
           </>
         );

        case 'aif':
          return (
             <>
               <div className={styles.rowInputs}>
                 <div className={styles.inputGroup}>
                   <label>Trans. Type</label>
                   <select className={styles.inputField} value={transType} onChange={(e) => setTransType(e.target.value)}>
                     <option>Investment</option>
                     <option>Interest (Cumulative)</option>
                     <option>Interest (Payout)</option>
                     <option>Withdrawal</option>
                     <option>Admin & Other Charges</option>
                     <option>Setup Fees</option>
                   </select>
                 </div>
                  <div className={styles.inputGroup}>
                   <label>Asset Name</label>
                   <select className={styles.inputField}>
                     <option>Select Asset</option>
                   </select>
                 </div>
              </div>
              <div className={styles.rowInputs}>
                 <div className={styles.inputGroup}>
                   <label>Date</label>
                   <input type="date" className={styles.inputField} defaultValue={todayStr} required />
                 </div>
                  <div className={styles.inputGroup}>
                   <label>Amount (₹)</label>
                 <input type="number" step="any" className={styles.inputField} value={amount} onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : '')} required />
                 </div>
              </div>
              
              {transType === 'Investment' && (
                  <div className={styles.rowInputs}>
                    <div className={styles.inputGroup}>
                      <label>Setup Fees / Stamp Duty</label>
                      <input type="number" step="any" className={styles.inputField} />
                    </div>
                     <div className={styles.inputGroup}>
                      <label>Admin & Other Charges</label>
                      <input type="number" step="any" className={styles.inputField} />
                    </div>
                 </div>
              )}
              {transType === 'Interest (Payout)' && (
                 <div className={styles.inputGroup}>
                      <label>TDS</label>
                      <input type="number" step="any" className={styles.inputField} />
                 </div>
              )}
              {transType === 'Withdrawal' && (
                 <div className={styles.rowInputs}>
                    <div className={styles.inputGroup}>
                      <label>Principal Amt</label>
                      <input type="number" step="any" className={styles.inputField} />
                    </div>
                     <div className={styles.inputGroup}>
                      <label>Interest</label>
                      <input type="number" step="any" className={styles.inputField} />
                    </div>
                 </div>
              )}
               {(transType === 'Interest (Payout)' || transType === 'Withdrawal' || transType === 'Admin & Other Charges' || transType === 'Setup Fees') && (
                 <div className={styles.inputGroup}>
                      <label>Net Amount</label>
                      <input type="number" step="any" className={styles.inputField} />
                 </div>
              )}
               {(transType === 'Admin & Other Charges' || transType === 'Setup Fees') && (
                 <div className={styles.rowInputs}>
                    <div className={styles.inputGroup}>
                      <label>Quantity</label>
                 <input type="number" step="any" className={styles.inputField} value={qty} onChange={(e) => setQty(e.target.value ? Number(e.target.value) : '')} />
                    </div>
                     <div className={styles.inputGroup}>
                      <label>Rate</label>
                 <input type="number" step="any" className={styles.inputField} value={rate} onChange={(e) => setRate(e.target.value ? Number(e.target.value) : '')} />
                    </div>
                 </div>
              )}
               <div className={styles.inputGroup}>
                 <label>Narration</label>
                 <input type="text" className={styles.inputField} />
              </div>
             </>
          );

        case 'loans':
          return (
            <>
               <div className={styles.rowInputs}>
                 <div className={styles.inputGroup}>
                   <label>Trans. Type</label>
                   <select className={styles.inputField} value={transType} onChange={(e) => setTransType(e.target.value)}>
                     <option>Borrow</option>
                     <option>Interest (Cumulative)</option>
                     <option>Interest (Payout)</option>
                     <option>Payback</option>
                   </select>
                 </div>
                  <div className={styles.inputGroup}>
                   <label>Asset Name</label>
                   <select className={styles.inputField}>
                     <option>Select Loan</option>
                   </select>
                 </div>
              </div>
              <div className={styles.rowInputs}>
                 <div className={styles.inputGroup}>
                   <label>Interest Rate (%)</label>
                   <input type="number" step="any" className={styles.inputField} required />
                 </div>
                  <div className={styles.inputGroup}>
                   <label>Interest Type</label>
                    <select className={styles.inputField}>
                     <option>Cumulative</option>
                     <option>Payout</option>
                   </select>
                 </div>
              </div>
               <div className={styles.rowInputs}>
                 <div className={styles.inputGroup}>
                   <label>Interest Payment</label>
                   <select className={styles.inputField}>
                     <option>Yearly</option>
                     <option>Half Yearly</option>
                     <option>Quarterly</option>
                     <option>Monthly</option>
                   </select>
                 </div>
                  <div className={styles.inputGroup}>
                    <label style={{display:'flex', gap:'8px'}}><input type="checkbox" checked={maturityEnabled} onChange={e=>setMaturityEnabled(e.target.checked)}/> Maturity Date</label>
                    {maturityEnabled && <input type="date" className={styles.inputField} defaultValue={todayStr} />}
                 </div>
              </div>
               <div className={styles.rowInputs}>
                  <div className={styles.inputGroup}>
                     <label>Date</label>
                     <input type="date" className={styles.inputField} defaultValue={todayStr} required />
                  </div>
                  <div className={styles.inputGroup}>
                     <label>Amount (₹)</label>
                 <input type="number" step="any" className={styles.inputField} value={amount} onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : '')} required />
                  </div>
               </div>
               {transType === 'Payback' && (
                  <>
                     <div className={styles.rowInputs}>
                        <div className={styles.inputGroup}>
                           <label>From Principal Amt</label>
                           <input type="number" step="any" className={styles.inputField} />
                        </div>
                        <div className={styles.inputGroup}>
                           <label>Interest</label>
                           <input type="number" step="any" className={styles.inputField} />
                        </div>
                     </div>
                     <div className={styles.rowInputs}>
                        <div className={styles.inputGroup}>
                           <label>Loan Charges</label>
                           <input type="number" step="any" className={styles.inputField} />
                        </div>
                        <div className={styles.inputGroup}>
                           <label>Net Amount</label>
                           <input type="number" step="any" className={styles.inputField} />
                        </div>
                     </div>
                  </>
               )}
                <div className={styles.inputGroup}>
                 <label>Narration</label>
                 <input type="text" className={styles.inputField} />
              </div>
            </>
          );

      default:
        return <p style={{color: 'gray'}}>Select an asset class to see credentials.</p>;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Scan the sprawling dynamic inputs for primary data points
    const inputs = Array.from(e.currentTarget.querySelectorAll('input:not([type="checkbox"]), select'));
    let extractedName = assetClass.replace(/_/g, ' ').toUpperCase();
    let extractedInvested = typeof amount === 'number' ? amount : 0;
    let extractedDate = '';
    
    inputs.forEach(el => {
       const input = el as HTMLInputElement;
       const val = input.value;
       
       if (input.type === 'date' && val) {
          extractedDate = val;
       }

       // Simple heuristic to grab text vs numbers
       if (val && isNaN(Number(val)) && !val.includes('-') && val !== 'Buy' && val !== 'Investment' && val !== 'Select Broker' && val !== 'Select Asset') {
          if (val !== 'ADD_NEW') extractedName = val;
       }
       if (val && !isNaN(Number(val)) && Number(val) > 100 && extractedInvested === 0) {
          extractedInvested = Number(val);
       }
    });

    addHolding({
       name: extractedName.length > 2 ? extractedName : assetClass,
       class: assetClass.replace(/_/g, ' '),
       invested: extractedInvested || 0, 
       current: extractedInvested || 0, // Genuine calculation: starts with 0% return instead of fake +15%
       initialDate: extractedDate
    });
    
    setIsOpen(false);
  };

  return (
    <>
      <button className={className || styles.addBtn} onClick={handleOpen}>
        {text}
      </button>

      {isOpen && (
        <div className={styles.modalOverlay} onClick={handleClose}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Add New Asset / Trans.</h2>
              <button className={styles.closeBtn} onClick={handleClose}>×</button>
            </div>

            <form className={styles.modalForm} onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label>Asset Class</label>
                <select 
                  required 
                  className={styles.inputField}
                  value={assetClass}
                  onChange={(e) => setAssetClass(e.target.value)}
                >
                  <option value="stocks_etfs">Stocks & ETFs</option>
                  <option value="mutual_funds_equity">Mutual Funds (Equity)</option>
                  <option value="mutual_funds_debt">Mutual Funds (Debt)</option>
                  <option value="sif">SIF</option>
                  <option value="banks">Banks</option>
                  <option value="nps_ulip">NPS / ULIP</option>
                  <option value="insurance">Insurance</option>
                  <option value="private_equity">Private Equity</option>
                  <option value="fds">FDs</option>
                  <option value="traded_bonds">Traded Bonds</option>
                  <option value="ncd_debentures">NCDs/Debentures</option>
                  <option value="deposits_loans">Deposits/Loans</option>
                  <option value="ppf_epf">PPF/EPF</option>
                  <option value="post_office">Post Office</option>
                  <option value="gold">Gold</option>
                  <option value="silver">Silver</option>
                  <option value="jewellery">Jewellery</option>
                  <option value="property">Property</option>
                  <option value="art">Art</option>
                  <option value="aif">AIF</option>
                  <option value="loans">Loans</option>
                </select>
              </div>

              {/* Central rendering engine handles the nested 21-category hierarchy natively */}
              {renderDynamicFields()}

              <div className={styles.modalFooter}>
                <button type="button" className={styles.cancelBtn} onClick={handleClose}>Cancel</button>
                <button type="submit" className={styles.submitBtn}>Save Investment</button>
              </div>
            </form>
          </div>
          
          {/* Sub-modal Overlay Engine */}
          <SubModal activeSubModal={activeSubModal} setActiveSubModal={setActiveSubModal} />
        </div>
      )}
    </>
  );
}
