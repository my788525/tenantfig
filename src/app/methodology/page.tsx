import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd, breadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Audit Methodology & Statutory Verification Standards',
  description:
    'How TenantFig verifies 51-state deposit deadlines, HUD 4350.3 depreciation schedules, IRS MACRS benchmarks, and municipal rent caps.',
  alternates: {
    canonical: '/methodology/'
  }
};

export default function MethodologyPage() {
  return (
    <div className="container-page py-10 space-y-8 max-w-4xl">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: 'https://tenantfig.com/' },
          { name: 'Methodology', url: 'https://tenantfig.com/methodology/' }
        ])}
      />
      <div className="space-y-2 border-b border-slate-200 pb-6">
        <div className="text-xs font-mono uppercase tracking-widest text-[#c8a24a] font-bold">
          VERIFICATION FRAMEWORK · 2026
        </div>
        <h1 className="text-3xl font-extrabold text-[#0f2747]">Audit Methodology &amp; Verification Standards</h1>
        <p className="text-sm text-slate-600">
          Primary-source statutory mapping, HUD 4350.3 useful-life depreciation formulas, and Small Claims ROI modeling.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-5 text-sm text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-xl font-extrabold text-[#0f2747]">1. Primary-Source Statutory Verification</h2>
          <p>
            Every statutory clock, forwarding-address trigger, bad-faith penalty multiplier, and Small Claims Court jurisdictional limit on TenantFig is cross-checked directly against primary state code compilations—including California Civil Code § 1950.5, Texas Property Code §§ 92.103–92.109, New York General Obligations Law § 7-108, and Massachusetts General Laws ch. 186 § 15B—as well as official state Attorney General consumer handbooks and Judicial Branch filing portals.
          </p>
          <p>
            Where state statutes distinguish between undisputed deposit refunds and itemized damage accountings (for example, shorter windows for undisputed returns or extended windows when a tenant fails to supply a written forwarding address), our models track both triggers separately so tenants never miscalculate their demand-letter eligibility date.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-extrabold text-[#0f2747]">2. HUD Handbook 4350.3 &amp; Useful-Life Depreciation</h2>
          <p>
            To audit move-out charges for flooring, interior paint, window coverings, and appliances, TenantFig applies straight-line useful-life proration anchored to U.S. Department of Housing and Urban Development (HUD) Handbook 4350.3 guidelines and IRS residential rental MACRS depreciation benchmarks:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Standard Residential Carpet:</strong> 5 to 7 years useful life (84 months maximum for high-grade apartment nylon).</li>
            <li><strong>Interior Wall Paint:</strong> 2 to 3 years useful life in standard residential tenancies before full landlord repainting is a routine turnover expense.</li>
            <li><strong>Window Blinds &amp; Shades:</strong> 3 to 5 years useful life depending on material grade.</li>
            <li><strong>Major Appliances:</strong> 8 to 10 years useful life.</li>
          </ul>
          <p>
            When a landlord bills 100% of replacement cost on a 4-year-old carpet with a 5-year useful life, our auditor calculates the maximum lawful tenant share as 20% (1 remaining year divided by 5 total years), flagging the remaining 80% as an unlawful betterment charge.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-extrabold text-[#0f2747]">3. Municipal Rent-Cap &amp; Good Cause Modeling</h2>
          <p>
            Our 25-city rent stabilization dataset tracks both statewide caps (such as California AB 1482, Oregon SB 608, New York Good Cause Eviction, and Washington HB 1217) and municipal ordinances (such as Los Angeles RSO, San Francisco Rent Ordinance, Seattle, and Portland). Each city model incorporates published CPI-U regional adjustments, statutory hard ceilings (e.g., 5% + CPI or 10% max), and mandatory advance written notice periods (30 to 90+ days).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-extrabold text-[#0f2747]">4. Small Claims Recovery ROI Formula</h2>
          <p>
            Pursuing a deposit dispute requires weighing statutory upside against court costs and personal time. Our Small Claims ROI engine models Net Expected Recovery as: <em>(Recoverable Principal + Applicable Statutory Penalty) − (Court Filing &amp; Service Fees + Estimated Preparation &amp; Hearing Hours × Opportunity Cost)</em>, allowing renters to decide rationally between a Certified Mail settlement demand and formal court filing.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-extrabold text-[#0f2747]">5. Client-Side Reproducibility</h2>
          <p>
            All TenantFig calculators are deterministic and execute entirely in browser JavaScript with zero hidden heuristics, ensuring that identical inputs always yield identical statutory outputs and printable 《Statutory Briefs》.
          </p>
        </section>

        <div className="pt-2 flex flex-wrap gap-3 text-xs">
          <Link href="/statutes/" className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-[#0f2747]">
            Master Citation Ledger →
          </Link>
          <Link href="/editorial-policy/" className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-[#0f2747]">
            Editorial Policy →
          </Link>
        </div>
      </div>
    </div>
  );
}
