import type { Metadata } from 'next';
import LeaseClauseScanner from '@/components/calculators/LeaseClauseScanner';
import { JsonLd, breadcrumbJsonLd, faqJsonLd, webApplicationJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Lease Red-Flag & Illegal Clause Scanner (51-State 2026 Audit)',
  description:
    'Scan residential lease clauses for illegal non-refundable deposits, wear-and-tear waivers, warrantless entry, and rent-cap violations across all 51 U.S. jurisdictions.'
};

const SCANNER_FAQS = [
  {
    question: 'Are "non-refundable security deposit" clauses legal in residential leases?',
    answer:
      'In nearly all U.S. jurisdictions—including California (Cal. Civ. Code § 1950.5(m)), New York (N.Y. Gen. Oblig. Law § 7-108), and Texas (Tex. Prop. Code § 92.103)—landlords cannot label a security deposit as non-refundable to bypass statutory itemization and return deadlines.'
  },
  {
    question: 'Can a lease force a tenant to pay 100% of carpet replacement regardless of age?',
    answer:
      'No. Under HUD Handbook 4350.3 and state landlord-tenant depreciation rules, normal wear and tear is $0 and even actual damage is prorated by remaining useful life (typically 5–7 years for carpet and 2–3 years for interior paint).'
  },
  {
    question: 'Can a landlord waive the statutory 14-to-30 day deposit return deadline in the lease?',
    answer:
      'No. State security deposit return deadlines and bad-faith penalty multipliers (2x–3x) are non-waivable statutory protections under anti-waiver statutes such as Cal. Civ. Code § 1953 and Tex. Prop. Code § 92.006.'
  }
];

export default function LeaseClauseScannerPage() {
  return (
    <div className="container-page py-10 space-y-8">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: 'Home', url: 'https://tenantfig.com/' },
            { name: 'Lease Clause Scanner', url: 'https://tenantfig.com/calculators/lease-clause-scanner/' }
          ]),
          webApplicationJsonLd({
            name: 'Lease Red-Flag & Illegal Clause Scanner',
            description:
              'Client-side 51-state statutory rule engine that flags void lease clauses, calculates enforceability scores (0–100%), and generates copyable statutory rebuttals.',
            url: 'https://tenantfig.com/calculators/lease-clause-scanner/'
          }),
          faqJsonLd(SCANNER_FAQS)
        ]}
      />

      <div className="space-y-2 border-b border-slate-200 pb-6">
        <div className="text-xs font-mono uppercase tracking-widest text-[#c8a24a] font-bold">
          CALCULATOR 06 · 51-STATE ANTI-WAIVER ENGINE
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2747] tracking-tight">
          Lease Red-Flag &amp; Illegal Clause Scanner
        </h1>
        <p className="text-slate-600 max-w-3xl text-sm sm:text-base">
          Paste any residential lease clause or test 5 common landlord traps to check enforceability (0–100%), cite exact 2026 state anti-waiver statutes, and generate a free rebuttal paragraph.
        </p>
      </div>

      <LeaseClauseScanner />

      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 no-print">
        <h2 className="text-xl font-extrabold text-[#0f2747]">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {SCANNER_FAQS.map((f) => (
            <div key={f.question} className="border-t border-slate-100 pt-4 first:border-t-0 first:pt-0">
              <h3 className="text-sm font-bold text-[#0f2747]">{f.question}</h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">{f.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
