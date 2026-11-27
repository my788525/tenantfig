import React from 'react';

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function webSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'TenantFig',
    url: 'https://tenantfig.com',
    description:
      'Institutional-grade US Tenant Statutory Defense & Security Deposit Recovery Platform across 51 jurisdictions and 25 metro cities.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://tenantfig.com/states/?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'TenantFig',
    url: 'https://tenantfig.com',
    logo: 'https://tenantfig.com/favicon.svg',
    sameAs: ['https://tenantfig.com/about/']
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.url
    }))
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer
      }
    }))
  };
}

export function webApplicationJsonLd(opts: {
  name: string;
  description: string;
  url: string;
  citation?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: opts.name,
    description: opts.description,
    url: opts.url,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    citation: opts.citation ?? [
      'https://leginfo.legislature.ca.gov/',
      'https://www.hud.gov/'
    ],
    reviewedBy: {
      '@type': 'Organization',
      name: 'TenantFig Housing & Statutory Research Board',
      url: 'https://tenantfig.com/methodology/'
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  };
}
