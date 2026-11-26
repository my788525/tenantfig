'use client';

import React, { useMemo, useState } from 'react';
import { TENANT_STATUTES_2026, type StateStatute } from '@/data/tenant_statutes_2026';
import { CITY_RENT_CAPS_2026, type CityRentCap } from '@/data/city_rent_caps_2026';
import StatutoryBriefBox from '@/components/StatutoryBriefBox';
import ToolPaywallDossier from '@/components/ToolPaywallDossier';
import IcsDeadlineButton from '@/components/IcsDeadlineButton';
import HiddenTrapsCallout from '@/components/HiddenTrapsCallout';
import WizardLeadEscalation from '@/components/WizardLeadEscalation';

type DisputeScenario = 'deposit' | 'rent_hike' | 'lease_break' | 'small_claims';

interface ScenarioOption {
  id: DisputeScenario;
  title: string;
  subtitle: string;
  badge: string;
}

const SCENARIO_OPTIONS: ScenarioOption[] = [
  {
    id: 'deposit',
    title: 'Security Deposit Withheld / Overdue',
    subtitle: 'Landlord missed the 14–60 day return deadline, withheld receipts, or billed full carpet/paint.',
    badge: 'DEPOSIT RECOVERY'
  },
  {
    id: 'rent_hike',
    title: 'Excessive Rent Increase',
    subtitle: 'Renewal increase exceeds local/statewide cap (AB 1482, NYC Good Cause, LARSO) or lacks proper notice.',
    badge: 'RENT CAP AUDIT'
  },
  {
    id: 'lease_break',
    title: 'Lease Break Penalty',
    subtitle: 'Charged full remaining lease months or excessive buyout fee despite landlord duty to mitigate.',
    badge: 'MITIGATION DUTY'
  },
  {
    id: 'small_claims',
    title: 'Small Claims Escalation',
    subtitle: 'Demand letter ignored; ready to file for principal + 2x/3x statutory bad-faith damages.',
    badge: 'TRIAL ESCALATION'
  }
];

interface ViolationOption {
  id: string;
  label: string;
  detail: string;
}

const VIOLATION_OPTIONS: ViolationOption[] = [
  {
    id: 'missed_deadline',
    label: 'Missed statutory deadline',
    detail: 'Landlord failed to return deposit or send itemized statement within statutory window.'
  },
  {
    id: 'no_itemized_receipts',
    label: 'No itemized receipts / invoices',
    detail: 'Deductions listed as lump sums without receipts, contractor invoices, or proof of cost.'
  },
  {
    id: 'full_carpet_paint',
    label: 'Charged full carpet / paint replacement',
    detail: 'Billed 100% replacement cost without prorating HUD 4350.3 useful-life depreciation.'
  },
  {
    id: 'insufficient_notice',
    label: 'Insufficient advance notice',
    detail: 'Rent hike, entry, or non-renewal delivered with fewer days than required by statute/ordinance.'
  },
  {
    id: 'refused_mitigation',
    label: 'Refused mitigation / re-letting',
    detail: 'Landlord refused qualified replacement tenant or failed to market unit after early move-out.'
  }
];

interface DodoTier {
  key: 'deposit' | 'rent_lease' | 'small_claims';
  pid: string;
  price: string;
  badge: string;
  name: string;
  shortName: string;
  bestFor: string;
  features: string[];
}

