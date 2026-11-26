'use client';

import React, { useState, useMemo } from 'react';
import { TENANT_STATUTES_2026 } from '@/data/tenant_statutes_2026';
import StatutoryBriefBox from '@/components/StatutoryBriefBox';
import ToolPaywallDossier from '@/components/ToolPaywallDossier';

export default function SmallClaimsRoiCalc() {
  const [stateCode, setStateCode] = useState('CA');
  const [principalWithheld, setPrincipalWithheld] = useState(2800);
  const [statutoryEligible, setStatutoryEligible] = useState(true);
  const [prepHours, setPrepHours] = useState(6);
  const [hourlyRate, setHourlyRate] = useState(125);
  const [winProbPct, setWinProbPct] = useState(85);

  const statute = useMemo(
    () => TENANT_STATUTES_2026.find((s) => s.code === stateCode) || TENANT_STATUTES_2026[4],
    [stateCode]
  );

  const applyPreset = (p: 'ca' | 'tx' | 'ma') => {
    if (p === 'ca') {
      setStateCode('CA');
      setPrincipalWithheld(2800);
      setStatutoryEligible(true);
      setPrepHours(6);
      setHourlyRate(125);
      setWinProbPct(85);
    } else if (p === 'tx') {
      setStateCode('TX');
      setPrincipalWithheld(1900);
      setStatutoryEligible(true);
      setPrepHours(5);
      setHourlyRate(120);
      setWinProbPct(85);
    } else {
      setStateCode('MA');
      setPrincipalWithheld(3500);
      setStatutoryEligible(true);
      setPrepHours(6);
      setHourlyRate(140);
      setWinProbPct(90);
    }
  };

  const results = useMemo(() => {
    const rawClaim = statutoryEligible
      ? Math.round(principalWithheld * statute.penaltyMultiplier) + statute.fixedPenaltyUsd
      : principalWithheld;
    const cappedClaim = Math.min(rawClaim, statute.smallClaimsLimitUsd);
    const filingFee = statute.smallClaimsFilingFeeEstUsd;
    const timeCost = prepHours * hourlyRate;
    const expectedGross = Math.round(cappedClaim * (winProbPct / 100));
    const netExpectedRecovery = expectedGross - filingFee - timeCost;
    const totalCost = filingFee + timeCost;
    const roiPct = totalCost > 0 ? Math.round((netExpectedRecovery / totalCost) * 100) : 0;

    return {
      rawClaim,
      cappedClaim,
      filingFee,
      timeCost,
      expectedGross,
      netExpectedRecovery,
      roiPct
    };
  }, [statute, principalWithheld, statutoryEligible, prepHours, hourlyRate, winProbPct]);

  const fmt = (n: number) => `$${n.toLocaleString('en-US')}`;

  const noticeText = `FINAL PRE-SUIT SMALL CLAIMS NOTICE
Jurisdiction: ${statute.name} Small Claims Court (Limit: ${fmt(statute.smallClaimsLimitUsd)})
Authority: ${statute.statuteCitation}

Dear Landlord / Registered Agent,

Because my ${fmt(principalWithheld)} security deposit remains unreturned, I have prepared a Small Claims filing seeking ${fmt(results.cappedClaim)} (principal plus statutory ${statute.penaltyMultiplier}x damages${statute.fixedPenaltyUsd ? ` + $${statute.fixedPenaltyUsd}` : ''}) plus ${fmt(results.filingFee)} in court filing costs.

To resolve this matter without a public court judgment, please remit ${fmt(principalWithheld)} within 5 business days. Otherwise, I will file and serve the claim on Day 6.

Sincerely,
[Tenant Name]`;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-1">Executive Presets:</span>
        <button
          type="button"
          onClick={() => applyPreset('ca')}
          className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:border-[#0f2747] text-xs font-semibold text-[#0f2747] cursor-pointer"
        >
          California ($2,800 · $12.5k Limit)
        </button>
        <button
          type="button"
          onClick={() => applyPreset('tx')}
          className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:border-[#0f2747] text-xs font-semibold text-[#0f2747] cursor-pointer"
        >
          Texas ($1,900 · $20k Limit)
        </button>
        <button
          type="button"
          onClick={() => applyPreset('ma')}
          className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:border-[#0f2747] text-xs font-semibold text-[#0f2747] cursor-pointer"
        >
          Massachusetts ($3,500 · 3x)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="text-base font-extrabold text-[#0f2747] border-b border-slate-100 pb-3">
            Litigation ROI Inputs
          </h2>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">State Venue (51 Jurisdictions)</label>
            <select
              value={stateCode}
              onChange={(e) => setStateCode(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm bg-white"
            >
              {TENANT_STATUTES_2026.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.name} (Limit: ${s.smallClaimsLimitUsd.toLocaleString()})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Principal Withheld ($)</label>
              <input
                type="number"
                value={principalWithheld}
                onChange={(e) => setPrincipalWithheld(Math.max(0, Number(e.target.value)))}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm tabular-nums"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Win / Settle Prob (%)</label>
              <input
                type="number"
                min={10}
                max={100}
                value={winProbPct}
                onChange={(e) => setWinProbPct(Math.min(100, Math.max(10, Number(e.target.value))))}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm tabular-nums"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Prep + Hearing Hours</label>
              <input
                type="number"
                value={prepHours}
                onChange={(e) => setPrepHours(Math.max(1, Number(e.target.value)))}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm tabular-nums"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Your Time Value ($/hr)</label>
              <input
                type="number"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Math.max(0, Number(e.target.value)))}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm tabular-nums"
              />
            </div>
          </div>

          <label className="flex items-center space-x-2 text-xs font-semibold text-slate-700 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={statutoryEligible}
              onChange={(e) => setStatutoryEligible(e.target.checked)}
              className="rounded border-slate-300"
            />
            <span>Include {statute.penaltyMultiplier}x Statutory Multiplier</span>
          </label>
        </div>

        <div className="lg:col-span-7 bg-[#0f2747] text-white rounded-2xl p-6 shadow-md space-y-5">
          <div className="flex flex-wrap justify-between items-center gap-2 border-b border-white/10 pb-3">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-[#c8a24a]">
                {statute.name} SMALL CLAIMS COURT
              </div>
              <div className="text-lg font-extrabold">Net Recovery &amp; Time-Cost ROI</div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 tabular-nums">
              {results.roiPct}% NET ROI
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#09192e] rounded-xl p-4 border border-white/10">
              <div className="text-xs text-slate-400">Capped Court Claim</div>
              <div className="text-2xl font-black tabular-nums mt-1">{fmt(results.cappedClaim)}</div>
            </div>
            <div className="bg-[#09192e] rounded-xl p-4 border border-white/10">
              <div className="text-xs text-slate-400">Filing + Time Cost</div>
              <div className="text-2xl font-black text-[#c8a24a] tabular-nums mt-1">
                -{fmt(results.filingFee + results.timeCost)}
              </div>
            </div>
            <div className="bg-emerald-950/60 rounded-xl p-4 border border-emerald-500/40">
              <div className="text-xs text-emerald-300 font-semibold">Net Expected Recovery</div>
              <div className="text-2xl font-black text-emerald-400 tabular-nums mt-1">
                {fmt(results.netExpectedRecovery)}
              </div>
            </div>
          </div>

          <div className="bg-[#09192e]/70 rounded-xl p-4 border border-white/10 text-xs flex flex-wrap justify-between gap-2">
            <span>Est. Filing Fee: <strong>{fmt(results.filingFee)}</strong></span>
            <span>Jurisdictional Limit: <strong>{fmt(statute.smallClaimsLimitUsd)}</strong></span>
          </div>
        </div>
      </div>

      <StatutoryBriefBox
        title={`${statute.name} Small Claims Litigation ROI Brief`}
        jurisdiction={statute.name}
        citation={statute.statuteCitation}
        metrics={[
          { label: 'Court Claim', value: fmt(results.cappedClaim) },
          { label: 'Filing Fee', value: fmt(results.filingFee) },
          { label: 'Time Opportunity Cost', value: fmt(results.timeCost) },
          { label: 'Net Expected ROI', value: `${fmt(results.netExpectedRecovery)} (${results.roiPct}%)`, highlight: true }
        ]}
        verdict={
          results.netExpectedRecovery > 0
            ? `Filing in ${statute.name} Small Claims Court yields a positive net expected recovery of ${fmt(results.netExpectedRecovery)} (${results.roiPct}% ROI).`
            : 'Time cost exceeds expected recovery; leverage a pre-suit demand letter first.'
        }
        noticeText={noticeText}
      />

      <ToolPaywallDossier
        dynamicAmount={fmt(results.cappedClaim)}
        docType={`${statute.code} Small Claims Filing & Evidence Kit`}
        storageKey="small_claims_roi"
      />
    </div>
  );
}
