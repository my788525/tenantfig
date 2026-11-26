import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import { JsonLd, webSiteJsonLd, organizationJsonLd } from '@/components/JsonLd';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://tenantfig.com'),
  alternates: {
    canonical: './'
  },
  title: {
    default: 'TenantFig — U.S. Tenant Statutory Defense & Deposit Recovery Platform',
    template: '%s | TenantFig'
  },
  description:
    'Institutional-grade 2026 U.S. tenant statutory defense calculators: security deposit 2x/3x penalty clocks, HUD carpet & paint depreciation, rent increase caps (CA AB 1482, NYC Good Cause), lease break mitigation, and small claims ROI across all 51 jurisdictions.',
  keywords: [
    'security deposit penalty calculator',
    'normal wear and tear carpet depreciation',
    'rent increase cap calculator 2026',
    'CA AB 1482 rent cap',
    'NYC good cause eviction calculator',
    'lease break duty to mitigate',
    'small claims court roi calculator',
    'tenant statutory rights 50 states'
  ],
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }]
  },
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'TenantFig'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="alternate" type="text/markdown" href="/llms.txt" title="LLM RAG Stream" />
      </head>
      <body className="min-h-screen flex flex-col">
        <JsonLd data={[webSiteJsonLd(), organizationJsonLd()]} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Dataset',
              name: 'U.S. Tenant Statutory Deadlines, Deposit Multipliers & Rent Caps Dataset 2026',
              description:
                'Verified 2026 dataset of residential security deposit return deadlines, forwarding-address triggers, statutory bad-faith multipliers, small claims limits, and municipal rent caps across all 50 US states + DC and top 25 metro cities.',
              url: 'https://tenantfig.com/statutes/',
              datePublished: '2026-01-01',
              dateModified: '2026-10-25',
              creator: { '@type': 'Organization', name: 'TenantFig' },
              spatialCoverage: { '@type': 'Place', name: 'United States' },
              temporalCoverage: '2026'
            })
          }}
        />
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />
        <Script src="https://mail.lianu.com/matrix-analytics.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
