import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd, breadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Editorial Policy & Citation Standards',
  description:
    'TenantFig Editorial Policy: how we research, cite, fact-check, and update 51-state landlord-tenant statutes, HUD depreciation schedules, and metro rent caps.',
  alternates: {
    canonical: '/editorial-policy/'
  }
};

export default function EditorialPolicyPage() {
  return (
    <div className="container-page py-10 space-y-8 max-w-4xl">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: 'https://tenantfig.com/' },
          { name: 'Editorial Policy', url: 'https://tenantfig.com/editorial-policy/' }
        ])}
      />
      <div className="space-y-2 border-b border-slate-200 pb-6">
        <div className="text-xs font-mono uppercase tracking-widest text-[#c8a24a] font-bold">
          GOVERNANCE · EDITORIAL POLICY
        </div>
        <h1 className="text-3xl font-extrabold text-[#0f2747]">Editorial Policy &amp; Fact-Checking Standards</h1>
        <p className="text-sm text-slate-600">
          Our editorial standards for primary-source statutory citations, quantitative accuracy, conflict-of-interest independence, and timely legislative corrections.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-5 text-sm text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-xl font-extrabold text-[#0f2747]">1. Primary-Source Citation Mandate</h2>
          <p>
            Every statutory rule, return deadline, bad-faith penalty multiplier, and Small Claims Court limit published on TenantFig must be anchored to an identifiable primary legal authority. Our research team relies exclusively on:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Official state legislative code repositories (e.g., <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">leginfo.legislature.ca.gov</code>, <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">statutes.capitol.texas.gov</code>, <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">nysenate.gov</code>).</li>
            <li>Official state Attorney General consumer handbooks and Judicial Branch Small Claims portals (<code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">.gov</code> domains).</li>
            <li>Municipal housing department and Rent Stabilization Board ordinance bulletins for our 25-city rent-cap index.</li>
            <li>Federal agency benchmarks, specifically HUD Handbook 4350.3 and IRS Publication 527 / MACRS residential property schedules, for useful-life depreciation modeling.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-extrabold text-[#0f2747]">2. Editorial Independence &amp; Monetization Disclosure</h2>
          <p>
            TenantFig is committed to objective, tenant-focused quantitative analysis. All 7 interactive calculators, the 4-Step Tenant Action Wizard, all 51 state statutory guides, all 25 city rent-cap pages, and printable 《Statutory Briefs》 are free to use without registration.
          </p>
          <p>
            TenantFig is funded through two transparent channels: (a) optional digital Statutory Defense Kits (<code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">.docx</code> demand templates and <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">.xlsx</code> audit workbooks) and (b) programmatic display advertising (such as Google AdSense). Advertising partners and sponsors have zero influence over our statutory calculations, state rankings, case studies, or editorial conclusions.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-extrabold text-[#0f2747]">3. Review Cadence &amp; Legislative Monitoring</h2>
          <p>
            Our editorial team conducts scheduled quarterly audits of all 51 jurisdictions and 25 municipal rent-cap ordinances, with out-of-cycle updates whenever major state bills take effect (such as California AB 12, Washington HB 1217, New York Good Cause Eviction, or Connecticut PA 23-207). Significant statutory revisions and formula adjustments are logged publicly in our{' '}
            <Link href="/changelog/" className="text-[#059669] font-bold underline">
              2026 Statutory Changelog
            </Link>
            .
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-extrabold text-[#0f2747]">4. Corrections &amp; Reader Feedback</h2>
          <p>
            We welcome statutory corrections, updated municipal CPI figures, and broken <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">.gov</code> link reports from attorneys, housing counselors, and renters. Verified corrections are typically deployed within 48 hours of review. To submit a correction, email{' '}
            <a href="mailto:editorial@tenantfig.com" className="text-[#059669] font-bold underline">
              editorial@tenantfig.com
            </a>{' '}
            with the relevant statute or ordinance citation.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-extrabold text-[#0f2747]">5. AI &amp; Quantitative Quality Controls</h2>
          <p>
            Every statutory rule, calculator formula, and case-study ledger published on TenantFig undergoes structured verification against enacted statutory text before publication. We do not publish unverified crowdsourced legal claims, anonymous forum anecdotes, or speculative penalty multipliers. Whenever a jurisdiction imposes a conditional trigger—such as Texas&apos;s written forwarding-address prerequisite or California&apos;s $125 vendor-receipt threshold—our editorial team documents both the primary rule and its statutory exception side by side.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-extrabold text-[#0f2747]">6. Accessibility &amp; Plain-Language Commitment</h2>
          <p>
            Statutory language is notoriously dense. Our editorial style pairs exact code citations with plain-English action checklists, scannable benchmark tables, and direct-answer summaries so renters can understand their rights quickly without sacrificing legal precision.
          </p>
        </section>

        <div className="pt-2 flex flex-wrap gap-3 text-xs">
          <Link href="/methodology/" className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-[#0f2747]">
            Audit Methodology →
          </Link>
          <Link href="/disclaimer/" className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-[#0f2747]">
            Legal Disclaimer →
          </Link>
          <Link href="/contact/" className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-[#0f2747]">
            Contact Editorial Desk →
          </Link>
        </div>
      </div>
    </div>
  );
}
