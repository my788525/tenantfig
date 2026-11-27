import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd, breadcrumbJsonLd, faqJsonLd } from '@/components/JsonLd';

const CHECKOUT_URL =
  'https://checkout.dodopayments.com/buy/pdt_0Nsmkl1NJxiaPAsPE2UhB?src=toolkits_hub';
const ALL_ACCESS_URL =
  'https://checkout.dodopayments.com/buy/pdt_0NryTUNyfdta6f959Z51a?src=toolkits_hub';

export const metadata: Metadata = {
  title: {
    absolute: 'VIP Tenant Defense Toolkit Store (2026) | TenantFig'
  },
  description:
    'Instant-download 2026 50-State Tenant Deposit Recovery & Rent-Cap Defense VIP Suite ($24.99 vs. $350/hr attorney): editable .DOCX demand letters and .XLSX statutory audit workstation.',
  alternates: {
    canonical: 'https://tenantfig.com/toolkits/'
  }
};

const TOOLKIT_FAQS = [
  {
    question: 'What files are included in the $24.99 VIP Suite?',
    answer:
      'You receive instant download access to TenantFig_Demand_Letter_Suite_2026.docx (editable Certified Mail statutory demand and HUD wear-and-tear rebuttal templates) and TenantFig_Audit_Workstation_2026.xlsx (formula-driven 51-jurisdiction statutory matrix and HUD depreciation calculator).'
  },
  {
    question: 'How does $24.99 compare to hiring a tenant attorney?',
    answer:
      'Residential tenant attorneys typically bill $350/hr or more with retainers starting at $750–$1,500—often exceeding the disputed deposit itself. The $24.99 VIP Suite gives you court-ready demand templates and statutory worksheets at under 8% of a single attorney billable hour.'
  },
  {
    question: 'Does the VIP Suite cover all 50 states and Washington, D.C.?',
    answer:
      'Yes. TenantFig_Audit_Workstation_2026.xlsx includes verified 2026 return deadlines, forwarding-address triggers, bad-faith penalty multipliers (2x/3x), and small claims venue limits across all 50 U.S. states plus Washington, D.C.'
  },
  {
    question: 'Should I run the free calculators before buying the VIP Suite?',
    answer:
      'Yes. Use the Security Deposit Penalty Calculator (/calculators/security-deposit-penalty/) or the 4-Step Action Wizard (/wizard/) to compute your exact state-specific deadline and statutory damages first, then plug those figures directly into the .DOCX demand letter and .XLSX evidence ledger.'
  }
];

