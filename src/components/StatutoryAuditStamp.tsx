import React from 'react';
import Link from 'next/link';

interface StatutoryAuditStampProps {
  className?: string;
}

export default function StatutoryAuditStamp({ className = '' }: StatutoryAuditStampProps) {
  return (
    <div
      className={`bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs no-print ${className}`}
    >
      <div className="flex items-start sm:items-center gap-2.5">
        <span
          aria-hidden="true"
          className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[11px] shrink-0 mt-0.5 sm:mt-0"
        >
          ✓
        </span>
        <p className="text-slate-700 leading-relaxed">
          <strong className="text-[#0f2747]">Statutory Audit Stamp:</strong>{' '}
          Verified against 50-State Landlord-Tenant Statutes (e.g.{' '}
          <a
            href="https://leginfo.legislature.ca.gov/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0f2747] font-semibold underline decoration-[#c8a24a] underline-offset-2 hover:text-[#059669]"
          >
            Cal. Civ. Code §1950.5
          </a>
          , NY RPL §7-108) &amp;{' '}
          <a
            href="https://www.hud.gov/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0f2747] font-semibold underline decoration-[#c8a24a] underline-offset-2 hover:text-[#059669]"
          >
            HUD Useful-Life Schedules
          </a>{' '}
          · <span className="font-mono font-semibold text-[#0f2747]">Audited Nov 2026</span>
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 shrink-0 pl-7 sm:pl-0">
        <a
          href="https://leginfo.legislature.ca.gov/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[11px] font-mono text-[#0f2747] hover:border-[#c8a24a] transition"
        >
          leginfo.legislature.ca.gov ↗
        </a>
        <a
          href="https://www.hud.gov/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[11px] font-mono text-[#0f2747] hover:border-[#c8a24a] transition"
        >
          hud.gov ↗
        </a>
        <Link
          href="/methodology/"
          className="text-[11px] font-semibold text-slate-500 hover:text-[#0f2747] underline"
        >
          Methodology
        </Link>
      </div>
    </div>
  );
}
