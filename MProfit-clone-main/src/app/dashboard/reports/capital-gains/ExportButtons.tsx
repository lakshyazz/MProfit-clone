'use client';
import React from 'react';

const TRANSACTIONS = [
  { asset: 'Reliance Industries', type: 'Equity', buyDate: '12-May-2022', sellDate: '15-Aug-2023', qty: 100, buyValue: 240000, sellValue: 280000, gain: 40000, cgType: 'LTCG' },
  { asset: 'Infosys', type: 'Equity', buyDate: '10-Jan-2023', sellDate: '05-Sep-2023', qty: 50, buyValue: 75000, sellValue: 82000, gain: 7000, cgType: 'STCG' },
  { asset: 'HDFC Bank', type: 'Equity', buyDate: '01-Apr-2023', sellDate: '10-Oct-2023', qty: 200, buyValue: 320000, sellValue: 310000, gain: -10000, cgType: 'STCL' },
  { asset: 'Axis Midcap Direct', type: 'Mutual Fund', buyDate: '20-Feb-2020', sellDate: '22-Nov-2023', qty: 1540.5, buyValue: 450000, sellValue: 620000, gain: 170000, cgType: 'LTCG' },
];

const fmt = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Math.abs(n));

interface ExportButtonsProps {
  excelClass?: string;
  pdfClass?: string;
}

