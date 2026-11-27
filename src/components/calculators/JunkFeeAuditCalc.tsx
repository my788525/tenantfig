'use client';

import React, { useMemo, useState } from 'react';
import IcsDeadlineButton from '@/components/IcsDeadlineButton';

export default function JunkFeeAuditCalc() {
  const [state, setState] = useState<'IL' | 'CA' | 'NY' | 'CO' | 'OTHER'>('IL');
  const [monthlyUndisclosed, setMonthlyUndisclosed] = useState(85);
  const [oneTimeUndisclosed, setOneTimeUndisclosed] = useState(250);
  const [leaseMonths, setLeaseMonths] = useState(12);
  const [onPageOne, setOnPageOne] = useState<'no' | 'yes'>('no');
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    const annualRecurring = monthlyUndisclosed * leaseMonths;
    const totalUndisclosed = annualRecurring + oneTimeUndisclosed;
    const voidable =
      state === 'IL'
        ? onPageOne === 'no'
        : state === 'CA' || state === 'NY' || state === 'CO';
    const recoverable = voidable ? totalUndisclosed : Math.round(totalUndisclosed * 0.5);
    const statute =
      state === 'IL'
        ? 'Illinois HB 3564 (eff. Jan 1, 2027) — Mandatory Page-1 Lease Fee Disclosure'
        : state === 'CA'
          ? 'California SB 478 / Civ. Code § 1770(a)(29) — Hidden Fee Ban & Deposit Cap'
          : state === 'NY'
            ? 'N.Y. Real Prop. Law § 238-a — $20 Application Cap & Fee Restrictions'
            : state === 'CO'
              ? 'Colorado HB 23-1095 / C.R.S. § 38-12-801 — Prohibited Lease Fee Rules'
              : 'State Consumer Fraud & Deceptive Fee Statutes';

    const notice = `STATUTORY FEE OBJECTION & REFUND DEMAND\nGoverning Law: ${statute}\nUndisclosed Monthly Fees: $${monthlyUndisclosed}/mo x ${leaseMonths} mo = $${annualRecurring}\nUndisclosed One-Time Fees: $${oneTimeUndisclosed}\nTotal Disputed Mandatory Fees: $${totalUndisclosed}\nDemand: Pursuant to ${statute}, mandatory fees omitted from page one or prohibited by state cap are legally uncollectible. Please credit or refund $${recoverable.toLocaleString()} within 14 days.`;

    return { annualRecurring, totalUndisclosed, voidable, recoverable, statute, notice };
  }, [state, monthlyUndisclosed, oneTimeUndisclosed, leaseMonths, onPageOne]);

  const copyNotice = () => {
    navigator.clipboard?.writeText(result.notice).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm no-print">
        <div className="text-xs font-mono uppercase tracking-wider text-[#059669] font-bold">
          2027 JUNK-FEE AUDIT INPUTS
        </div>
        <label className="block text-xs font-bold text-[#0f2747]">
          Jurisdiction
          <select
            value={state}
            onChange={(e) => setState(e.target.value as 'IL' | 'CA' | 'NY' | 'CO' | 'OTHER')}
            className="mt-1.5 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm bg-white"
          >
            <option value="IL">Illinois (HB 3564 · Eff. Jan 1, 2027)</option>
            <option value="CA">California (SB 478 Honest Pricing)</option>
            <option value="NY">New York (RPL § 238-a Fee Caps)</option>
            <option value="CO">Colorado (HB 23-1095 Fee Limits)</option>
            <option value="OTHER">Other U.S. State (UDAP / Consumer Fraud)</option>
          </select>
        </label>
        <label className="block text-xs font-bold text-[#0f2747]">
          Undisclosed Monthly Fees ($/mo — pet, trash, amenity, portal)
          <input
            type="number"
            min={0}
            value={monthlyUndisclosed}
            onChange={(e) => setMonthlyUndisclosed(Math.max(0, Number(e.target.value) || 0))}
            className="mt-1.5 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm"
          />
        </label>
        <label className="block text-xs font-bold text-[#0f2747]">
          Undisclosed One-Time Fees ($ — move-in, admin, lockbox)
          <input
            type="number"
            min={0}
            value={oneTimeUndisclosed}
            onChange={(e) => setOneTimeUndisclosed(Math.max(0, Number(e.target.value) || 0))}
            className="mt-1.5 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm"
          />
        </label>
        <label className="block text-xs font-bold text-[#0f2747]">
          Lease Term (Months)
          <input
            type="number"
            min={1}
            max={36}
            value={leaseMonths}
            onChange={(e) => setLeaseMonths(Math.max(1, Number(e.target.value) || 12))}
            className="mt-1.5 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm"
          />
        </label>
        <label className="block text-xs font-bold text-[#0f2747]">
          Itemized on Page 1 of Your Lease?
          <select
            value={onPageOne}
            onChange={(e) => setOnPageOne(e.target.value as 'no' | 'yes')}
            className="mt-1.5 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm bg-white"
          >
            <option value="no">No — Buried in addendum or billed later</option>
            <option value="yes">Yes — Disclosed on Page 1</option>
          </select>
        </label>
      </div>

      <div className="lg:col-span-7 bg-[#09192e] text-white border border-[#c8a24a]/40 rounded-2xl p-6 space-y-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#e2be68] font-bold">
              2027 STATUTORY JUNK-FEE VERDICT
            </div>
            <h2 className="text-xl font-extrabold">
              {result.voidable ? 'Mandatory Fees Appear Uncollectible' : 'Partial Statutory Challenge Available'}
            </h2>
          </div>
          <div className="bg-[#059669]/20 border border-[#059669]/50 rounded-xl px-4 py-2 text-right">
            <div className="text-[10px] font-mono text-emerald-300">RECOVERABLE / SHIELDED</div>
            <div className="text-2xl font-black text-emerald-400 tabular-nums">
              ${result.recoverable.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="text-xs text-slate-300 space-y-1.5">
          <div><strong className="text-white">Governing Authority:</strong> {result.statute}</div>
          <div><strong className="text-white">Total Disputed Lease-Term Fees:</strong> ${result.totalUndisclosed.toLocaleString()} (${result.annualRecurring.toLocaleString()} recurring + ${oneTimeUndisclosed.toLocaleString()} one-time)</div>
        </div>

        <pre className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 text-[11px] font-mono text-slate-200 whitespace-pre-wrap leading-relaxed">
          {result.notice}
        </pre>

        <div className="flex flex-wrap gap-3 no-print">
          <button
            type="button"
            onClick={copyNotice}
            className="px-4 py-2.5 rounded-xl bg-[#c8a24a] hover:bg-[#e2be68] text-[#09192e] font-extrabold text-xs cursor-pointer transition"
          >
            {copied ? '✓ Copied Fee Demand' : 'Copy Free Fee Objection Notice'}
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="px-4 py-2.5 rounded-xl border border-slate-600 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs cursor-pointer transition"
          >
            Print Brief
          </button>
          <IcsDeadlineButton
            title="TenantFig 14-Day Junk Fee Refund Deadline"
            description={result.statute}
            daysFromNow={14}
            url="https://tenantfig.com/calculators/2027-rental-junk-fee-audit/"
            label="Add 14-Day Deadline (.ics)"
          />
        </div>
      </div>
    </div>
  );
}
