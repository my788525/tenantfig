import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { GUIDES_2026 } from '@/data/cases_and_guides';
import { JsonLd, breadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Tenant Statutory Defense Guides & Direct-Answer Playbooks (2026)',
  description:
    'Deep-dive guides on security deposit return deadlines, HUD carpet & paint depreciation, CA AB 1482 & NYC Good Cause rent caps, and Small Claims Court ROI.'
};

export default function GuidesIndexPage() {
  return (
    <div className="container-page py-10 space-y-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: 'https://tenantfig.com/' },
          { name: 'Guides', url: 'https://tenantfig.com/guides/' }
        ])}
      />
      <div className="space-y-2 border-b border-slate-200 pb-6">
        <div className="text-xs font-mono uppercase tracking-widest text-[#c8a24a] font-bold">
          2026 STATUTORY PLAYBOOKS
        </div>
        <h1 className="text-3xl font-extrabold text-[#0f2747]">Tenant Statutory Defense Guides</h1>
        <p className="text-sm text-slate-600 max-w-3xl">
          Direct-answer tables, statutory citations, and tactical playbooks for white-collar renters.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {GUIDES_2026.map((g) => (
          <Link
            key={g.slug}
            href={`/guides/${g.slug}/`}
            className="bg-white border border-slate-200 hover:border-[#0f2747] rounded-2xl p-6 space-y-3 transition flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-[#c8a24a] font-bold uppercase">{g.category}</span>
                <span className="text-slate-400">{g.readTime}</span>
              </div>
              <h2 className="text-base font-extrabold text-[#0f2747]">{g.title}</h2>
              <p className="text-xs text-slate-600">{g.summary}</p>
            </div>
            <div className="text-xs font-bold text-[#0f2747] pt-3 border-t border-slate-100">
              Read Guide →
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
