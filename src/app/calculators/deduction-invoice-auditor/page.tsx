import type { Metadata } from 'next';
import DeductionInvoiceAuditor from '@/components/calculators/DeductionInvoiceAuditor';
import { JsonLd, breadcrumbJsonLd, faqJsonLd, webApplicationJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Itemized Move-Out Deduction & Receipt Auditor (2026 State Thresholds)',
  description:
    'Audit move-out cleaning, repainting, carpet, and blinds deductions against state vendor-receipt thresholds (e.g. CA $125 rule), HUD useful-life caps, and metro market benchmarks.',
  alternates: {
    canonical: '/calculators/deduction-invoice-auditor/'
  }
};

const AUDITOR_FAQS = [
  {
    question: 'When is a landlord required to attach vendor receipts to security deposit deductions?',
    answer:
      'In California (Cal. Civ. Code § 1950.5(g)), landlords must include copies of vendor invoices or receipts for any deductions totaling $125 or more. States like Washington (RCW § 59.18.280) and Massachusetts (M.G.L. ch. 186 § 15B) require repair estimates or receipts for all claimed damages.'
  },
  {
    question: 'Can a landlord deduct $580 for move-out cleaning or $1,250 for full repainting?',
    answer:
      'No, unless there is documented damage beyond normal wear and tear. Routine turnover cleaning and repainting after 2–3 years of occupancy are normal landlord operating expenses under HUD Handbook 4350.3 and state landlord-tenant law.'
  },
  {
    question: 'What happens if a landlord withholds deductions without receipts or past the statutory deadline?',
    answer:
      'Unsubstantiated deductions are disallowed in Small Claims Court, and bad-faith retention triggers 2x to 3x statutory damages plus court costs and attorney fees depending on the state.'
  }
];

export default function DeductionInvoiceAuditorPage() {
  return (
    <div className="container-page py-10 space-y-8">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: 'Home', url: 'https://tenantfig.com/' },
            {
              name: 'Deduction & Receipt Auditor',
              url: 'https://tenantfig.com/calculators/deduction-invoice-auditor/'
            }
          ]),
          webApplicationJsonLd({
            name: 'Itemized Move-Out Deduction & Receipt Auditor',
            description:
              'Line-by-line security deposit deduction auditor checking state vendor-receipt thresholds, normal wear-and-tear exclusions, HUD useful-life depreciation, and metro benchmarks.',
            url: 'https://tenantfig.com/calculators/deduction-invoice-auditor/'
          }),
          faqJsonLd(AUDITOR_FAQS)
        ]}
      />

      <div className="space-y-2 border-b border-slate-200 pb-6">
        <div className="text-xs font-mono uppercase tracking-widest text-[#c8a24a] font-bold">
          CALCULATOR 07 · LINE-ITEM RECEIPT &amp; BENCHMARK ENGINE
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2747] tracking-tight">
          Itemized Move-Out Deduction &amp; Receipt Auditor
        </h1>
        <p className="text-slate-600 max-w-3xl text-sm sm:text-base">
          Audit move-out cleaning, repainting, carpet, and blinds charges against state vendor-receipt thresholds (such as California&apos;s $125 rule under Cal. Civ. Code § 1950.5(g)) and metro market-rate benchmarks.
        </p>
      </div>

      <DeductionInvoiceAuditor />

      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 no-print">
        <h2 className="text-xl font-extrabold text-[#0f2747]">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {AUDITOR_FAQS.map((f) => (
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
