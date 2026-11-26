import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { TENANT_STATUTES_2026 } from '@/data/tenant_statutes_2026';
import { JsonLd, breadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: '50 States + DC Deposit Statutes (2026)',
  description:
    'Complete 51-jurisdiction directory of security deposit return deadlines, forwarding-address triggers, 2x/3x statutory penalties, and small claims limits.',
  alternates: {
    canonical: '/states/'
  }
};

export default function StatesIndexPage() {
  return (
    <div className="container-page py-10 space-y-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: 'https://tenantfig.com/' },
          { name: '51 State Statutes', url: 'https://tenantfig.com/states/' }
        ])}
      />
      <div className="space-y-2 border-b border-slate-200 pb-6">
        <div className="text-xs font-mono uppercase tracking-widest text-[#c8a24a] font-bold">
          51 JURISDICTIONS VERIFIED · 2026 STATUTORY INDEX
        </div>
        <h1 className="text-3xl font-extrabold text-[#0f2747]">
          U.S. Tenant Statutory Deadlines &amp; Deposit Penalties (50 States + DC)
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl">
          Select any jurisdiction below for exact statutory citations, return deadlines, forwarding-address rules, and official Attorney General / Small Claims court links.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0f2747] text-white font-mono uppercase text-[11px]">
              <tr>
                <th className="px-4 py-3">Jurisdiction</th>
                <th className="px-4 py-3">Citation</th>
                <th className="px-4 py-3">Return Clock</th>
                <th className="px-4 py-3">Multiplier</th>
                <th className="px-4 py-3">Small Claims</th>
                <th className="px-4 py-3">Rent Cap</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {TENANT_STATUTES_2026.map((s) => (
                <tr key={s.code} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-bold text-[#0f2747]">
                    <Link href={`/states/${s.slug}/`} className="hover:underline">
                      {s.name} ({s.code})
                    </Link>
                  </td>
                  <td className="px-4 py-3 font-mono text-slate-600">{s.statuteCitation}</td>
                  <td className="px-4 py-3 tabular-nums">
                    {s.undisputedReturnDays === s.itemizedReturnDays
                      ? `${s.itemizedReturnDays} days`
                      : `${s.undisputedReturnDays}d / ${s.itemizedReturnDays}d`}
                  </td>
                  <td className="px-4 py-3 font-bold text-[#059669] tabular-nums">
                    {s.penaltyMultiplier}x{s.fixedPenaltyUsd ? ` + $${s.fixedPenaltyUsd}` : ''}
                  </td>
                  <td className="px-4 py-3 tabular-nums">${s.smallClaimsLimitUsd.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    {s.statewideRentCap ? (
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-[#059669] font-semibold">Yes</span>
                    ) : (
                      <span className="text-slate-400">No</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
