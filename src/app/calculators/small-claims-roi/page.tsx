import type { Metadata } from 'next';
import SmallClaimsRoiCalc from '@/components/calculators/SmallClaimsRoiCalc';
import { JsonLd, breadcrumbJsonLd, webApplicationJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Small Claims Court Recovery ROI Calculator (50 States, 2026)',
  description:
    'Compute net expected recovery in Small Claims Court: principal + 2x/3x statutory damages minus filing fees and executive time cost.',
  alternates: {
    canonical: '/calculators/small-claims-roi/'
  }
};

export default function SmallClaimsRoiPage() {
  return (
    <div className="container-page py-10 space-y-8">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: 'Home', url: 'https://tenantfig.com/' },
            { name: 'Small Claims ROI Calculator', url: 'https://tenantfig.com/calculators/small-claims-roi/' }
          ]),
          webApplicationJsonLd({
            name: 'Small Claims Court ROI Calculator',
            description: 'Evaluate net expected recovery and ROI of filing a security deposit claim in Small Claims Court.',
            url: 'https://tenantfig.com/calculators/small-claims-roi/'
          })
        ]}
      />
      <div className="space-y-2 border-b border-slate-200 pb-6">
        <div className="text-xs font-mono uppercase tracking-widest text-[#c8a24a] font-bold">
          CALCULATOR 05 · LITIGATION ROI WORKBENCH
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2747] tracking-tight">
          Small Claims Court Recovery ROI Calculator
        </h1>
        <p className="text-slate-600 max-w-3xl text-sm sm:text-base">
          Quantify net expected recovery after Small Claims filing fees and your hourly time cost across all 51 US court limits.
        </p>
      </div>
      <SmallClaimsRoiCalc />
    </div>
  );
}
