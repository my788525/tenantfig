import React from 'react';
import Link from 'next/link';
import { TENANT_STATUTES_2026 } from '@/data/tenant_statutes_2026';
import { CITY_RENT_CAPS_2026 } from '@/data/city_rent_caps_2026';
import { CASE_STUDIES_2026, GUIDES_2026 } from '@/data/cases_and_guides';
import { JsonLd, faqJsonLd } from '@/components/JsonLd';
import ToolPaywallDossier from '@/components/ToolPaywallDossier';
import HiddenTrapsCallout from '@/components/HiddenTrapsCallout';

const CALCULATORS = [
  {
    href: '/calculators/security-deposit-penalty/',
    badge: '01 · STATUTORY CLOCK',
    title: 'Security Deposit Penalty Calculator',
    desc: 'Verify 14–60 day return deadlines, forwarding-address triggers, and 2x/3x bad-faith statutory damages across 51 jurisdictions.',
    metric: 'Up to 3x + Fees'
  },
  {
    href: '/calculators/wear-and-tear-deduction/',
    badge: '02 · HUD 4350.3 AUDIT',
    title: 'Wear & Tear Depreciation Auditor',
    desc: 'Prorate carpet (5–7 yr) and interior paint (2–3 yr) useful-life schedules to strike illegal full-replacement charges.',
    metric: '5–7 Yr Carpet / 2–3 Yr Paint'
  },
  {
    href: '/calculators/rent-increase-cap/',
    badge: '03 · 25 METRO CAPS',
    title: 'Rent Increase Cap Auditor',
    desc: 'Audit renewal hikes against CA AB 1482, NYC Good Cause Eviction, LA RSO, SF, Seattle, and 25 major metro ordinances.',
    metric: 'CPI + Cap & Notice'
  },
  {
    href: '/calculators/lease-break-mitigation/',
    badge: '04 · DUTY TO MITIGATE',
    title: 'Lease Break Mitigation Calculator',
    desc: 'Compare early-termination buyout fees against prorated vacancy liability under your state’s landlord mitigation duty.',
    metric: 'Vacancy Proration ROI'
  },
  {
    href: '/calculators/small-claims-roi/',
    badge: '05 · COURT ROI',
    title: 'Small Claims Recovery ROI',
    desc: 'Model net expected recovery: principal + statutory multiplier minus filing fees and executive time opportunity cost.',
    metric: 'Up to $25k Venue Limit'
  },
  {
    href: '/calculators/lease-clause-scanner/',
    badge: '06 · ANTI-WAIVER ENGINE',
    title: 'Lease Red-Flag & Illegal Clause Scanner',
    desc: 'Scan lease text for void non-refundable deposit clauses, wear-and-tear waivers, warrantless entry, and rent-cap traps across 51 states.',
    metric: '0–100% Enforceability'
  },
  {
    href: '/calculators/deduction-invoice-auditor/',
    badge: '07 · RECEIPT & BENCHMARK AUDIT',
    title: 'Itemized Move-Out Deduction & Receipt Auditor',
    desc: 'Audit cleaning, paint, carpet, and blinds charges against state receipt thresholds (e.g. CA $125 rule) and metro market benchmarks.',
    metric: 'Line-by-Line Audit'
  }
];

const HOME_FAQS = [
  {
    question: 'How much can I recover if my landlord misses the security deposit return deadline?',
    answer:
      'Depending on your state, missing the statutory return window (14 to 60 days) forfeits the landlord’s right to deduct and triggers 2x to 3x statutory bad-faith damages plus court costs and attorney fees.'
  },
  {
    question: 'Can a landlord charge me full price to replace 5-year-old apartment carpet or paint?',
    answer:
      'No. Under HUD Handbook 4350.3 and state landlord-tenant depreciation standards, normal wear and tear is $0, and even actual damage is capped at depreciated remaining useful life (5–7 years for carpet, 2–3 years for interior paint).'
  },
  {
    question: 'Does TenantFig cover all 50 states and major metro rent control ordinances?',
    answer:
      'Yes. TenantFig indexes all 50 U.S. states plus Washington, D.C. (51 jurisdictions) and 25 major white-collar metro cities with verified 2026 statutory citations and official .gov links.'
  }
];

