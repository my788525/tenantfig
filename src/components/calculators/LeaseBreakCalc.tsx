'use client';

import React, { useState, useMemo } from 'react';
import { TENANT_STATUTES_2026 } from '@/data/tenant_statutes_2026';
import StatutoryBriefBox from '@/components/StatutoryBriefBox';
import ToolPaywallDossier from '@/components/ToolPaywallDossier';

export default function LeaseBreakCalc() {
  const [stateCode, setStateCode] = useState('CA');
  const [monthlyRent, setMonthlyRent] = useState(3400);
  const [monthsRemaining, setMonthsRemaining] = useState(5);
  const [buyoutFee, setBuyoutFee] = useState(6800);
  const [expectedVacancyDays, setExpectedVacancyDays] = useState(21);
  const [relettingCost, setRelettingCost] = useState(450);

  const statute = useMemo(
    () => TENANT_STATUTES_2026.find((s) => s.code === stateCode) || TENANT_STATUTES_2026[4],
    [stateCode]
  );

  const applyPreset = (p: 'sf' | 'austin' | 'chicago') => {
    if (p === 'sf') {
      setStateCode('CA');
      setMonthlyRent(3400);
      setMonthsRemaining(5);
      setBuyoutFee(6800);
      setExpectedVacancyDays(21);
      setRelettingCost(450);
    } else if (p === 'austin') {
      setStateCode('TX');
      setMonthlyRent(2500);
      setMonthsRemaining(4);
      setBuyoutFee(5000);
      setExpectedVacancyDays(35);
      setRelettingCost(350);
    } else {
      setStateCode('IL');
      setMonthlyRent(3200);
      setMonthsRemaining(6);
      setBuyoutFee(6400);
      setExpectedVacancyDays(45);
      setRelettingCost(500);
    }
  };

  const results = useMemo(() => {
    const grossRemainingRent = monthlyRent * monthsRemaining;
    const dailyRent = monthlyRent / 30;
    const mitigatedRentLiability = Math.min(grossRemainingRent, Math.round(dailyRent * expectedVacancyDays));
    const totalMitigatedCost = mitigatedRentLiability + relettingCost;
    const savingsVsBuyout = buyoutFee - totalMitigatedCost;
    const savingsVsGross = grossRemainingRent - totalMitigatedCost;

    return {
      grossRemainingRent,
      mitigatedRentLiability,
      totalMitigatedCost,
      savingsVsBuyout,
      savingsVsGross
    };
  }, [monthlyRent, monthsRemaining, buyoutFee, expectedVacancyDays, relettingCost]);

  const fmt = (n: number) => `$${n.toLocaleString('en-US')}`;

  const noticeText = `NOTICE OF EARLY LEASE SURRENDER & STATUTORY DUTY TO MITIGATE
Jurisdiction: ${statute.name} (${statute.statuteCitation})
Mitigation Standard: ${statute.mitigationDuty} Duty to Mitigate Damages

Dear Landlord / Property Management,

Please accept this formal notice of early lease surrender with ${monthsRemaining} months remaining at ${fmt(monthlyRent)}/mo. Under ${statute.name} law (${statute.mitigationDuty} Duty to Mitigate), a landlord must make reasonable, good-faith efforts to re-let the unit and cannot collect double rent once a replacement tenant occupies the premises.

At a projected market re-rental window of ${expectedVacancyDays} days, prorated vacancy liability is ${fmt(results.mitigatedRentLiability)} plus documented marketing costs (${fmt(relettingCost)}), totaling ${fmt(results.totalMitigatedCost)} — compared to the ${fmt(buyoutFee)} early-termination buyout fee.

I am prepared to cooperate fully with unit showings and refer qualified replacement applicants. Please confirm active listing status within 5 business days.`;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-1">Executive Presets:</span>
        <button
          type="button"
          onClick={() => applyPreset('sf')}
          className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:border-[#0f2747] text-xs font-semibold text-[#0f2747] cursor-pointer"
        >
          SF Relocation ($3,400/mo · 21d)
        </button>
        <button
          type="button"
          onClick={() => applyPreset('austin')}
          className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:border-[#0f2747] text-xs font-semibold text-[#0f2747] cursor-pointer"
        >
          Austin TX Transfer ($2,500/mo)
        </button>
        <button
          type="button"
          onClick={() => applyPreset('chicago')}
          className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:border-[#0f2747] text-xs font-semibold text-[#0f2747] cursor-pointer"
        >
          Chicago IL Exit ($3,200/mo)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="text-base font-extrabold text-[#0f2747] border-b border-slate-100 pb-3">
            Lease Break Parameters
          </h2>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">State Jurisdiction</label>
            <select
              value={stateCode}
              onChange={(e) => setStateCode(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm bg-white"
            >
              {TENANT_STATUTES_2026.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.name} — {s.mitigationDuty} Mitigation
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Monthly Rent ($)</label>
              <input
                type="number"
                value={monthlyRent}
                onChange={(e) => setMonthlyRent(Math.max(0, Number(e.target.value)))}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm tabular-nums"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Months Remaining</label>
              <input
                type="number"
                value={monthsRemaining}
                onChange={(e) => setMonthsRemaining(Math.max(1, Number(e.target.value)))}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm tabular-nums"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Lease Buyout Fee ($)</label>
              <input
                type="number"
                value={buyoutFee}
                onChange={(e) => setBuyoutFee(Math.max(0, Number(e.target.value)))}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm tabular-nums"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Est. Vacancy (Days)</label>
              <input
                type="number"
                value={expectedVacancyDays}
                onChange={(e) => setExpectedVacancyDays(Math.max(0, Number(e.target.value)))}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm tabular-nums"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Re-Letting / Marketing Cost ($)</label>
            <input
              type="number"
              value={relettingCost}
              onChange={(e) => setRelettingCost(Math.max(0, Number(e.target.value)))}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm tabular-nums"
            />
          </div>
        </div>

        <div className="lg:col-span-7 bg-[#0f2747] text-white rounded-2xl p-6 shadow-md space-y-5">
          <div className="flex flex-wrap justify-between items-center gap-2 border-b border-white/10 pb-3">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-[#c8a24a]">
                {statute.mitigationDuty} DUTY TO MITIGATE
              </div>
              <div className="text-lg font-extrabold">{statute.name} Lease-Break Settlement Model</div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              {results.savingsVsBuyout > 0 ? 'MITIGATION BEATS BUYOUT' : 'BUYOUT IS CHEAPER'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#09192e] rounded-xl p-4 border border-white/10">
              <div className="text-xs text-slate-400">Unmitigated Gross</div>
              <div className="text-2xl font-black tabular-nums mt-1">{fmt(results.grossRemainingRent)}</div>
            </div>
            <div className="bg-[#09192e] rounded-xl p-4 border border-white/10">
              <div className="text-xs text-slate-400">Mitigated Liability</div>
              <div className="text-2xl font-black text-[#c8a24a] tabular-nums mt-1">{fmt(results.totalMitigatedCost)}</div>
            </div>
            <div className="bg-emerald-950/60 rounded-xl p-4 border border-emerald-500/40">
              <div className="text-xs text-emerald-300 font-semibold">Savings vs. Buyout</div>
              <div className="text-2xl font-black text-emerald-400 tabular-nums mt-1">
                {results.savingsVsBuyout >= 0 ? `+${fmt(results.savingsVsBuyout)}` : fmt(results.savingsVsBuyout)}
              </div>
            </div>
          </div>

          <div className="bg-[#09192e]/70 rounded-xl p-4 border border-white/10 text-xs flex justify-between">
            <span className="text-slate-400">Savings vs. Full Lease Term:</span>
            <strong className="text-emerald-400 tabular-nums">{fmt(results.savingsVsGross)}</strong>
          </div>
        </div>
      </div>

      <StatutoryBriefBox
        title={`${statute.name} Lease Break Mitigation Brief`}
        jurisdiction={statute.name}
        citation={`${statute.statuteCitation} (${statute.mitigationDuty} Mitigation)`}
        metrics={[
          { label: 'Gross Remaining', value: fmt(results.grossRemainingRent) },
          { label: 'Contract Buyout', value: fmt(buyoutFee) },
          { label: 'Mitigated Cost', value: fmt(results.totalMitigatedCost), highlight: true },
          { label: 'Net Savings vs Gross', value: fmt(results.savingsVsGross) }
        ]}
        verdict={
          results.savingsVsBuyout > 0
            ? `Enforcing landlord's ${statute.mitigationDuty.toLowerCase()} duty to mitigate saves ${fmt(results.savingsVsBuyout)} compared to paying the ${fmt(buyoutFee)} buyout.`
            : `Paying the ${fmt(buyoutFee)} buyout caps your risk below projected vacancy (${fmt(results.totalMitigatedCost)}).`
        }
        noticeText={noticeText}
      />

      <ToolPaywallDossier
        dynamicAmount={fmt(results.savingsVsGross)}
        docType={`${statute.code} Lease-Break Mitigation Packet`}
        storageKey="lease_break"
      />
    </div>
  );
}
