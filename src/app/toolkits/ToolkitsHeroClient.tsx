'use client';

import React, { useEffect, useState } from 'react';

export interface ToolkitStateOption {
  code: string;
  name: string;
  statuteCitation: string;
  undisputedReturnDays: number;
  penaltyMultiplier: number;
  smallClaimsLimitUsd: number;
}

interface ToolkitsHeroClientProps {
  states: ToolkitStateOption[];
  checkoutUrl: string;
}

export default function ToolkitsHeroClient({
  states,
  checkoutUrl
}: ToolkitsHeroClientProps) {
  const defaultState =
    states.find((s) => s.code === 'CA') ?? states[0];
  const [selectedCode, setSelectedCode] = useState<string>(defaultState.code);
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'docx' | 'xlsx'>('docx');

  const selectedState =
    states.find((s) => s.code === selectedCode) ?? defaultState;

  useEffect(() => {
    if (!previewOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPreviewOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [previewOpen]);

  const multiplierLabel =
    selectedState.penaltyMultiplier > 0
      ? `${selectedState.penaltyMultiplier}x statutory penalty`
      : 'statutory damages';

  return (
    <>
      <header className="bg-[#0f2747] text-white rounded-2xl p-6 sm:p-10 border border-[#c8a24a]/40 shadow-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#09192e] border border-[#c8a24a]/50 text-[11px] font-mono text-[#e2be68]">
              <span>OFFICIAL VIP TOOLKIT HUB</span>
              <span aria-hidden="true">·</span>
              <span>INSTANT DIGITAL DOWNLOAD</span>
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#c8a24a] text-[#09192e] text-[11px] font-mono font-extrabold tracking-wide shadow-sm">
              MOST POPULAR · 90%+ CHOOSE THIS
            </span>
          </div>
          <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/40 text-emerald-300">
            2026 VERIFIED · ALL 50 STATES + DC
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-5">
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              50-State Tenant Deposit Recovery &amp; Rent-Cap Defense VIP Suite (2026)
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              Stop overpaying <strong className="text-white">$350/hr</strong> for a tenant attorney just to draft a statutory demand letter and itemize HUD depreciation. Download the turnkey, court-ready <code className="text-[#e2be68]">.DOCX</code> &amp; <code className="text-[#e2be68]">.XLSX</code> workstation for a one-time <strong className="text-[#e2be68]">$24.99</strong>.
            </p>

            {/* 1-Second State/Scenario Confirm Selector */}
            <div className="bg-[#09192e]/90 border border-[#c8a24a]/40 rounded-xl p-4 space-y-2.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <label
                  htmlFor="toolkit-state-select"
                  className="text-xs font-mono uppercase tracking-wider text-[#e2be68] font-bold"
                >
                  Confirm Your State Coverage (1-Second Check)
                </label>
                <select
                  id="toolkit-state-select"
                  value={selectedCode}
                  onChange={(e) => setSelectedCode(e.target.value)}
                  className="bg-[#0f2747] border border-slate-600 focus:border-[#c8a24a] focus:outline-none rounded-lg px-3 py-1.5 text-sm font-semibold text-white"
                >
                  {states.map((st) => (
                    <option key={st.code} value={st.code}>
                      {st.name} ({st.code})
                    </option>
                  ))}
                </select>
              </div>
              <p
                aria-live="polite"
                className="text-xs sm:text-sm text-emerald-300 font-medium leading-snug"
              >
                ✓ Includes {selectedState.name} 2026 statutory return deadline, 2x–3x bad-faith penalty rules &amp; Certified Mail demand templates
              </p>
              <p className="text-[11px] font-mono text-slate-400">
                Verified: {selectedState.statuteCitation} · {selectedState.undisputedReturnDays}-day return window · {multiplierLabel} · ${selectedState.smallClaimsLimitUsd.toLocaleString()} small claims cap
              </p>
            </div>

            {/* Primary Instant Buy CTA + 3 Zero-Risk Badges */}
            <div className="space-y-3 pt-1">
              <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                <a
                  href={checkoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-offer-action="buy"
                  data-offer-id="pdt_0Nsmkl1NJxiaPAsPE2UhB"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-[#c8a24a] hover:bg-[#e2be68] text-[#09192e] font-extrabold text-base shadow-lg transition"
                >
                  <span>Instant Buy VIP Suite — $24.99</span>
                  <span aria-hidden="true">→</span>
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-emerald-300 font-medium">
                <span>✓ Instant ZIP Download (.DOCX + .XLSX)</span>
                <span aria-hidden="true" className="text-slate-500">·</span>
                <span>✓ One-Time Payment (No Subscription)</span>
                <span aria-hidden="true" className="text-slate-500">·</span>
                <span>✓ Updated for 2026–2027 Statutes</span>
              </div>
            </div>
          </div>

          {/* Hero SKU Price Anchor Card */}
          <div className="lg:col-span-5 bg-[#09192e] border-2 border-[#c8a24a]/60 rounded-2xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#c8a24a]/20 border border-[#c8a24a]/50 text-[#e2be68] text-[10px] font-mono font-bold uppercase tracking-wider">
                MOST POPULAR · 90%+ CHOOSE THIS
              </span>
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">
                INSTANT ZIP
              </span>
            </div>

            <div className="flex items-baseline justify-between border-b border-slate-800 pb-4">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                  Tenant Attorney Consult
                </div>
                <div className="text-xl font-bold text-slate-400 line-through tabular-nums">
                  $350/hr
                </div>
              </div>
              <div className="text-right">
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#e2be68]">
                  VIP Suite One-Time
                </div>
                <div className="text-4xl font-black text-white tabular-nums">$24.99</div>
              </div>
            </div>

            <ul className="space-y-2 text-xs text-slate-200">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>
                  <strong className="text-white">92% Cost Savings</strong> vs. 1 hour of landlord-tenant legal counsel
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>
                  <strong className="text-white">Instant ZIP Delivery</strong> with editable Word &amp; Excel files
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>
                  <strong className="text-white">30-Day Money-Back Guarantee</strong> · Secure Dodo Payments Checkout
                </span>
              </li>
            </ul>

            <div className="space-y-2.5 pt-1">
              <a
                href={checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-offer-action="buy"
                data-offer-id="pdt_0Nsmkl1NJxiaPAsPE2UhB"
                className="block w-full text-center py-3 rounded-xl bg-[#059669] hover:bg-emerald-500 text-white font-extrabold text-sm transition shadow"
              >
                Download Both Files Now ($24.99)
              </a>

              <button
                type="button"
                onClick={() => setPreviewOpen(true)}
                className="w-full text-center py-2.5 px-4 rounded-xl bg-[#0f2747] hover:bg-[#1a3b68] border border-[#c8a24a]/50 text-[#e2be68] font-bold text-xs transition cursor-pointer"
              >
                Preview Sample Page (.DOCX / .XLSX)
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sample Preview Modal */}
      {previewOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="sample-preview-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-sm p-4"
          onClick={() => setPreviewOpen(false)}
        >
          <div
            className="bg-white text-slate-900 rounded-2xl border border-[#dbe3ed] shadow-2xl max-w-3xl w-full max-h-[88vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#0f2747] text-white px-6 py-4 flex items-center justify-between gap-4">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#e2be68]">
                  REDACTED VIP SUITE PREVIEW · {selectedState.name.toUpperCase()} ({selectedState.code})
                </div>
                <h2 id="sample-preview-title" className="text-lg font-extrabold">
                  Inside the 2026 VIP Toolkit Files
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setPreviewOpen(false)}
                aria-label="Close sample preview"
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono font-bold text-white transition cursor-pointer"
              >
                ESC / CLOSE ✕
              </button>
            </div>

            {/* File Switcher Tabs */}
            <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('docx')}
                className={`px-4 py-2 text-xs font-mono font-bold rounded-t-lg border border-b-0 transition cursor-pointer ${
                  activeTab === 'docx'
                    ? 'bg-white text-[#0f2747] border-slate-200'
                    : 'bg-transparent text-slate-500 border-transparent hover:text-[#0f2747]'
                }`}
              >
                TenantFig_Demand_Letter_Suite_2026.docx
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('xlsx')}
                className={`px-4 py-2 text-xs font-mono font-bold rounded-t-lg border border-b-0 transition cursor-pointer ${
                  activeTab === 'xlsx'
                    ? 'bg-white text-[#059669] border-slate-200'
                    : 'bg-transparent text-slate-500 border-transparent hover:text-[#0f2747]'
                }`}
              >
                TenantFig_Audit_Workstation_2026.xlsx
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
              {activeTab === 'docx' ? (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 font-serif text-slate-800 space-y-3 leading-relaxed">
                  <div className="flex flex-wrap justify-between gap-2 text-[11px] font-mono text-slate-500 border-b border-slate-200 pb-2">
                    <span>VIA USPS CERTIFIED MAIL — RETURN RECEIPT REQUESTED</span>
                    <span>[DATE: MM/DD/2026]</span>
                  </div>
                  <div className="space-y-0.5 text-xs">
                    <p><strong>TO:</strong> [LANDLORD / PROPERTY MANAGEMENT LLC], [STREET ADDRESS]</p>
                    <p><strong>FROM:</strong> [TENANT FULL NAME], [FORWARDING ADDRESS]</p>
                    <p><strong>RE:</strong> Formal Statutory Demand for Return of Security Deposit — Unit [UNIT #]</p>
                  </div>
                  <p className="text-xs sm:text-sm">
                    Dear [LANDLORD / MANAGER NAME],
                  </p>
                  <p className="text-xs sm:text-sm">
                    On <strong>[MOVE-OUT DATE]</strong>, possession of the premises at [RENTAL ADDRESS] was surrendered in clean condition, normal wear and tear excepted, and my forwarding address was provided in writing. Under{' '}
                    <strong className="bg-amber-100 px-1 rounded text-[#0f2747]">
                      {selectedState.statuteCitation}
                    </strong>
                    , you were required to return the full <strong>$[DEPOSIT AMOUNT]</strong> security deposit or provide a compliant itemized accounting within{' '}
                    <strong className="bg-amber-100 px-1 rounded text-[#0f2747]">
                      {selectedState.undisputedReturnDays} days
                    </strong>
                    .
                  </p>
                  <p className="text-xs sm:text-sm">
                    Furthermore, the claimed <strong>$[CHARGED CARPET/PAINT]</strong> deduction violates HUD Handbook 4350.3 useful-life proration standards (see attached <em>Depreciation_Calculator</em> exhibit), leaving an unlawful withholding of <strong>$[DISPUTED AMOUNT]</strong>. Failure to remit payment within 7 calendar days will result in a Small Claims filing seeking{' '}
                    <strong className="bg-emerald-100 px-1 rounded text-emerald-900">
                      {multiplierLabel} + court costs
                    </strong>{' '}
                    (venue limit: ${selectedState.smallClaimsLimitUsd.toLocaleString()}).
                  </p>
                  <div className="text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-200">
                    [REDACTED EXCERPT — Full .DOCX includes Template 1 (Statutory Demand) + Template 2 (HUD Wear &amp; Tear Rebuttal) + Certified Mail Checklist]
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="text-xs text-slate-600">
                    Excerpt from <code className="font-mono text-[#0f2747] font-bold">Depreciation_Calculator</code> &amp; <code className="font-mono text-[#0f2747] font-bold">Statutory_Matrix_2026</code> tabs:
                  </div>
                  <div className="overflow-x-auto border border-slate-200 rounded-xl">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-[#0f2747] text-white font-mono text-[11px]">
                          <th className="py-2.5 px-3">Line Item</th>
                          <th className="py-2.5 px-3">Landlord Charge</th>
                          <th className="py-2.5 px-3">HUD Life (Yrs)</th>
                          <th className="py-2.5 px-3">Age (Yrs)</th>
                          <th className="py-2.5 px-3">Allowed Prorated</th>
                          <th className="py-2.5 px-3">Disallowed Overcharge</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 font-mono text-[11px]">
                        <tr className="bg-white">
                          <td className="py-2.5 px-3 font-sans font-semibold text-slate-800">Bedroom Carpet Replacement</td>
                          <td className="py-2.5 px-3">$1,800.00</td>
                          <td className="py-2.5 px-3">5.0</td>
                          <td className="py-2.5 px-3">4.5</td>
                          <td className="py-2.5 px-3 text-slate-600">$180.00</td>
                          <td className="py-2.5 px-3 font-bold text-emerald-700">$1,620.00</td>
                        </tr>
                        <tr className="bg-slate-50">
                          <td className="py-2.5 px-3 font-sans font-semibold text-slate-800">Full Interior Repaint</td>
                          <td className="py-2.5 px-3">$950.00</td>
                          <td className="py-2.5 px-3">3.0</td>
                          <td className="py-2.5 px-3">3.0+</td>
                          <td className="py-2.5 px-3 text-slate-600">$0.00</td>
                          <td className="py-2.5 px-3 font-bold text-emerald-700">$950.00</td>
                        </tr>
                        <tr className="bg-white">
                          <td className="py-2.5 px-3 font-sans font-semibold text-slate-800">Standard Turnover Cleaning</td>
                          <td className="py-2.5 px-3">$325.00</td>
                          <td className="py-2.5 px-3">N/A (Wear)</td>
                          <td className="py-2.5 px-3">—</td>
                          <td className="py-2.5 px-3 text-slate-600">$0.00</td>
                          <td className="py-2.5 px-3 font-bold text-emerald-700">$325.00</td>
                        </tr>
                        <tr className="bg-emerald-50 font-bold text-[#0f2747]">
                          <td className="py-2.5 px-3 font-sans">TOTAL RECOVERABLE OVERCHARGE</td>
                          <td className="py-2.5 px-3">$3,075.00</td>
                          <td className="py-2.5 px-3">—</td>
                          <td className="py-2.5 px-3">—</td>
                          <td className="py-2.5 px-3">$180.00</td>
                          <td className="py-2.5 px-3 text-emerald-700">$2,895.00</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="bg-slate-100 rounded-lg px-3 py-2 text-[11px] font-mono text-slate-600">
                    Formula: <span className="text-[#0f2747] font-semibold">=MAX(0, (UsefulLife - AgeAtMoveOut) / UsefulLife) * ReplacementCost</span> · Auto-links to 51-state penalty multiplier ({selectedState.code}: {multiplierLabel}).
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-600">
                Includes both editable <code className="font-mono font-bold">.DOCX</code> &amp; <code className="font-mono font-bold">.XLSX</code> files · One-time $24.99
              </span>
              <a
                href={checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-offer-action="buy"
                data-offer-id="pdt_0Nsmkl1NJxiaPAsPE2UhB"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#c8a24a] hover:bg-[#e2be68] text-[#09192e] font-extrabold text-xs shadow transition"
              >
                <span>Instant Buy VIP Suite — $24.99</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
