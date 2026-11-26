'use client';

import React, { useState, useMemo } from 'react';
import StatutoryBriefBox from '@/components/StatutoryBriefBox';
import ToolPaywallDossier from '@/components/ToolPaywallDossier';

type AssetKey = 'carpet_5' | 'carpet_7' | 'paint_2' | 'paint_3' | 'blinds' | 'appliances';

const ASSET_SCHEDULES: Record<AssetKey, { label: string; usefulLifeMonths: number; basis: string }> = {
  carpet_5: { label: 'Standard Apartment Carpet (5-Yr HUD)', usefulLifeMonths: 60, basis: 'HUD Handbook 4350.3 / 5-Year Useful Life' },
  carpet_7: { label: 'Upgraded / Berber Carpet (7-Yr IRS)', usefulLifeMonths: 84, basis: '7-Year Residential Carpet Depreciation' },
  paint_2: { label: 'Interior Wall Paint (2-Yr Turnover)', usefulLifeMonths: 24, basis: 'Standard 24-Month Paint Useful Life' },
  paint_3: { label: 'Interior Wall Paint (3-Yr Benchmark)', usefulLifeMonths: 36, basis: '36-Month Residential Paint Schedule' },
  blinds: { label: 'Window Blinds & Shades (4-Yr)', usefulLifeMonths: 48, basis: '48-Month Fixture Useful Life' },
  appliances: { label: 'Major Appliances (8-Yr)', usefulLifeMonths: 96, basis: '96-Month Appliance Useful Life' }
};