export default function ExportButtons({ excelClass, pdfClass }: ExportButtonsProps) {
  const handleExcel = () => {
    const rows = [
      'Asset,Type,Buy Date,Sell Date,Qty,Buy Value (INR),Sell Value (INR),Gain/Loss (INR),CG Type',
      ...TRANSACTIONS.map(t =>
        `"${t.asset}","${t.type}","${t.buyDate}","${t.sellDate}",${t.qty},${t.buyValue},${t.sellValue},${t.gain},"${t.cgType}"`
      ),
      '',
      'SUMMARY',
      `Total LTCG (Equity),,,,,,,,210000`,
      `Total STCG (Equity),,,,,,,,7000`,
      `Total STCL (Carried Forward),,,,,,,,-10000`,
      `Estimated Tax Liability,,,,,,,,17550`,
    ].join('\n');

    const blob = new Blob([rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.setAttribute('download', 'capital_gains_report.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handlePdf = () => {
    const today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });

    const rows = TRANSACTIONS.map(t => `
      <tr>
        <td>${t.asset}</td>
        <td>${t.type}</td>
        <td>${t.buyDate}</td>
        <td>${t.sellDate}</td>
        <td style="text-align:right">${t.qty}</td>
        <td style="text-align:right">${fmt(t.buyValue)}</td>
        <td style="text-align:right">${fmt(t.sellValue)}</td>
        <td style="text-align:right; color:${t.gain >= 0 ? '#16a34a' : '#dc2626'}; font-weight:600">
          ${t.gain >= 0 ? '+' : '-'} ${fmt(t.gain)}
        </td>
        <td>
          <span style="
            padding:2px 8px; border-radius:12px; font-size:11px; font-weight:700;
            background:${t.cgType === 'LTCG' ? '#dcfce7' : t.cgType === 'STCG' ? '#dbeafe' : '#fee2e2'};
            color:${t.cgType === 'LTCG' ? '#15803d' : t.cgType === 'STCG' ? '#1d4ed8' : '#b91c1c'};
          ">${t.cgType}</span>
        </td>
      </tr>`).join('');

    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Capital Gains Report - MProfit</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', Arial, sans-serif; color: #111827; background: #fff; padding: 40px; font-size: 13px; }

    .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 32px; padding-bottom: 20px; border-bottom: 2px solid #e5e7eb; }
    .logo { font-size: 22px; font-weight: 700; color: #1e3a5f; letter-spacing: -0.5px; }
    .logo span { color: #2563eb; }
    .report-meta { text-align: right; color: #6b7280; font-size: 12px; }
    .report-meta h2 { font-size: 16px; font-weight: 700; color: #111827; margin-bottom: 4px; }

    .summary-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 28px; }
    .summary-card { border: 1px solid #e5e7eb; border-radius: 10px; padding: 16px; }
    .summary-card .label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #6b7280; margin-bottom: 6px; }
    .summary-card .value { font-size: 18px; font-weight: 700; }
    .summary-card .sub { font-size: 11px; color: #9ca3af; margin-top: 4px; }
    .positive { color: #16a34a; }
    .negative { color: #dc2626; }
    .highlight-card { background: #1e3a5f; border-color: #1e3a5f; }
    .highlight-card .label, .highlight-card .sub { color: #94a3b8; }
    .highlight-card .value { color: #fff; }

    .section-title { font-size: 14px; font-weight: 700; color: #1e3a5f; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid #e5e7eb; }

    table { width: 100%; border-collapse: collapse; margin-bottom: 28px; }
    thead tr { background: #f9fafb; }
    th { padding: 10px 12px; text-align: left; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #6b7280; border-bottom: 2px solid #e5e7eb; }
    td { padding: 10px 12px; border-bottom: 1px solid #f3f4f6; font-size: 12.5px; color: #374151; }
    tr:hover td { background: #f9fafb; }

    .disclaimer { background: #fffbeb; border: 1px solid #fcd34d; border-radius: 8px; padding: 12px 16px; font-size: 11.5px; color: #92400e; margin-top: 16px; }
    .disclaimer strong { font-weight: 700; }

    .footer { margin-top: 32px; padding-top: 16px; border-top: 1px solid #e5e7eb; display: flex; justify-content: space-between; color: #9ca3af; font-size: 11px; }

    @media print {
      body { padding: 20px; }
      .summary-grid { grid-template-columns: repeat(4, 1fr); }
    }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="logo">M<span>Profit</span></div>
      <div style="color:#6b7280; font-size:12px; margin-top:4px;">Next-Generation Portfolio Intelligence</div>
    </div>
    <div class="report-meta">
      <h2>Capital Gains Report</h2>
      <div>Financial Year: <strong>FY 2023-24 (AY 2024-25)</strong></div>
      <div>Generated on: <strong>${today}</strong></div>
      <div>PAN: <strong>ABCDE1234F</strong></div>
    </div>
  </div>

  <div class="summary-grid">
    <div class="summary-card">
      <div class="label">Total LTCG (Equity)</div>
      <div class="value positive">₹ 2,10,000</div>
      <div class="sub">Exempt up to ₹1,00,000 · Tax @ 10%</div>
    </div>
    <div class="summary-card">
      <div class="label">Total STCG (Equity)</div>
      <div class="value positive">₹ 7,000</div>
      <div class="sub">Taxable at 15%</div>
    </div>
    <div class="summary-card">
      <div class="label">Total STCL (Carried Fwd)</div>
      <div class="value negative">- ₹ 10,000</div>
      <div class="sub">Set off against future CG</div>
    </div>
    <div class="summary-card highlight-card">
      <div class="label">Est. Tax Liability</div>
      <div class="value">₹ 17,550</div>
      <div class="sub">LTCG + STCG after exemption</div>
    </div>
  </div>

  <div class="section-title">Realized Transactions — FY 2023-24</div>
  <table>
    <thead>
      <tr>
        <th>Asset Name</th>
        <th>Type</th>
        <th>Buy Date</th>
        <th>Sell Date</th>
        <th style="text-align:right">Qty</th>
        <th style="text-align:right">Buy Value</th>
        <th style="text-align:right">Sell Value</th>
        <th style="text-align:right">Gain / Loss</th>
        <th>CG Type</th>
      </tr>
    </thead>
    <tbody>
      ${rows}
    </tbody>
  </table>

  <div class="disclaimer">
    <strong>⚠️ Disclaimer:</strong> This report is auto-generated by MProfit for reference purposes only.
    Capital gains calculations are estimates based on data entered by the user. Please consult a
    qualified Chartered Accountant before filing your Income Tax Return (ITR). Tax laws may change.
  </div>

  <div class="footer">
    <div>MProfit Next-Gen — Capital Gains Report — FY 2023-24</div>
    <div>Page 1 of 1 · Confidential</div>
  </div>

  <script>
    window.onload = function() { window.print(); };
  </script>
</body>
</html>`;

    const printWindow = window.open('', '_blank', 'width=1000,height=750');
    if (printWindow) {
      printWindow.document.write(html);
      printWindow.document.close();
    }
  };

  return (
    <>
      <button className={excelClass} onClick={handleExcel}>Export Excel</button>
      <button className={pdfClass} onClick={handlePdf}>Download PDF</button>
    </>
  );
}