const DODO_TIERS: DodoTier[] = [
  {
    key: 'deposit',
    pid: 'pdt_0Nsmkl1NJxiaPAsPE2UhB',
    price: '$24.99',
    badge: 'TIER 1 · DEPOSIT RECOVERY',
    name: '50-State Tenant Deposit Recovery & Rent-Cap Defense VIP Suite',
    shortName: 'Deposit Recovery VIP Suite',
    bestFor: 'Withheld or overdue security deposits & illegal wear-and-tear deductions',
    features: [
      'Editable .DOCX Certified Deposit Demand Letter',
      'HUD 4350.3 Carpet/Paint Depreciation .XLSX',
      '51-State Return Deadline & Penalty Matrix',
      'Instant In-Browser Certified PDF Brief'
    ]
  },
  {
    key: 'rent_lease',
    pid: 'pdt_0NsmwuECBFT4yq34SQYYl',
    price: '$29.99',
    badge: 'TIER 2 · RENT & LEASE DEFENSE',
    name: 'Rent-Hike & Lease-Break Rebuttal VIP Kit',
    shortName: 'Rent-Hike & Lease-Break VIP Kit',
    bestFor: 'Excessive renewal rent hikes, Good Cause / AB 1482 caps & early termination buyouts',
    features: [
      'Editable .DOCX Rent-Cap & Mitigation Rebuttal Letters',
      '25-Metro Rent Cap & Vacancy Proration .XLSX',
      'Statutory Notice & Relocation Audit Checklist',
      'Instant In-Browser Certified PDF Brief'
    ]
  },
  {
    key: 'small_claims',
    pid: 'pdt_0Nsmwv0GXACO4vbpzi1FN',
    price: '$39.99',
    badge: 'TIER 3 · TRIAL ESCALATION',
    name: 'Small Claims Court Trial-Ready Exhibit Binder',
    shortName: 'Small Claims Trial Exhibit Binder',
    bestFor: 'Filing in Small Claims Court, 2x/3x bad-faith claims & multi-violation disputes',
    features: [
      'Court-Ready Exhibit Index & Chronology (.DOCX)',
      'Small Claims Damages & Interest Ledger (.XLSX)',
      '2x/3x Bad-Faith Statutory Damages Script',
      '51-State Venue Limit & Filing Fee Reference'
    ]
  }
];

const STEP_LABELS = [
  'Dispute & Jurisdiction',
  'Dates & Dollar Stakes',
  'Landlord Violations',
  'Action Brief & Kit'
];

