import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd, breadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: '2026 Statutory Changelog — Legislative & Ordinance Updates',
  description:
    'Legislative updates tracked across US tenant statutes in 2024–2026: CA AB 12, NYC Good Cause Eviction, WA HB 1217, MD HB 693, and CT PA 23-207.',
  alternates: {
    canonical: '/changelog/'
  }
};

export default function ChangelogPage() {
  return (
    <div className="container-page py-10 space-y-8 max-w-4xl">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: 'https://tenantfig.com/' },
          { name: '2026 Statutory Changelog', url: 'https://tenantfig.com/changelog/' }
        ])}
      />
      <div className="space-y-2 border-b border-slate-200 pb-6">
        <div className="text-xs font-mono uppercase tracking-widest text-[#c8a24a] font-bold">
          DATASET AUDIT LOG · 2024–2026
        </div>
        <h1 className="text-3xl font-extrabold text-[#0f2747]">2026 Statutory Changelog</h1>
        <p className="text-sm text-slate-600">
          Verified legislative amendments, municipal rent-cap CPI resets, and platform audit releases tracked by TenantFig.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 text-sm text-slate-700 leading-relaxed">
        <section className="border-b border-slate-100 pb-5 space-y-2">
          <div className="font-mono text-xs text-[#059669] font-bold">2026-11-26 · RELEASE 1.2 (COMPLIANCE &amp; TRUST SUITE)</div>
          <h2 className="text-lg font-extrabold text-[#0f2747]">Long-Form Statutory Protocols &amp; Governance Expansion</h2>
          <p>
            Expanded all 51 state statutory pages and 25 municipal rent-cap pages with step-by-step Certified Mail execution protocols, local Small Claims / Rent Board filing walkthroughs, and HUD 4350.3 normal wear-and-tear defenses. Published dedicated Legal Disclaimer and Editorial Policy governance pages alongside explicit GDPR/CCPA and advertising disclosures.
          </p>
        </section>

        <section className="border-b border-slate-100 pb-5 space-y-2">
          <div className="font-mono text-xs text-[#c8a24a] font-bold">2026-10-25 · RELEASE 1.0 (INSTITUTIONAL LAUNCH)</div>
          <h2 className="text-lg font-extrabold text-[#0f2747]">51-Jurisdiction &amp; 25-Metro Benchmark Release</h2>
          <p>
            Initial institutional release covering all 50 U.S. states plus the District of Columbia, 25 major metro rent-cap ordinances, 7 interactive statutory calculators, the 4-Step Tenant Action Wizard, and printable 《Statutory Briefs》.
          </p>
        </section>

        <section className="space-y-3">
          <div className="font-mono text-xs text-[#c8a24a] font-bold">KEY 2024–2026 STATUTORY UPDATES TRACKED</div>
          <h2 className="text-lg font-extrabold text-[#0f2747]">Major State &amp; Municipal Legislative Changes</h2>
          <ul className="list-disc pl-5 space-y-2.5">
            <li>
              <strong>California AB 12 &amp; Small Claims Expansion:</strong> Capped residential security deposits at 1 month&apos;s rent for most landlords (effective July 2024, with limited small-landlord exceptions) and raised California Small Claims Court individual claim limits to $12,500 under Cal. Code Civ. Proc. § 116.221.
            </li>
            <li>
              <strong>New York Good Cause Eviction Law:</strong> Established a statewide benchmark capping covered rent increases at CPI + 5% or 10% (whichever is lower) in New York City and opt-in municipalities, paired with mandatory Just Cause renewal protections.
            </li>
            <li>
              <strong>Washington HB 1217 &amp; RCW 59.18.280:</strong> Enacted statewide annual rent-cap protections alongside the strict 30-day deposit itemization and vendor-documentation rule, carrying up to 2x statutory damages for bad-faith retention.
            </li>
            <li>
              <strong>Maryland HB 693:</strong> Reduced the maximum residential security deposit cap from 2 months&apos; rent to 1 month&apos;s rent across Maryland tenancies, aligning with modern consumer-protection standards.
            </li>
            <li>
              <strong>Connecticut PA 23-207:</strong> Shortened the landlord security deposit return and itemized accounting clock from 30 days to 21 days after tenancy termination and forwarding-address delivery, with double-damages enforcement.
            </li>
            <li>
              <strong>Colorado HB 23-1099 &amp; Portable Screening / Deposit Rules:</strong> Reinforced strict 30-to-60-day deposit accounting timelines and treble-damages exposure for willful retention after a 7-day statutory demand notice.
            </li>
            <li>
              <strong>2026 Small Claims Venue Threshold Adjustments:</strong> Updated filing-fee estimates and jurisdictional ceilings across all 51 states, including California ($12,500), Texas ($20,000), Tennessee ($25,000), and New York City ($10,000).
            </li>
          </ul>
        </section>

        <section className="space-y-2 pt-2 border-t border-slate-100">
          <h2 className="text-lg font-extrabold text-[#0f2747]">Upcoming 2027 Legislative Watchlist</h2>
          <p>
            Our research desk continuously monitors pending state bills affecting mandatory electronic deposit returns, junk-fee bans in residential leasing, and municipal CPI rent-cap resets in Los Angeles, San Francisco, Seattle, and New York City. Submit legislative tips to{' '}
            <a href="mailto:editorial@tenantfig.com" className="text-[#059669] font-bold underline">
              editorial@tenantfig.com
            </a>
            .
          </p>
        </section>

        <div className="pt-2 flex flex-wrap gap-3 text-xs">
          <Link href="/states/" className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-[#0f2747]">
            Browse All 51 Jurisdictions →
          </Link>
          <Link href="/cities/" className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-[#0f2747]">
            Browse 25 Metro Rent Caps →
          </Link>
        </div>
      </div>
    </div>
  );
}
