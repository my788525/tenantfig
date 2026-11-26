import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { CASE_STUDIES_2026 } from '@/data/cases_and_guides';
import { JsonLd, breadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Real-Ledger Tenant Recovery Case Studies (2026)',
  description:
    'Audited case studies: Oakland CA $2,800 deposit & carpet/paint depreciation, Austin TX $1,900 3x penalty, and Brooklyn NY 11.5% Good Cause rent hike.',
  alternates: {
    canonical: '/cases/'
  }
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
          Line-by-line statutory breakdowns showing how U.S. tenants defeated unlawful deposit deductions, missing vendor receipts, and above-cap renewal rent hikes.
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

      {/* Case Study Methodology & Evidence Standards (450+ words total on page) */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 text-sm text-slate-700 leading-relaxed">
        <div className="text-xs font-mono uppercase tracking-widest text-[#059669] font-bold">
          LEDGER AUDIT METHODOLOGY
        </div>
        <h2 className="text-xl font-extrabold text-[#0f2747]">
          What These Real-Ledger Audits Demonstrate
        </h2>
        <p>
          Every case study in the TenantFig ledger illustrates a recurring statutory pattern seen across U.S. residential tenancies: landlords rarely lose in Small Claims Court because of emotional arguments—they lose when a tenant presents a clean, chronological audit comparing the landlord&apos;s itemized ledger against enacted state code.
        </p>
        <p>
          In high-cost metros such as Oakland, Austin, and Brooklyn, three statutory levers drive the majority of pre-trial settlements: (1) <strong>missed accounting deadlines</strong> (such as California&apos;s 21-day rule or Texas&apos;s 30-day presumption of bad faith), (2) <strong>unlawful full-replacement billing</strong> on depreciated carpet and interior paint under HUD Handbook 4350.3, and (3) <strong>defective rent-increase notices</strong> that exceed municipal CPI + 5% ceilings.
        </p>
        <p>
          To model your own dispute using the exact same formulas, launch the{' '}
          <Link href="/wizard/" className="text-[#059669] font-bold underline">
            4-Step Tenant Action Wizard
          </Link>{' '}
          or test your itemized move-out invoice in our{' '}
          <Link href="/calculators/deduction-invoice-auditor/" className="text-[#059669] font-bold underline">
            Deduction Invoice &amp; Receipt Auditor
          </Link>
          .
        </p>
        <h2 className="text-xl font-extrabold text-[#0f2747] pt-2">
          Core Evidence Checklist Across All Three Cases
        </h2>
        <p>
          Across every audited case study in our repository, the winning tenant preserved four foundational records: (1) the signed lease agreement and move-in inspection report, (2) high-resolution, timestamped move-out photos covering every wall, carpet, and appliance, (3) written proof of forwarding-address delivery on or before key surrender, and (4) a USPS Certified Mail Return Receipt accompanying a concise statutory demand letter. Even when a landlord initially refuses to budge, presenting this organized ledger during pre-trial mediation or Small Claims Court consistently shifts settlement leverage in the tenant&apos;s favor and maximizes statutory recovery.
        </p>
        <p>
          Each case ledger above is structured to mirror the exact exhibits a Small Claims judge expects to see: disputed invoice line items, primary code citations, HUD 4350.3 useful-life proration math, and net recovery after filing fees.
        </p>
      </section>
    </div>
  );
}
