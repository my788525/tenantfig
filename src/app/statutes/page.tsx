import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { TENANT_STATUTES_2026 } from '@/data/tenant_statutes_2026';

export const metadata: Metadata = {
  title: 'Master 2026 Citation Ledger (All 51 Jurisdictions)',
  description: 'Direct statutory citations and official .gov Attorney General and Small Claims portals for all 50 states + DC.',
  alternates: {
    canonical: '/statutes/'
  }
};

export default function StatutesLedgerPage() {
  return (
    <div className="container-page py-10 space-y-6">
      <h1 className="text-3xl font-extrabold text-[#0f2747]">Master 2026 Citation Ledger (51 Jurisdictions)</h1>
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0f2747] text-white font-mono uppercase">
              <tr>
                <th className="px-4 py-3">State</th>
                <th className="px-4 py-3">Primary Statute</th>
                <th className="px-4 py-3">Official AG / Consumer URL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {TENANT_STATUTES_2026.map((s) => (
                <tr key={s.code}>
                  <td className="px-4 py-2.5 font-bold text-[#0f2747]">
                    <Link href={`/states/${s.slug}/`} className="hover:underline">{s.name}</Link>
                  </td>
                  <td className="px-4 py-2.5 font-mono text-slate-700">{s.statuteCitation}</td>
                  <td className="px-4 py-2.5">
                    <a href={s.officialGovUrl} target="_blank" rel="noopener noreferrer" className="text-[#059669] hover:underline break-all">
                      {s.officialGovUrl}
                    </a>
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
