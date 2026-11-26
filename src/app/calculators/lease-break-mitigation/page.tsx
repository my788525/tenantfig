import type { Metadata } from 'next';
import LeaseBreakCalc from '@/components/calculators/LeaseBreakCalc';
import { JsonLd, breadcrumbJsonLd, webApplicationJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Lease Break Mitigation & Settlement Calculator (50 States, 2026)',
  description:
    'Model landlord duty to mitigate damages, vacancy proration, and early-termination buyout ROI across all 51 US jurisdictions.'
};

export default function LeaseBreakMitigationPage() {
  return (
    <div className="container-page py-10 space-y-8">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: 'Home', url: 'https://tenantfig.com/' },
            { name: 'Lease Break Mitigation Calculator', url: 'https://tenantfig.com/calculators/lease-break-mitigation/' }
          ]),
          webApplicationJsonLd({
            name: 'Lease Break Mitigation Calculator',
            description: 'Calculate prorated vacancy liability vs early-termination buyout fees under state mitigation duties.',
            url: 'https://tenantfig.com/calculators/lease-break-mitigation/'
          })
        ]}
      />
      <div className="space-y-2 border-b border-slate-200 pb-6">
        <div className="text-xs font-mono uppercase tracking-widest text-[#c8a24a] font-bold">
          CALCULATOR 04 · DUTY TO MITIGATE MODEL
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2747] tracking-tight">
          Lease Break Mitigation &amp; Buyout Calculator
        </h1>
        <p className="text-slate-600 max-w-3xl text-sm sm:text-base">
          Compare your lease buyout fee against prorated vacancy liability under your state’s statutory or common-law landlord duty to mitigate damages.
        </p>
      </div>
      <LeaseBreakCalc />
    </div>
  );
}
