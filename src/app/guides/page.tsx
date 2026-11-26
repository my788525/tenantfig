import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { GUIDES_2026 } from '@/data/cases_and_guides';
import { JsonLd, breadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Tenant Statutory Defense Guides & Direct-Answer Playbooks (2026)',
  description:
    'Deep-dive guides on security deposit return deadlines, HUD carpet & paint depreciation, CA AB 1482 & NYC Good Cause rent caps, and Small Claims Court ROI.',
  alternates: {
    canonical: '/guides/'
  }
};

export default function GuidesIndexPage() {
  return (
    <div className="container-page py-10 space-y-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: 'https://tenantfig.com/' },
          { name: 'Guides', url: 'https://tenantfig.com/guides/' }
        ])}
      />
      <div className="space-y-2 border-b border-slate-200 pb-6">
        <div className="text-xs font-mono uppercase tracking-widest text-[#c8a24a] font-bold">
          2026 STATUTORY PLAYBOOKS
        </div>
        <h1 className="text-3xl font-extrabold text-[#0f2747]">Tenant Statutory Defense Guides</h1>
        <p className="text-sm text-slate-600 max-w-3xl">
          Direct-answer tables, primary statutory citations, and field-tested execution playbooks for U.S. renters disputing security deposit deductions, unlawful rent hikes, and lease-break penalties.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {GUIDES_2026.map((g) => (
          <Link
            key={g.slug}
            href={`/guides/${g.slug}/`}
            className="bg-white border border-slate-200 hover:border-[#0f2747] rounded-2xl p-6 space-y-3 transition flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-[#c8a24a] font-bold uppercase">{g.category}</span>
                <span className="text-slate-400">{g.readTime}</span>
              </div>
              <h2 className="text-base font-extrabold text-[#0f2747]">{g.title}</h2>
              <p className="text-xs text-slate-600">{g.summary}</p>
            </div>
            <div className="text-xs font-bold text-[#0f2747] pt-3 border-t border-slate-100">
              Read Guide →
            </div>
          </Link>
        ))}
      </div>

      {/* Editorial Context & How to Use These Playbooks (450+ words total on page) */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 text-sm text-slate-700 leading-relaxed">
        <div className="text-xs font-mono uppercase tracking-widest text-[#059669] font-bold">
          HOW TO USE THESE PLAYBOOKS
        </div>
        <h2 className="text-xl font-extrabold text-[#0f2747]">
          From Statutory Research to Court-Ready Execution
        </h2>
        <p>
          Most residential landlord-tenant disputes are won or lost on procedural precision before anyone ever steps into a courtroom. Landlords and institutional property managers rely on standardized move-out deduction templates that frequently violate state vendor-receipt rules, ignore HUD Handbook 4350.3 useful-life depreciation, or miss mandatory 14-to-30-day postmark deadlines.
        </p>
        <p>
          Each TenantFig defense guide pairs primary state code citations with concrete arithmetic and step-by-step notice protocols. Start by identifying your exact statutory deadline in our{' '}
          <Link href="/states/" className="text-[#059669] font-bold underline">
            51-Jurisdiction State Directory
          </Link>{' '}
          or municipal rent cap in our{' '}
          <Link href="/cities/" className="text-[#059669] font-bold underline">
            25-Metro Ordinance Index
          </Link>
          . Next, run your exact figures through our{' '}
          <Link href="/calculators/security-deposit-penalty/" className="text-[#059669] font-bold underline">
            Security Deposit Penalty Calculator
          </Link>{' '}
          and{' '}
          <Link href="/calculators/wear-and-tear-deduction/" className="text-[#059669] font-bold underline">
            Wear &amp; Tear Depreciation Auditor
          </Link>{' '}
          to quantify your recoverable principal and 2x–3x statutory damages.
        </p>
        <p>
          Finally, avoid silent forfeitures—such as cashing a partial refund check stamped &ldquo;Payment in Full&rdquo; under UCC § 3-311 or failing to deliver a written forwarding address—by reviewing our{' '}
          <Link href="/pitfalls/" className="text-[#059669] font-bold underline">
            Pitfalls &amp; Traps Playbook
          </Link>{' '}
          before sending your USPS Certified Mail demand letter. If you prefer a guided workflow that automatically selects your state&apos;s exact statutory clock and penalty multiplier, launch the{' '}
          <Link href="/wizard/" className="text-[#059669] font-bold underline">
            4-Step Tenant Action Wizard
          </Link>{' '}
          to generate a printable 《Statutory Brief》 in under two minutes.
        </p>
      </section>
    </div>
  );
}
