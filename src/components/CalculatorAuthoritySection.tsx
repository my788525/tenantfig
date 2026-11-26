import React from 'react';

export interface AuditTableRow {
  item: string;
  standard: string;
  citation: string;
  impact: string;
}

export interface RebuttalPair {
  claim: string;
  statute: string;
  script: string;
}

export interface WalkthroughStep {
  label: string;
  math: string;
  note: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

interface CalculatorAuthoritySectionProps {
  badge: string;
  formulaTitle: string;
  formulaBox: string;
  formulaExplanation: string;
  tableTitle: string;
  tableHeaders: [string, string, string, string];
  tableRows: AuditTableRow[];
  walkthroughTitle: string;
  walkthroughScenario: string;
  walkthroughSteps: WalkthroughStep[];
  walkthroughResult: string;
  rebuttalTitle: string;
  rebuttals: RebuttalPair[];
  roiHeadline: string;
  roiSubhead: string;
  freeItems: string[];
  proItems: string[];
  proPrice?: string;
  proRoiExample: string;
  faqs: FaqItem[];
}

export default function CalculatorAuthoritySection({
  badge,
  formulaTitle,
  formulaBox,
  formulaExplanation,
  tableTitle,
  tableHeaders,
  tableRows,
  walkthroughTitle,
  walkthroughScenario,
  walkthroughSteps,
  walkthroughResult,
  rebuttalTitle,
  rebuttals,
  roiHeadline,
  roiSubhead,
  freeItems,
  proItems,
  proPrice = '$24.99',
  proRoiExample,
  faqs
}: CalculatorAuthoritySectionProps) {
  return (
    <div className="space-y-8 pt-4 no-print">
      {/* 1. Statutory Formula & Audit Table */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-[#c8a24a] font-bold">
            {badge} · STATUTORY FORMULA &amp; AUDIT SCHEDULE
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f2747] tracking-tight">
            {formulaTitle}
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">{formulaExplanation}</p>
        </div>

        <div className="bg-[#09192e] text-slate-100 rounded-xl p-4 sm:p-5 border border-[#c8a24a]/40 font-mono text-xs sm:text-sm overflow-x-auto">
          {formulaBox}
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-extrabold text-[#0f2747]">{tableTitle}</h3>
          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead className="bg-slate-50 text-[#0f2747] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4 font-bold">{tableHeaders[0]}</th>
                  <th className="py-3 px-4 font-bold">{tableHeaders[1]}</th>
                  <th className="py-3 px-4 font-bold">{tableHeaders[2]}</th>
                  <th className="py-3 px-4 font-bold">{tableHeaders[3]}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tableRows.map((row) => (
                  <tr key={row.item} className="hover:bg-slate-50/70">
                    <td className="py-3 px-4 font-semibold text-[#0f2747]">{row.item}</td>
                    <td className="py-3 px-4 text-slate-700 font-mono text-xs">{row.standard}</td>
                    <td className="py-3 px-4 text-slate-600">{row.citation}</td>
                    <td className="py-3 px-4 text-emerald-700 font-semibold">{row.impact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 2. Real-Case Math Walkthrough & Landlord Rebuttal Counter-Script */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-sm space-y-4">
          <div className="text-xs font-mono uppercase tracking-widest text-[#c8a24a] font-bold">
            REAL-CASE MATH WALKTHROUGH
          </div>
          <h2 className="text-xl font-extrabold text-[#0f2747]">{walkthroughTitle}</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{walkthroughScenario}</p>

          <div className="space-y-3 pt-1">
            {walkthroughSteps.map((step, idx) => (
              <div
                key={step.label}
                className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-[#0f2747]">
                    {idx + 1}. {step.label}
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-700">{step.math}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{step.note}</p>
              </div>
            ))}
          </div>

          <div className="bg-[#0f2747] text-white rounded-xl p-4 text-xs sm:text-sm font-semibold border border-[#c8a24a]/50">
            {walkthroughResult}
          </div>
        </div>

        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-sm space-y-4">
          <div className="text-xs font-mono uppercase tracking-widest text-[#c8a24a] font-bold">
            LANDLORD REBUTTAL COUNTER-SCRIPT
          </div>
          <h2 className="text-xl font-extrabold text-[#0f2747]">{rebuttalTitle}</h2>
          <div className="space-y-3">
            {rebuttals.map((r) => (
              <div
                key={r.claim}
                className="border border-slate-200 rounded-xl p-4 space-y-2 bg-slate-50/50"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-rose-700">
                    When Landlord Claims: &ldquo;{r.claim}&rdquo;
                  </span>
                  <span className="text-[11px] font-mono font-bold text-[#0f2747] bg-[#c8a24a]/20 px-2 py-0.5 rounded">
                    Cite {r.statute}
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">{r.script}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Free Audit Summary vs. Pro Statutory Demand Kit */}
      <section className="bg-[#0f2747] text-white border border-[#c8a24a]/40 rounded-2xl p-6 sm:p-8 shadow-lg space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#e2be68] font-bold">
              FREE AUDIT SUMMARY VS. PRO STATUTORY DEMAND KIT
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">{roiHeadline}</h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">{roiSubhead}</p>
          </div>
          <div className="bg-[#c8a24a]/15 border border-[#c8a24a]/50 rounded-xl px-4 py-2.5 text-center shrink-0">
            <div className="text-[10px] font-mono uppercase text-[#e2be68]">TYPICAL ROI LEVERAGE</div>
            <div className="text-lg font-black text-white">{proRoiExample}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-[#09192e] border border-emerald-500/30 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-extrabold text-emerald-400">Free Audit Summary</span>
              <span className="text-xs font-mono text-emerald-300 font-bold">$0 Forever</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              {freeItems.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#c8a24a]/10 border border-[#c8a24a]/50 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-extrabold text-[#e2be68]">
                Pro Statutory Demand Kit
              </span>
              <span className="text-xs font-mono text-white font-bold">{proPrice} One-Time</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-100">
              {proItems.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-[#e2be68] font-bold">★</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 4. Bing High-Intent FAQs */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="space-y-1">
          <div className="text-xs font-mono uppercase tracking-widest text-[#c8a24a] font-bold">
            2026 STATUTORY FAQ
          </div>
          <h2 className="text-xl font-extrabold text-[#0f2747]">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((f, idx) => (
            <details
              key={f.question}
              open={idx === 0}
              className="group border border-slate-200 rounded-xl px-4 py-3.5 bg-slate-50/50 open:bg-white open:border-[#0f2747]/30 transition"
            >
              <summary className="cursor-pointer list-none flex items-center justify-between gap-3 text-sm font-bold text-[#0f2747]">
                <span>{f.question}</span>
                <span className="text-xs font-mono text-[#c8a24a] shrink-0 group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed border-t border-slate-100 pt-2.5">
                {f.answer}
              </p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
