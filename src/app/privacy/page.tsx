import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'TenantFig client-side privacy policy.'
};

export default function PrivacyPage() {
  return (
    <div className="container-page py-10 space-y-6 max-w-4xl">
      <h1 className="text-3xl font-extrabold text-[#0f2747]">Privacy Policy</h1>
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 text-sm text-slate-700 leading-relaxed">
        <p>
          TenantFig calculators execute 100% locally in your browser. We do not transmit or store your rent amounts, deposit figures, or demand letter text on any server.
        </p>
      </div>
    </div>
  );
}
