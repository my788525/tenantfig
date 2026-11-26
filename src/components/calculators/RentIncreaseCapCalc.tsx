'use client';

import React, { useState, useMemo } from 'react';
import { CITY_RENT_CAPS_2026 } from '@/data/city_rent_caps_2026';
import StatutoryBriefBox from '@/components/StatutoryBriefBox';
import ToolPaywallDossier from '@/components/ToolPaywallDossier';

export default function RentIncreaseCapCalc() {
  const [citySlug, setCitySlug] = useState('new-york-city');
  const [currentRent, setCurrentRent] = useState(3300);
  const [proposedRent, setProposedRent] = useState(3680);
  const [localCpi, setLocalCpi] = useState(3.45);
  const [noticeDaysGiven, setNoticeDaysGiven] = useState(60);
  const [isCoveredUnit, setIsCoveredUnit] = useState(true);

  const city = useMemo(
    () => CITY_RENT_CAPS_2026.find((c) => c.slug === citySlug) || CITY_RENT_CAPS_2026[0],
    [citySlug]
  );

  const applyPreset = (p: 'nyc' | 'la' | 'seattle') => {
    if (p === 'nyc') {
      setCitySlug('new-york-city');
      setCurrentRent(3300);
      setProposedRent(3680);
      setLocalCpi(3.45);
      setNoticeDaysGiven(60);
      setIsCoveredUnit(true);
    } else if (p === 'la') {
      setCitySlug('los-angeles');
      setCurrentRent(3200);
      setProposedRent(3520);
      setLocalCpi(3.2);
      setNoticeDaysGiven(30);
      setIsCoveredUnit(true);
    } else {
      setCitySlug('seattle');
      setCurrentRent(2950);
      setProposedRent(3300);
      setLocalCpi(3.1);
      setNoticeDaysGiven(60);
      setIsCoveredUnit(true);
    }
  };

  const results = useMemo(() => {
    const proposedIncreaseUsd = Math.max(0, proposedRent - currentRent);
    const proposedPct = currentRent > 0 ? (proposedIncreaseUsd / currentRent) * 100 : 0;

    let maxAllowedPct: number | null = null;
    if (isCoveredUnit && city.hasLocalRentCap && city.effectiveMaxCapPct !== null) {
      if (city.slug === 'new-york-city') {
        maxAllowedPct = Math.min(10, localCpi + 5);
      } else if (city.slug === 'san-diego') {
        maxAllowedPct = Math.min(10, 5 + localCpi);
      } else if (city.slug === 'portland' || city.slug === 'seattle') {
        maxAllowedPct = Math.min(10, 7 + localCpi);
      } else {
        maxAllowedPct = city.effectiveMaxCapPct;
      }
    }

    const maxLegalRent =
      maxAllowedPct !== null ? Math.round(currentRent * (1 + maxAllowedPct / 100)) : proposedRent;
    const monthlyExcess = Math.max(0, proposedRent - maxLegalRent);
    const annualOvercharge = monthlyExcess * 12;
    const noticeDefective = noticeDaysGiven < city.noticeDaysRequired;

    return {
      proposedIncreaseUsd,
      proposedPct: proposedPct.toFixed(2),
      maxAllowedPct,
      maxLegalRent,
      monthlyExcess,
      annualOvercharge,
      noticeDefective
    };
  }, [city, currentRent, proposedRent, localCpi, noticeDaysGiven, isCoveredUnit]);

  const fmt = (n: number) => `$${n.toLocaleString('en-US')}`;

  const noticeText = `STATUTORY OBJECTION TO PROPOSED RENT INCREASE
Jurisdiction: ${city.city}, ${city.stateCode}
Governing Authority: ${city.ordinanceName}
Current Monthly Rent: ${fmt(currentRent)}
Proposed Monthly Rent: ${fmt(proposedRent)} (+${results.proposedPct}%)

Please take notice that the proposed rent increase is non-compliant for the following statutory reasons:
${results.monthlyExcess > 0 ? `1. Exceeds Statutory Cap: Under ${city.ordinanceName}, the maximum allowable increase is ${results.maxAllowedPct?.toFixed(2)}% (${fmt(results.maxLegalRent)}/mo), creating an unlawful excess of ${fmt(results.monthlyExcess)}/mo (${fmt(results.annualOvercharge)}/yr).\n` : ''}${results.noticeDefective ? `2. Defective Notice Period: ${city.city} requires at least ${city.noticeDaysRequired} days written notice; only ${noticeDaysGiven} days were provided.\n` : ''}
Please issue a compliant renewal offer at or below ${fmt(results.maxLegalRent)}/mo with the statutory notice period.`;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-1">Executive Presets:</span>
        <button
          type="button"
          onClick={() => applyPreset('nyc')}
          className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:border-[#0f2747] text-xs font-semibold text-[#0f2747] cursor-pointer"
        >
          Brooklyn NY (11.5% Good Cause)
        </button>
        <button
          type="button"
          onClick={() => applyPreset('la')}
          className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:border-[#0f2747] text-xs font-semibold text-[#0f2747] cursor-pointer"
        >
          Los Angeles CA (10% vs LARSO)
        </button>
        <button
          type="button"
          onClick={() => applyPreset('seattle')}
          className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:border-[#0f2747] text-xs font-semibold text-[#0f2747] cursor-pointer"
        >
          Seattle WA (60d vs 180d Notice)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="text-base font-extrabold text-[#0f2747] border-b border-slate-100 pb-3">
            Rent Increase Audit Inputs
          </h2>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Metro City (25 Jurisdictions)</label>
            <select
              value={citySlug}
              onChange={(e) => setCitySlug(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm bg-white"
            >
              {CITY_RENT_CAPS_2026.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.city}, {c.stateCode} {c.hasLocalRentCap ? '(Capped)' : '(Notice Only)'}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Current Rent ($)</label>
              <input
                type="number"
                value={currentRent}
                onChange={(e) => setCurrentRent(Math.max(0, Number(e.target.value)))}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm tabular-nums"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Proposed Rent ($)</label>
              <input
                type="number"
                value={proposedRent}
                onChange={(e) => setProposedRent(Math.max(0, Number(e.target.value)))}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm tabular-nums"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Local CPI (%)</label>
              <input
                type="number"
                step="0.1"
                value={localCpi}
                onChange={(e) => setLocalCpi(Math.max(0, Number(e.target.value)))}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm tabular-nums"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Notice Given (Days)</label>
              <input
                type="number"
                value={noticeDaysGiven}
                onChange={(e) => setNoticeDaysGiven(Math.max(0, Number(e.target.value)))}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm tabular-nums"
              />
            </div>
          </div>

          <label className="flex items-center space-x-2 text-xs font-semibold text-slate-700 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={isCoveredUnit}
              onChange={(e) => setIsCoveredUnit(e.target.checked)}
              className="rounded border-slate-300"
            />
            <span>Unit covered by local / state cap (not new-construction exempt)</span>
          </label>
        </div>

        <div className="lg:col-span-7 bg-[#0f2747] text-white rounded-2xl p-6 shadow-md space-y-5">
          <div className="flex flex-wrap justify-between items-center gap-2 border-b border-white/10 pb-3">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-[#c8a24a]">
                {city.ordinanceName}
              </div>
              <div className="text-lg font-extrabold">{city.city}, {city.stateCode} Compliance Check</div>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                results.monthlyExcess > 0 || results.noticeDefective
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-slate-700 text-slate-200'
              }`}
            >
              {results.monthlyExcess > 0 || results.noticeDefective ? 'VIOLATION DETECTED' : 'COMPLIANT HIKE'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#09192e] rounded-xl p-4 border border-white/10">
              <div className="text-xs text-slate-400">Proposed Hike</div>
              <div className="text-2xl font-black tabular-nums mt-1">+{results.proposedPct}%</div>
            </div>
            <div className="bg-[#09192e] rounded-xl p-4 border border-white/10">
              <div className="text-xs text-slate-400">Max Legal Cap</div>
              <div className="text-2xl font-black text-[#c8a24a] tabular-nums mt-1">
                {results.maxAllowedPct !== null ? `${results.maxAllowedPct.toFixed(2)}%` : 'No Cap'}
              </div>
            </div>
            <div className="bg-emerald-950/60 rounded-xl p-4 border border-emerald-500/40">
              <div className="text-xs text-emerald-300 font-semibold">Annual Savings</div>
              <div className="text-2xl font-black text-emerald-400 tabular-nums mt-1">
                {fmt(results.annualOvercharge)}
              </div>
            </div>
          </div>

          <div className="bg-[#09192e]/70 rounded-xl p-4 border border-white/10 text-xs flex flex-wrap justify-between gap-2">
            <span>
              Notice Requirement:{' '}
              <strong className={results.noticeDefective ? 'text-amber-300' : 'text-emerald-400'}>
                {noticeDaysGiven}d given / {city.noticeDaysRequired}d required
              </strong>
            </span>
            <span>Just Cause Eviction: <strong>{city.justCauseEviction ? 'Active' : 'No'}</strong></span>
          </div>
        </div>
      </div>

      <StatutoryBriefBox
        title={`${city.city} Rent Increase Statutory Audit`}
        jurisdiction={`${city.city}, ${city.stateCode}`}
        citation={city.ordinanceName}
        metrics={[
          { label: 'Proposed Rent', value: fmt(proposedRent) },
          { label: 'Max Legal Rent', value: fmt(results.maxLegalRent) },
          { label: 'Annual Overcharge', value: fmt(results.annualOvercharge), highlight: true },
          { label: 'Required Notice', value: `${city.noticeDaysRequired} days` }
        ]}
        verdict={`${city.annualCapFormula}. ${city.exemptionsSummary}`}
        noticeText={noticeText}
      />

      <ToolPaywallDossier
        dynamicAmount={fmt(results.annualOvercharge)}
        docType={`${city.city} Rent Increase Objection Packet`}
        storageKey="rent_increase_cap"
      />
    </div>
  );
}
