import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PITFALLS_2026, PITFALL_FAQS } from '@/data/pitfalls_2026';
import { JsonLd, breadcrumbJsonLd, faqJsonLd } from '@/components/JsonLd';
import ToolPaywallDossier from '@/components/ToolPaywallDossier';

export const metadata: Metadata = {
  title: 'Tenant Pitfalls & Survival Playbook (2026)',
  description:
    '6 real-case tenant traps that silently forfeit security deposits and rent-cap rights: missing forwarding address, UCC § 3-311 "Payment in Full" checks, mailbox key-drops, text vs. Certified Mail, HUD carpet/paint depreciation, and AB 1482 exemption loopholes.',
  alternates: {
    canonical: 'https://tenantfig.com/pitfalls/'
  }
};

export default function PitfallsPlaybookPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Real-World Tenant Pitfalls, Black Holes & Survival Playbook (2026)',
    description:
      'Field-tested survival guide to 6 statutory traps that cause renters to forfeit security deposits, 2x–3x penalties, and rent-cap protections.',
    author: {
      '@type': 'Organization',
      name: 'TenantFig',
      url: 'https://tenantfig.com'
    },
    publisher: {
      '@type': 'Organization',
      name: 'TenantFig',
      url: 'https://tenantfig.com'
    },
    datePublished: '2026-01-15',
    dateModified: '2026-11-26',
    mainEntityOfPage: 'https://tenantfig.com/pitfalls/'
  };

  const firstBatch = PITFALLS_2026.slice(0, 2);
  const secondBatch = PITFALLS_2026.slice(2);

  return (
    <div className="container-page py-10 space-y-10">
      <JsonLd
        data={[
          articleJsonLd,
          faqJsonLd(PITFALL_FAQS),
          breadcrumbJsonLd([
            { name: 'Home', url: 'https://tenantfig.com/' },
            { name: 'Pitfalls & Survival Playbook', url: 'https://tenantfig.com/pitfalls/' }
          ])
        ]}
      />

      {/* Executive Header */}
      <header className="bg-[#0f2747] text-white rounded-2xl p-6 sm:p-10 border border-[#c8a24a]/40 shadow-xl space-y-5 print-brief">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#09192e] border border-[#c8a24a]/50 text-[11px] font-mono text-[#e2be68]">
            <span>2026 FIELD SURVIVAL PLAYBOOK</span>
            <span aria-hidden="true">·</span>
            <span>6 REAL-CASE TRAPS</span>
          </div>
          <span className="text-[11px] font-mono text-slate-300 no-print">
            Print-Ready Statutory Brief (Ctrl/Cmd + P)
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
          Real-World Pitfalls, Black Holes &amp; Survival Playbook
        </h1>

        <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
          Most renters don&apos;t lose their security deposits because the law is against them—they lose because of six procedural black holes that quietly pause statutory clocks, waive claims, or invalidate evidence. Review each real-world scenario before you hand over keys, cash a check, or send a demand.
        </p>

        {/* Quick Jump Index */}
        <div className="pt-2 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 no-print">
          {PITFALLS_2026.map((p) => (
            <a
              key={p.id}
              href={`#${p.id}`}
              className="flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl bg-[#09192e] border border-white/10 hover:border-[#c8a24a]/60 text-xs transition"
            >
              <span className="font-bold text-slate-100 truncate">
                <span className="text-[#c8a24a] font-mono mr-1.5">{p.number}.</span>
                {p.shortTitle}
              </span>
              <span className="text-[10px] font-mono text-rose-300 shrink-0">↓</span>
            </a>
          ))}
        </div>
      </header>

      {/* Vignettes 1–2 */}
      <div className="space-y-8">
        {firstBatch.map((pitfall) => (
          <PitfallCard key={pitfall.id} pitfall={pitfall} />
        ))}
      </div>

      {/* ~35–40% Scroll Depth Conversion Placement */}
      <ToolPaywallDossier
        badge="TRAP-PROOF STATUTORY DEFENSE KIT"
        title="Protect Yourself From All 6 Procedural Traps Automatically"
        desc="Get the turnkey Certified Mail Demand Suite, UCC § 3-311 Partial-Check Rejection Letter, Key-Surrender Receipt, and 5-Tab HUD Depreciation Workstation."
        pid="pdt_0Nsmkl1NJxiaPAsPE2UhB"
        price="$24.99"
        docType="Trap-Proof Statutory Defense & Certified Mail Kit"
        sampleLines={[
          { label: 'Included', value: 'Forwarding Address + UCC § 3-311 Letters' },
          { label: 'Evidence', value: 'Key-Surrender Receipt & Photo Log' },
          { label: 'Audit', value: 'HUD 4350.3 Carpet & Paint Proration' }
        ]}
      />

      {/* Vignettes 3–6 */}
      <div className="space-y-8">
        {secondBatch.map((pitfall) => (
          <PitfallCard key={pitfall.id} pitfall={pitfall} />
        ))}
      </div>

      {/* FAQ Section */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-5">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-[#c8a24a] font-bold">
            FREQUENTLY ASKED QUESTIONS
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f2747]">
            Procedural Trap &amp; Recovery FAQs
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PITFALL_FAQS.map((faq) => (
            <div key={faq.question} className="bg-[#f6f8fb] border border-slate-200 rounded-xl p-5 space-y-2">
              <h3 className="text-sm font-extrabold text-[#0f2747]">{faq.question}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Wizard CTA */}
      <section className="bg-[#09192e] text-white rounded-2xl p-6 sm:p-8 border border-[#c8a24a]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 no-print">
        <div className="space-y-1.5">
          <div className="text-[11px] font-mono uppercase tracking-widest text-[#c8a24a] font-bold">
            READY TO ACT?
          </div>
          <h2 className="text-xl font-extrabold">
            Run Your Case Through the 4-Step Statutory Action Wizard
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl">
            Model your exact state clock, HUD depreciation, and small-claims ROI in under 2 minutes—and generate a clean, court-ready Statutory Brief.
          </p>
        </div>
        <Link
          href="/wizard/"
          className="shrink-0 px-5 py-3 rounded-xl bg-[#c8a24a] hover:bg-[#e2be68] text-[#09192e] font-extrabold text-sm transition shadow-lg"
        >
          Launch Action Wizard →
        </Link>
      </section>
    </div>
  );
}

