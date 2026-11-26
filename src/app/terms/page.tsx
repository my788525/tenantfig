import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd, breadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Terms of Use & Legal Disclaimer',
  description:
    'TenantFig Terms of Use: educational statutory modeling scope, no attorney-client relationship, intellectual property, and limitation of liability.',
  alternates: {
    canonical: '/terms/'
  }
};

export default function TermsPage() {
  return (
    <div className="container-page py-10 space-y-8 max-w-4xl">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: 'https://tenantfig.com/' },
          { name: 'Terms of Use', url: 'https://tenantfig.com/terms/' }
        ])}
      />
      <div className="space-y-2 border-b border-slate-200 pb-6">
        <div className="text-xs font-mono uppercase tracking-widest text-[#c8a24a] font-bold">
          GOVERNANCE · TERMS OF USE
        </div>
        <h1 className="text-3xl font-extrabold text-[#0f2747]">Terms of Use &amp; Legal Disclaimer</h1>
        <p className="text-sm text-slate-600">
          Conditions governing your access to TenantFig calculators, 51-state statutory tables, and digital defense templates.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-5 text-sm text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-xl font-extrabold text-[#0f2747]">1. Educational &amp; Informational Purpose Only</h2>
          <p>
            TenantFig provides quantitative statutory modeling, public code references, and educational document templates solely for informational and self-help research purposes. TenantFig is <strong>not a law firm</strong>, does not practice law, and does not provide legal advice. Using our calculators, reading our guides, or purchasing a digital Statutory Defense Kit does not create an attorney-client relationship.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-extrabold text-[#0f2747]">2. Statutory Verification &amp; Local Variations</h2>
          <p>
            Landlord-tenant law is highly fact-specific and subject to frequent legislative amendments, municipal ordinances, and judicial interpretation. While we cross-check all 51 jurisdictions and 25 metro ordinances against primary <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">.gov</code> sources, you are responsible for verifying current statutory text and court deadlines before sending a Certified Mail demand or filing a Small Claims Court complaint. Consult a licensed attorney in your jurisdiction for formal legal representation.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-extrabold text-[#0f2747]">3. Acceptable Use &amp; Intellectual Property</h2>
          <p>
            All software models, calculator logic, editorial guides, and downloadable <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">.docx</code> / <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">.xlsx</code> templates are the intellectual property of TenantFig. You are granted a personal, non-exclusive, non-transferable license to use our calculators and templates for your own residential tenancy disputes. Commercial redistribution, automated scraping for competing commercial products, or reselling our templates is prohibited.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-extrabold text-[#0f2747]">4. Digital Products &amp; 30-Day Guarantee</h2>
          <p>
            Optional digital Statutory Defense Kits and Matrix All-Access Passes are delivered electronically upon checkout completion via Dodo Payments and are backed by our 30-day satisfaction guarantee.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-extrabold text-[#0f2747]">5. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by applicable law, TenantFig and its contributors are not liable for any direct, indirect, incidental, consequential, or special damages arising from your use of, or inability to use, our calculators, statutory summaries, or templates, including any Small Claims Court outcome, missed filing deadline, or lease dispute.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-extrabold text-[#0f2747]">6. Third-Party Links &amp; External Portals</h2>
          <p>
            TenantFig links to official state Attorney General websites, Judicial Branch Small Claims portals, municipal rent stabilization boards, and third-party payment processors (such as Dodo Payments). We do not control and are not responsible for the content, availability, or privacy practices of external websites.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-extrabold text-[#0f2747]">7. Governing Law &amp; Updates to Terms</h2>
          <p>
            We may update these Terms of Use periodically to reflect new platform features, legislative changes, or regulatory requirements. Continued use of TenantFig after updates are published constitutes acceptance of the revised Terms. Questions regarding these Terms may be directed to{' '}
            <a href="mailto:editorial@tenantfig.com" className="text-[#059669] font-bold underline">
              editorial@tenantfig.com
            </a>
            .
          </p>
        </section>

        <div className="pt-2 flex flex-wrap gap-3 text-xs">
          <Link href="/disclaimer/" className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-[#0f2747]">
            Full Legal Disclaimer →
          </Link>
          <Link href="/privacy/" className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-[#0f2747]">
            Privacy Policy →
          </Link>
        </div>
      </div>
    </div>
  );
}
