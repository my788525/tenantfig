import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { TENANT_STATUTES_2026, getStateBySlug } from '@/data/tenant_statutes_2026';
import { JsonLd, breadcrumbJsonLd, faqJsonLd } from '@/components/JsonLd';
import ToolPaywallDossier from '@/components/ToolPaywallDossier';

export function generateStaticParams() {
  return TENANT_STATUTES_2026.map((s) => ({ state: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }): Promise<Metadata> {
  const { state } = await params;
  const s = getStateBySlug(state);
  if (!s) return { title: 'State Not Found' };
  return {
    title: `${s.name} Security Deposit Laws & Tenant Statutes (2026)`,
    description: `${s.name} (${s.statuteCitation}): ${s.itemizedReturnDays}-day security deposit return deadline, ${s.penaltyMultiplier}x statutory penalty, and $${s.smallClaimsLimitUsd.toLocaleString()} Small Claims limit.`
  };
}

export default async function StateDetailPage({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  const s = getStateBySlug(state);
  if (!s) notFound();

  const faqs = [
    {
      question: `How many days does a landlord have to return a security deposit in ${s.name}?`,
      answer: `${s.itemizedReturnDays} days (${s.undisputedReturnDays} days if undisputed) under ${s.statuteCitation}. ${s.forwardingAddressNote}`
    },
    {
      question: `What is the statutory penalty for wrongful deposit withholding in ${s.name}?`,
      answer: s.penaltySummary
    }
  ];

  return (
    <div className="container-page py-10 space-y-8">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: 'Home', url: 'https://tenantfig.com/' },
            { name: 'States', url: 'https://tenantfig.com/states/' },
            { name: s.name, url: `https://tenantfig.com/states/${s.slug}/` }
          ]),
          faqJsonLd(faqs)
        ]}
      />

      <div className="space-y-3 border-b border-slate-200 pb-6">
        <div className="text-xs font-mono uppercase tracking-widest text-[#c8a24a] font-bold">
          {s.code} · {s.statuteCitation}
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2747]">
          {s.name} Tenant Statutory Defense &amp; Security Deposit Law (2026)
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl">{s.keyExecutiveTakeaway}</p>

        {/* Quick-Jump Anchor Pills */}
        <div className="flex flex-wrap gap-2 pt-2">
          <a href="#calculator" className="px-3 py-1 rounded-full bg-[#0f2747] text-white text-xs font-bold hover:bg-[#1a3b68]">
            Calculator ↓
          </a>
          <a href="#statutes" className="px-3 py-1 rounded-full bg-white border border-slate-300 text-[#0f2747] text-xs font-bold hover:border-[#0f2747]">
            Statutes ↓
          </a>
          <a href="#checklist" className="px-3 py-1 rounded-full bg-white border border-slate-300 text-[#0f2747] text-xs font-bold hover:border-[#0f2747]">
            Action Checklist ↓
          </a>
          <a href="#matrix-offer" className="px-3 py-1 rounded-full bg-amber-50 border border-[#c8a24a]/60 text-[#0f2747] text-xs font-bold hover:bg-amber-100">
            Demand Kit ↓
          </a>
        </div>
      </div>

      {/* Above-the-Fold Direct Statutory Answer + Benchmark Table */}
      <div className="bg-white border-l-4 border-[#059669] border-y border-r border-slate-200 rounded-r-2xl p-6 space-y-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#059669] font-bold">
            DIRECT STATUTORY ANSWER · {s.code} 2026
          </span>
          <span className="text-xs font-mono text-slate-500">{s.statuteCitation}</span>
        </div>
        <p className="text-sm text-slate-800 leading-relaxed font-medium">
          In <strong>{s.name}</strong>, landlords must return security deposits or provide an itemized deduction list within{' '}
          <strong>{s.itemizedReturnDays} days</strong> ({s.undisputedReturnDays} days if undisputed). Wrongful withholding triggers up to{' '}
          <strong>{s.penaltyMultiplier}x{s.fixedPenaltyUsd ? ` + $${s.fixedPenaltyUsd}` : ''}</strong> in statutory damages, recoverable in Small Claims Court up to{' '}
          <strong>${s.smallClaimsLimitUsd.toLocaleString()}</strong>.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-[#0f2747] text-white font-mono uppercase">
              <tr>
                <th className="px-4 py-2.5">Statutory Benchmark</th>
                <th className="px-4 py-2.5">{s.name} ({s.code}) Rule</th>
                <th className="px-4 py-2.5">Authority / Limit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="px-4 py-2.5 font-bold text-[#0f2747]">Deposit Return Window</td>
                <td className="px-4 py-2.5 font-semibold text-slate-800">{s.itemizedReturnDays} Days ({s.undisputedReturnDays}d undisputed)</td>
                <td className="px-4 py-2.5 font-mono text-slate-500">{s.statuteCitation}</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-bold text-[#0f2747]">Bad-Faith Statutory Penalty</td>
                <td className="px-4 py-2.5 font-semibold text-[#059669]">{s.penaltyMultiplier}x{s.fixedPenaltyUsd ? ` + $${s.fixedPenaltyUsd}` : ''}</td>
                <td className="px-4 py-2.5 font-mono text-slate-500">{s.attorneyFeesAllowed ? 'Attorney Fees Recoverable' : 'Statutory Damages'}</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-bold text-[#0f2747]">Small Claims Venue Limit</td>
                <td className="px-4 py-2.5 font-semibold text-slate-800">${s.smallClaimsLimitUsd.toLocaleString()}</td>
                <td className="px-4 py-2.5 font-mono text-slate-500">Est. Filing Fee: ${s.smallClaimsFilingFeeEstUsd}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 35-40% Scroll Depth Offer Placement */}
      <ToolPaywallDossier docType={`${s.code} Statutory Defense Packet`} />

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <div className="text-xs text-slate-500">Return Deadline</div>
          <div className="text-2xl font-black text-[#0f2747] tabular-nums mt-1">{s.itemizedReturnDays} Days</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <div className="text-xs text-slate-500">Statutory Penalty</div>
          <div className="text-2xl font-black text-[#059669] tabular-nums mt-1">
            {s.penaltyMultiplier}x{s.fixedPenaltyUsd ? ` + $${s.fixedPenaltyUsd}` : ''}
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <div className="text-xs text-slate-500">Small Claims Limit</div>
          <div className="text-2xl font-black text-[#0f2747] tabular-nums mt-1">
            ${s.smallClaimsLimitUsd.toLocaleString()}
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <div className="text-xs text-slate-500">Mitigation Duty</div>
          <div className="text-xl font-extrabold text-[#0f2747] mt-1">{s.mitigationDuty}</div>
        </div>
      </div>

      {/* Statute Breakdown */}
      <div id="statutes" className="grid grid-cols-1 lg:grid-cols-12 gap-6 scroll-mt-20">
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 space-y-4 text-sm text-slate-700">
          <h2 className="text-lg font-extrabold text-[#0f2747]">Statutory Rules &amp; Triggers</h2>
          <div className="space-y-3">
            <div>
              <strong className="text-[#0f2747]">Forwarding Address Clock:</strong> {s.forwardingAddressNote}
            </div>
            <div>
              <strong className="text-[#0f2747]">Penalty &amp; Attorney Fees:</strong> {s.penaltySummary}
            </div>
            <div>
              <strong className="text-[#0f2747]">Deposit Cap &amp; Escrow:</strong> {s.depositCapNote}
            </div>
            <div>
              <strong className="text-[#0f2747]">Rent Cap Status:</strong> {s.rentCapSummary}
            </div>
          </div>

          <div id="calculator" className="pt-4 border-t border-slate-100 flex flex-wrap gap-3 scroll-mt-20">
            <Link
              href="/calculators/security-deposit-penalty/"
              className="px-4 py-2.5 rounded-xl bg-[#0f2747] text-white text-xs font-bold hover:bg-[#1a3b68]"
            >
              Calculate {s.code} Deposit Penalty →
            </Link>
            <Link
              href="/calculators/small-claims-roi/"
              className="px-4 py-2.5 rounded-xl bg-[#059669] text-white text-xs font-bold hover:bg-emerald-700"
            >
              Calculate {s.code} Small Claims ROI →
            </Link>
          </div>
        </div>

        <div id="checklist" className="lg:col-span-4 bg-[#0f2747] text-white rounded-2xl p-6 space-y-4 scroll-mt-20">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#c8a24a]">Official .GOV Resources</h3>
          <ul className="space-y-3 text-xs">
            <li>
              <a
                href={s.officialGovUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-200 hover:text-white underline break-all"
              >
                {s.name} Attorney General / Consumer Guide ↗
              </a>
            </li>
            <li>
              <a
                href={s.officialCourtUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-200 hover:text-white underline break-all"
              >
                {s.name} Small Claims Court Portal ↗
              </a>
            </li>
          </ul>
          <div className="pt-3 border-t border-white/10 text-xs text-slate-300">
            Est. Filing Fee: <strong className="text-white">${s.smallClaimsFilingFeeEstUsd}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
