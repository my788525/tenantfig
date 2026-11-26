import React from 'react';
import type { Metadata } from 'next';
import { JsonLd, breadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Audit Methodology & Statutory Verification Standards',
  description: 'How TenantFig verifies 51-state deposit deadlines, HUD 4350.3 depreciation schedules, and municipal rent caps.'
};

export default function MethodologyPage() {
  return (
    <div className="container-page py-10 space-y-6 max-w-4xl">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: 'https://tenantfig.com/' },
          { name: 'Methodology', url: 'https://tenantfig.com/methodology/' }
        ])}
      />
      <h1 className="text-3xl font-extrabold text-[#0f2747]">Audit Methodology &amp; Verification</h1>
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 text-sm text-slate-700 leading-relaxed">
        <p>
          Every statutory clock, penalty multiplier, and small claims limit on TenantFig is cross-checked against primary state code compilations (e.g., Cal. Civ. Code § 1950.5, Tex. Prop. Code §§ 92.103–92.109, N.Y. Gen. Oblig. Law § 7-108, Mass. Gen. Laws ch. 186 § 15B) and official state Attorney General / Judicial Branch publications.
        </p>
        <p>
          Useful-life depreciation schedules reference HUD Handbook 4350.3 and IRS residential rental MACRS benchmarks (5–7 years for standard carpet, 2–3 years for interior paint, 8–10 years for major appliances).
        </p>
      </div>
    </div>
  );
}
