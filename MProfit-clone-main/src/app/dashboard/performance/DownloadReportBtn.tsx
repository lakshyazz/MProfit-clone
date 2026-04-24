'use client';
import React from 'react';

export default function DownloadReportBtn({ className }: { className?: string }) {
  const handleDownload = () => {
    const today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });

    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Detailed Tax Report - MProfit</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family:'Inter', Arial, sans-serif; color:#111827; background:#fff; padding:40px; font-size:13px; }

    .header { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:28px; padding-bottom:20px; border-bottom:2px solid #e5e7eb; }
    .logo { font-size:22px; font-weight:700; color:#1e3a5f; }
    .logo span { color:#2563eb; }
    .meta { text-align:right; font-size:12px; color:#6b7280; }
    .meta h2 { font-size:16px; font-weight:700; color:#111827; margin-bottom:4px; }

    .grid4 { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:24px; }
    .card { border:1px solid #e5e7eb; border-radius:10px; padding:14px; }
    .card .lbl { font-size:10.5px; font-weight:700; text-transform:uppercase; letter-spacing:.5px; color:#6b7280; margin-bottom:5px; }
    .card .val { font-size:18px; font-weight:700; }
    .card .sub { font-size:11px; color:#9ca3af; margin-top:3px; }
    .pos { color:#16a34a; } .neg { color:#dc2626; }
    .dark { background:#1e3a5f; border-color:#1e3a5f; }
    .dark .lbl,.dark .sub { color:#94a3b8; } .dark .val { color:#fff; }

    h3 { font-size:13px; font-weight:700; color:#1e3a5f; margin:20px 0 10px; padding-bottom:8px; border-bottom:1px solid #e5e7eb; }

    table { width:100%; border-collapse:collapse; margin-bottom:20px; }
    thead tr { background:#f9fafb; }
    th { padding:9px 12px; font-size:10.5px; font-weight:700; text-transform:uppercase; letter-spacing:.5px; color:#6b7280; border-bottom:2px solid #e5e7eb; text-align:left; }
    td { padding:9px 12px; border-bottom:1px solid #f3f4f6; font-size:12.5px; color:#374151; }
    .num { text-align:right; }

    .mini-grid { display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:20px; }
    .mini-card { border:1px solid #e5e7eb; border-radius:8px; padding:12px 16px; }
    .mini-card h4 { font-size:12px; font-weight:600; color:#374151; margin-bottom:8px; }
    .mini-card .row { display:flex; justify-content:space-between; font-size:12px; margin-bottom:4px; }
    .mini-card .row .k { color:#6b7280; } .mini-card .row .v { font-weight:600; }

    .disc { background:#fffbeb; border:1px solid #fcd34d; border-radius:8px; padding:12px 16px; font-size:11.5px; color:#92400e; margin-top:12px; }
    .footer { margin-top:28px; padding-top:14px; border-top:1px solid #e5e7eb; display:flex; justify-content:space-between; font-size:11px; color:#9ca3af; }

    @media print { body { padding:20px; } }
  </style>
</head>
<body>

<div class="header">
  <div>
    <div class="logo">M<span>Profit</span></div>
    <div style="font-size:12px;color:#6b7280;margin-top:4px;">Next-Generation Portfolio Intelligence</div>
  </div>
  <div class="meta">
    <h2>Detailed Tax Report</h2>
    <div>Financial Year: <strong>FY 2023-24 (AY 2024-25)</strong></div>
    <div>Generated on: <strong>${today}</strong></div>
    <div>PAN: <strong>ABCDE1234F</strong></div>
  </div>
</div>

<div class="grid4">
  <div class="card"><div class="lbl">Overall XIRR</div><div class="val pos">19.4%</div><div class="sub">Annualized Return</div></div>
  <div class="card"><div class="lbl">Unrealized Gains</div><div class="val pos">₹ 57,45,930</div><div class="sub">Current market surge</div></div>
  <div class="card"><div class="lbl">Realized Gains</div><div class="val pos">₹ 12,50,000</div><div class="sub">Booked profits</div></div>
  <div class="card dark"><div class="lbl">Est. Tax Liability</div><div class="val">₹ 17,550</div><div class="sub">All heads combined</div></div>
</div>

<h3>Capital Gains Breakdown</h3>
<table>
  <thead>
    <tr>
      <th>Category</th><th>Description</th><th class="num">Amount (₹)</th><th class="num">Tax Rate</th><th class="num">Est. Tax (₹)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>LTCG — Equity</td>
      <td>Assets held &gt; 12 months (Sec 112A). Exempt up to ₹1,00,000.</td>
      <td class="num"><span class="pos">+ ₹ 2,10,000</span></td>
      <td class="num">10%</td>
      <td class="num">₹ 11,000</td>
    </tr>
    <tr>
      <td>LTCG — Mutual Funds (Equity)</td>
      <td>Held &gt; 12 months. Indexed cost not applicable post-2018.</td>
      <td class="num"><span class="pos">+ ₹ 1,70,000</span></td>
      <td class="num">10%</td>
      <td class="num">₹ 7,000</td>
    </tr>
    <tr>
      <td>STCG — Equity</td>
      <td>Assets held &lt; 12 months (Sec 111A).</td>
      <td class="num"><span class="pos">+ ₹ 7,000</span></td>
      <td class="num">15%</td>
      <td class="num">₹ 1,050</td>
    </tr>
    <tr>
      <td>STCL — Equity</td>
      <td>Carry-forward loss available for 8 years.</td>
      <td class="num"><span class="neg">- ₹ 10,000</span></td>
      <td class="num">Set-off</td>
      <td class="num" style="color:#16a34a">- ₹ 1,500</td>
    </tr>
    <tr>
      <td>Intraday / Speculative</td>
      <td>Day-trading P&amp;L — treated as Business Income.</td>
      <td class="num"><span class="neg">- ₹ 2,10,000</span></td>
      <td class="num">Slab rate</td>
      <td class="num">₹ 0 (carry fwd)</td>
    </tr>
    <tr style="background:#f9fafb; font-weight:700;">
      <td colspan="4">Total Estimated Tax Payable</td>
      <td class="num">₹ 17,550</td>
    </tr>
  </tbody>
</table>

<div class="mini-grid">
  <div class="mini-card">
    <h4>Dividend &amp; Interest Income (Passive Income)</h4>
    <div class="row"><span class="k">Dividends Received</span><span class="v pos">₹ 2,32,000</span></div>
    <div class="row"><span class="k">FD Interest Earned</span><span class="v pos">₹ 75,000</span></div>
    <div class="row"><span class="k">PPF Interest (Tax-Free)</span><span class="v">₹ 1,06,000</span></div>
    <div class="row"><span class="k">EPF Interest</span><span class="v">₹ 1,79,300</span></div>
    <div class="row" style="margin-top:8px; border-top:1px solid #e5e7eb; padding-top:6px;"><span class="k"><strong>Total Income</strong></span><span class="v pos">₹ 3,45,200</span></div>
  </div>
  <div class="mini-card">
    <h4>Quarterly Performance Summary</h4>
    <div class="row"><span class="k">2021 — Full Year</span><span class="v pos">+30.2%</span></div>
    <div class="row"><span class="k">2022 — Full Year</span><span class="v pos">+6.8%</span></div>
    <div class="row"><span class="k">2023 — Full Year</span><span class="v pos">+24.2%</span></div>
    <div class="row"><span class="k">2024 — YTD</span><span class="v pos">+10.7%</span></div>
    <div class="row" style="margin-top:8px; border-top:1px solid #e5e7eb; padding-top:6px;"><span class="k"><strong>Overall XIRR</strong></span><span class="v pos">19.4%</span></div>
  </div>
</div>

<div class="disc">
  <strong>⚠️ Disclaimer:</strong> This report has been automatically generated by MProfit for informational reference only.
  All figures are estimates based on data entered by the user. Tax calculations may vary based on applicable deductions,
  exemptions, and surcharges. Please consult a qualified Chartered Accountant (CA) or tax advisor before filing your
  Income Tax Return (ITR). MProfit assumes no liability for tax assessments or penalties arising from this report.
</div>

<div class="footer">
  <div>MProfit Next-Gen — Detailed Tax Report — FY 2023-24</div>
  <div>Confidential · For personal use only</div>
</div>

<script>window.onload = function() { window.print(); };</script>
</body>
</html>`;

    const win = window.open('', '_blank', 'width=1050,height=800');
    if (win) {
      win.document.write(html);
      win.document.close();
    }
  };

  return (
    <button className={className} onClick={handleDownload}>
      Download Detailed Tax Report
    </button>
  );
}
