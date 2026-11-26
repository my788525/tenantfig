'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface WizardLeadEscalationProps {
  stateAbbr: string;
  stateName: string;
  exposureAmount: number;
  summaryText: string;
  statuteCitation: string;
}

export default function WizardLeadEscalation({
  stateAbbr,
  stateName,
  exposureAmount,
  summaryText,
  statuteCitation
}: WizardLeadEscalationProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [msg, setMsg] = useState('');

  const isHighStakes = exposureAmount >= 5000;

  const handleSaveBrief = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setStatus('error');
      setMsg('Please enter a valid email address.');
      return;
    }
    setStatus('sending');
    setMsg('');
    try {
      await fetch('https://mail.lianu.com/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          site: 'tenantfig.com',
          email: email.trim(),
          lead_type: 'wizard_brief_save',
          state: stateAbbr,
          lead_value: `$${exposureAmount.toLocaleString()}`,
          subject: `TenantFig Brief & Deadline Save (${stateAbbr})`,
          message: summaryText.slice(0, 1800),
          page_url: typeof window !== 'undefined' ? window.location.href : 'https://tenantfig.com/wizard/'
        })
      });
      // Also trigger instant local .txt backup download
      const blob = new Blob([`${summaryText}\n\nSaved via TenantFig.com (${statuteCitation})`], {
        type: 'text/plain;charset=utf-8'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `tenantfig-${stateAbbr.toLowerCase()}-statutory-brief.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setStatus('done');
      setMsg('Saved! Your statutory brief backup downloaded and deadline alert is logged.');
      setEmail('');
    } catch {
      setStatus('error');
      setMsg('Could not save right now—please use the Print Brief button above.');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 no-print">
      <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-sm">
        <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#059669]">
          FREE BACKUP &amp; DEADLINE REMINDER
        </div>
        <h4 className="text-base font-extrabold text-[#0f2747]">
          Save Your {stateAbbr} Brief &amp; Statutory Deadline
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
          Download a plain-text backup and log your email for statutory deadline updates before sending your Certified Mail notice.
        </p>
        <form onSubmit={handleSaveBrief} className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="flex-1 rounded-xl border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#0f2747]"
          />
          <button
            type="submit"
            disabled={status === 'sending'}
            className="px-4 py-2 rounded-xl bg-[#0f2747] hover:bg-[#1a3b68] text-white font-bold text-xs cursor-pointer transition shrink-0"
          >
            {status === 'sending' ? 'Saving...' : 'Save & Download →'}
          </button>
        </form>
        {msg && (
          <p className={`text-[11px] font-semibold ${status === 'done' ? 'text-emerald-700' : 'text-rose-700'}`}>
            {msg}
          </p>
        )}
      </div>

      <div
        className={`rounded-2xl p-5 border space-y-3 shadow-sm ${
          isHighStakes
            ? 'bg-amber-50/70 border-amber-400/70'
            : 'bg-slate-50 border-slate-200'
        }`}
      >
        <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#9a7622]">
          {isHighStakes ? 'HIGH-STAKES DISPUTE ESCALATION ($5,000+)' : 'LOCAL LEGAL & COURT ESCALATION'}
        </div>
        <h4 className="text-base font-extrabold text-[#0f2747]">
          {isHighStakes
            ? `Exposure Exceeds Typical DIY Threshold ($${exposureAmount.toLocaleString()})`
            : `Need Local ${stateName} Representation?`}
        </h4>
        <p className="text-xs text-slate-700 leading-relaxed">
          {isHighStakes
            ? `When your claim approaches or exceeds ${stateName}'s Small Claims cap, bring your printed Statutory Brief to a State Bar tenant attorney or Legal Aid clinic so you don't forfeit excess damages.`
            : `If your landlord ignores a Certified Mail demand under ${statuteCitation}, use our Small Claims ROI calculator or consult your local ${stateName} Legal Aid / State Bar referral desk.`}
        </p>
        <div className="flex flex-wrap gap-2 text-xs">
          <Link
            href="/calculators/small-claims-roi/"
            className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 font-bold text-[#0f2747] hover:bg-slate-100"
          >
            Check Small Claims ROI →
          </Link>
          <Link
            href="/statutes/"
            className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 font-bold text-[#059669] hover:bg-slate-100"
          >
            Official .gov Court Links →
          </Link>
        </div>
      </div>
    </div>
  );
}
