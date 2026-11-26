import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CITY_RENT_CAPS_2026, getCityBySlug } from '@/data/city_rent_caps_2026';
import { JsonLd, breadcrumbJsonLd } from '@/components/JsonLd';
import ToolPaywallDossier from '@/components/ToolPaywallDossier';

export function generateStaticParams() {
  return CITY_RENT_CAPS_2026.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city } = await params;
  const c = getCityBySlug(city);
  if (!c) return { title: 'City Not Found' };
  return {
    title: `${c.city}, ${c.stateCode} Rent Increase Cap & Notice Laws (2026)`,
    description: `${c.ordinanceName}: ${c.annualCapFormula}. ${c.noticeDaysRequired}-day notice requirement and exemptions.`
  };
}

export default async function CityDetailPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const c = getCityBySlug(city);
  if (!c) notFound();

  return (
    <div className="container-page py-10 space-y-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: 'https://tenantfig.com/' },
          { name: 'Cities', url: 'https://tenantfig.com/cities/' },
          { name: c.city, url: `https://tenantfig.com/cities/${c.slug}/` }
        ])}
      />
      <div className="space-y-3 border-b border-slate-200 pb-6">
        <div className="text-xs font-mono uppercase tracking-widest text-[#c8a24a] font-bold">
          {c.city}, {c.stateCode} · MUNICIPAL ORDINANCE
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2747]">
          {c.city} Rent Increase Cap &amp; Tenant Protections (2026)
        </h1>
        <p className="text-sm text-slate-600">{c.ordinanceName}</p>

        {/* Quick-Jump Anchor Pills */}
        <div className="flex flex-wrap gap-2 pt-2">
          <a href="#calculator" className="px-3 py-1 rounded-full bg-[#0f2747] text-white text-xs font-bold hover:bg-[#1a3b68]">
            Calculator ↓
          </a>
          <a href="#statutes" className="px-3 py-1 rounded-full bg-white border border-slate-300 text-[#0f2747] text-xs font-bold hover:border-[#0f2747]">
            Ordinance Rules ↓
          </a>
          <a href="#checklist" className="px-3 py-1 rounded-full bg-white border border-slate-300 text-[#0f2747] text-xs font-bold hover:border-[#0f2747]">
            Compliance Checklist ↓
          </a>
          <a href="#matrix-offer" className="px-3 py-1 rounded-full bg-amber-50 border border-[#c8a24a]/60 text-[#0f2747] text-xs font-bold hover:bg-amber-100">
            Objection Kit ↓
          </a>
        </div>
      </div>

      {/* Above-the-Fold Direct Statutory Answer + Benchmark Table */}
      <div className="bg-white border-l-4 border-[#059669] border-y border-r border-slate-200 rounded-r-2xl p-6 space-y-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#059669] font-bold">
            DIRECT STATUTORY ANSWER · {c.city.toUpperCase()} 2026
          </span>
          <span className="text-xs font-mono text-slate-500">{c.ordinanceName}</span>
        </div>
        <p className="text-sm text-slate-800 leading-relaxed font-medium">
          In <strong>{c.city}, {c.stateCode}</strong>, covered units are governed by <strong>{c.ordinanceName}</strong> ({c.annualCapFormula}). Landlords must provide at least{' '}
          <strong>{c.noticeDaysRequired} days</strong> written notice before any rent increase takes effect.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-[#0f2747] text-white font-mono uppercase">
              <tr>
                <th className="px-4 py-2.5">Municipal Benchmark</th>
                <th className="px-4 py-2.5">{c.city} 2026 Rule</th>
                <th className="px-4 py-2.5">Statutory Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="px-4 py-2.5 font-bold text-[#0f2747]">Effective Rent Cap</td>
                <td className="px-4 py-2.5 font-semibold text-[#059669]">
                  {c.hasLocalRentCap && c.effectiveMaxCapPct !== null ? `Max ${c.effectiveMaxCapPct}%` : 'No Local Cap'}
                </td>
                <td className="px-4 py-2.5 font-mono text-slate-500">{c.annualCapFormula}</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-bold text-[#0f2747]">Mandatory Notice Period</td>
                <td className="px-4 py-2.5 font-semibold text-slate-800">{c.noticeDaysRequired} Days</td>
                <td className="px-4 py-2.5 font-mono text-slate-500">Written Notice Required</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-bold text-[#0f2747]">Just Cause Eviction</td>
                <td className="px-4 py-2.5 font-semibold text-slate-800">{c.justCauseEviction ? 'Protected' : 'State Rules'}</td>
                <td className="px-4 py-2.5 font-mono text-slate-500">{c.ordinanceName}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 35-40% Scroll Depth Offer Placement */}
      <ToolPaywallDossier docType={`${c.city} Rent Cap Objection Packet`} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <div className="text-xs text-slate-500">Local Rent Cap</div>
          <div className="text-2xl font-black text-[#059669] mt-1">
            {c.hasLocalRentCap && c.effectiveMaxCapPct !== null ? `Max ${c.effectiveMaxCapPct}%` : 'No Local Cap'}
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <div className="text-xs text-slate-500">Mandatory Notice</div>
          <div className="text-2xl font-black text-[#0f2747] mt-1">{c.noticeDaysRequired} Days</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <div className="text-xs text-slate-500">Just Cause Eviction</div>
          <div className="text-2xl font-black text-[#0f2747] mt-1">{c.justCauseEviction ? 'Protected' : 'State Rules'}</div>
        </div>
      </div>

      <div id="statutes" className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 text-sm text-slate-700 scroll-mt-20">
        <div id="checklist">
          <strong className="text-[#0f2747]">Cap Formula:</strong> {c.annualCapFormula}
        </div>
        <div>
          <strong className="text-[#0f2747]">Exemptions:</strong> {c.exemptionsSummary}
        </div>
        <div>
          <strong className="text-[#0f2747]">Relocation &amp; Leverage:</strong> {c.relocationAssistanceNote}
        </div>
        <div id="calculator" className="pt-3 flex flex-wrap gap-3 scroll-mt-20">
          <Link
            href="/calculators/rent-increase-cap/"
            className="px-4 py-2.5 rounded-xl bg-[#0f2747] text-white text-xs font-bold hover:bg-[#1a3b68]"
          >
            Audit {c.city} Rent Hike →
          </Link>
          <a
            href={c.officialPortalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-[#0f2747] hover:bg-slate-50"
          >
            Official {c.city} Housing Portal ↗
          </a>
        </div>
      </div>
    </div>
  );
}
