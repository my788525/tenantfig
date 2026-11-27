import type { Metadata } from 'next';
import JunkFeeAuditCalc from '@/components/calculators/JunkFeeAuditCalc';
import ToolPaywallDossier from '@/components/ToolPaywallDossier';
import { JsonLd, breadcrumbJsonLd, faqJsonLd, webApplicationJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: '2027 Rental Junk-Fee Page-1 Audit',
  description:
    'Audit undisclosed pet, trash, amenity, and move-in rental fees against Illinois HB 3564 (effective Jan 1, 2027) and state junk-fee laws.',
  alternates: { canonical: '/calculators/2027-rental-junk-fee-audit/' }
};

const FAQS = [
  {
    question: 'What does Illinois HB 3564 require starting January 1, 2027?',
    answer:
      'For leases signed or renewed on or after January 1, 2027, Illinois HB 3564 requires landlords to itemize all mandatory recurring and one-time fees (pet, trash, move-in, parking) on the very first page of the lease. Mandatory fees omitted from page one cannot legally be collected.'
  },
  {
    question: 'Are owner-occupied small buildings exempt from HB 3564?',
    answer:
      'Yes. Owner-occupied buildings with six or fewer units are exempt under Illinois HB 3564, whereas larger apartment complexes and corporate property managers must comply in full.'
  },
  {
    question: 'What if my lease is in California, New York, or Colorado?',
    answer:
      'California SB 478 bans hidden mandatory drip fees, New York RPL § 238-a caps application fees at $20, and Colorado HB 23-1095 restricts unlawful lease fee shifting.'
  }
];

export default function JunkFee2027Page() {
  return (
    <div className="container-page py-10 space-y-8">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: 'Home', url: 'https://tenantfig.com/' },
            { name: '2027 Rental Junk-Fee Audit', url: 'https://tenantfig.com/calculators/2027-rental-junk-fee-audit/' }
          ]),
          webApplicationJsonLd({
            name: '2027 Rental Junk-Fee Page-1 Audit',
            description: 'Audit undisclosed mandatory rental fees under Illinois HB 3564 (Jan 1, 2027) and state junk-fee statutes.',
            url: 'https://tenantfig.com/calculators/2027-rental-junk-fee-audit/'
          }),
          faqJsonLd(FAQS)
        ]}
      />

      <div className="space-y-2 border-b border-slate-200 pb-6 no-print">
        <div className="text-xs font-mono uppercase tracking-widest text-[#c8a24a] font-bold">
          2027 STATUTORY TRACKER · EFFECTIVE JAN 1, 2027
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2747] tracking-tight">
          2027 Rental Junk-Fee &amp; Page-1 Lease Audit
        </h1>
        <p className="text-slate-600 max-w-3xl text-sm sm:text-base">
          Check whether mandatory pet, trash, portal, or move-in fees were omitted from Page 1 of your lease under Illinois HB 3564 (effective Jan 1, 2027) and state junk-fee laws.
        </p>
      </div>

      <JunkFeeAuditCalc />

      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 className="text-xl font-extrabold text-[#0f2747]">2027 Rental Junk-Fee FAQs</h2>
        <div className="space-y-3">
          {FAQS.map((f) => (
            <details key={f.question} className="border border-slate-200 rounded-xl p-4">
              <summary className="font-bold text-sm text-[#0f2747] cursor-pointer">{f.question}</summary>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">{f.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <ToolPaywallDossier />
    </div>
  );
}