export default function TenantActionWizard() {
  const [step, setStep] = useState<number>(1);

  // Step 1
  const [scenario, setScenario] = useState<DisputeScenario>('deposit');
  const [stateCode, setStateCode] = useState<string>('CA');
  const [citySlug, setCitySlug] = useState<string>('');

  // Step 2
  const [amountUsd, setAmountUsd] = useState<number>(2800);
  const [daysSinceMoveOut, setDaysSinceMoveOut] = useState<number>(32);
  const [rentIncreasePct, setRentIncreasePct] = useState<number>(12);
  const [remainingMonths, setRemainingMonths] = useState<number>(5);
  const [forwardingProvided, setForwardingProvided] = useState<boolean>(true);

  // Step 3
  const [violations, setViolations] = useState<string[]>(['missed_deadline', 'no_itemized_receipts']);

  const selectedState: StateStatute = useMemo(
    () => TENANT_STATUTES_2026.find((s) => s.code === stateCode) ?? TENANT_STATUTES_2026[0],
    [stateCode]
  );

  const matchingCities: CityRentCap[] = useMemo(
    () => CITY_RENT_CAPS_2026.filter((c) => c.stateCode === selectedState.code),
    [selectedState.code]
  );

  const selectedCity: CityRentCap | undefined = useMemo(
    () => CITY_RENT_CAPS_2026.find((c) => c.slug === citySlug && c.stateCode === selectedState.code),
    [citySlug, selectedState.code]
  );

  const toggleViolation = (id: string) => {
    setViolations((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]));
  };

  const handleStateChange = (newCode: string) => {
    setStateCode(newCode);
    setCitySlug('');
  };

  // Compute damages / savings and matched Dodo tier
  const audit = useMemo(() => {
    const safeAmount = Math.max(0, Number.isFinite(amountUsd) ? amountUsd : 0);
    const hasDeadlineViolation =
      violations.includes('missed_deadline') ||
      (daysSinceMoveOut > selectedState.itemizedReturnDays &&
        (!selectedState.forwardingAddressTrigger || forwardingProvided));

    const multiplier = hasDeadlineViolation ? Math.max(1, selectedState.penaltyMultiplier) : 1;
    const fixedPenalty = hasDeadlineViolation ? selectedState.fixedPenaltyUsd : 0;

    let estimatedRecovery = safeAmount;
    let headlineMetricLabel = 'Estimated Recovery';
    let secondaryMetricLabel = 'Statutory Window';
    let secondaryMetricValue = `${selectedState.itemizedReturnDays} Days`;
    let citation = selectedState.statuteCitation;
    let verdict = '';

    if (scenario === 'deposit' || scenario === 'small_claims') {
      estimatedRecovery = safeAmount * multiplier + fixedPenalty;
      headlineMetricLabel = hasDeadlineViolation
        ? `Statutory Exposure (${multiplier}x)`
        : 'Principal Recovery';
      secondaryMetricLabel = 'Small Claims Limit';
      secondaryMetricValue = `$${selectedState.smallClaimsLimitUsd.toLocaleString()}`;

      if (hasDeadlineViolation) {
        verdict = `Landlord exceeded the ${selectedState.itemizedReturnDays}-day window under ${selectedState.statuteCitation}${
          selectedState.forwardingAddressTrigger && !forwardingProvided
            ? ' (note: verify forwarding address delivery proof)'
            : ''
        }. Statutory damages reach $${estimatedRecovery.toLocaleString()} (${multiplier}x${
          fixedPenalty > 0 ? ` + $${fixedPenalty}` : ''
        })${selectedState.attorneyFeesAllowed ? ' plus recoverable attorney fees' : ''}.`;
      } else {
        verdict = `Even within the ${selectedState.itemizedReturnDays}-day window, ${
          violations.length > 0
            ? `${violations.length} procedural error(s) support full $${safeAmount.toLocaleString()} principal recovery`
            : `demand itemized receipts under ${selectedState.statuteCitation}`
        }.`;
      }
    } else if (scenario === 'rent_hike') {
      const capPct = selectedCity?.effectiveMaxCapPct ?? (selectedState.statewideRentCap ? 10 : null);
      const excessPct = capPct !== null ? Math.max(0, rentIncreasePct - capPct) : rentIncreasePct;
      estimatedRecovery = Math.round(safeAmount * (excessPct / 100) * 12);
      headlineMetricLabel = capPct !== null ? '12-Mo Illegal Overcharge' : '12-Mo Rent Hike Impact';
      secondaryMetricLabel = capPct !== null ? 'Max Allowable Cap' : 'Notice Standard';
      secondaryMetricValue =
        capPct !== null ? `${capPct}% / yr` : `${selectedCity?.noticeDaysRequired ?? 30}+ Days`;
      citation = selectedCity
        ? `${selectedCity.ordinanceName} & ${selectedState.statuteCitation}`
        : selectedState.statuteCitation;

      verdict =
        capPct !== null && rentIncreasePct > capPct
          ? `Proposed ${rentIncreasePct}% increase exceeds the ${capPct}% cap under ${
              selectedCity ? selectedCity.ordinanceName : selectedState.name
            } by ${(rentIncreasePct - capPct).toFixed(1)}%, creating $${estimatedRecovery.toLocaleString()}/yr in unlawful overcharge.`
          : `Audit notice timing (${
              selectedCity?.noticeDaysRequired ?? 30
            } days required) and exemption status under ${citation}.`;
    } else {
      // lease_break
      const grossExposure = safeAmount * Math.max(1, remainingMonths);
      const mitigatedMonths =
        selectedState.mitigationDuty === 'Limited / None'
          ? Math.max(1, remainingMonths - 1)
          : Math.min(remainingMonths, 1.5);
      estimatedRecovery = Math.max(0, Math.round(grossExposure - safeAmount * mitigatedMonths));
      headlineMetricLabel = 'Est. Mitigation Savings';
      secondaryMetricLabel = 'Mitigation Duty';
      secondaryMetricValue = selectedState.mitigationDuty;
      verdict = `${selectedState.name} enforces a ${selectedState.mitigationDuty} duty to mitigate (${selectedState.statuteCitation}). Challenging a full ${remainingMonths}-month buyout saves an estimated $${estimatedRecovery.toLocaleString()} against a reasonable 1–1.5 month re-letting window.`;
    }

    // Tiered Dodo match
    let matchedTier: DodoTier;
    if (scenario === 'small_claims' || violations.length >= 3) {
      matchedTier = DODO_TIERS[2]; // $39.99 Small Claims Trial Exhibit Binder
    } else if (scenario === 'rent_hike' || scenario === 'lease_break') {
      matchedTier = DODO_TIERS[1]; // $29.99 Rent-Hike & Lease-Break VIP Kit
    } else {
      matchedTier = DODO_TIERS[0]; // $24.99 Deposit Recovery VIP Suite
    }

    const jurisdictionLabel = selectedCity
      ? `${selectedCity.city}, ${selectedState.name}`
      : `${selectedState.name} (${selectedState.code})`;

    const violationLabels = VIOLATION_OPTIONS.filter((v) => violations.includes(v.id)).map(
      (v) => v.label
    );

    const noticeText = `CERTIFIED STATUTORY DEMAND & ACTION NOTICE
Jurisdiction: ${jurisdictionLabel}
Governing Authority: ${citation}
Dispute Category: ${SCENARIO_OPTIONS.find((s) => s.id === scenario)?.title}
Estimated Statutory Exposure / Savings: $${estimatedRecovery.toLocaleString()}

Dear Landlord / Property Management,

This formal notice is issued pursuant to ${citation}. Based on move-out/notice records (${
      scenario === 'deposit' || scenario === 'small_claims'
        ? `${daysSinceMoveOut} days elapsed since possession delivery; forwarding address provided: ${
            forwardingProvided ? 'Yes' : 'No'
          }`
        : scenario === 'rent_hike'
          ? `proposed ${rentIncreasePct}% rent increase on $${safeAmount.toLocaleString()}/mo rent`
          : `${remainingMonths} remaining lease months at $${safeAmount.toLocaleString()}/mo`
    }), the following statutory/procedural deficiencies apply:
${violationLabels.length > 0 ? violationLabels.map((l) => `- ${l}`).join('\n') : '- Statutory compliance & itemized accounting required'}

Action Required Within 7 Business Days:
1. Remit $${estimatedRecovery.toLocaleString()} (or withdraw the non-compliant demand/fee) in full.
2. Provide complete itemized receipts, invoices, and depreciation calculations if any offset is claimed.

Failure to cure within 7 business days will result in formal escalation to Small Claims Court (Venue Limit: $${selectedState.smallClaimsLimitUsd.toLocaleString()}) seeking full statutory damages${
      selectedState.attorneyFeesAllowed ? ' and attorney fees' : ''
    }.`;

    return {
      estimatedRecovery,
      headlineMetricLabel,
      secondaryMetricLabel,
      secondaryMetricValue,
      citation,
      verdict,
      matchedTier,
      jurisdictionLabel,
      violationLabels,
      noticeText
    };
  }, [
    amountUsd,
    daysSinceMoveOut,
    forwardingProvided,
    remainingMonths,
    rentIncreasePct,
    scenario,
    selectedCity,
    selectedState,
    violations
  ]);

  const progressPct = (step / 4) * 100;

  return (
    <div className="space-y-8">
      {/* Progress Bar Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4 no-print">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-1 rounded-lg bg-[#0f2747] text-[#e2be68] text-xs font-mono font-bold">
              Step {step} of 4
            </span>
            <span className="text-sm font-extrabold text-[#0f2747]">
              {STEP_LABELS[step - 1]}
            </span>
          </div>
          <span className="text-xs font-mono text-slate-500">
            {selectedState.name}
            {selectedCity ? ` · ${selectedCity.city}` : ''}
          </span>
        </div>

        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#059669] transition-all duration-300 rounded-full"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        <div className="grid grid-cols-4 gap-2 pt-1">
          {STEP_LABELS.map((label, idx) => {
            const stepNum = idx + 1;
            const active = step === stepNum;
            const done = step > stepNum;
            return (
              <button
                key={label}
                type="button"
                onClick={() => setStep(stepNum)}
                className={`text-left px-2.5 py-2 rounded-xl border text-[11px] font-semibold transition cursor-pointer ${
                  active
                    ? 'bg-[#0f2747] text-white border-[#0f2747]'
                    : done
                      ? 'bg-emerald-50 text-[#059669] border-emerald-200'
                      : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span className="block font-mono text-[10px] opacity-80">0{stepNum}</span>
                <span className="truncate block">{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 1: Dispute Type & Jurisdiction */}
      {step === 1 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <h2 className="text-xl font-extrabold text-[#0f2747]">
              1. Select Your Dispute Scenario &amp; Jurisdiction
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Choose the issue that best matches your situation and select your state (plus optional metro city).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SCENARIO_OPTIONS.map((opt) => {
              const isSelected = scenario === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setScenario(opt.id)}
                  className={`text-left p-5 rounded-2xl border-2 transition cursor-pointer space-y-2 ${
                    isSelected
                      ? 'border-[#0f2747] bg-[#0f2747]/5 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#c8a24a]">
                      {opt.badge}
                    </span>
                    <span
                      className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] font-bold ${
                        isSelected
                          ? 'bg-[#0f2747] border-[#0f2747] text-white'
                          : 'border-slate-300'
                      }`}
                    >
                      {isSelected ? '✓' : ''}
                    </span>
                  </div>
                  <div className="text-base font-extrabold text-[#0f2747]">{opt.title}</div>
                  <p className="text-xs text-slate-600 leading-relaxed">{opt.subtitle}</p>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
            <label className="block space-y-1.5">
              <span className="text-xs font-bold text-[#0f2747] uppercase tracking-wider">
                State / Jurisdiction (51 Covered)
              </span>
              <select
                value={stateCode}
                onChange={(e) => handleStateChange(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-3 text-sm font-semibold text-slate-900 focus:border-[#0f2747] focus:outline-none"
              >
                {TENANT_STATUTES_2026.map((s) => (
                  <option key={s.code} value={s.code}>
                    {s.name} ({s.code}) — {s.statuteCitation}
                  </option>
                ))}
              </select>
            </label>

            <label className="block space-y-1.5">
              <span className="text-xs font-bold text-[#0f2747] uppercase tracking-wider">
                Metro City Rent Cap (Optional)
              </span>
              <select
                value={citySlug}
                onChange={(e) => setCitySlug(e.target.value)}
                disabled={matchingCities.length === 0}
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-3 text-sm font-semibold text-slate-900 focus:border-[#0f2747] focus:outline-none disabled:bg-slate-50 disabled:text-slate-400"
              >
                <option value="">
                  {matchingCities.length > 0
                    ? `Statewide ${selectedState.name} Only (No Metro Selected)`
                    : `No separate metro cap indexed in ${selectedState.code}`}
                </option>
                {matchingCities.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.city} — {c.ordinanceName}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      )}

      {/* STEP 2: Key Dates & Dollar Stakes */}
      {step === 2 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <h2 className="text-xl font-extrabold text-[#0f2747]">
              2. Key Dates &amp; Dollar Stakes
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Enter your financial figures and timeline so we can compute exact statutory multipliers under{' '}
              <span className="font-mono font-semibold text-[#0f2747]">{selectedState.statuteCitation}</span>.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <label className="block space-y-1.5">
              <span className="text-xs font-bold text-[#0f2747] uppercase tracking-wider">
                {scenario === 'rent_hike' || scenario === 'lease_break'
                  ? 'Current Monthly Rent ($ USD)'
                  : 'Security Deposit / Disputed Amount ($ USD)'}
              </span>
              <input
                type="number"
                min={0}
                step={50}
                value={amountUsd}
                onChange={(e) => setAmountUsd(Math.max(0, Number(e.target.value)))}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base font-bold text-[#0f2747] tabular-nums focus:border-[#0f2747] focus:outline-none"
              />
            </label>

            {(scenario === 'deposit' || scenario === 'small_claims') && (
              <label className="block space-y-1.5">
                <span className="text-xs font-bold text-[#0f2747] uppercase tracking-wider">
                  Days Elapsed Since Move-Out
                </span>
                <input
                  type="number"
                  min={0}
                  max={365}
                  value={daysSinceMoveOut}
                  onChange={(e) => setDaysSinceMoveOut(Math.max(0, Number(e.target.value)))}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base font-bold text-[#0f2747] tabular-nums focus:border-[#0f2747] focus:outline-none"
                />
                <span className="block text-[11px] text-slate-500">
                  {selectedState.name} statutory return window: {selectedState.itemizedReturnDays} days.
                </span>
              </label>
            )}

            {scenario === 'rent_hike' && (
              <label className="block space-y-1.5">
                <span className="text-xs font-bold text-[#0f2747] uppercase tracking-wider">
                  Proposed Rent Increase (%)
                </span>
                <input
                  type="number"
                  min={0}
                  max={100}
                  step={0.5}
                  value={rentIncreasePct}
                  onChange={(e) => setRentIncreasePct(Math.max(0, Number(e.target.value)))}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base font-bold text-[#0f2747] tabular-nums focus:border-[#0f2747] focus:outline-none"
                />
                <span className="block text-[11px] text-slate-500">
                  {selectedCity?.effectiveMaxCapPct
                    ? `${selectedCity.city} cap: ${selectedCity.effectiveMaxCapPct}%/yr`
                    : selectedState.rentCapSummary}
                </span>
              </label>
            )}

            {scenario === 'lease_break' && (
              <label className="block space-y-1.5">
                <span className="text-xs font-bold text-[#0f2747] uppercase tracking-wider">
                  Remaining Months on Lease
                </span>
                <input
                  type="number"
                  min={1}
                  max={24}
                  value={remainingMonths}
                  onChange={(e) => setRemainingMonths(Math.max(1, Number(e.target.value)))}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base font-bold text-[#0f2747] tabular-nums focus:border-[#0f2747] focus:outline-none"
                />
                <span className="block text-[11px] text-slate-500">
                  {selectedState.name} landlord mitigation duty: {selectedState.mitigationDuty}.
                </span>
              </label>
            )}
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
            <div className="text-xs font-bold text-[#0f2747] uppercase tracking-wider">
              Did you provide a written forwarding address?
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setForwardingProvided(true)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                  forwardingProvided
                    ? 'bg-[#059669] text-white border-[#059669]'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                }`}
              >
                Yes — Forwarding Address Provided
              </button>
              <button
                type="button"
                onClick={() => setForwardingProvided(false)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                  !forwardingProvided
                    ? 'bg-[#0f2747] text-white border-[#0f2747]'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                }`}
              >
                No / Not Yet Provided
              </button>
            </div>
            <p className="text-[11px] text-slate-600">{selectedState.forwardingAddressNote}</p>
          </div>
        </div>
      )}

      {/* STEP 3: Landlord Procedural Violations */}
      {step === 3 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <h2 className="text-xl font-extrabold text-[#0f2747]">
              3. Landlord Procedural Violations
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Check all procedural errors committed by your landlord or property manager. Selecting 3+ violations automatically escalates your kit recommendation to Trial-Ready.
            </p>
          </div>

          <div className="space-y-3">
            {VIOLATION_OPTIONS.map((v) => {
              const checked = violations.includes(v.id);
              return (
                <label
                  key={v.id}
                  className={`flex items-start gap-3.5 p-4 rounded-2xl border-2 cursor-pointer transition ${
                    checked
                      ? 'border-[#0f2747] bg-[#0f2747]/5'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleViolation(v.id)}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-[#0f2747] focus:ring-[#0f2747]"
                  />
                  <div className="space-y-0.5">
                    <div className="text-sm font-extrabold text-[#0f2747]">{v.label}</div>
                    <p className="text-xs text-slate-600">{v.detail}</p>
                  </div>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 4: Printable Brief + Matched Dodo Kit + 3-Tier Comparison */}
      {step === 4 && (
        <div className="space-y-8">
          <StatutoryBriefBox
            title="《Personalized Tenant Statutory Action Brief》"
            jurisdiction={audit.jurisdictionLabel}
            citation={audit.citation}
            metrics={[
              {
                label: audit.headlineMetricLabel,
                value: `$${audit.estimatedRecovery.toLocaleString()}`,
                highlight: true
              },
              {
                label: audit.secondaryMetricLabel,
                value: audit.secondaryMetricValue
              },
              {
                label: 'Violations Flagged',
                value: `${audit.violationLabels.length} Checked`
              },
              {
                label: 'Matched Tier',
                value: audit.matchedTier.price
              }
            ]}
            verdict={audit.verdict}
            noticeText={audit.noticeText}
          />

          <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm no-print">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-[#c8a24a] font-bold">
                STATUTORY CALENDAR REMINDER (.ICS)
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Lock in your {selectedState.code} statutory deadline ({selectedState.itemizedReturnDays}-day window under {selectedState.statuteCitation}) with a 1-day advance calendar alert.
              </p>
            </div>
            <IcsDeadlineButton
              title={`${selectedState.code} Tenant Statutory Deadline — ${audit.matchedTier.shortName}`}
              description={`Jurisdiction: ${audit.jurisdictionLabel}\nAuthority: ${audit.citation}\nEst. Recovery: $${audit.estimatedRecovery.toLocaleString()}\nAction: ${audit.verdict}`}
              daysFromNow={
                scenario === 'deposit'
                  ? Math.max(1, selectedState.itemizedReturnDays - daysSinceMoveOut)
                  : 14
              }
              url="https://tenantfig.com/wizard/"
              label="Add Statutory Deadline (.ics)"
            />
          </div>

          <HiddenTrapsCallout variant="wizard" />

          {/* Dynamic ROI Value Anchor Banner */}
          {(() => {
            const roiMultiplier = Math.max(1, Math.round(audit.estimatedRecovery / 29.99));
            return (
              <div className="bg-gradient-to-r from-[#09192e] via-[#0f2747] to-[#09192e] border-2 border-[#c8a24a] rounded-2xl p-5 sm:p-6 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
                <div className="space-y-1">
                  <div className="text-[11px] font-mono uppercase tracking-widest text-[#e2be68] font-bold">
                    DYNAMIC STATUTORY ROI VALUE ANCHOR
                  </div>
                  <div className="text-base sm:text-lg font-extrabold text-white">
                    ${audit.estimatedRecovery.toLocaleString()} Estimated Recovery vs. $29.99 Statutory Demand Kit
                  </div>
                  <p className="text-xs text-slate-300">
                    Lock in court-ready .DOCX Certified Mail Demand Letters, .XLSX Depreciation Ledgers, and {selectedState.code} statutory citations ({selectedState.statuteCitation}).
                  </p>
                </div>
                <div className="bg-[#c8a24a] text-[#09192e] rounded-xl px-5 py-3 text-center shrink-0 shadow">
                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider">
                    PROJECTED ROI
                  </div>
                  <div className="text-2xl font-black tabular-nums leading-tight">
                    {roiMultiplier}x
                  </div>
                </div>
              </div>
            );
          })()}

          <WizardLeadEscalation
            stateAbbr={selectedState.code}
            stateName={selectedState.name}
            exposureAmount={audit.estimatedRecovery}
            summaryText={audit.noticeText}
            statuteCitation={selectedState.statuteCitation}
          />

          {/* Matched Dodo Product via ToolPaywallDossier */}
          <ToolPaywallDossier
            badge={`RECOMMENDED FOR YOUR CASE · ${audit.matchedTier.badge}`}
            title={audit.matchedTier.name}
            desc={audit.matchedTier.bestFor}
            price={audit.matchedTier.price}
            pid={audit.matchedTier.pid}
            features={audit.matchedTier.features}
            dynamicAmount={`$${audit.estimatedRecovery.toLocaleString()}`}
            docType={`${audit.matchedTier.shortName} (${selectedState.code})`}
            sampleLines={[
              { label: 'Jurisdiction', value: audit.jurisdictionLabel },
              { label: 'Statute', value: selectedState.statuteCitation },
              { label: 'Est. Recovery', value: `$${audit.estimatedRecovery.toLocaleString()}` }
            ]}
          />

          {/* 3-Tier Kit Comparison Cards */}
          <section className="space-y-4 no-print">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-[#c8a24a] font-bold">
                  COMPARE ALL 3 DEFENSE TIERS
                </div>
                <h3 className="text-xl font-extrabold text-[#0f2747]">
                  Select Any Digital Statutory Kit Directly
                </h3>
              </div>
              <span className="text-xs text-slate-500">Instant download · 30-day guarantee</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {DODO_TIERS.map((tier) => {
                const isMatched = tier.pid === audit.matchedTier.pid;
                const buyUrl = `https://checkout.dodopayments.com/buy/${encodeURIComponent(tier.pid)}`;
                return (
                  <div
                    key={tier.pid}
                    className={`rounded-2xl p-6 flex flex-col justify-between space-y-5 border transition ${
                      isMatched
                        ? 'bg-[#0f2747] text-white border-[#c8a24a] shadow-lg'
                        : 'bg-white text-slate-900 border-slate-200 shadow-sm'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                            isMatched ? 'text-[#e2be68]' : 'text-[#c8a24a]'
                          }`}
                        >
                          {tier.badge}
                        </span>
                        {isMatched && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#059669] text-white">
                            BEST MATCH
                          </span>
                        )}
                      </div>

                      <div className="text-3xl font-black tabular-nums">{tier.price}</div>
                      <h4 className={`text-base font-extrabold leading-snug ${isMatched ? 'text-white' : 'text-[#0f2747]'}`}>
                        {tier.name}
                      </h4>
                      <p className={`text-xs leading-relaxed ${isMatched ? 'text-slate-300' : 'text-slate-600'}`}>
                        {tier.bestFor}
                      </p>

                      <ul className={`space-y-1.5 text-xs pt-2 border-t ${isMatched ? 'border-white/10 text-slate-200' : 'border-slate-100 text-slate-700'}`}>
                        {tier.features.map((f) => (
                          <li key={f} className="flex items-start gap-2">
                            <span className="text-[#059669] font-bold">✓</span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <a
                      href={buyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-matrix-offer="1"
                      data-offer-slot="inline"
                      data-offer-id={tier.pid}
                      data-offer-action="buy"
                      className={`block w-full text-center px-4 py-3 rounded-xl text-xs font-extrabold transition ${
                        isMatched
                          ? 'bg-[#c8a24a] hover:bg-[#e2be68] text-[#09192e]'
                          : 'bg-[#0f2747] hover:bg-[#1a3b68] text-white'
                      }`}
                    >
                      Get {tier.shortName} ({tier.price}) →
                    </a>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      )}

      {/* Back / Next Controls */}
      <div className="flex items-center justify-between gap-4 pt-2 no-print">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(1, s - 1))}
          disabled={step === 1}
          className="px-5 py-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-sm font-bold text-[#0f2747] disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
        >
          ← Back
        </button>

        {step < 4 ? (
          <button
            type="button"
            onClick={() => setStep((s) => Math.min(4, s + 1))}
            className="px-6 py-3 rounded-xl bg-[#0f2747] hover:bg-[#1a3b68] text-white text-sm font-extrabold transition shadow-sm cursor-pointer"
          >
            {step === 3 ? 'Generate Action Brief →' : 'Next Step →'}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setStep(1)}
            className="px-5 py-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition cursor-pointer"
          >
            Start New Audit
          </button>
        )}
      </div>
    </div>
  );
}
