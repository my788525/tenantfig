import type { Metadata } from 'next';
import WearAndTearCalc from '@/components/calculators/WearAndTearCalc';
import { JsonLd, breadcrumbJsonLd, webApplicationJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Normal Wear & Tear Deduction Auditor (HUD Carpet & Paint 2026)',
  description:
    'Prorate apartment carpet (5–7 yr) and interior paint (2–3 yr) useful-life depreciation to dispute unlawful security deposit deductions.'
};

export default function WearAndTearPage() {
  return (
    <div className="container-page py-10 space-y-8">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: 'Home', url: 'https://tenantfig.com/' },
            { name: 'Wear & Tear Deduction Auditor', url: 'https://tenantfig.com/calculators/wear-and-tear-deduction/' }
          ]),
          webApplicationJsonLd({
            name: 'Wear & Tear Depreciation Auditor',
            description: 'HUD 4350.3 and industry useful-life depreciation calculator for carpet, paint, blinds, and appliances.',
            url: 'https://tenantfig.com/calculators/wear-and-tear-deduction/'
          })
        ]}
      />
      <div className="space-y-2 border-b border-slate-200 pb-6">
        <div className="text-xs font-mono uppercase tracking-widest text-[#c8a24a] font-bold">
          CALCULATOR 02 · HUD 4350.3 DEPRECIATION ENGINE
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2747] tracking-tight">
          Normal Wear &amp; Tear Depreciation Auditor
        </h1>
        <p className="text-slate-600 max-w-3xl text-sm sm:text-base">
          Audit inflated carpet, paint, and appliance replacement deductions using HUD/IRS useful-life depreciation schedules and generate a line-item rebuttal notice.
        </p>
      </div>
      <WearAndTearCalc />
    </div>
  );
}
