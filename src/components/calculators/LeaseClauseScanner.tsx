'use client';

import React, { useMemo, useState } from 'react';
import { TENANT_STATUTES_2026, type StateStatute } from '@/data/tenant_statutes_2026';
import IcsDeadlineButton from '@/components/IcsDeadlineButton';
import ToolPaywallDossier from '@/components/ToolPaywallDossier';

interface TestClausePreset {
  id: string;
  label: string;
  text: string;
}

const TEST_CLAUSES: TestClausePreset[] = [
  {
    id: 'non-refundable',
    label: 'Non-refundable security deposit',
    text: 'Tenant agrees that the $3,200 security deposit is non-refundable upon move-out regardless of unit condition or length of tenancy.'
  },
  {
    id: 'carpet-full',
    label: 'Tenant pays full carpet replacement regardless of age',
    text: 'Upon vacating the Premises, Tenant shall pay 100% of full carpet replacement cost regardless of carpet age, useful life, or normal wear and tear.'
  },
  {
    id: 'waive-21day',
    label: 'Waiver of 21-day deposit return deadline',
    text: 'Tenant hereby waives the statutory 21-day security deposit return and itemization deadline and grants Landlord up to 90 days after move-out to account for funds.'
  },
  {
    id: 'enter-anytime',
    label: 'Landlord may enter anytime without notice',
    text: 'Landlord and its agents may enter the Premises at any time of day or night without prior notice or Tenant consent for any inspection or showing.'
  },
  {
    id: 'auto-12pct',
    label: 'Automatic 12% renewal rent increase',
    text: 'This Lease shall automatically renew for an additional 12-month term with an automatic 12% rent increase unless Tenant delivers 90 days prior written notice.'
  }
];

interface ViolationFinding {
  id: string;
  title: string;
  severity: 'VOID / UNENFORCEABLE' | 'STATUTORY VIOLATION' | 'AUDIT REQUIRED';
  citation: string;
  explanation: string;
  scorePenalty: number;
}

function getAntiWaiverCitation(state: StateStatute): string {
  switch (state.code) {
    case 'CA':
      return 'Cal. Civ. Code § 1953 & § 1950.5(m)';
    case 'NY':
      return 'N.Y. Gen. Oblig. Law § 7-108 & N.Y. Real Prop. Law § 235-c';
    case 'TX':
      return 'Tex. Prop. Code § 92.006 & § 92.103';
    case 'MA':
      return 'Mass. Gen. Laws ch. 186 § 15B(8)';
    case 'WA':
      return 'Wash. Rev. Code § 59.18.230';
    case 'FL':
      return 'Fla. Stat. § 83.47';
    case 'IL':
      return '765 ILCS 710/1 & 765 ILCS 705/1';
    case 'CO':
      return 'Colo. Rev. Stat. § 38-12-103(7)';
    case 'NJ':
      return 'N.J. Stat. Ann. § 46:8-24';
    case 'VA':
      return 'Va. Code Ann. § 55.1-1208';
    default:
      return state.statuteCitation;
  }
}

function getEntryCitation(state: StateStatute): string {
  switch (state.code) {
    case 'CA':
      return 'Cal. Civ. Code § 1954 (24-hr written notice required)';
    case 'NY':
      return 'N.Y. Real Prop. Law § 235-b & NYC Admin. Code § 27-2008';
    case 'TX':
      return 'Tex. Prop. Code § 92.006 & Quiet Enjoyment Covenant';
    case 'WA':
      return 'Wash. Rev. Code § 59.18.150 (48-hr notice required)';
    case 'MA':
      return 'Mass. Gen. Laws ch. 186 § 15B(1)(a)';
    case 'FL':
      return 'Fla. Stat. § 83.53 (24-hr notice for repairs)';
    default:
      return `${state.statuteCitation} (Implied Covenant of Quiet Enjoyment & Notice)`;
  }
}

