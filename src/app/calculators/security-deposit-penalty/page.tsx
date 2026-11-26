import type { Metadata } from 'next';
import DepositPenaltyCalc from '@/components/calculators/DepositPenaltyCalc';
import { JsonLd, breadcrumbJsonLd, webApplicationJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Security Deposit Penalty Calculator (50 States + DC, 2026)',
  description:
    'Audit landlord security deposit return deadlines, forwarding-address clock triggers, and 2x/3x statutory bad-faith damages across all 51 US jurisdictions.'
};

export default function SecurityDepositPenaltyPage() {
  return (
    <div className="container-page py-10 space-y-8">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: 'Home', url: 'https://tenantfig.com/' },
            { name: 'Security Deposit Penalty Calculator', url: 'https://tenantfig.com/calculators/security-deposit-penalty/' }
          ]),
          webApplicationJsonLd({
            name: 'Security Deposit Penalty Calculator 2026',
            description: '51-jurisdiction statutory deposit return deadline and 2x/3x bad-faith multiplier calculator.',
            url: 'https://tenantfig.com/calculators/security-deposit-penalty/'
          })
        ]}
      />
      <div className="space-y-2 border-b border-slate-200 pb-6">
        <div className="text-xs font-mono uppercase tracking-widest text-[#c8a24a] font-bold">
          CALCULATOR 01 · 51 JURISDICTIONS VERIFIED
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2747] tracking-tight">
          Security Deposit Penalty &amp; Deadline Calculator
        </h1>
        <p className="text-slate-600 max-w-3xl text-sm sm:text-base">
          Verify whether your landlord missed the statutory return clock, check forwarding-address triggers, and compute exact 2x/3x bad-faith damages plus fixed penalties.
        </p>
      </div>
      <DepositPenaltyCalc />
    </div>
  );
}
