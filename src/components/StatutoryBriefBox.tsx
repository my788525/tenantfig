'use client';

import React, { useState } from 'react';

interface StatutoryBriefBoxProps {
  title: string;
  jurisdiction: string;
  citation: string;
  metrics: { label: string; value: string; highlight?: boolean }[];
  verdict: string;
  noticeText: string;
}

export default function StatutoryBriefBox({
  title,
  jurisdiction,
  citation,
  metrics,
  verdict,
  noticeText
}: StatutoryBriefBoxProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(noticeText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {}
  };

  return (
    <div className="space-y-6">
      {/* Printable Statutory Brief */}
      <div className="print-brief bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#c8a24a] font-bold">
              《STATUTORY BRIEF》 · {jurisdiction}
            </div>
            <h3 className="text-lg font-extrabold text-[#0f2747] mt-0.5">{title}</h3>
            <p className="text-xs font-mono text-slate-500 mt-0.5">Authority: {citation}</p>
          </div>
          <button
            type="button"
            onClick={() => window.print()}
            className="no-print px-3.5 py-2 rounded-lg bg-[#0f2747] hover:bg-[#1a3b68] text-white text-xs font-bold transition cursor-pointer"
          >
            Print / Save Brief (PDF)
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {metrics.map((m, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl border ${
                m.highlight
                  ? 'bg-emerald-50 border-emerald-200'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="text-[11px] font-medium text-slate-500">{m.label}</div>
              <div
                className={`text-base font-extrabold tabular-nums mt-0.5 ${
                  m.highlight ? 'text-[#059669]' : 'text-[#0f2747]'
                }`}
              >
                {m.value}
              </div>
            </div>
          ))}
        </div>

        <div className="p-3.5 rounded-xl bg-[#0f2747]/5 border border-[#0f2747]/15 text-xs text-slate-800 leading-relaxed">
          <span className="font-bold text-[#0f2747] uppercase tracking-wider mr-1.5">Verdict:</span>
          {verdict}
        </div>
      </div>

      {/* Copyable Demand / Rebuttal Notice */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3 no-print">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h4 className="text-sm font-extrabold text-[#0f2747]">Copyable Statutory Demand / Rebuttal Notice</h4>
            <p className="text-xs text-slate-500">Ready for Certified Mail &amp; email transmission to landlord/property manager.</p>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="px-3.5 py-2 rounded-lg bg-[#059669] hover:bg-emerald-700 text-white text-xs font-bold transition cursor-pointer"
          >
            {copied ? '✓ Copied Notice' : 'Copy Notice Text'}
          </button>
        </div>

        <pre className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs font-mono text-slate-800 whitespace-pre-wrap leading-relaxed overflow-x-auto">
          {noticeText}
        </pre>
      </div>
    </div>
  );
}
