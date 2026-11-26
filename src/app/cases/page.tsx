import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { CASE_STUDIES_2026 } from '@/data/cases_and_guides';
import { JsonLd, breadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Real-Ledger Tenant Recovery Case Studies (2026)',
  description:
    'Audited case studies: Oakland CA $2,800 deposit & carpet/paint depreciation, Austin TX $1,900 3x penalty, and Brooklyn NY 11.5% Good Cause rent hike.'
};

export default function CasesIndexPage() {
  return (
    <div className="container-page py-10 space-y-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: 'https://tenantfig.com/' },
          { name: 'Case Studies', url: 'https://tenantfig.com/cases/' }
        ])}
      />
      <div className="space-y-2 border-b border-slate-200 pb-6">
        <div className="text-xs font-mono uppercase tracking-widest text-[#c8a24a] font-bold">
          REAL-LEDGER CASE STUDIES
        </div>
        <h1 className="text-3xl font-extrabold text-[#0f2747]">Verified Recovery Outcomes</h1>
        <p className="text-sm text-slate-600 max-w-3xl">
          Line-by-line statutory breakdowns showing how white-collar tenants defeated unlawful deposit deductions and rent hikes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CASE_STUDIES_2026.map((cs) => (
          <Link
            key={cs.slug}
            href={`/cases/${cs.slug}/`}
            className="bg-white border border-slate-200 hover:border-[#0f2747] rounded-2xl p-6 space-y-4 transition flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-mono font-bold text-[#0f2747]">{cs.city}</span>
                <span className="font-mono font-bold text-[#059669] tabular-nums">
                  ${cs.disputedAmountUsd.toLocaleString()} Disputed
                </span>
              </div>
              <h2 className="text-lg font-extrabold text-[#0f2747]">{cs.title}</h2>
              <p className="text-xs text-slate-600 leading-relaxed">{cs.outcomeSummary}</p>
            </div>
            <div className="text-xs font-bold text-[#0f2747] pt-3 border-t border-slate-100">
              Read Full Ledger →
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
