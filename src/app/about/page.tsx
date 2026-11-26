import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd, breadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'About TenantFig — U.S. Tenant Statutory Defense Platform',
  description:
    'About TenantFig — institutional-grade US tenant statutory defense, 51-state security deposit recovery modeling, and HUD depreciation benchmarks.',
  alternates: {
    canonical: '/about/'
  }
};

export default function AboutPage() {
  return (
    <div className="container-page py-10 space-y-8 max-w-4xl">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: 'https://tenantfig.com/' },
          { name: 'About', url: 'https://tenantfig.com/about/' }
        ])}
      />
      <div className="space-y-2 border-b border-slate-200 pb-6">
        <div className="text-xs font-mono uppercase tracking-widest text-[#c8a24a] font-bold">
          INSTITUTIONAL PROFILE · TENANTFIG.COM
        </div>
        <h1 className="text-3xl font-extrabold text-[#0f2747]">About TenantFig</h1>
        <p className="text-sm text-slate-600">
          Quantitative statutory research, 51-jurisdiction deposit recovery modeling, and client-side tenant defense tools.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-5 text-sm text-slate-700 leading-relaxed">
        <h2 className="text-xl font-extrabold text-[#0f2747]">Our Mission &amp; Quantitative Approach</h2>
        <p>
          TenantFig is an independent quantitative legal-research and statutory modeling platform built for North American renters navigating security deposit disputes, wear-and-tear depreciation audits, municipal rent increase caps, and early lease exits. Residential landlord-tenant disputes often hinge on technical statutory deadlines—such as 14-to-60-day itemized accounting clocks, forwarding-address triggers, and prorated useful-life schedules—rather than subjective arguments. TenantFig translates primary state statutes and municipal ordinances into transparent, verifiable calculations.
        </p>
        <p>
          Across all 50 U.S. states and the District of Columbia, residential renters lose millions of dollars annually to unlawful move-out deductions for routine repainting, aged carpet replacement, and standard turnover cleaning. Our engineering and statutory research team compiles primary code citations, Attorney General consumer guidance, and Small Claims Court venue rules into interactive workbenches that empower tenants to audit landlord ledgers with institutional precision.
        </p>

        <h2 className="text-xl font-extrabold text-[#0f2747] pt-2">100% Client-Side Privacy Architecture</h2>
        <p>
          Every calculator, clause scanner, and action wizard on TenantFig executes 100% locally inside your web browser. We do not upload, log, or store your lease text, monthly rent, security deposit amount, landlord name, or generated statutory brief on any remote server. When you print a 《Statutory Brief》 or copy a Certified Mail notice, your sensitive dispute data remains strictly on your device.
        </p>

        <h2 className="text-xl font-extrabold text-[#0f2747] pt-2">Editorial Independence &amp; Primary Sources</h2>
        <p>
          TenantFig is not a law firm, property management company, or debt collection agency. Our statutory tables are anchored directly to enacted state codes—including California Civil Code § 1950.5, Texas Property Code §§ 92.103–92.109, New York General Obligations Law § 7-108, and Massachusetts General Laws ch. 186 § 15B—alongside HUD Handbook 4350.3 depreciation schedules and IRS residential rental MACRS benchmarks. For full verification details, review our{' '}
          <Link href="/methodology/" className="text-[#059669] font-bold underline">
            Audit Methodology
          </Link>
          ,{' '}
          <Link href="/editorial-policy/" className="text-[#059669] font-bold underline">
            Editorial Policy
          </Link>
          , and{' '}
          <Link href="/disclaimer/" className="text-[#059669] font-bold underline">
            Legal Disclaimer
          </Link>
          .
        </p>

        <h2 className="text-xl font-extrabold text-[#0f2747] pt-2">What We Cover</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>51-Jurisdiction Deposit Clocks:</strong> Itemized return deadlines, forwarding-address rules, and 2x/3x statutory bad-faith penalty multipliers.
          </li>
          <li>
            <strong>HUD Useful-Life Depreciation:</strong> Prorated schedules for residential carpet (5–7 years), interior paint (2–3 years), blinds, and appliances.
          </li>
          <li>
            <strong>25 Metro Rent Caps:</strong> Municipal stabilization ordinances including CA AB 1482, NYC Good Cause Eviction, Los Angeles RSO, San Francisco, Seattle, and Washington HB 1217.
          </li>
          <li>
            <strong>Small Claims Court ROI:</strong> Net expected recovery modeling factoring in court filing fees, statutory multipliers, and executive time cost.
          </li>
        </ul>

        <h2 className="text-xl font-extrabold text-[#0f2747] pt-2">Why Quantitative Modeling Matters for Renters</h2>
        <p>
          In residential housing disputes, property management firms routinely rely on standardized automated billing software that adds full replacement costs for depreciated carpet, interior paint, and routine cleaning. Without a structured statutory rebuttal, many tenants either forfeit their deposit out of convenience or accept pennies on the dollar. TenantFig levels the informational playing field by giving renters instant access to the exact same statutory formulas, HUD useful-life tables, and Small Claims venue thresholds used by housing attorneys and consumer advocates.
        </p>
        <p>
          Whether you are auditing a 21-day California deposit accounting, challenging an above-cap New York Good Cause renewal offer, or calculating whether a $1,900 Texas bad-faith claim justifies a Small Claims filing fee, our workbench provides transparent, reproducible math in seconds—with zero account creation, zero paywalls on statutory calculations, and complete client-side privacy.
        </p>
      </div>
    </div>
  );
}
