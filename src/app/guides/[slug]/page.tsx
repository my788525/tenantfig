import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { GUIDES_2026 } from '@/data/cases_and_guides';
import { JsonLd, breadcrumbJsonLd } from '@/components/JsonLd';
import ToolPaywallDossier from '@/components/ToolPaywallDossier';

export function generateStaticParams() {
  return GUIDES_2026.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const g = GUIDES_2026.find((x) => x.slug === slug);
  if (!g) return { title: 'Guide Not Found' };
  return {
    title: g.title,
    description: g.summary,
    alternates: {
      canonical: `/guides/${g.slug}/`
    }
  };
}

export default async function GuideDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = GUIDES_2026.find((x) => x.slug === slug);
  if (!g) notFound();

  return (
    <div className="container-page py-10 space-y-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: 'https://tenantfig.com/' },
          { name: 'Guides', url: 'https://tenantfig.com/guides/' },
          { name: g.title, url: `https://tenantfig.com/guides/${g.slug}/` }
        ])}
      />

      <div className="space-y-3 border-b border-slate-200 pb-6">
        <div className="text-xs font-mono uppercase tracking-widest text-[#c8a24a] font-bold">
          {g.category} · {g.readTime} · UPDATED {g.updatedAt}
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2747]">{g.title}</h1>
        <p className="text-sm text-slate-600 max-w-3xl">{g.summary}</p>

        {/* Quick-Jump Anchor Pills */}
        <div className="flex flex-wrap gap-2 pt-2">
          <a href="#calculator" className="px-3 py-1 rounded-full bg-[#0f2747] text-white text-xs font-bold hover:bg-[#1a3b68]">
            Calculator ↓
          </a>
          <a href="#statutes" className="px-3 py-1 rounded-full bg-white border border-slate-300 text-[#0f2747] text-xs font-bold hover:border-[#0f2747]">
            Benchmark Table ↓
          </a>
          <a href="#checklist" className="px-3 py-1 rounded-full bg-white border border-slate-300 text-[#0f2747] text-xs font-bold hover:border-[#0f2747]">
            Deep Breakdown ↓
          </a>
          <a href="#matrix-offer" className="px-3 py-1 rounded-full bg-amber-50 border border-[#c8a24a]/60 text-[#0f2747] text-xs font-bold hover:bg-amber-100">
            Demand Kit ↓
          </a>
        </div>
      </div>

      {/* Above-the-Fold Direct Statutory Answer + Benchmark Table */}
      <div id="statutes" className="bg-white border-l-4 border-[#059669] border-y border-r border-slate-200 rounded-r-2xl p-6 space-y-4 shadow-sm scroll-mt-20">
        <div className="text-[11px] font-mono uppercase tracking-widest text-[#059669] font-bold">
          DIRECT STATUTORY ANSWER · 2026 BENCHMARK
        </div>
        <h2 className="text-lg font-extrabold text-[#0f2747]">{g.directAnswerTitle}</h2>
        <p className="text-sm text-slate-700 leading-relaxed">{g.summary}</p>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0f2747] text-white font-mono uppercase">
              <tr>
                <th className="px-4 py-2.5">Metric / Category</th>
                <th className="px-4 py-2.5">2026 Rule / Benchmark</th>
                <th className="px-4 py-2.5">Statutory Basis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {g.directAnswerRows.map((row, idx) => (
                <tr key={idx}>
                  <td className="px-4 py-3 font-bold text-[#0f2747]">{row.metric}</td>
                  <td className="px-4 py-3 text-slate-800 font-semibold">{row.rule}</td>
                  <td className="px-4 py-3 font-mono text-slate-500">{row.statutoryBasis}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 35-40% Scroll Depth Offer Placement */}
      <ToolPaywallDossier />

      <div id="checklist" className="space-y-6 scroll-mt-20">
        {g.sections.map((sec, idx) => (
          <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-2">
            <h2 className="text-lg font-extrabold text-[#0f2747]">{sec.heading}</h2>
            <p className="text-sm text-slate-700 leading-relaxed">{sec.body}</p>
          </div>
        ))}
      </div>

      <div id="calculator" className="scroll-mt-20">
        <Link
          href={g.relatedCalculator}
          className="inline-block px-5 py-3 rounded-xl bg-[#059669] hover:bg-emerald-700 text-white text-xs font-bold transition"
        >
          {g.relatedCalculatorLabel} →
        </Link>
      </div>
    </div>
  );
}
