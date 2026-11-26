import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use & Legal Disclaimer',
  description: 'TenantFig terms of use and educational legal disclaimer.'
};

export default function TermsPage() {
  return (
    <div className="container-page py-10 space-y-6 max-w-4xl">
      <h1 className="text-3xl font-extrabold text-[#0f2747]">Terms of Use &amp; Legal Disclaimer</h1>
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 text-sm text-slate-700 leading-relaxed">
        <p>
          TenantFig provides quantitative statutory modeling, public code references, and educational templates for informational purposes only. TenantFig is not a law firm and does not provide legal advice or establish an attorney-client relationship. Consult a licensed attorney in your jurisdiction for formal legal representation.
        </p>
      </div>
    </div>
  );
}