function PitfallCard({ pitfall }: { pitfall: (typeof PITFALLS_2026)[number] }) {
  return (
    <article
      id={pitfall.id}
      className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 scroll-mt-24 print-brief"
    >
      {/* Card Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
            <span className="px-2 py-0.5 rounded bg-[#0f2747] text-[#e2be68] font-bold">
              TRAP {pitfall.number}
            </span>
            <span className="text-[#c8a24a] font-bold uppercase tracking-wider">
              {pitfall.category}
            </span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-500">{pitfall.jurisdictions.join(', ')}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f2747]">{pitfall.title}</h2>
        </div>

        <div className="shrink-0 inline-flex items-center px-3 py-1.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs font-mono font-bold">
          Risk: {pitfall.lossExposure}
        </div>
      </div>

      {/* 3-Stage Flow: Real-World Case -> Hidden Black Hole -> Exact Survival Move */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-4 bg-[#f6f8fb] border border-slate-200 rounded-xl p-4 sm:p-5 space-y-2">
          <div className="text-[10px] font-mono uppercase tracking-widest font-bold text-[#0f2747]">
            1. REAL-WORLD CASE SCENARIO
          </div>
          <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed">
            {pitfall.realWorldScenario}
          </p>
        </div>

        <div className="lg:col-span-4 bg-rose-50/60 border border-rose-200 rounded-xl p-4 sm:p-5 space-y-2">
          <div className="text-[10px] font-mono uppercase tracking-widest font-bold text-rose-800">
            2. THE HIDDEN BLACK HOLE
          </div>
          <p className="text-xs sm:text-[13px] text-slate-800 leading-relaxed">
            {pitfall.hiddenBlackHole}
          </p>
        </div>

        <div className="lg:col-span-4 bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 sm:p-5 space-y-2.5">
          <div className="text-[10px] font-mono uppercase tracking-widest font-bold text-emerald-800">
            3. EXACT SURVIVAL MOVE
          </div>
          <ul className="space-y-2 text-xs sm:text-[13px] text-slate-800 leading-relaxed">
            {pitfall.exactSurvivalMove.map((step, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="font-mono font-bold text-emerald-700 shrink-0">✓</span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Applicable Statute + Tool Link */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
        <div className="text-slate-600">
          <span className="font-mono font-bold text-[#0f2747] uppercase text-[11px] mr-2">
            Applicable Statute:
          </span>
          <span className="font-mono text-[11px] sm:text-xs">{pitfall.applicableStatute}</span>
        </div>
        <Link
          href={pitfall.relatedToolHref}
          className="shrink-0 font-bold text-[#0f2747] hover:text-[#1a3b68] hover:underline no-print"
        >
          {pitfall.relatedToolLabel}
        </Link>
      </div>
    </article>
  );
}
