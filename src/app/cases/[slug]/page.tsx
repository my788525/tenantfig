import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CASE_STUDIES_2026 } from '@/data/cases_and_guides';
import { JsonLd, breadcrumbJsonLd } from '@/components/JsonLd';
import ToolPaywallDossier from '@/components/ToolPaywallDossier';
import { fitTitle } from '@/lib/seo';

export function generateStaticParams() {
  return CASE_STUDIES_2026.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cs = CASE_STUDIES_2026.find((c) => c.slug === slug);
  if (!cs) return { title: 'Case Not Found' };
  return {
    title: fitTitle(cs.title, 48),
    description: cs.outcomeSummary,
    alternates: {
      canonical: `/cases/${cs.slug}/`
    }
  };
}

export default async function CaseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = CASE_STUDIES_2026.find((c) => c.slug === slug);
  if (!cs) notFound();

  return (
    <div className="container-page py-10 space-y-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: 'https://tenantfig.com/' },
          { name: 'Cases', url: 'https://tenantfig.com/cases/' },
          { name: cs.city, url: `https://tenantfig.com/cases/${cs.slug}/` }
        ])}
      />

      <div className="space-y-2 border-b border-slate-200 pb-6">
        <div className="text-xs font-mono uppercase tracking-widest text-[#c8a24a] font-bold">
          REAL-LEDGER CASE STUDY · {cs.city}
        </div>
        <h1 className="text-3xl font-extrabold text-[#0f2747]">{cs.title}</h1>
        <p className="text-sm text-slate-600 max-w-3xl">{cs.outcomeSummary}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <div className="text-xs text-slate-500">Disputed Principal</div>
          <div className="text-2xl font-black text-[#0f2747] tabular-nums mt-1">
            ${cs.disputedAmountUsd.toLocaleString()}
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <div className="text-xs text-slate-500">Landlord Statutory Exposure</div>
          <div className="text-2xl font-black text-[#059669] tabular-nums mt-1">
            ${cs.statutoryExposureUsd.toLocaleString()}
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <div className="text-xs text-slate-500">Statutes Invoked</div>
          <div className="text-xs font-mono font-bold text-[#0f2747] mt-1">{cs.statutesInvoked.join(' · ')}</div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
        <h2 className="text-lg font-extrabold text-[#0f2747]">Line-Item Audit Ledger</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 font-mono uppercase">
              <tr>
                <th className="px-4 py-2.5">Claimed Item</th>
                <th className="px-4 py-2.5">Landlord Claim</th>
                <th className="px-4 py-2.5">Legal Allowed</th>
                <th className="px-4 py-2.5">Statutory Basis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {cs.ledgerRows.map((r, i) => (
                <tr key={i}>
                  <td className="px-4 py-3 font-bold text-[#0f2747]">{r.item}</td>
                  <td className="px-4 py-3 tabular-nums">${r.landlordClaim.toLocaleString()}</td>
                  <td className="px-4 py-3 font-bold text-[#059669] tabular-nums">${r.legalAllowed.toLocaleString()}</td>
                  <td className="px-4 py-3 text-slate-600">{r.basis}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 35-40% Scroll Depth Offer Placement */}
      <ToolPaywallDossier dynamicAmount={`$${cs.statutoryExposureUsd.toLocaleString()}`} />

      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3">
        <h2 className="text-lg font-extrabold text-[#0f2747]">Execution Timeline</h2>
        <div className="space-y-3">
          {cs.timeline.map((t, i) => (
            <div key={i} className="flex gap-4 text-xs">
              <span className="font-mono font-bold text-[#c8a24a] shrink-0 w-16">{t.day}</span>
              <span className="text-slate-700">{t.event}</span>
            </div>
          ))}
        </div>
        <div className="pt-3 border-t border-slate-100 text-xs text-[#0f2747] font-semibold">
          Executive Takeaway: {cs.executiveTakeaway}
        </div>
      </div>

      <div className="flex gap-3">
        <Link
          href="/calculators/security-deposit-penalty/"
          className="px-4 py-2.5 rounded-xl bg-[#0f2747] text-white text-xs font-bold"
        >
          Run Your Own Deposit Audit →
        </Link>
      </div>
    </div>
  );
}
