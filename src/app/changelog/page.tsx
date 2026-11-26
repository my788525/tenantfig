import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '2026 Statutory Changelog',
  description: 'Legislative updates tracked across US tenant statutes in 2026.'
};

export default function ChangelogPage() {
  return (
    <div className="container-page py-10 space-y-6 max-w-4xl">
      <h1 className="text-3xl font-extrabold text-[#0f2747]">2026 Statutory Changelog</h1>
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 text-sm text-slate-700">
        <div className="border-b border-slate-100 pb-3">
          <div className="font-mono text-xs text-[#c8a24a] font-bold">2026-10-25 · RELEASE 1.0</div>
          <p className="mt-1">Initial institutional release covering all 51 US jurisdictions, 25 metro rent-cap ordinances, 5 interactive calculators, and printable 《Statutory Briefs》.</p>
        </div>
        <div>
          <div className="font-mono text-xs text-[#c8a24a] font-bold">KEY 2024–2026 STATUTORY UPDATES INCLUDED</div>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-xs">
            <li>California AB 12 (1-month deposit cap) &amp; Small Claims $12,500 limit.</li>
            <li>New York Good Cause Eviction Law (CPI + 5% or 10% cap).</li>
            <li>Washington HB 1217 statewide rent cap &amp; 30-day deposit accounting rule.</li>
            <li>Maryland HB 693 (1-month deposit cap).</li>
            <li>Connecticut PA 23-207 (21-day deposit return clock).</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
