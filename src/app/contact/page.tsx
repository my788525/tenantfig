import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact TenantFig',
  description: 'Contact the TenantFig statutory research team.'
};

export default function ContactPage() {
  return (
    <div className="container-page py-10 space-y-6 max-w-3xl">
      <h1 className="text-3xl font-extrabold text-[#0f2747]">Contact</h1>
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 text-sm text-slate-700">
        <p>
          For statutory corrections, municipal ordinance updates, or enterprise inquiries, email{' '}
          <a href="mailto:editorial@tenantfig.com" className="text-[#059669] font-bold underline">
            editorial@tenantfig.com
          </a>.
        </p>
      </div>
    </div>
  );
}