export default function HomePage() {
  return (
    <div>
      <JsonLd data={faqJsonLd(HOME_FAQS)} />

      {/* Executive Hero */}
      <section className="bg-[#0f2747] text-white border-b border-[#c8a24a]/30">
        <div className="container-page px-5 sm:px-6 py-12 sm:py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 px-3.5 py-1.5 rounded-full bg-[#09192e] border border-[#c8a24a]/50 text-[11px] font-mono text-[#e2be68] max-w-full">
              <span>51 US JURISDICTIONS</span>
              <span aria-hidden="true">·</span>
              <span>25 METRO RENT CAPS</span>
              <span aria-hidden="true">·</span>
              <span>2026 VERIFIED</span>
            </div>

            <h1 className="mt-6 text-[28px] sm:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
              U.S. Tenant Statutory Defense &amp; Deposit Recovery Workbench
            </h1>

            <p className="mt-6 text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              Audit withheld security deposits, prorate HUD carpet &amp; paint depreciation, verify CA AB 1482 &amp; NYC Good Cause rent caps, and generate printable 《Statutory Briefs》 with certified demand notices.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3.5 sm:gap-4">
              <Link
                href="/wizard/"
                className="px-5 py-3.5 rounded-xl bg-[#c8a24a] hover:bg-[#e2be68] text-[#09192e] font-extrabold text-sm text-center transition shadow-lg"
              >
                Start 4-Step Action Wizard →
              </Link>
              <Link
                href="/calculators/security-deposit-penalty/"
                className="px-5 py-3.5 rounded-xl bg-[#059669] hover:bg-emerald-500 text-white font-extrabold text-sm text-center transition shadow-lg"
              >
                Launch Deposit Penalty Audit
              </Link>
              <Link
                href="/states/"
                className="px-5 py-3.5 rounded-xl bg-[#09192e] hover:bg-slate-900 text-white border border-white/20 font-bold text-sm text-center transition"
              >
                Browse 51 State Statutes
              </Link>
            </div>
          </div>

          {/* Right: Live Statutory Telemetry Snapshot */}
          <div className="lg:col-span-5 bg-[#09192e] border border-[#c8a24a]/30 rounded-2xl p-5 sm:p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center gap-2 border-b border-white/10 pb-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[#c8a24a] font-bold">
                2026 STATUTORY BENCHMARKS
              </span>
              <span className="text-[11px] font-mono text-emerald-400 shrink-0">LIVE INDEX</span>
            </div>
            <div className="space-y-3 text-xs">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-1.5 border-b border-white/5">
                <span className="text-slate-300">California (Cal. Civ. Code § 1950.5)</span>
                <span className="font-mono font-bold text-emerald-400 tabular-nums shrink-0">21 Days · 2x Penalty</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-1.5 border-b border-white/5">
                <span className="text-slate-300">Texas (Tex. Prop. Code § 92.109)</span>
                <span className="font-mono font-bold text-emerald-400 tabular-nums shrink-0">30 Days · 3x + $100</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-1.5 border-b border-white/5">
                <span className="text-slate-300">New York (N.Y. Gen. Oblig. § 7-108)</span>
                <span className="font-mono font-bold text-emerald-400 tabular-nums shrink-0">14 Days · 2x Forfeiture</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-1.5 border-b border-white/5">
                <span className="text-slate-300">Massachusetts (M.G.L. ch. 186 § 15B)</span>
                <span className="font-mono font-bold text-emerald-400 tabular-nums shrink-0">30 Days · 3x + Fees</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-1.5">
                <span className="text-slate-300">Washington (RCW § 59.18.280)</span>
                <span className="font-mono font-bold text-emerald-400 tabular-nums shrink-0">30 Days · 2x + Fees</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Executive Calculators */}
      <section className="container-page py-12 space-y-6">
        <HiddenTrapsCallout variant="home" />
        <div className="flex flex-wrap justify-between items-end gap-2">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#c8a24a] font-bold">
              PRECISION WORKBENCH
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f2747]">
              7 Executive Statutory Calculators
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/wizard/"
              className="px-3.5 py-2 rounded-xl bg-[#0f2747] hover:bg-[#1a3b68] text-white text-xs font-bold transition"
            >
              Guided 4-Step Wizard →
            </Link>
            <span className="hidden sm:inline text-xs text-slate-500">Pre-filled defaults · 3 presets each · Printable Brief</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CALCULATORS.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group bg-white border border-slate-200 hover:border-[#0f2747] rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono font-bold text-[#c8a24a] uppercase tracking-wider">
                    {c.badge}
                  </span>
                  <span className="text-[11px] font-mono font-semibold text-[#059669] bg-emerald-50 px-2 py-0.5 rounded">
                    {c.metric}
                  </span>
                </div>
                <h3 className="text-lg font-extrabold text-[#0f2747] group-hover:text-[#1a3b68]">
                  {c.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">{c.desc}</p>
              </div>
              <div className="text-xs font-bold text-[#0f2747] pt-2 border-t border-slate-100">
                Open Calculator →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 35-40% Scroll Depth Offer Placement */}
      <section className="container-page pb-4">
        <ToolPaywallDossier />
      </section>

      {/* Real-Ledger Case Studies */}
      <section className="bg-white border-y border-slate-200 py-12">
        <div className="container-page space-y-6">
          <div className="flex justify-between items-end">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#c8a24a] font-bold">
                REAL-LEDGER CASE STUDIES
              </div>
              <h2 className="text-2xl font-extrabold text-[#0f2747]">Verified Recovery Outcomes</h2>
            </div>
            <Link href="/cases/" className="text-xs font-bold text-[#0f2747] hover:underline">
              All Cases →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {CASE_STUDIES_2026.map((cs) => (
              <Link
                key={cs.slug}
                href={`/cases/${cs.slug}/`}
                className="bg-[#f6f8fb] border border-slate-200 hover:border-[#0f2747] rounded-2xl p-5 space-y-3 transition"
              >
                <div className="flex justify-between items-center text-xs">
                  <span className="font-mono font-bold text-[#0f2747]">{cs.city}</span>
                  <span className="font-mono font-bold text-[#059669] tabular-nums">
                    ${cs.disputedAmountUsd.toLocaleString()} Disputed
                  </span>
                </div>
                <h3 className="text-sm font-extrabold text-[#0f2747] leading-snug">{cs.title}</h3>
                <p className="text-xs text-slate-600 line-clamp-3">{cs.outcomeSummary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 51 States & 25 Cities Quick Directory */}
      <section className="container-page py-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-extrabold text-[#0f2747]">51 State Statutory Deadlines</h2>
            <Link href="/states/" className="text-xs font-bold text-[#059669] hover:underline">
              View All 51 →
            </Link>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {TENANT_STATUTES_2026.map((s) => (
              <Link
                key={s.code}
                href={`/states/${s.slug}/`}
                className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 hover:border-[#0f2747] text-xs font-semibold text-[#0f2747] transition"
              >
                {s.code} ({s.itemizedReturnDays}d)
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-extrabold text-[#0f2747]">Top 25 Metro Rent Caps</h2>
            <Link href="/cities/" className="text-xs font-bold text-[#059669] hover:underline">
              View All 25 →
            </Link>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {CITY_RENT_CAPS_2026.map((c) => (
              <Link
                key={c.slug}
                href={`/cities/${c.slug}/`}
                className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 hover:border-[#0f2747] text-xs font-semibold text-[#0f2747] transition"
              >
                {c.city}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Guides & Paywall */}
      <section className="container-page pb-12 space-y-8">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-extrabold text-[#0f2747]">2026 Statutory Defense Guides</h2>
            <Link href="/guides/" className="text-xs font-bold text-[#0f2747] hover:underline">
              All 6 Guides →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {GUIDES_2026.slice(0, 3).map((g) => (
              <Link
                key={g.slug}
                href={`/guides/${g.slug}/`}
                className="bg-white border border-slate-200 hover:border-[#0f2747] rounded-2xl p-5 space-y-2 transition"
              >
                <span className="text-[10px] font-mono uppercase text-[#c8a24a] font-bold">{g.category}</span>
                <h3 className="text-sm font-extrabold text-[#0f2747]">{g.title}</h3>
                <p className="text-xs text-slate-600 line-clamp-2">{g.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