export default function WearAndTearCalc() {
  const [assetKey, setAssetKey] = useState<AssetKey>('carpet_5');
  const [billedCost, setBilledCost] = useState(1650);
  const [itemAgeMonths, setItemAgeMonths] = useState(72);
  const [occupancyMonths, setOccupancyMonths] = useState(38);
  const [isNormalWear, setIsNormalWear] = useState(true);

  const schedule = ASSET_SCHEDULES[assetKey];

  const applyPreset = (p: 'carpet' | 'paint' | 'pet') => {
    if (p === 'carpet') {
      setAssetKey('carpet_5');
      setBilledCost(1650);
      setItemAgeMonths(72);
      setOccupancyMonths(38);
      setIsNormalWear(true);
    } else if (p === 'paint') {
      setAssetKey('paint_3');
      setBilledCost(950);
      setItemAgeMonths(38);
      setOccupancyMonths(38);
      setIsNormalWear(true);
    } else {
      setAssetKey('carpet_5');
      setBilledCost(2200);
      setItemAgeMonths(24);
      setOccupancyMonths(24);
      setIsNormalWear(false);
    }
  };

  const results = useMemo(() => {
    const remainingMonths = Math.max(0, schedule.usefulLifeMonths - itemAgeMonths);
    const remainingRatio = remainingMonths / schedule.usefulLifeMonths;
    const depreciatedCap = Math.round(billedCost * remainingRatio);
    const legalAllowed = isNormalWear ? 0 : depreciatedCap;
    const illegalOvercharge = Math.max(0, billedCost - legalAllowed);

    return {
      remainingMonths,
      remainingPct: Math.round(remainingRatio * 100),
      depreciatedCap,
      legalAllowed,
      illegalOvercharge
    };
  }, [schedule, billedCost, itemAgeMonths, isNormalWear]);

  const fmt = (n: number) => `$${n.toLocaleString('en-US')}`;

  const noticeText = `LINE-ITEM DEPRECIATION REBUTTAL (NORMAL WEAR & TEAR)
Asset Audited: ${schedule.label}
Standard Basis: ${schedule.basis}
Landlord Billed Replacement Cost: ${fmt(billedCost)}
Item Age at Move-Out: ${itemAgeMonths} months (Tenant Occupancy: ${occupancyMonths} months)

Under established landlord-tenant depreciation principles, a tenant cannot be billed for brand-new replacement value or normal wear and tear.
- Total Useful Life: ${schedule.usefulLifeMonths} months
- Remaining Useful Life: ${results.remainingMonths} months (${results.remainingPct}%)
- Maximum Allowable Charge: ${fmt(results.legalAllowed)} (${isNormalWear ? 'Normal wear & tear is $0' : 'Prorated remaining life'})
- Unlawful Overcharge to Refund: ${fmt(results.illegalOvercharge)}

Please remove the ${fmt(results.illegalOvercharge)} overcharge and refund the balance immediately.`;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-1">Executive Presets:</span>
        <button
          type="button"
          onClick={() => applyPreset('carpet')}
          className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:border-[#0f2747] text-xs font-semibold text-[#0f2747] cursor-pointer"
        >
          6-Yr Carpet ($1,650)
        </button>
        <button
          type="button"
          onClick={() => applyPreset('paint')}
          className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:border-[#0f2747] text-xs font-semibold text-[#0f2747] cursor-pointer"
        >
          38-Mo Repaint ($950)
        </button>
        <button
          type="button"
          onClick={() => applyPreset('pet')}
          className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:border-[#0f2747] text-xs font-semibold text-[#0f2747] cursor-pointer"
        >
          2-Yr Carpet Damage ($2,200)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="text-base font-extrabold text-[#0f2747] border-b border-slate-100 pb-3">
            Depreciation Audit Inputs
          </h2>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Asset Category &amp; Useful Life</label>
            <select
              value={assetKey}
              onChange={(e) => setAssetKey(e.target.value as AssetKey)}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm bg-white"
            >
              {Object.entries(ASSET_SCHEDULES).map(([k, v]) => (
                <option key={k} value={k}>
                  {v.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Replacement Cost Billed by Landlord ($)</label>
            <input
              type="number"
              value={billedCost}
              onChange={(e) => setBilledCost(Math.max(0, Number(e.target.value)))}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm tabular-nums"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Item Age (Months)</label>
              <input
                type="number"
                value={itemAgeMonths}
                onChange={(e) => setItemAgeMonths(Math.max(0, Number(e.target.value)))}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm tabular-nums"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Your Occupancy (Mo)</label>
              <input
                type="number"
                value={occupancyMonths}
                onChange={(e) => setOccupancyMonths(Math.max(0, Number(e.target.value)))}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm tabular-nums"
              />
            </div>
          </div>

          <label className="flex items-center space-x-2 text-xs font-semibold text-slate-700 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={isNormalWear}
              onChange={(e) => setIsNormalWear(e.target.checked)}
              className="rounded border-slate-300"
            />
            <span>Condition reflects Normal Wear &amp; Tear ($0 legal liability)</span>
          </label>
        </div>

        <div className="lg:col-span-7 bg-[#0f2747] text-white rounded-2xl p-6 shadow-md space-y-5">
          <div className="border-b border-white/10 pb-3">
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#c8a24a]">
              {schedule.basis}
            </div>
            <div className="text-lg font-extrabold">Prorated Depreciation Audit</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#09192e] rounded-xl p-4 border border-white/10">
              <div className="text-xs text-slate-400">Landlord Billed</div>
              <div className="text-2xl font-black tabular-nums mt-1">{fmt(billedCost)}</div>
            </div>
            <div className="bg-[#09192e] rounded-xl p-4 border border-white/10">
              <div className="text-xs text-slate-400">Max Legal Charge</div>
              <div className="text-2xl font-black text-[#c8a24a] tabular-nums mt-1">{fmt(results.legalAllowed)}</div>
            </div>
            <div className="bg-emerald-950/60 rounded-xl p-4 border border-emerald-500/40">
              <div className="text-xs text-emerald-300 font-semibold">Illegal Overcharge</div>
              <div className="text-2xl font-black text-emerald-400 tabular-nums mt-1">{fmt(results.illegalOvercharge)}</div>
            </div>
          </div>

          <div className="bg-[#09192e]/70 rounded-xl p-4 border border-white/10 text-xs flex justify-between">
            <span className="text-slate-400">Remaining Useful Life:</span>
            <strong className="text-white tabular-nums">
              {results.remainingMonths} / {schedule.usefulLifeMonths} months ({results.remainingPct}%)
            </strong>
          </div>
        </div>
      </div>

      <StatutoryBriefBox
        title="Wear & Tear Depreciation Audit Brief"
        jurisdiction="US Federal / HUD 4350.3 Benchmark"
        citation={schedule.basis}
        metrics={[
          { label: 'Billed Replacement', value: fmt(billedCost) },
          { label: 'Remaining Life', value: `${results.remainingPct}%` },
          { label: 'Legal Allowed', value: fmt(results.legalAllowed) },
          { label: 'Illegal Overcharge', value: fmt(results.illegalOvercharge), highlight: true }
        ]}
        verdict={
          results.illegalOvercharge > 0
            ? `Landlord overcharged ${fmt(results.illegalOvercharge)} above depreciated useful life.`
            : 'Billed amount is within depreciated useful life.'
        }
        noticeText={noticeText}
      />

      <ToolPaywallDossier
        dynamicAmount={fmt(results.illegalOvercharge)}
        docType="Wear & Tear Depreciation Rebuttal Kit"
        storageKey="wear_and_tear"
      />
    </div>
  );
}
