'use client';

import React, { useMemo, useState } from 'react';
import { TENANT_STATUTES_2026, type StateStatute } from '@/data/tenant_statutes_2026';
import IcsDeadlineButton from '@/components/IcsDeadlineButton';
import ToolPaywallDossier from '@/components/ToolPaywallDossier';

type ItemCategory = 'cleaning' | 'paint' | 'carpet' | 'blinds' | 'other';
type MetroTier = 'high' | 'mid' | 'standard';

interface DeductionRow {
  id: string;
  description: string;
  category: ItemCategory;
  billedUsd: number;
  ageYears: number;
  noReceipt: boolean;
  wearAndTear: boolean;
}

const DEFAULT_ROWS: DeductionRow[] = [
  {
    id: 'row-cleaning',
    description: 'Move-Out Deep Cleaning',
    category: 'cleaning',
    billedUsd: 580,
    ageYears: 1,
    noReceipt: true,
    wearAndTear: false
  },
  {
    id: 'row-paint',
    description: 'Full Unit Interior Repainting',
    category: 'paint',
    billedUsd: 1250,
    ageYears: 3.5,
    noReceipt: false,
    wearAndTear: true
  },
  {
    id: 'row-carpet',
    description: 'Carpet Replacement',
    category: 'carpet',
    billedUsd: 1650,
    ageYears: 5.5,
    noReceipt: true,
    wearAndTear: true
  },
  {
    id: 'row-blinds',
    description: 'Window Blinds Replacement',
    category: 'blinds',
    billedUsd: 320,
    ageYears: 4,
    noReceipt: false,
    wearAndTear: true
  }
];

const METRO_MULTIPLIER: Record<MetroTier, { label: string; factor: number; cleaningCap: number }> = {
  high: {
    label: 'High-Cost Metro (NYC / SF / LA / Seattle / Boston)',
    factor: 1.25,
    cleaningCap: 375
  },
  mid: {
    label: 'Mid-Tier Metro (Austin / Denver / Chicago / Miami)',
    factor: 1.0,
    cleaningCap: 300
  },
  standard: {
    label: 'Standard U.S. Metro',
    factor: 0.85,
    cleaningCap: 240
  }
};

const USEFUL_LIFE_YEARS: Record<ItemCategory, number> = {
  cleaning: 0,
  paint: 3,
  carpet: 6,
  blinds: 4,
  other: 5
};

function getStateReceiptRule(state: StateStatute): {
  thresholdUsd: number | null;
  citation: string;
  summary: string;
} {
  switch (state.code) {
    case 'CA':
      return {
        thresholdUsd: 125,
        citation: 'Cal. Civ. Code § 1950.5(g)(2)',
        summary: 'California requires copies of vendor invoices/receipts for any deduction or total deductions of $125 or more within 21 days.'
      };
    case 'NY':
      return {
        thresholdUsd: 1,
        citation: 'N.Y. Gen. Oblig. Law § 7-108(1-a)(e)',
        summary: 'New York requires an itemized statement specifying the exact basis for every dollar withheld within 14 days, or landlord forfeits the right to retain any portion.'
      };
    case 'MA':
      return {
        thresholdUsd: 1,
        citation: 'Mass. Gen. Laws ch. 186 § 15B(4)(iii)',
        summary: 'Massachusetts requires an itemized damage list sworn under pains and penalties of perjury plus written repair estimates/receipts within 30 days.'
      };
    case 'WA':
      return {
        thresholdUsd: 1,
        citation: 'Wash. Rev. Code § 59.18.280(1)',
        summary: 'Washington requires a full and specific statement together with copies of estimates, invoices, or receipts within 30 days.'
      };
    case 'TX':
      return {
        thresholdUsd: 1,
        citation: 'Tex. Prop. Code § 92.104',
        summary: 'Texas requires a written description and itemized list of all deductions within 30 days; bad-faith retention triggers 3x + $100.'
      };
    default:
      return {
        thresholdUsd: 150,
        citation: state.statuteCitation,
        summary: `${state.name} requires itemized accounting within ${state.itemizedReturnDays} days (${state.statuteCitation}). Unsubstantiated lump-sum charges without vendor invoices are routinely disallowed in Small Claims Court.`
      };
  }
}

