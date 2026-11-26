import type { Metadata } from 'next';
import RentIncreaseCapCalc from '@/components/calculators/RentIncreaseCapCalc';
import { JsonLd, breadcrumbJsonLd, webApplicationJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Rent Increase Cap Auditor (25 Cities, 2026)',
  description:
    'Audit proposed rent hikes against CA AB 1482, NYC Good Cause Eviction, LA RSO, SF, Seattle, Portland, and 25 major metro ordinances.',
  alternates: {
    canonical: '/calculators/rent-increase-cap/'
  }
};

export default function RentIncreaseCapPage() {
  return (
    <div className="container-page py-10 space-y-8">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: 'Home', url: 'https://tenantfig.com/' },
            { name: 'Rent Increase Cap Auditor', url: 'https://tenantfig.com/calculators/rent-increase-cap/' }
          ]),
          webApplicationJsonLd({
            name: 'Rent Increase Cap Auditor 2026',
            description: '25-city municipal rent cap and statutory notice-period compliance calculator.',
            url: 'https://tenantfig.com/calculators/rent-increase-cap/'
          })
        ]}
      />
      <div className="space-y-2 border-b border-slate-200 pb-6">
        <div className="text-xs font-mono uppercase tracking-widest text-[#c8a24a] font-bold">
          CALCULATOR 03 · 25 METRO ORDINANCES
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2747] tracking-tight">
          Rent Increase Cap &amp; Notice Period Auditor
        </h1>
        <p className="text-slate-600 max-w-3xl text-sm sm:text-base">
          Test renewal rent hikes against CA AB 1482, NYC Good Cause Eviction, local RSO limits, and mandatory 30/60/90/180-day notice rules.
        </p>
      </div>
      <RentIncreaseCapCalc />
    </div>
  );
}