function getRentCapCitation(state: StateStatute): string {
  switch (state.code) {
    case 'CA':
      return 'Cal. Civ. Code § 1947.12 (AB 1482: 5% + CPI, max 10% cap)';
    case 'NY':
      return 'N.Y. Real Prop. Law § 226-c & Good Cause Eviction (5% + CPI, max 10%)';
    case 'OR':
      return 'Or. Rev. Stat. § 90.323 (7% + CPI statewide cap)';
    case 'WA':
      return 'Wash. Rev. Code § 59.18.140 (60-day written notice; local caps in Seattle/Tacoma)';
    case 'NJ':
      return 'N.J. Stat. Ann. § 2A:18-61.1 (Unconscionable rent increase bar)';
    default:
      return state.statewideRentCap
        ? `${state.statuteCitation} (${state.rentCapSummary})`
        : `${state.statuteCitation} & Automatic Renewal Notice Statutes`;
  }
}

function analyzeLeaseClause(rawText: string, state: StateStatute) {
  const text = rawText.toLowerCase();
  const findings: ViolationFinding[] = [];
  const antiWaiver = getAntiWaiverCitation(state);

  if (
    /non[-\s]?refundable/.test(text) &&
    /(deposit|security|fee|pet|cleaning)/.test(text)
  ) {
    findings.push({
      id: 'non-refundable-deposit',
      title: 'Illegal Non-Refundable Security Deposit Provision',
      severity: 'VOID / UNENFORCEABLE',
      citation: antiWaiver,
      explanation: `In ${state.name}, security deposits cannot be labeled "non-refundable" to bypass statutory accounting within ${state.itemizedReturnDays} days. Any clause converting a security deposit into an automatic forfeiture is void against public policy.`,
      scorePenalty: 75
    });
  }

  if (
    /(carpet|paint|floor|blinds|appliance|100%|full\s+(replacement|cost))/.test(text) &&
    /(regardless of age|wear and tear|normal wear|full\s+replacement|100%)/.test(text)
  ) {
    findings.push({
      id: 'wear-and-tear-shift',
      title: 'Unlawful Normal Wear & Tear / Full-Replacement Shifting',
      severity: 'VOID / UNENFORCEABLE',
      citation: `${state.statuteCitation} & HUD Handbook 4350.3 Depreciation Rule`,
      explanation: `Landlords cannot charge tenants for normal wear and tear or 100% replacement cost regardless of age. Under ${state.name} law and HUD useful-life standards (carpet 5–7 yrs, paint 2–3 yrs), tenant liability is strictly limited to prorated remaining useful life for actual damage beyond normal wear.`,
      scorePenalty: 70
    });
  }

  if (
    /(waive|waiver|forfeit|extend|90 days|60 days|45 days)/.test(text) &&
    /(21-day|14-day|30-day|deadline|return|itemiz|deposit)/.test(text)
  ) {
    findings.push({
      id: 'deadline-waiver',
      title: `Void Waiver of ${state.itemizedReturnDays}-Day Statutory Return Deadline`,
      severity: 'VOID / UNENFORCEABLE',
      citation: antiWaiver,
      explanation: `${state.name} mandates itemized deposit accounting within ${state.itemizedReturnDays} days (${state.statuteCitation}). Statutory tenant protections and bad-faith penalty multipliers (${state.penaltyMultiplier}x) cannot be waived by residential lease boilerplate.`,
      scorePenalty: 80
    });
  }

  if (
    /(enter|entry|access|inspect)/.test(text) &&
    /(any\s*time|without\s*(prior\s*)?notice|without\s*consent|no\s*notice|day\s*or\s*night)/.test(text)
  ) {
    findings.push({
      id: 'warrantless-entry',
      title: 'Unlawful Warrantless / No-Notice Landlord Entry Clause',
      severity: 'STATUTORY VIOLATION',
      citation: getEntryCitation(state),
      explanation: `Clauses permitting entry "anytime without notice" violate residential privacy statutes and the implied covenant of quiet enjoyment. Non-emergency entry requires statutory advance notice (typically 24–48 hours) during reasonable business hours.`,
      scorePenalty: 65
    });
  }

  if (
    /(increase|escalation|renew|automatic)/.test(text) &&
    /(\d{2}%|1[0-9]%|2[0-9]%|automatic|90\s*days)/.test(text)
  ) {
    findings.push({
      id: 'auto-rent-hike',
      title: 'Potentially Unlawful Automatic Renewal / Excessive Rent Escalation',
      severity: 'STATUTORY VIOLATION',
      citation: getRentCapCitation(state),
      explanation: `Automatic renewal clauses with double-digit escalations (e.g., 12%) or 90-day hidden opt-out traps face strict statutory caps in rent-stabilized jurisdictions (e.g., 5% + CPI / max 10% under CA AB 1482 or NYC Good Cause) and advance-notice disclosure rules.`,
      scorePenalty: 55
    });
  }

  if (
    /(waive|waiver)/.test(text) &&
    /(jury|court|small claims|habitability|retaliat|attorney)/.test(text)
  ) {
    findings.push({
      id: 'rights-waiver',
      title: 'Prohibited Waiver of Statutory Tenant Remedies / Habitability',
      severity: 'VOID / UNENFORCEABLE',
      citation: antiWaiver,
      explanation: `Residential leases cannot compel tenants to waive the implied warranty of habitability, anti-retaliation protections, or access to Small Claims Court ($${state.smallClaimsLimitUsd.toLocaleString()} limit in ${state.code}).`,
      scorePenalty: 75
    });
  }

  const totalPenalty = findings.reduce((acc, f) => Math.max(acc, f.scorePenalty), 0);
  const extraPenalty = findings.length > 1 ? Math.min(20, (findings.length - 1) * 10) : 0;
  const enforceabilityScore = Math.max(0, Math.min(100, 100 - totalPenalty - extraPenalty));

  let verdictBadge = 'STANDARD / LIKELY ENFORCEABLE';
  if (enforceabilityScore <= 25) verdictBadge = 'VOID & UNENFORCEABLE PER SE';
  else if (enforceabilityScore <= 55) verdictBadge = 'HIGH RISK · STATUTORY VIOLATION';
  else if (enforceabilityScore <= 85) verdictBadge = 'CONDITIONAL · AUDIT REQUIRED';

  const citationsList =
    findings.length > 0
      ? findings.map((f) => f.citation).join('; ')
      : state.statuteCitation;

  const rebuttalParagraph =
    findings.length > 0
      ? `Notice of Statutory Objection (${state.name}): Please be advised that the cited lease provision ("${rawText.trim().slice(0, 140)}${rawText.trim().length > 140 ? '...' : ''}") is unenforceable and void as a matter of public policy under ${citationsList}. Under ${state.name} law, statutory deposit return deadlines (${state.itemizedReturnDays} days), normal wear-and-tear exclusions, and tenant privacy protections cannot be waived by contract, and any attempt to enforce this clause exposes Landlord to ${state.penaltyMultiplier}x statutory damages${state.attorneyFeesAllowed ? ' plus mandatory attorney fees' : ''}. Tenant formally reserves all statutory rights and demands written confirmation within 14 days that this provision will not be enforced.`
      : `Preliminary Audit (${state.name}): No per-se statutory red flags were detected in the pasted text under ${state.statuteCitation}. However, enforcement remains subject to ${state.name}'s ${state.itemizedReturnDays}-day deposit accounting rule, implied warranty of habitability, and any applicable municipal rent-stabilization ordinances.`;

  return {
    findings,
    enforceabilityScore,
    verdictBadge,
    citationsList,
    rebuttalParagraph
  };
}