export default function DeductionInvoiceAuditor() {
  const [stateCode, setStateCode] = useState('CA');
  const [metroTier, setMetroTier] = useState<MetroTier>('high');
  const [rows, setRows] = useState<DeductionRow[]>(DEFAULT_ROWS);
  const [copiedNotice, setCopiedNotice] = useState(false);

  const selectedState = useMemo(
    () => TENANT_STATUTES_2026.find((s) => s.code === stateCode) || TENANT_STATUTES_2026[4],
    [stateCode]
  );

  const receiptRule = useMemo(() => getStateReceiptRule(selectedState), [selectedState]);
  const metro = METRO_MULTIPLIER[metroTier];

  const auditedRows = useMemo(() => {
    return rows.map((row) => {
      const billed = Math.max(0, Number(row.billedUsd) || 0);
      const reasons: string[] = [];
      let allowable = billed;

      // 1. Check receipt threshold violation
      const receiptRequired =
        receiptRule.thresholdUsd !== null && billed >= receiptRule.thresholdUsd;
      if (row.noReceipt && receiptRequired) {
        allowable = 0;
        reasons.push(
          `Missing vendor receipt (violates ${receiptRule.citation}${receiptRule.thresholdUsd && receiptRule.thresholdUsd > 1 ? ` $${receiptRule.thresholdUsd} threshold` : ''})`
        );
      }

      // 2. Check normal wear & tear / useful life over 3+ yrs
      const lifeYrs = USEFUL_LIFE_YEARS[row.category];
      if (row.wearAndTear) {
        allowable = 0;
        reasons.push('Normal wear & tear / past useful life ($0 tenant liability)');
      } else if (lifeYrs > 0 && row.ageYears >= lifeYrs) {
        allowable = 0;
        reasons.push(`0% remaining useful life (${row.ageYears} yrs >= ${lifeYrs}-yr HUD cap)`);
      } else if (lifeYrs > 0 && row.ageYears > 0 && allowable > 0) {
        const remainingRatio = Math.max(0, (lifeYrs - row.ageYears) / lifeYrs);
        const prorated = Math.round(billed * remainingRatio);
        if (prorated < allowable) {
          allowable = prorated;
          reasons.push(`HUD prorated (${Math.round(remainingRatio * 100)}% remaining life)`);
        }
      }

      // 3. Metro market-rate benchmark check for cleaning
      if (row.category === 'cleaning' && allowable > metro.cleaningCap) {
        allowable = metro.cleaningCap;
        reasons.push(`Exceeds ${metroTier.toUpperCase()} metro cleaning benchmark ($${metro.cleaningCap})`);
      }

      const disputed = Math.max(0, billed - allowable);
      return {
        ...row,
        billed,
        allowable,
        disputed,
        reasons
      };
    });
  }, [rows, receiptRule, metro, metroTier]);

  const totals = useMemo(() => {
    const totalBilled = auditedRows.reduce((s, r) => s + r.billed, 0);
    const totalAllowable = auditedRows.reduce((s, r) => s + r.allowable, 0);
    const totalDisputed = auditedRows.reduce((s, r) => s + r.disputed, 0);
    const badFaithExposure =
      totalDisputed > 0
        ? totalDisputed * selectedState.penaltyMultiplier + selectedState.fixedPenaltyUsd
        : 0;
    return { totalBilled, totalAllowable, totalDisputed, badFaithExposure };
  }, [auditedRows, selectedState]);

  const disputeNoticeText = useMemo(() => {
    const disputedLines = auditedRows
      .filter((r) => r.disputed > 0)
      .map(
        (r) =>
          `- ${r.description}: Billed $${r.billed.toLocaleString()} | Allowable $${r.allowable.toLocaleString()} | Disputed $${r.disputed.toLocaleString()} (${r.reasons.join('; ')})`
      )
      .join('\n');

    return `STATUTORY AUDIT & DEMAND FOR RETURN OF UNLAWFUL DEDUCTIONS (${selectedState.name} - ${selectedState.statuteCitation})\n\nDear Landlord / Property Manager,\n\nPursuant to ${selectedState.statuteCitation} and ${receiptRule.citation}, I formally dispute $${totals.totalDisputed.toLocaleString()} of the $${totals.totalBilled.toLocaleString()} in move-out deductions claimed against my security deposit:\n\n${disputedLines || '- No disputed items.'}\n\nUnder ${selectedState.name} law, normal wear and tear is non-deductible, capital items (carpet, paint, blinds) must be prorated by remaining useful life, and unsubstantiated charges lacking required vendor receipts are void. Please remit the disputed balance of $${totals.totalDisputed.toLocaleString()} within 10 business days to avoid Small Claims Court filing for $${totals.badFaithExposure.toLocaleString()} in statutory bad-faith damages (${selectedState.penaltyMultiplier}x).`;
  }, [auditedRows, selectedState, receiptRule, totals]);

  const updateRow = (id: string, patch: Partial<DeductionRow>) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  };

  const addRow = () => {
    setRows((prev) => [
      ...prev,
      {
        id: `row-${Date.now()}`,
        description: 'Additional Repair / Cleaning Charge',
        category: 'other',
        billedUsd: 250,
        ageYears: 2,
        noReceipt: true,
        wearAndTear: false
      }
    ]);
  };

  const removeRow = (id: string) => {
    setRows((prev) => (prev.length > 1 ? prev.filter((r) => r.id !== id) : prev));
  };

  const handleCopyNotice = async () => {
    try {
      await navigator.clipboard.writeText(disputeNoticeText);
      setCopiedNotice(true);
      setTimeout(() => setCopiedNotice(false), 2500);
    } catch {}
  };

  return (
    <div className="space-y-8">
      {/* Controls & Interactive Line-Item Editor */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 no-print">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label htmlFor="auditor-state" className="block text-xs font-bold uppercase tracking-wider text-slate-600">
              1. Jurisdiction (51 States + D.C.)
            </label>
            <select
              id="auditor-state"
              value={stateCode}
              onChange={(e) => setStateCode(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-[#0f2747]"
            >
              {TENANT_STATUTES_2026.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.name} ({s.code}) — {s.itemizedReturnDays}d · {s.penaltyMultiplier}x
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="auditor-metro" className="block text-xs font-bold uppercase tracking-wider text-slate-600">
              2. Metro Market-Rate Benchmark
            </label>
            <select
              id="auditor-metro"
              value={metroTier}
              onChange={(e) => setMetroTier(e.target.value as MetroTier)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-[#0f2747]"
            >
              {Object.entries(METRO_MULTIPLIER).map(([key, val]) => (
                <option key={key} value={key}>
                  {val.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-[#0f2747]/5 border border-[#0f2747]/15 text-xs text-slate-700">
          <strong className="text-[#0f2747]">Receipt Rule ({receiptRule.citation}):</strong>{' '}
          {receiptRule.summary}
        </div>

        {/* Editable Rows */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-sm font-extrabold text-[#0f2747] uppercase tracking-wider">
              3. Itemized Move-Out Deductions
            </h2>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setRows(DEFAULT_ROWS)}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition cursor-pointer"
              >
                Reset Example
              </button>
              <button
                type="button"
                onClick={addRow}
                className="px-3 py-1.5 rounded-lg bg-[#0f2747] hover:bg-[#1a3b68] text-white text-xs font-bold transition cursor-pointer"
              >
                + Add Line Item
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {rows.map((row) => (
              <div
                key={row.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-3"
              >
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                  <div className="sm:col-span-5 space-y-1">
                    <label className="block text-[10px] font-bold uppercase text-slate-500">
                      Deduction Item
                    </label>
                    <input
                      type="text"
                      value={row.description}
                      onChange={(e) => updateRow(row.id, { description: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-semibold text-[#0f2747]"
                    />
                  </div>
                  <div className="sm:col-span-3 space-y-1">
                    <label className="block text-[10px] font-bold uppercase text-slate-500">
                      Category
                    </label>
                    <select
                      value={row.category}
                      onChange={(e) => updateRow(row.id, { category: e.target.value as ItemCategory })}
                      className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-2 text-xs font-semibold text-[#0f2747]"
                    >
                      <option value="cleaning">Cleaning</option>
                      <option value="paint">Interior Paint (3-yr)</option>
                      <option value="carpet">Carpet (6-yr)</option>
                      <option value="blinds">Blinds / Fixtures (4-yr)</option>
                      <option value="other">Other Repair (5-yr)</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2 space-y-1">
                    <label className="block text-[10px] font-bold uppercase text-slate-500">
                      Billed ($)
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={row.billedUsd}
                      onChange={(e) => updateRow(row.id, { billedUsd: Number(e.target.value) })}
                      className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-2 text-xs font-mono font-bold text-[#0f2747]"
                    />
                  </div>
                  <div className="sm:col-span-2 space-y-1">
                    <label className="block text-[10px] font-bold uppercase text-slate-500">
                      Age (Yrs)
                    </label>
                    <div className="flex gap-1.5">
                      <input
                        type="number"
                        min={0}
                        step={0.5}
                        value={row.ageYears}
                        onChange={(e) => updateRow(row.id, { ageYears: Number(e.target.value) })}
                        className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-2 text-xs font-mono font-bold text-[#0f2747]"
                      />
                      {rows.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeRow(row.id)}
                          aria-label="Remove row"
                          className="px-2 py-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold cursor-pointer"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-1">
                  <label className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={row.noReceipt}
                      onChange={(e) => updateRow(row.id, { noReceipt: e.target.checked })}
                      className="h-4 w-4 rounded border-slate-300 text-[#0f2747]"
                    />
                    <span>No Vendor Receipt Attached</span>
                  </label>
                  <label className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={row.wearAndTear}
                      onChange={(e) => updateRow(row.id, { wearAndTear: e.target.checked })}
                      className="h-4 w-4 rounded border-slate-300 text-[#0f2747]"
                    />
                    <span>Normal Wear &amp; Tear / Over 3+ Yrs</span>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Printable 《Line-by-Line Disputed vs. Allowable Audit Table》 */}
      <div className="print-brief bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#c8a24a] font-bold">
              《STATUTORY DEDUCTION AUDIT》 · {selectedState.name} ({selectedState.code})
            </div>
            <h2 className="text-xl font-extrabold text-[#0f2747] mt-0.5">
              《Line-by-Line Disputed vs. Allowable Audit Table》
            </h2>
            <p className="text-xs font-mono text-slate-500 mt-0.5">
              Authority: {selectedState.statuteCitation} · {receiptRule.citation}
            </p>
          </div>
          <div className="no-print flex flex-wrap gap-2">
            <IcsDeadlineButton
              title={`${selectedState.code} Deposit Deduction Audit Deadline`}
              description={`Statutory ${selectedState.itemizedReturnDays}-day deposit itemization & receipt compliance deadline under ${selectedState.statuteCitation}.\nDisputed Total: $${totals.totalDisputed.toLocaleString()}\nBad-Faith Exposure: $${totals.badFaithExposure.toLocaleString()}`}
              daysFromNow={selectedState.itemizedReturnDays}
              url="https://tenantfig.com/calculators/deduction-invoice-auditor/"
              label={`Export ${selectedState.itemizedReturnDays}-Day Deadline (.ics)`}
            />
            <button
              type="button"
              onClick={() => window.print()}
              className="px-4 py-2.5 rounded-xl bg-[#0f2747] hover:bg-[#1a3b68] text-white text-xs font-bold transition cursor-pointer"
            >
              Print / Save Audit Table (PDF)
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="text-[11px] font-medium text-slate-500">Total Billed</div>
            <div className="text-xl font-black tabular-nums text-[#0f2747] mt-0.5">
              ${totals.totalBilled.toLocaleString()}
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200">
            <div className="text-[11px] font-medium text-rose-700">Disputed / Illegal</div>
            <div className="text-xl font-black tabular-nums text-rose-700 mt-0.5">
              ${totals.totalDisputed.toLocaleString()}
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="text-[11px] font-medium text-slate-500">Allowable Net</div>
            <div className="text-xl font-black tabular-nums text-[#0f2747] mt-0.5">
              ${totals.totalAllowable.toLocaleString()}
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
            <div className="text-[11px] font-medium text-emerald-700">
              {selectedState.penaltyMultiplier}x Statutory Exposure
            </div>
            <div className="text-xl font-black tabular-nums text-[#059669] mt-0.5">
              ${totals.badFaithExposure.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Line-by-Line Audit Table */}
        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#0f2747] text-white">
                <th className="py-3 px-4 font-bold">Line Item</th>
                <th className="py-3 px-3 font-bold text-right">Billed</th>
                <th className="py-3 px-3 font-bold text-right">Allowable</th>
                <th className="py-3 px-3 font-bold text-right">Disputed</th>
                <th className="py-3 px-4 font-bold">Statutory Audit Finding</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {auditedRows.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-bold text-[#0f2747]">
                    {r.description}
                    <span className="block text-[10px] font-mono font-normal text-slate-500">
                      Age: {r.ageYears} yr · {r.noReceipt ? 'No Receipt' : 'Receipt Attached'}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-mono tabular-nums font-semibold">
                    ${r.billed.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 text-right font-mono tabular-nums font-semibold text-slate-700">
                    ${r.allowable.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 text-right font-mono tabular-nums font-extrabold text-rose-700">
                    ${r.disputed.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-slate-700">
                    {r.reasons.length > 0 ? (
                      <ul className="list-disc list-inside space-y-0.5">
                        {r.reasons.map((reason, idx) => (
                          <li key={idx}>{reason}</li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-[#059669] font-semibold">
                        Substantiated &amp; within metro benchmark
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-slate-100 font-extrabold text-[#0f2747] border-t-2 border-slate-300">
                <td className="py-3 px-4">TOTAL</td>
                <td className="py-3 px-3 text-right font-mono tabular-nums">
                  ${totals.totalBilled.toLocaleString()}
                </td>
                <td className="py-3 px-3 text-right font-mono tabular-nums">
                  ${totals.totalAllowable.toLocaleString()}
                </td>
                <td className="py-3 px-3 text-right font-mono tabular-nums text-rose-700">
                  ${totals.totalDisputed.toLocaleString()}
                </td>
                <td className="py-3 px-4 text-[#059669] font-mono">
                  Potential {selectedState.penaltyMultiplier}x Claim: ${totals.badFaithExposure.toLocaleString()}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Copyable Itemized Dispute Letter */}
        <div className="bg-[#f6f8fb] border border-slate-200 rounded-xl p-5 space-y-3 no-print">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-extrabold text-[#0f2747]">
                Copyable Itemized Deduction Dispute Letter
              </h3>
              <p className="text-xs text-slate-500">
                Ready for Certified Mail &amp; email transmission to landlord/property manager.
              </p>
            </div>
            <button
              type="button"
              onClick={handleCopyNotice}
              className="px-3.5 py-2 rounded-lg bg-[#059669] hover:bg-emerald-700 text-white text-xs font-bold transition cursor-pointer"
            >
              {copiedNotice ? '✓ Copied Dispute Letter' : 'Copy Dispute Letter'}
            </button>
          </div>
          <pre className="bg-white border border-slate-200 rounded-lg p-4 text-xs font-mono text-slate-800 whitespace-pre-wrap leading-relaxed overflow-x-auto">
            {disputeNoticeText}
          </pre>
        </div>
      </div>

      {/* Monetization Dossier */}
      <ToolPaywallDossier
        badge="DEDUCTION AUDIT & DEMAND KIT"
        title="Download Certified Deduction Rebuttal & Evidence Ledger"
        desc="Unlock the editable .DOCX Itemized Deduction Demand Letter, .XLSX Depreciation & Receipt Audit Workbook, and 51-State Statutory Citation Matrix."
        price="$24.99"
        pid="pdt_0Nsmkl1NJxiaPAsPE2UhB"
        dynamicAmount={`$${totals.totalDisputed.toLocaleString()} Disputed`}
        docType={`${selectedState.code} Deduction Audit Dossier`}
        sampleLines={[
          { label: 'Total Billed', value: `$${totals.totalBilled.toLocaleString()}` },
          { label: 'Disputed / Illegal', value: `$${totals.totalDisputed.toLocaleString()}` },
          { label: 'Statutory Exposure', value: `$${totals.badFaithExposure.toLocaleString()}` }
        ]}
      />
    </div>
  );
}
