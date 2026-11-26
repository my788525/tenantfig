import React from 'react';
import Link from 'next/link';

interface HiddenTrapsCalloutProps {
  variant?: 'home' | 'wizard';
}

const TOP_THREE_TRAPS = [
  {
    id: 'forwarding-address-trap',
    num: '01',
    title: 'Missing Forwarding Address',
    warning: 'In TX, MI, NC & FL, your 14–30 day penalty clock stays PAUSED until you deliver a written forwarding address.'
  },
  {
    id: 'accord-and-satisfaction-trap',
    num: '02',
    title: '"Payment in Full" Partial Check',
    warning: 'Endorsing a partial refund check with "Payment in Full" can legally forfeit your remaining $1,800+ claim under UCC § 3-311.'
  },
  {
    id: 'casual-text-vs-certified-mail-trap',
    num: '03',
    title: 'Casual Text vs. Certified Mail',
    warning: 'Judges routinely deny 2x–3x bad-faith damages when tenants only texted instead of sending USPS Certified Mail.'
  }
];

export default function HiddenTrapsCallout({ variant = 'home' }: HiddenTrapsCalloutProps) {
  const isWizard = variant === 'wizard';

  return (
    <div
      className={`rounded-2xl border p-5 sm:p-6 no-print ${
        isWizard
          ? 'bg-amber-50/90 border-amber-300 shadow-sm'
          : 'bg-[#09192e] text-white border-[#c8a24a]/40 shadow-lg'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="space-y-1">
          <div
            className={`text-[10px] font-mono uppercase tracking-widest font-bold ${
              isWizard ? 'text-amber-800' : 'text-[#c8a24a]'
            }`}
          >
            ⚠ BEFORE YOU ACT: 3 HIDDEN TRAPS
          </div>
          <h3
            className={`text-base sm:text-lg font-extrabold leading-snug ${
              isWizard ? 'text-[#0f2747]' : 'text-white'
            }`}
          >
            {isWizard
              ? 'Why Turnkey Certified Mail + Audit Protection Matters Before You Send'
              : 'Avoid the 3 Costliest Mistakes That Void Tenant Claims'}
          </h3>
        </div>
        <Link
          href="/pitfalls/"
          className={`shrink-0 inline-flex items-center px-3.5 py-2 rounded-xl text-xs font-extrabold transition ${
            isWizard
              ? 'bg-[#0f2747] hover:bg-[#1a3b68] text-white'
              : 'bg-[#c8a24a] hover:bg-[#e2be68] text-[#09192e]'
          }`}
        >
          Read All 6 Pitfalls →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {TOP_THREE_TRAPS.map((trap) => (
          <Link
            key={trap.id}
            href={`/pitfalls/#${trap.id}`}
            className={`rounded-xl p-3.5 border transition block ${
              isWizard
                ? 'bg-white border-amber-200 hover:border-[#0f2747]'
                : 'bg-[#0f2747]/80 border-white/10 hover:border-[#c8a24a]/60'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                  isWizard
                    ? 'bg-amber-100 text-amber-900'
                    : 'bg-[#c8a24a]/20 text-[#e2be68]'
                }`}
              >
                TRAP {trap.num}
              </span>
              <span
                className={`text-xs font-extrabold ${
                  isWizard ? 'text-[#0f2747]' : 'text-white'
                }`}
              >
                {trap.title}
              </span>
            </div>
            <p
              className={`text-xs leading-relaxed ${
                isWizard ? 'text-slate-600' : 'text-slate-300'
              }`}
            >
              {trap.warning}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
