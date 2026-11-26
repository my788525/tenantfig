import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About TenantFig',
  description: 'About TenantFig — institutional-grade US tenant statutory defense and deposit recovery platform.'
};

export default function AboutPage() {
  return (
    <div className="container-page py-10 space-y-6 max-w-4xl">
      <h1 className="text-3xl font-extrabold text-[#0f2747]">About TenantFig</h1>
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 text-sm text-slate-700 leading-relaxed">
        <p>
          TenantFig is an independent quantitative legal-research and statutory modeling platform built for North American renters navigating security deposit disputes, wear-and-tear depreciation audits, rent increase caps, and early lease exits.
        </p>
        <p>
          All calculations run 100% client-side in your browser with zero cloud storage of your lease or personal dispute details.
        </p>
      </div>
    </div>
  );
}
