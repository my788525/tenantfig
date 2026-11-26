import type { MetadataRoute } from 'next';
import { TENANT_STATUTES_2026 } from '@/data/tenant_statutes_2026';
import { CITY_RENT_CAPS_2026 } from '@/data/city_rent_caps_2026';
import { CASE_STUDIES_2026, GUIDES_2026 } from '@/data/cases_and_guides';

export const dynamic = 'force-static';

const BASE = 'https://tenantfig.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/wizard/',
    '/calculators/security-deposit-penalty/',
    '/calculators/wear-and-tear-deduction/',
    '/calculators/rent-increase-cap/',
    '/calculators/lease-break-mitigation/',
    '/calculators/small-claims-roi/',
    '/states/',
    '/cities/',
    '/cases/',
    '/guides/',
    '/methodology/',
    '/statutes/',
    '/changelog/',
    '/about/',
    '/contact/',
    '/privacy/',
    '/terms/'
  ];

  const routes: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: `${BASE}${r}`,
    lastModified: '2026-10-25',
    changeFrequency: r === '' ? 'daily' : 'weekly',
    priority: r === '' ? 1.0 : r === '/wizard/' ? 0.95 : r.startsWith('/calculators/') ? 0.9 : 0.8
  }));

  const stateRoutes: MetadataRoute.Sitemap = TENANT_STATUTES_2026.map((s) => ({
    url: `${BASE}/states/${s.slug}/`,
    lastModified: '2026-10-25',
    changeFrequency: 'monthly',
    priority: 0.85
  }));

  const cityRoutes: MetadataRoute.Sitemap = CITY_RENT_CAPS_2026.map((c) => ({
    url: `${BASE}/cities/${c.slug}/`,
    lastModified: '2026-10-25',
    changeFrequency: 'monthly',
    priority: 0.85
  }));

  const caseRoutes: MetadataRoute.Sitemap = CASE_STUDIES_2026.map((cs) => ({
    url: `${BASE}/cases/${cs.slug}/`,
    lastModified: '2026-10-25',
    changeFrequency: 'monthly',
    priority: 0.8
  }));

  const guideRoutes: MetadataRoute.Sitemap = GUIDES_2026.map((g) => ({
    url: `${BASE}/guides/${g.slug}/`,
    lastModified: '2026-10-25',
    changeFrequency: 'monthly',
    priority: 0.85
  }));

  return [...routes, ...stateRoutes, ...cityRoutes, ...caseRoutes, ...guideRoutes];
}
