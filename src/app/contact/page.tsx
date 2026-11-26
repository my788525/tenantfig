import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd, breadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Contact TenantFig — Editorial & Corrections',
  description:
    'Contact the TenantFig statutory research team for legislative updates, municipal ordinance corrections, accessibility feedback, or licensing support.',
  alternates: {
    canonical: '/contact/'
  }
};

export default function ContactPage() {
  return (
    <div className="container-page py-10 space-y-8 max-w-4xl">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: 'https://tenantfig.com/' },
          { name: 'Contact', url: 'https://tenantfig.com/contact/' }
        ])}
      />
      <div className="space-y-2 border-b border-slate-200 pb-6">
        <div className="text-xs font-mono uppercase tracking-widest text-[#c8a24a] font-bold">
          EDITORIAL &amp; SUPPORT DESK
        </div>
        <h1 className="text-3xl font-extrabold text-[#0f2747]">Contact TenantFig</h1>
        <p className="text-sm text-slate-600">
          Direct channels for statutory dataset corrections, municipal ordinance updates, privacy requests, and digital kit support.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 text-sm text-slate-700 leading-relaxed">
          <div className="text-xs font-mono uppercase tracking-widest text-[#059669] font-bold">
            STATUTORY RESEARCH &amp; CORRECTIONS
          </div>
          <h2 className="text-lg font-extrabold text-[#0f2747]">Editorial &amp; Code Updates</h2>
          <p>
            State legislatures and city councils regularly amend security deposit caps, Small Claims Court jurisdictional limits, and annual CPI rent-cap formulas. If you spot a newly enacted bill, municipal ballot measure, or judicial portal URL change, please notify our research desk with the bill number or official <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">.gov</code> citation.
          </p>
          <p>
            Email:{' '}
            <a href="mailto:editorial@tenantfig.com" className="text-[#059669] font-bold underline">
              editorial@tenantfig.com
            </a>
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 text-sm text-slate-700 leading-relaxed">
          <div className="text-xs font-mono uppercase tracking-widest text-[#c8a24a] font-bold">
            PRIVACY, ACCESSIBILITY &amp; LICENSING
          </div>
          <h2 className="text-lg font-extrabold text-[#0f2747]">Compliance &amp; Kit Support</h2>
          <p>
            For questions regarding our digital Statutory Defense Kits, Matrix All-Access Pass activation, GDPR/CCPA data inquiries, or WCAG accessibility feedback, reach our support team directly. We review all compliance and customer support messages within two business days.
          </p>
          <p>
            Support &amp; Privacy:{' '}
            <a href="mailto:editorial@tenantfig.com?subject=TenantFig%20Support%20Inquiry" className="text-[#059669] font-bold underline">
              editorial@tenantfig.com
            </a>
          </p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 text-sm text-slate-700 leading-relaxed">
        <h2 className="text-lg font-extrabold text-[#0f2747]">Important Notice Before Contacting Us</h2>
        <p>
          Please do <strong>not</strong> email sensitive personal information, Social Security numbers, bank account details, or confidential court filings. TenantFig is an educational and quantitative modeling publisher—not a law firm—and cannot provide individualized legal advice, review your specific lease for representation, or act as your attorney.
        </p>
        <p>
          If you need immediate legal representation or low-income tenant defense in your jurisdiction, consult your local Legal Aid society, State Bar lawyer referral service, or the official Attorney General and Small Claims Court links listed in our{' '}
          <Link href="/statutes/" className="text-[#059669] font-bold underline">
            Master 2026 Citation Ledger
          </Link>
          .
        </p>
        <h2 className="text-lg font-extrabold text-[#0f2747] pt-2">Response Times &amp; Bug Reports</h2>
        <p>
          Our statutory research and engineering team reviews incoming correspondence Monday through Friday. When reporting a calculator edge case, please include the state or city URL, the statutory citation in question, and the inputs used so our engineers can reproduce the calculation locally. Note that because TenantFig operates 100% client-side with zero server-side user accounts, we cannot look up or retrieve any calculations you previously entered in your browser.
        </p>
        <p>
          For press inquiries, academic research citations of our 51-state 2026 statutory dataset, or municipal rent-board partnership requests, please use the subject line <em>&ldquo;Dataset Citation / Press&rdquo;</em> when writing to{' '}
          <a href="mailto:editorial@tenantfig.com" className="text-[#059669] font-bold underline">
            editorial@tenantfig.com
          </a>
          .
        </p>
        <h2 className="text-lg font-extrabold text-[#0f2747] pt-2">What to Include in a Statutory Correction</h2>
        <p>
          To help our editorial desk verify and publish legislative updates rapidly, please include: (1) the state or municipality name, (2) the exact statute, bill number, or municipal code section (for example, <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">Cal. Civ. Code § 1950.5</code> or <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">Tex. Prop. Code § 92.103</code>), (3) the effective date of the change, and (4) a link to the official <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">.gov</code> legislative or judicial source. Verified updates are logged in our{' '}
          <Link href="/changelog/" className="text-[#059669] font-bold underline">
            2026 Statutory Changelog
          </Link>
          .
        </p>
        <div className="pt-2 flex flex-wrap gap-3 text-xs">
          <Link href="/methodology/" className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-[#0f2747]">
            Audit Methodology →
          </Link>
          <Link href="/editorial-policy/" className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-[#0f2747]">
            Editorial Policy →
          </Link>
          <Link href="/privacy/" className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-[#0f2747]">
            Privacy Policy →
          </Link>
        </div>
      </div>
    </div>
  );
}
