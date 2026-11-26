'use client';

import React, { useState, useMemo } from 'react';
import { TENANT_STATUTES_2026 } from '@/data/tenant_statutes_2026';
import StatutoryBriefBox from '@/components/StatutoryBriefBox';
import ToolPaywallDossier from '@/components/ToolPaywallDossier';

export default function DepositPenaltyCalc() {
  const [mode, setMode] = useState<'quick' | 'pro'>('quick');
  const [stateCode, setStateCode] = useState('CA');
  const [depositPaid, setDepositPaid] = useState(3600);
  const [withheldAmount, setWithheldAmount] = useState(2800);
  const [daysSinceMoveOut, setDaysSinceMoveOut] = useState(26);
  const [forwardingSentDay, setForwardingSentDay] = useState(0);
  const [itemizedReceived, setItemizedReceived] = useState<'none' | 'late' | 'timely'>('late');
  const [wearAndTearDeduction, setWearAndTearDeduction] = useState(850);
  const [badFaith, setBadFaith] = useState(true);

  const statute = useMemo(
    () => TENANT_STATUTES_2026.find((s) => s.code === stateCode) || TENANT_STATUTES_2026[4],
    [stateCode]
  );

  const applyPreset = (preset: 'oakland' | 'austin' | 'brooklyn') => {
    if (preset === 'oakland') {
      setStateCode('CA');
      setDepositPaid(3600);
      setWithheldAmount(2800);
      setDaysSinceMoveOut(26);
      setForwardingSentDay(0);
      setItemizedReceived('late');
      setBadFaith(true);
    } else if (preset === 'austin') {
      setStateCode('TX');
      setDepositPaid(2400);
      setWithheldAmount(1900);
      setDaysSinceMoveOut(34);
      setForwardingSentDay(0);
      setItemizedReceived('none');
      setBadFaith(true);
    } else {
      setStateCode('NY');
      setDepositPaid(3400);
      setWithheldAmount(3400);
      setDaysSinceMoveOut(18);
      setForwardingSentDay(0);
      setItemizedReceived('none');
      setBadFaith(true);
    }
  };

  const results = useMemo(() => {
    const effectiveDaysElapsed = statute.forwardingAddressTrigger
      ? Math.max(0, daysSinceMoveOut - forwardingSentDay)
      : daysSinceMoveOut;
    const deadlineDays = itemizedReceived === 'none' ? statute.undisputedReturnDays : statute.itemizedReturnDays;
    const isOverdue = effectiveDaysElapsed > deadlineDays || itemizedReceived === 'late';
    const daysOverdue = Math.max(0, effectiveDaysElapsed - deadlineDays);

    const principalClaim = withheldAmount;
    let statutoryDamages = 0;
    if (isOverdue || badFaith) {
      if (statute.penaltyMultiplier > 1) {
        // Most states award multiplier total or multiplier on top; we show statutory penalty = (mult - 1)*withheld or full mult
        statutoryDamages = Math.round(withheldAmount * (statute.penaltyMultiplier - 1)) + statute.fixedPenaltyUsd;
      } else {
        statutoryDamages = statute.fixedPenaltyUsd;
      }
    }
    const totalClaim = principalClaim + statutoryDamages;
    const withinSmallClaims = totalClaim <= statute.smallClaimsLimitUsd;
    const filingFee = statute.smallClaimsFilingFeeEstUsd || 75;
    const netRecoveryAfterFee = Math.max(0, totalClaim - filingFee);
    const filingRoiMultiple = filingFee > 0 ? (totalClaim / filingFee).toFixed(1) : '0.0';

    return {
      effectiveDaysElapsed,
      deadlineDays,
      isOverdue,
      daysOverdue,
      principalClaim,
      statutoryDamages,
      totalClaim,
      withinSmallClaims,
      filingFee,
      netRecoveryAfterFee,
      filingRoiMultiple
    };
  }, [statute, withheldAmount, daysSinceMoveOut, forwardingSentDay, itemizedReceived, badFaith]);

  const fmt = (n: number) => `$${n.toLocaleString('en-US')}`;

  const noticeText = `STATUTORY NOTICE & DEMAND FOR RETURN OF SECURITY DEPOSIT
Date: ${new Date().toISOString().slice(0, 10)}
Jurisdiction: ${statute.name} (${statute.statuteCitation})
Via: Email & USPS Certified Mail

Dear Landlord / Property Management,

I vacated the premises ${daysSinceMoveOut} days ago${statute.forwardingAddressTrigger ? ` and delivered my written forwarding address on Day ${forwardingSentDay}` : ''}. Under ${statute.statuteCitation}, you were required to return my ${fmt(depositPaid)} security deposit or provide a compliant itemized accounting within ${results.deadlineDays} days.

To date, ${fmt(withheldAmount)} remains wrongfully withheld${results.isOverdue ? ` (${results.daysOverdue} days past the statutory deadline)` : ''}. Under ${statute.name} law, failure to comply entitles me to recover the ${fmt(results.principalClaim)} principal plus ${fmt(results.statutoryDamages)} in statutory bad-faith damages (${statute.penaltyMultiplier}x multiplier${statute.fixedPenaltyUsd ? ` + $${statute.fixedPenaltyUsd}` : ''}), totaling ${fmt(results.totalClaim)}${statute.attorneyFeesAllowed ? ' plus court costs and attorney fees' : ''}.

Please remit ${fmt(results.principalClaim)} within 5 business days to avoid immediate filing in ${statute.name} Small Claims Court (jurisdictional limit: ${fmt(statute.smallClaimsLimitUsd)}).

Sincerely,
[Tenant Name]`;

  return (
    <div className="space-y-8">
      {/* Dual-Mode Toggle + Presets */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="inline-flex rounded-xl bg-slate-200/80 p-1 border border-slate-300">
          <button
            type="button"
            onClick={() => setMode('quick')}
            className={`px-4 py-2 rounded-lg text-xs font-extrabold transition cursor-pointer ${
              mode === 'quick'
                ? 'bg-[#0f2747] text-white shadow-sm'
                : 'text-slate-600 hover:text-[#0f2747]'
            }`}
          >
            ⚡ Quick Check (30s)
          </button>
          <button
            type="button"
            onClick={() => setMode('pro')}
            className={`px-4 py-2 rounded-lg text-xs font-extrabold transition cursor-pointer ${
              mode === 'pro'
                ? 'bg-[#0f2747] text-white shadow-sm'
                : 'text-slate-600 hover:text-[#0f2747]'
            }`}
          >
            🔬 Forensic Pro Audit
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-1">Executive Presets:</span>
        <button
          type="button"
          onClick={() => applyPreset('oakland')}
          className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:border-[#0f2747] text-xs font-semibold text-[#0f2747] cursor-pointer"
        >
          Oakland, CA ($2,800 · 21d)
        </button>
        <button
          type="button"
          onClick={() => applyPreset('austin')}
          className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:border-[#0f2747] text-xs font-semibold text-[#0f2747] cursor-pointer"
        >
          Austin, TX ($1,900 · 3x+$100)
        </button>
        <button
          type="button"
          onClick={() => applyPreset('brooklyn')}
          className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:border-[#0f2747] text-xs font-semibold text-[#0f2747] cursor-pointer"
        >
          Brooklyn, NY ($3,400 · 14d)
        </button>
        </div>
      </div>

      {/* 2-Column Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Inputs */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-extrabold text-[#0f2747]">
              {mode === 'quick' ? 'Quick Check (3 Essential Inputs)' : 'Forensic Pro Audit Parameters'}
            </h2>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-bold">
              {mode === 'quick' ? '30s Mode' : 'Full Audit'}
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">1. Jurisdiction (51 States + DC)</label>
            <select
              value={stateCode}
              onChange={(e) => setStateCode(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm bg-white text-slate-900"
            >
              {TENANT_STATUTES_2026.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.name} ({s.code}) — {s.itemizedReturnDays}d / {s.penaltyMultiplier}x
                </option>
              ))}
            </select>
          </div>

          {mode === 'quick' ? (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">2. Deposit Withheld ($)</label>
                <input
                  type="number"
                  value={withheldAmount}
                  onChange={(e) => {
                    const val = Math.max(0, Number(e.target.value));
                    setWithheldAmount(val);
                    if (val > depositPaid) setDepositPaid(val);
                  }}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm tabular-nums"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">3. Days Since Move-Out</label>
                <input
                  type="number"
                  value={daysSinceMoveOut}
                  onChange={(e) => setDaysSinceMoveOut(Math.max(0, Number(e.target.value)))}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm tabular-nums"
                />
              </div>
              <button
                type="button"
                onClick={() => setMode('pro')}
                className="w-full text-left text-[11px] font-semibold text-[#0f2747] bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl p-3 transition cursor-pointer"
              >
                + Unlock Forensic Pro Audit (forwarding address date, itemized status, carpet/paint wear deductions &amp; Small Claims ROI) →
              </button>
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Total Deposit ($)</label>
                  <input
                    type="number"
                    value={depositPaid}
                    onChange={(e) => setDepositPaid(Math.max(0, Number(e.target.value)))}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm tabular-nums"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Wrongfully Withheld ($)</label>
                  <input
                    type="number"
                    value={withheldAmount}
                    onChange={(e) => setWithheldAmount(Math.max(0, Number(e.target.value)))}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm tabular-nums"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Days Since Move-Out</label>
                  <input
                    type="number"
                    value={daysSinceMoveOut}
                    onChange={(e) => setDaysSinceMoveOut(Math.max(0, Number(e.target.value)))}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm tabular-nums"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Forwarding Addr Day</label>
                  <input
                    type="number"
                    value={forwardingSentDay}
                    onChange={(e) => setForwardingSentDay(Math.max(0, Number(e.target.value)))}
                    disabled={!statute.forwardingAddressTrigger}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm tabular-nums disabled:bg-slate-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Itemized Statement</label>
                  <select
                    value={itemizedReceived}
                    onChange={(e) => setItemizedReceived(e.target.value as 'none' | 'late' | 'timely')}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm bg-white"
                  >
                    <option value="none">None Received</option>
                    <option value="late">Received Late</option>
                    <option value="timely">Timely (Disputed)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Carpet/Paint Wear ($)</label>
                  <input
                    type="number"
                    value={wearAndTearDeduction}
                    onChange={(e) => setWearAndTearDeduction(Math.max(0, Number(e.target.value)))}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm tabular-nums"
                  />
                </div>
              </div>

              <label className="flex items-center space-x-2 text-xs font-semibold text-slate-700 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={badFaith}
                  onChange={(e) => setBadFaith(e.target.checked)}
                  className="rounded border-slate-300"
                />
                <span>Bad-faith retention / missing receipts ({statute.penaltyMultiplier}x eligible)</span>
              </label>
            </>
          )}
        </div>

        {/* Right: Live Statutory Output */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-[#0f2747] text-white rounded-2xl p-6 shadow-md space-y-5">
            <div className="flex flex-wrap justify-between items-center gap-2 border-b border-white/10 pb-3">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-widest text-[#c8a24a]">
                  {statute.statuteCitation}
                </div>
                <div className="text-lg font-extrabold">{statute.name} Statutory Recovery Model</div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  results.isOverdue
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-amber-500/20 text-amber-200 border border-amber-500/40'
                }`}
              >
                {results.isOverdue ? `DEADLINE BREACHED (+${results.daysOverdue}d)` : 'WITHIN STATUTORY WINDOW'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#09192e] rounded-xl p-4 border border-white/10">
                <div className="text-xs text-slate-400">Principal Recovery</div>
                <div className="text-2xl font-black tabular-nums mt-1">{fmt(results.principalClaim)}</div>
              </div>
              <div className="bg-[#09192e] rounded-xl p-4 border border-white/10">
                <div className="text-xs text-slate-400">Statutory Penalty ({statute.penaltyMultiplier}x)</div>
                <div className="text-2xl font-black text-[#c8a24a] tabular-nums mt-1">
                  +{fmt(results.statutoryDamages)}
                </div>
              </div>
              <div className="bg-emerald-950/60 rounded-xl p-4 border border-emerald-500/40">
                <div className="text-xs text-emerald-300 font-semibold">Total Statutory Claim</div>
                <div className="text-2xl font-black text-emerald-400 tabular-nums mt-1">
                  {fmt(results.totalClaim)}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-[#09192e]/70 p-4 rounded-xl border border-white/10">
              <div>
                <span className="text-slate-400">Return Clock:</span>{' '}
                <strong className="text-white">{results.deadlineDays} days</strong>{' '}
                ({statute.forwardingAddressTrigger ? 'Forwarding Addr Triggered' : 'Surrender Triggered'})
              </div>
              <div>
                <span className="text-slate-400">Small Claims Limit:</span>{' '}
                <strong className={results.withinSmallClaims ? 'text-emerald-400' : 'text-amber-300'}>
                  {fmt(statute.smallClaimsLimitUsd)} ({results.withinSmallClaims ? 'Eligible' : 'Exceeds Limit'})
                </strong>
              </div>
              {mode === 'pro' && (
                <>
                  <div>
                    <span className="text-slate-400">Small Claims Filing ROI:</span>{' '}
                    <strong className="text-emerald-400 tabular-nums">
                      {results.filingRoiMultiple}x (Est. Fee {fmt(results.filingFee)} → Net {fmt(results.netRecoveryAfterFee)})
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400">Carpet/Paint Wear Disputed:</span>{' '}
                    <strong className="text-[#c8a24a] tabular-nums">{fmt(wearAndTearDeduction)}</strong>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <StatutoryBriefBox
        title={`${statute.name} Security Deposit Statutory Audit`}
        jurisdiction={statute.name}
        citation={statute.statuteCitation}
        metrics={[
          { label: 'Principal Withheld', value: fmt(results.principalClaim) },
          { label: 'Statutory Penalty', value: fmt(results.statutoryDamages) },
          { label: 'Total Claim', value: fmt(results.totalClaim), highlight: true },
          { label: 'Statutory Clock', value: `${results.effectiveDaysElapsed} / ${results.deadlineDays} days` }
        ]}
        verdict={statute.keyExecutiveTakeaway}
        noticeText={noticeText}
      />

      <ToolPaywallDossier
        dynamicAmount={fmt(results.totalClaim)}
        docType={`${statute.code} Security Deposit Demand Packet`}
        storageKey="deposit_penalty"
        sampleLines={[
          { label: 'Jurisdiction', value: statute.name },
          { label: 'Principal + Penalty', value: fmt(results.totalClaim) },
          { label: 'Small Claims Limit', value: fmt(statute.smallClaimsLimitUsd) }
        ]}
      />
    </div>
  );
}