export default function LeaseClauseScanner() {
  const [stateCode, setStateCode] = useState('CA');
  const [clauseText, setClauseText] = useState(TEST_CLAUSES[0].text);
  const [copiedRebuttal, setCopiedRebuttal] = useState(false);

  const selectedState = useMemo(
    () => TENANT_STATUTES_2026.find((s) => s.code === stateCode) || TENANT_STATUTES_2026[4],
    [stateCode]
  );

  const analysis = useMemo(
    () => analyzeLeaseClause(clauseText, selectedState),
    [clauseText, selectedState]
  );

  const handleCopyRebuttal = async () => {
    try {
      await navigator.clipboard.writeText(analysis.rebuttalParagraph);
      setCopiedRebuttal(true);
      setTimeout(() => setCopiedRebuttal(false), 2500);
    } catch {}
  };

  return (
    <div className="space-y-8">
      {/* Input & One-Click Test Clauses */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 no-print">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-end">
          <div className="lg:col-span-5 space-y-1.5">
            <label htmlFor="scanner-state" className="block text-xs font-bold uppercase tracking-wider text-slate-600">
              1. Select Jurisdiction (51 States + D.C.)
            </label>
            <select
              id="scanner-state"
              value={stateCode}
              onChange={(e) => setStateCode(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-[#0f2747] focus:outline-none focus:ring-2 focus:ring-[#0f2747]"
            >
              {TENANT_STATUTES_2026.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.name} ({s.code}) — {s.statuteCitation}
                </option>
              ))}
            </select>
          </div>
          <div className="lg:col-span-7 flex flex-wrap items-center justify-between gap-2 bg-[#f6f8fb] border border-slate-200 rounded-xl px-4 py-2.5 text-xs">
            <span className="text-slate-600">
              <strong className="text-[#0f2747]">{selectedState.code} Statutory Baseline:</strong>{' '}
              {selectedState.itemizedReturnDays}-day return · {selectedState.penaltyMultiplier}x bad-faith penalty
            </span>
            <span className="font-mono font-bold text-[#059669]">100% Client-Side</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-600">
            2. One-Click Red-Flag Test Clauses (or paste your own below)
          </div>
          <div className="flex flex-wrap gap-2">
            {TEST_CLAUSES.map((preset) => {
              const active = clauseText.trim() === preset.text.trim();
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => setClauseText(preset.text)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                    active
                      ? 'bg-[#0f2747] text-[#e2be68] border-[#0f2747]'
                      : 'bg-slate-50 hover:bg-slate-100 text-[#0f2747] border-slate-200'
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="clause-textarea" className="block text-xs font-bold uppercase tracking-wider text-slate-600">
            3. Lease Clause Text to Audit
          </label>
          <textarea
            id="clause-textarea"
            rows={4}
            value={clauseText}
            onChange={(e) => setClauseText(e.target.value)}
            placeholder="Paste any residential lease paragraph, addendum, or renewal clause here..."
            className="w-full bg-slate-50 border border-slate-300 rounded-xl p-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0f2747] leading-relaxed"
          />
        </div>
      </div>

      {/* Printable Statutory Audit Brief */}
      <div className="print-brief bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#c8a24a] font-bold">
              《STATUTORY CLAUSE AUDIT BRIEF》 · {selectedState.name} ({selectedState.code})
            </div>
            <h2 className="text-xl font-extrabold text-[#0f2747] mt-0.5">
              Lease Clause Enforceability &amp; Statutory Violation Report
            </h2>
            <p className="text-xs font-mono text-slate-500 mt-0.5">
              Primary Authority: {analysis.citationsList}
            </p>
          </div>
          <div className="no-print flex flex-wrap gap-2">
            <IcsDeadlineButton
              title={`${selectedState.code} Lease Clause Objection Deadline`}
              description={`Statutory objection & written landlord confirmation deadline for disputed lease clause.\nAuthority: ${analysis.citationsList}\nEnforceability Score: ${analysis.enforceabilityScore}%`}
              daysFromNow={14}
              url="https://tenantfig.com/calculators/lease-clause-scanner/"
              label="Export 14-Day Deadline (.ics)"
            />
            <button
              type="button"
              onClick={() => window.print()}
              className="px-4 py-2.5 rounded-xl bg-[#0f2747] hover:bg-[#1a3b68] text-white text-xs font-bold transition cursor-pointer"
            >
              Print / Save Brief (PDF)
            </button>
          </div>
        </div>

        {/* Enforceability Score & Summary Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div
            className={`p-4 rounded-xl border ${
              analysis.enforceabilityScore <= 35
                ? 'bg-rose-50 border-rose-200'
                : analysis.enforceabilityScore <= 70
                  ? 'bg-amber-50 border-amber-200'
                  : 'bg-emerald-50 border-emerald-200'
            }`}
          >
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
              Enforceability Score
            </div>
            <div
              className={`text-3xl font-black tabular-nums mt-1 ${
                analysis.enforceabilityScore <= 35
                  ? 'text-rose-700'
                  : analysis.enforceabilityScore <= 70
                    ? 'text-amber-700'
                    : 'text-[#059669]'
              }`}
            >
              {analysis.enforceabilityScore}%
            </div>
            <div className="text-[11px] font-mono font-bold mt-1 text-slate-700">
              {analysis.verdictBadge}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
              Violations Flagged
            </div>
            <div className="text-3xl font-black tabular-nums text-[#0f2747] mt-1">
              {analysis.findings.length}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Checked against {selectedState.code} 2026 statutes
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
              Landlord Penalty Exposure
            </div>
            <div className="text-3xl font-black tabular-nums text-[#059669] mt-1">
              {selectedState.penaltyMultiplier}x
              {selectedState.fixedPenaltyUsd > 0 ? ` + $${selectedState.fixedPenaltyUsd}` : ''}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              {selectedState.attorneyFeesAllowed ? 'Plus statutory attorney fees' : 'Plus court filing costs'}
            </div>
          </div>
        </div>

        {/* Flagged Violations List */}
        {analysis.findings.length > 0 ? (
          <div className="space-y-3">
            <h3 className="text-sm font-extrabold text-[#0f2747] uppercase tracking-wider">
              Flagged Statutory Violations ({analysis.findings.length})
            </h3>
            {analysis.findings.map((f) => (
              <div
                key={f.id}
                className="p-4 rounded-xl border border-rose-200 bg-rose-50/50 space-y-1.5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-sm font-extrabold text-[#0f2747]">{f.title}</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-100 text-rose-800 border border-rose-300">
                    {f.severity}
                  </span>
                </div>
                <div className="text-xs font-mono font-semibold text-[#059669]">
                  Citation: {f.citation}
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">{f.explanation}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50 text-xs text-emerald-900">
            <strong>No Per-Se Statutory Red Flags Detected:</strong> The pasted clause does not trigger standard anti-waiver, deposit-forfeiture, or warrantless-entry prohibitions in {selectedState.name}. Verify any numerical rent caps or local municipal ordinances separately.
          </div>
        )}

        {/* Free 1-Paragraph Rebuttal Preview */}
        <div className="bg-[#f6f8fb] border border-slate-200 rounded-xl p-5 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#c8a24a] font-bold">
                FREE 1-PARAGRAPH REBUTTAL PREVIEW
              </div>
              <h3 className="text-sm font-extrabold text-[#0f2747]">
                Copyable Statutory Objection Paragraph
              </h3>
            </div>
            <button
              type="button"
              onClick={handleCopyRebuttal}
              className="no-print px-3.5 py-2 rounded-lg bg-[#059669] hover:bg-emerald-700 text-white text-xs font-bold transition cursor-pointer"
            >
              {copiedRebuttal ? '✓ Copied Rebuttal' : 'Copy Rebuttal'}
            </button>
          </div>
          <p className="text-xs font-mono text-slate-800 bg-white border border-slate-200 rounded-lg p-4 leading-relaxed">
            {analysis.rebuttalParagraph}
          </p>
        </div>
      </div>

      {/* Monetization Dossier */}
      <ToolPaywallDossier
        badge="LEASE CLAUSE DEFENSE SUITE"
        title="Download Full Lease Redline & Statutory Demand Kit"
        desc="Unlock the editable .DOCX Lease Addendum & Objection Letter, 51-State Anti-Waiver Citation Matrix, and Small Claims Evidence Ledger."
        price="$24.99"
        pid="pdt_0Nsmkl1NJxiaPAsPE2UhB"
        dynamicAmount={`${analysis.findings.length} Violation${analysis.findings.length === 1 ? '' : 's'} Flagged`}
        docType={`${selectedState.code} Lease Clause Rebuttal Kit`}
        sampleLines={[
          { label: 'Jurisdiction', value: `${selectedState.name} (${selectedState.code})` },
          { label: 'Enforceability Score', value: `${analysis.enforceabilityScore}%` },
          { label: 'Primary Citation', value: selectedState.statuteCitation }
        ]}
      />
    </div>
  );
}
