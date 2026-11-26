import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { CITY_RENT_CAPS_2026 } from '@/data/city_rent_caps_2026';
import { JsonLd, breadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Top 25 U.S. Metro Rent Control & Notice Ordinances (2026)',
  description:
    'Municipal rent increase caps, Good Cause Eviction rules, notice periods, and relocation assistance across the top 25 U.S. metro cities.'
};

export default function CitiesIndexPage() {
  return (
    <div className="container-page py-10 space-y-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: 'https://tenantfig.com/' },
          { name: '25 Metro Cities', url: 'https://tenantfig.com/cities/' }
        ])}
      />
      <div className="space-y-2 border-b border-slate-200 pb-6">
        <div className="text-xs font-mono uppercase tracking-widest text-[#c8a24a] font-bold">
          25 METRO ORDINANCES · 2026 VERIFIED
        </div>
        <h1 className="text-3xl font-extrabold text-[#0f2747]">
          Top 25 U.S. Metro Rent Increase Caps &amp; Notice Rules
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl">
          Compare local rent stabilization ordinances, state AB 1482 / Good Cause caps, mandatory notice windows, and relocation assistance rules.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {CITY_RENT_CAPS_2026.map((c) => (
          <Link
            key={c.slug}
            href={`/cities/${c.slug}/`}
            className="bg-white border border-slate-200 hover:border-[#0f2747] rounded-2xl p-5 space-y-3 transition"
          >
            <div className="flex justify-between items-center">
              <span className="font-extrabold text-base text-[#0f2747]">
                {c.city}, {c.stateCode}
              </span>
              <span
                className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                  c.hasLocalRentCap ? 'bg-emerald-50 text-[#059669]' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {c.hasLocalRentCap ? `Cap: ${c.effectiveMaxCapPct}%` : `${c.noticeDaysRequired}d Notice`}
              </span>
            </div>
            <div className="text-xs font-semibold text-slate-700">{c.ordinanceName}</div>
            <p className="text-xs text-slate-500">{c.annualCapFormula}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