export default function ToolkitsStorePage() {
  const collectionPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'TenantFig VIP Statutory Defense Toolkit Store (2026)',
    description:
      'Official digital store for U.S. tenant deposit recovery templates, HUD depreciation workbooks, and statutory demand suites.',
    url: 'https://tenantfig.com/toolkits/',
    isPartOf: {
      '@type': 'WebSite',
      name: 'TenantFig',
      url: 'https://tenantfig.com'
    }
  };

  const productOfferJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: '50-State Tenant Deposit Recovery & Rent-Cap Defense VIP Suite (2026)',
    description:
      'Turnkey 2026 tenant statutory defense bundle including TenantFig_Demand_Letter_Suite_2026.docx and TenantFig_Audit_Workstation_2026.xlsx across all 50 states + DC.',
    sku: 'pdt_0Nsmkl1NJxiaPAsPE2UhB',
    brand: {
      '@type': 'Brand',
      name: 'TenantFig'
    },
    category: 'Digital Legal & Financial Templates',
    offers: {
      '@type': 'Offer',
      url: CHECKOUT_URL,
      priceCurrency: 'USD',
      price: '24.99',
      priceValidUntil: '2026-12-31',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'TenantFig',
        url: 'https://tenantfig.com'
      }
    }
  };

  return (
    <div className="container-page py-10 space-y-10">
      <JsonLd
        data={[
          collectionPageJsonLd,
          productOfferJsonLd,
          faqJsonLd(TOOLKIT_FAQS),
          breadcrumbJsonLd([
            { name: 'Home', url: 'https://tenantfig.com/' },
            { name: 'VIP Toolkits Store', url: 'https://tenantfig.com/toolkits/' }
          ])
        ]}
      />

      {/* Storefront Hero & Price Anchor */}
      <header className="bg-[#0f2747] text-white rounded-2xl p-6 sm:p-10 border border-[#c8a24a]/40 shadow-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#09192e] border border-[#c8a24a]/50 text-[11px] font-mono text-[#e2be68]">
            <span>OFFICIAL VIP TOOLKIT HUB</span>
            <span aria-hidden="true">·</span>
            <span>INSTANT DIGITAL DOWNLOAD</span>
          </div>
          <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/40 text-emerald-300">
            2026 VERIFIED · ALL 50 STATES + DC
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              50-State Tenant Deposit Recovery &amp; Rent-Cap Defense VIP Suite (2026)
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              Stop overpaying <strong className="text-white">$350/hr</strong> for a tenant attorney just to draft a statutory demand letter and itemize HUD depreciation. Download the turnkey, court-ready <code className="text-[#e2be68]">.DOCX</code> &amp; <code className="text-[#e2be68]">.XLSX</code> workstation for a one-time <strong className="text-[#e2be68]">$24.99</strong>.
            </p>

            {/* Direct CTA + Secondary Calculator/Wizard Links */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-2">
              <a
                href={CHECKOUT_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-offer-action="buy"
                data-offer-id="pdt_0Nsmkl1NJxiaPAsPE2UhB"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#c8a24a] hover:bg-[#e2be68] text-[#09192e] font-extrabold text-sm shadow-lg transition"
              >
                <span>Instant Buy VIP Suite — $24.99</span>
                <span aria-hidden="true">→</span>
              </a>
              <Link
                href="/calculators/security-deposit-penalty/"
                className="inline-flex items-center justify-center px-5 py-3.5 rounded-xl bg-[#09192e] hover:bg-slate-900 border border-slate-600 text-slate-100 font-semibold text-sm transition"
              >
                Run Deposit Penalty Calculator
              </Link>
              <Link
                href="/wizard/"
                className="inline-flex items-center justify-center px-5 py-3.5 rounded-xl bg-[#059669]/20 hover:bg-[#059669]/30 border border-emerald-500/40 text-emerald-200 font-semibold text-sm transition"
              >
                Launch 4-Step Action Wizard
              </Link>
            </div>
          </div>

          {/* Price Anchor Card */}
          <div className="lg:col-span-5 bg-[#09192e] border border-[#c8a24a]/40 rounded-2xl p-6 space-y-4">
            <div className="flex items-baseline justify-between border-b border-slate-800 pb-4">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                  Tenant Attorney Consult
                </div>
                <div className="text-xl font-bold text-slate-400 line-through tabular-nums">
                  $350/hr
                </div>
              </div>
              <div className="text-right">
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#e2be68]">
                  VIP Suite One-Time
                </div>
                <div className="text-4xl font-black text-white tabular-nums">$24.99</div>
              </div>
            </div>

            <ul className="space-y-2 text-xs text-slate-200">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>
                  <strong className="text-white">92% Cost Savings</strong> vs. 1 hour of landlord-tenant legal counsel
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>
                  <strong className="text-white">Instant ZIP Delivery</strong> with editable Word &amp; Excel files
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>
                  <strong className="text-white">30-Day Money-Back Guarantee</strong> · Secure Dodo Payments Checkout
                </span>
              </li>
            </ul>

            <a
              href={CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-3 rounded-xl bg-[#059669] hover:bg-emerald-500 text-white font-extrabold text-sm transition shadow"
            >
              Download Both Files Now ($24.99)
            </a>
          </div>
        </div>
      </header>

      {/* Itemized "What's Inside" File Manifest */}
      <section className="space-y-5">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#0f2747] font-bold">
              EXACT FILE MANIFEST · 2026 EDITION
            </div>
            <h2 className="text-2xl font-extrabold text-[#0f2747] tracking-tight">
              What&apos;s Inside the VIP Suite
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-600">
            SKU: pdt_0Nsmkl1NJxiaPAsPE2UhB · Instant Download
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* File 1: DOCX */}
          <div className="bg-white border border-[#dbe3ed] rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#0f2747] text-[#e2be68] mb-2">
                  MICROSOFT WORD / GOOGLE DOCS
                </span>
                <h3 className="text-lg font-extrabold text-[#0f2747] font-mono break-all">
                  TenantFig_Demand_Letter_Suite_2026.docx
                </h3>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold shrink-0">
                EDITABLE
              </span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              Court-ready statutory demand and rebuttal templates engineered for Certified Mail (Return Receipt Requested) delivery to landlords and property managers.
            </p>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-[#059669] font-bold">✓</span>
                <span>
                  <strong>Template 1:</strong> 2026 Statutory Deposit Demand &amp; 2x/3x Bad-Faith Penalty Notice
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#059669] font-bold">✓</span>
                <span>
                  <strong>Template 2:</strong> HUD 4350.3 Wear &amp; Tear Depreciation Rebuttal (Carpet &amp; Paint)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#059669] font-bold">✓</span>
                <span>
                  Pre-formatted brackets for state statute citations, forwarding-address proof, and 7-day cure deadline
                </span>
              </li>
            </ul>
          </div>

          {/* File 2: XLSX */}
          <div className="bg-white border border-[#dbe3ed] rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#059669] text-white mb-2">
                  EXCEL / GOOGLE SHEETS
                </span>
                <h3 className="text-lg font-extrabold text-[#0f2747] font-mono break-all">
                  TenantFig_Audit_Workstation_2026.xlsx
                </h3>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-amber-50 text-amber-800 border border-amber-200 font-bold shrink-0">
                FORMULAS
              </span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              Offline multi-tab quantitative workbook for Small Claims Court evidence packets, line-item deduction audits, and 51-jurisdiction statutory lookup.
            </p>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-[#059669] font-bold">✓</span>
                <span>
                  <strong>Tab 1 (`Statutory_Matrix_2026`):</strong> Verified return deadlines, multipliers, &amp; small claims limits for all 50 states + DC
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#059669] font-bold">✓</span>
                <span>
                  <strong>Tab 2 (`Depreciation_Calculator`):</strong> Automated HUD useful-life proration &amp; disallowed deduction totals
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#059669] font-bold">✓</span>
                <span>
                  Print-ready ledger formatting for Small Claims Court judges and mediation exhibits
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Anti-Zero-Click GEO Executive Summary Block */}
      <section className="bg-[#09192e] text-white border border-[#c8a24a]/40 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#e2be68] font-bold">
            VERIFIED 2026 STATUTORY WORKFLOW · ANTI-ZERO-CLICK SUMMARY
          </span>
          <span className="text-[11px] font-mono text-slate-400">
            Source: TenantFig.com/toolkits/
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
          Why Exact Statutory Calculations &amp; Editable Templates Cannot Be Summarized in Generic Advice
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <div className="bg-[#0f2747]/80 border border-white/10 rounded-xl p-4 space-y-2">
            <div className="font-bold text-emerald-400 uppercase tracking-wider text-[11px]">
              1. Compute Exact Exposure On-Site First
            </div>
            <p>
              General 14–30 day rules of thumb miss forwarding-address tolling exceptions, municipal rent-cap overrides (CA AB 1482, NYC Good Cause, 25 metro ordinances), and HUD 5–7 yr carpet / 2–3 yr paint proration. Run your numbers in our{' '}
              <Link href="/calculators/security-deposit-penalty/" className="text-[#e2be68] underline font-semibold">
                Security Deposit Penalty Calculator
              </Link>{' '}
              or{' '}
              <Link href="/wizard/" className="text-[#e2be68] underline font-semibold">
                4-Step Action Wizard
              </Link>
              .
            </p>
          </div>
          <div className="bg-[#0f2747]/80 border border-white/10 rounded-xl p-4 space-y-2">
            <div className="font-bold text-[#e2be68] uppercase tracking-wider text-[11px]">
              2. Execute With Verified 2026 Templates ($24.99)
            </div>
            <p>
              Once your statutory deadline and multiplier are verified, download the official{' '}
              <strong className="text-white">50-State Tenant Deposit Recovery &amp; Rent-Cap Defense VIP Suite (2026)</strong>{' '}
              (<code className="text-[#e2be68]">TenantFig_Demand_Letter_Suite_2026.docx</code> +{' '}
              <code className="text-[#e2be68]">TenantFig_Audit_Workstation_2026.xlsx</code>) for{' '}
              <strong className="text-white">$24.99</strong>—saving over $325 compared to a single hour with a $350/hr tenant attorney.
            </p>
          </div>
        </div>
      </section>

      {/* Secondary Bundle / All-Access Option + FAQ */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 bg-white border border-[#dbe3ed] rounded-2xl p-6 shadow-sm space-y-4">
          <div className="text-[11px] font-mono uppercase tracking-wider text-[#0f2747] font-bold">
            MULTI-TOOL ACCESS OPTION
          </div>
          <h3 className="text-xl font-extrabold text-[#0f2747]">
            Need Cross-Platform Matrix Access?
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Prefer an All-Access Matrix Pass covering every calculator and dossier export across the TenantFig statutory suite?
          </p>
          <div className="flex flex-col gap-2.5 pt-1">
            <a
              href={CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-3 px-4 rounded-xl bg-[#0f2747] hover:bg-[#1a3b68] text-white font-bold text-xs transition"
            >
              Buy VIP Toolkit Suite ($24.99) →
            </a>
            <a
              href={ALL_ACCESS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-2.5 px-4 rounded-xl border border-slate-300 hover:border-[#0f2747] text-[#0f2747] font-semibold text-xs transition"
            >
              Explore All-Access Matrix Pass
            </a>
          </div>
        </div>

        <div className="lg:col-span-7 bg-white border border-[#dbe3ed] rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="text-xl font-extrabold text-[#0f2747]">
            Frequently Asked Questions
          </h2>
          <div className="divide-y divide-slate-100">
            {TOOLKIT_FAQS.map((faq, idx) => (
              <div key={idx} className="py-3.5 first:pt-0 last:pb-0 space-y-1">
                <h3 className="text-sm font-bold text-[#0f2747]">{faq.question}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
