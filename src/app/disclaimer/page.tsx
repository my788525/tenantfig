import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd, breadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Legal Disclaimer — Educational Modeling Only',
  description:
    'TenantFig Legal Disclaimer: not a law firm, no attorney-client relationship, statutory modeling limitations, and jurisdictional verification notice.',
  alternates: {
    canonical: '/disclaimer/'
  }
};

export default function DisclaimerPage() {
  return (
    <div className="container-page py-10 space-y-8 max-w-4xl">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: 'https://tenantfig.com/' },
          { name: 'Legal Disclaimer', url: 'https://tenantfig.com/disclaimer/' }
        ])}
      />
      <div className="space-y-2 border-b border-slate-200 pb-6">
        <div className="text-xs font-mono uppercase tracking-widest text-[#c8a24a] font-bold">
          GOVERNANCE · LEGAL DISCLAIMER
        </div>
        <h1 className="text-3xl font-extrabold text-[#0f2747]">Legal Disclaimer</h1>
        <p className="text-sm text-slate-600">
          Important disclosures regarding the educational scope, statutory modeling, and non-legal-advice nature of TenantFig.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-5 text-sm text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-xl font-extrabold text-[#0f2747]">1. Not a Law Firm &amp; No Legal Advice</h2>
          <p>
            TenantFig (<strong>tenantfig.com</strong>) is an independent quantitative research and educational software publisher. TenantFig is <strong>not a law firm</strong>, is not registered as a legal services provider, and does not provide legal advice, legal opinions, or legal representation. All calculators, 51-state statutory tables, municipal rent-cap summaries, 《Statutory Briefs》, and downloadable <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">.docx</code> / <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">.xlsx</code> templates are provided strictly for general informational and educational modeling purposes.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-extrabold text-[#0f2747]">2. No Attorney-Client Relationship</h2>
          <p>
            Your use of TenantFig, submission of inputs into any client-side calculator, generation of a personalized action brief, email correspondence with our editorial desk, or purchase of an optional digital Statutory Defense Kit does <strong>not</strong> create an attorney-client relationship between you and TenantFig, its authors, or any contributor. Communications with TenantFig are not protected by attorney-client privilege.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-extrabold text-[#0f2747]">3. Statutory &amp; Municipal Complexity</h2>
          <p>
            Residential landlord-tenant law varies substantially by state, county, and municipality, and is frequently modified by new legislation, emergency ordinances, local rent-board regulations, and appellate court decisions. Moreover, statutory exemptions—such as single-family home exemptions, owner-occupied duplexes, recent-construction exclusions under state rent caps, or military/diplomatic lease clauses—depend on specific facts that an automated calculator cannot independently verify.
          </p>
          <p>
            While TenantFig cross-checks its 2026 dataset against primary state codes and official <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">.gov</code> judicial portals, we make no warranty regarding completeness, real-time legislative currency, or applicability to your specific tenancy. Always verify the current enacted text of your state statute and local municipal code before taking formal legal action.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-extrabold text-[#0f2747]">4. Small Claims &amp; Depreciation Estimates</h2>
          <p>
            Calculated bad-faith penalty multipliers (such as 2x or 3x statutory damages) and HUD Handbook 4350.3 useful-life depreciation figures represent maximum statutory benchmarks or standard industry guidelines—not guaranteed court awards. Small Claims judges and housing arbitrators exercise broad discretion based on evidence, witness credibility, lease terms, and local precedent.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-extrabold text-[#0f2747]">5. When to Consult a Licensed Attorney</h2>
          <p>
            If you are facing an active eviction (unlawful detainer) lawsuit, a claim exceeding Small Claims Court jurisdictional limits, complex commercial lease disputes, or Fair Housing / habitability litigation, you should immediately consult a licensed landlord-tenant attorney or local Legal Aid organization in your jurisdiction.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-extrabold text-[#0f2747]">6. Advertising &amp; Affiliate Transparency</h2>
          <p>
            TenantFig may display third-party advertisements (including Google AdSense) and offer optional digital Statutory Defense Kits. The presence of advertisements or optional paid templates does not constitute an endorsement of any third-party service, law firm, or financial product, and does not alter the objective statutory calculations displayed in our free tools.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-extrabold text-[#0f2747]">7. User Responsibility for Evidentiary Records</h2>
          <p>
            Statutory recovery depends heavily on your own documentary evidence—including move-in and move-out photographs, written forwarding-address delivery proofs, USPS Certified Mail return receipts, and bank records. TenantFig cannot verify your personal evidence or guarantee that a landlord will settle prior to a court hearing.
          </p>
        </section>

        <div className="pt-2 flex flex-wrap gap-3 text-xs">
          <Link href="/terms/" className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-[#0f2747]">
            Terms of Use →
          </Link>
          <Link href="/editorial-policy/" className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-[#0f2747]">
            Editorial Policy →
          </Link>
          <Link href="/methodology/" className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-[#0f2747]">
            Audit Methodology →
          </Link>
        </div>
      </div>
    </div>
  );
}
