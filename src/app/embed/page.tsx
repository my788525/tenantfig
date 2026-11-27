import type { Metadata } from 'next';
import JunkFeeAuditCalc from '@/components/calculators/JunkFeeAuditCalc';
import EmbedCodeBox from '@/components/EmbedCodeBox';

export const metadata: Metadata = {
  title: 'Embed Free Tenant Statutory Calculator',
  description:
    'Embed TenantFig’s free 51-state tenant deposit and 2027 rental junk-fee calculator on tenant union, legal aid, and housing blogs.',
  alternates: { canonical: '/embed/' }
};

export default function TenantEmbedPage() {
  return (
    <div className="container-page py-8 space-y-6">
      <div className="space-y-1">
        <div className="text-xs font-mono uppercase tracking-widest text-[#059669] font-bold">
          FREE EMBEDDABLE WIDGET · TENANTFIG.COM
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f2747]">
          Free 2027 Tenant Statutory Calculator Widget
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          100% client-side, zero user tracking, and free to embed on tenant union portals, housing newsletters, and legal-aid guides.
        </p>
      </div>

      <JunkFeeAuditCalc />

      <EmbedCodeBox
        siteName="TenantFig.com"
        siteUrl="https://tenantfig.com/"
        embedUrl="https://tenantfig.com/embed/"
        accentClass="bg-[#059669] hover:bg-emerald-500 text-white"
      />
    </div>
  );
}
