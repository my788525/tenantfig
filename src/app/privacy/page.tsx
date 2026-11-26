import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd, breadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Privacy Policy & Cookie Disclosures',
  description:
    'TenantFig Privacy Policy: 100% client-side calculator execution, Google AdSense & DART cookie disclosures, GDPR rights, and CCPA/CPRA compliance.',
  alternates: {
    canonical: '/privacy/'
  }
};

export default function PrivacyPage() {
  return (
    <div className="container-page py-10 space-y-8 max-w-4xl">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: 'https://tenantfig.com/' },
          { name: 'Privacy Policy', url: 'https://tenantfig.com/privacy/' }
        ])}
      />
      <div className="space-y-2 border-b border-slate-200 pb-6">
        <div className="text-xs font-mono uppercase tracking-widest text-[#c8a24a] font-bold">
          EFFECTIVE 2026 · CLIENT-SIDE PRIVACY &amp; AD DISCLOSURES
        </div>
        <h1 className="text-3xl font-extrabold text-[#0f2747]">Privacy Policy</h1>
        <p className="text-sm text-slate-600">
          How TenantFig handles local browser calculations, analytics, Google AdSense advertising cookies, GDPR, and CCPA/CPRA rights.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-5 text-sm text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-xl font-extrabold text-[#0f2747]">1. Zero-Server Calculator Execution</h2>
          <p>
            TenantFig calculators—including the Security Deposit Penalty Calculator, Wear &amp; Tear Depreciation Auditor, Rent Increase Cap Auditor, Lease Break Mitigation Calculator, Small Claims ROI Calculator, Lease Clause Scanner, Deduction Invoice Auditor, and 4-Step Tenant Action Wizard—execute 100% locally in your web browser. We do not transmit, log, or store your rent figures, security deposit amounts, landlord names, or generated demand letter text on any TenantFig server.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-extrabold text-[#0f2747]">2. Local Storage &amp; Essential Preferences</h2>
          <p>
            TenantFig uses your browser&apos;s <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">localStorage</code> strictly to remember your cookie consent preference (<code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">tenantfig_cookie_consent</code>) and, if you choose to activate a Matrix All-Access Pass, your license key (<code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">matrix_all_access_key</code>). You can clear this data at any time through your browser settings.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-extrabold text-[#0f2747]">3. Google AdSense &amp; Third-Party Advertising Cookies (DART)</h2>
          <p>
            TenantFig may display advertisements served by <strong>Google AdSense</strong> and other third-party advertising networks. Google, as a third-party vendor, uses cookies—including the <strong>DoubleClick DART cookie</strong>—to serve ads based on a user&apos;s prior visits to TenantFig or other websites on the Internet.
          </p>
          <p>
            Google&apos;s use of advertising cookies enables it and its partners to serve personalized ads to you based on your browsing history. You may opt out of personalized advertising by visiting{' '}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#059669] font-bold underline"
            >
              Google Ads Settings
            </a>{' '}
            or by visiting{' '}
            <a
              href="https://www.aboutads.info/choices/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#059669] font-bold underline"
            >
              aboutads.info
            </a>{' '}
            to opt out of third-party vendor cookies for interest-based advertising.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-extrabold text-[#0f2747]">4. Analytics &amp; Checkout Processing</h2>
          <p>
            We use lightweight, privacy-respecting site telemetry to measure page performance and tool engagement. When you choose to purchase an optional digital Statutory Defense Kit, payment processing is handled securely by our merchant of record (Dodo Payments), which maintains its own PCI-DSS compliant privacy and security controls. TenantFig never sees or stores your credit card number.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-extrabold text-[#0f2747]">5. GDPR Rights (EEA &amp; UK Visitors)</h2>
          <p>
            If you are located in the European Economic Area (EEA) or the United Kingdom, you have the right under the General Data Protection Regulation (GDPR) to access, rectify, erase, or restrict processing of any personal data, to object to personalized advertising cookies, and to withdraw consent at any time. You can manage your consent directly via our Cookie Consent banner or by clearing browser storage.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-extrabold text-[#0f2747]">6. CCPA / CPRA Rights (California Residents)</h2>
          <p>
            Under the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA), California residents have the right to know what personal information is collected, the right to request deletion of personal information, and the right to opt out of the &ldquo;sale&rdquo; or &ldquo;sharing&rdquo; of personal information for cross-context behavioral advertising. TenantFig does not sell personal calculator inputs. To opt out of third-party advertising cookies, select &ldquo;Essential Only&rdquo; in our Cookie Consent banner or adjust your{' '}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#059669] font-bold underline"
            >
              Google Ads Settings
            </a>
            .
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-extrabold text-[#0f2747]">7. Contact Us</h2>
          <p>
            For any privacy or data-protection inquiry, email{' '}
            <a href="mailto:editorial@tenantfig.com" className="text-[#059669] font-bold underline">
              editorial@tenantfig.com
            </a>{' '}
            or visit our{' '}
            <Link href="/contact/" className="text-[#059669] font-bold underline">
              Contact page
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
