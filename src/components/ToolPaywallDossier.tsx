'use client';

import React, { useState, useEffect } from 'react';

export const MATRIX_ALL_ACCESS_PID = 'pdt_0NryTUNyfdta6f959Z51a';
export const TENANTFIG_PACK_PID = process.env.NEXT_PUBLIC_TENANTFIG_PACK_PID || 'pdt_0Nsmkl1NJxiaPAsPE2UhB';

interface ToolPaywallDossierProps {
  badge?: string;
  title?: string;
  desc?: string;
  price?: string;
  pid?: string;
  site?: string;
  features?: string[];
  dynamicAmount?: string;
  docType?: string;
  storageKey?: string;
  sampleLines?: { label: string; value: string }[];
}

export default function ToolPaywallDossier({
  badge = 'VIP STATUTORY DEFENSE KIT',
  title = 'Export Certified Statutory Demand & Small Claims Dossier',
  desc = 'Unlock the editable .docx Demand Letter Suite, 5-Tab Small Claims & Depreciation Excel Workstation, and offline 51-state statutory reference.',
  price = '$24.99',
  pid = TENANTFIG_PACK_PID,
  site = 'tenantfig.com',
  features = [
    'Editable .DOCX Demand & Rebuttal Templates',
    '5-Tab .XLSX Depreciation & ROI Workstation',
    '51-State Statutory Citation Matrix',
    'Instant In-Browser Certified PDF Brief'
  ],
  dynamicAmount,
  docType = 'Statutory Demand & Audit Brief',
  storageKey,
  sampleLines
}: ToolPaywallDossierProps) {
  const [showQr, setShowQr] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [hasActivePass, setHasActivePass] = useState(false);
  const [showPassModal, setShowPassModal] = useState(false);
  const [inputKey, setInputKey] = useState('');
  const [passError, setPassError] = useState('');
  const [verifyingPass, setVerifyingPass] = useState(false);

  const checkoutUrl = `https://checkout.dodopayments.com/buy/${encodeURIComponent(pid)}`;
  const allAccessUrl = `https://checkout.dodopayments.com/buy/${encodeURIComponent(MATRIX_ALL_ACCESS_PID)}`;
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&margin=4&data=${encodeURIComponent(checkoutUrl)}`;

  const handleCheckout = (targetPid: string, targetUrl: string) => {
    try {
      fetch('https://send.lianu.com/api/vip/track-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ site, product_id: targetPid, source: 'dossier_v2' })
      }).catch(() => {});
    } catch {}
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('status') === 'success') {
        setPaymentSuccess(true);
      }
      try {
        const savedKey = localStorage.getItem('matrix_all_access_key');
        if (savedKey && savedKey.startsWith('PASS-')) {
          setHasActivePass(true);
        }
      } catch {}
    }
  }, [storageKey]);

  const handleVerifyPass = async () => {
    const clean = inputKey.trim().toUpperCase();
    if (!clean) return;
    setVerifyingPass(true);
    setPassError('');
    try {
      const res = await fetch('https://send.lianu.com/api/vip/verify-pass', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: clean })
      });
      const data = await res.json();
      if (res.ok && data.valid) {
        localStorage.setItem('matrix_all_access_key', clean);
        setHasActivePass(true);
        setShowPassModal(false);
      } else {
        setPassError(data.message || 'Invalid or expired key. Format: PASS-XXXX-XXXX-XXXX-XXXX');
      }
    } catch {
      setPassError('Network error checking key. Please try again.');
    } finally {
      setVerifyingPass(false);
    }
  };

  return (
    <div
      id="matrix-offer"
      className="my-10 bg-[#0f2747] border border-[#c8a24a]/40 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden no-print scroll-mt-20"
      data-matrix-offer="1"
      data-offer-slot="inline"
      data-offer-id={pid}
    >
      {paymentSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="bg-[#09192e] border-2 border-[#059669] rounded-2xl p-6 max-w-md w-full text-center space-y-4">
            <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center text-2xl mx-auto">
              ✓
            </div>
            <h4 className="text-xl font-bold text-white">Statutory Kit Unlocked</h4>
            <p className="text-xs text-slate-300">
              Print your certified Statutory Brief now or download the companion templates.
            </p>
            <button
              type="button"
              onClick={() => window.print()}
              className="w-full bg-[#059669] hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl text-sm cursor-pointer"
            >
              Print / Save Certified PDF Brief
            </button>
            <button
              type="button"
              onClick={() => setPaymentSuccess(false)}
              className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
            >
              Return to Workbench
            </button>
          </div>
        </div>
      )}

      {showPassModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="bg-[#09192e] border border-slate-700 rounded-2xl p-6 max-w-md w-full space-y-4 text-left">
            <h4 className="text-lg font-bold text-white">Unlock with Matrix All-Access Pass</h4>
            <p className="text-xs text-slate-300">
              Enter your license key (<code className="text-[#c8a24a]">PASS-XXXX-XXXX-XXXX-XXXX</code>).
            </p>
            <input
              type="text"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value.toUpperCase())}
              placeholder="PASS-ABCD-EFGH-JKMN-PQRT"
              className="w-full font-mono bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white"
            />
            {passError && <div className="text-xs text-rose-400">{passError}</div>}
            <div className="flex gap-2">
              <button
                type="button"
                disabled={verifyingPass}
                onClick={handleVerifyPass}
                className="flex-1 bg-[#c8a24a] hover:bg-[#e2be68] text-[#09192e] font-bold py-2.5 rounded-xl text-xs cursor-pointer"
              >
                {verifyingPass ? 'Verifying...' : 'Activate Pass'}
              </button>
              <button
                type="button"
                onClick={() => setShowPassModal(false)}
                className="px-4 py-2.5 bg-slate-800 text-slate-300 rounded-xl text-xs cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-5">
          <div className="bg-[#09192e] border border-slate-700 rounded-xl p-5 space-y-3">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2.5">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#c8a24a]">2026 STATUTORY PACK</div>
                <div className="text-xs font-bold text-white">{docType}</div>
              </div>
              <span className="text-xs font-mono text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded">
                VERIFIED
              </span>
            </div>

            {dynamicAmount && (
              <div className="bg-[#c8a24a]/15 border border-[#c8a24a]/40 rounded-lg p-2.5 flex justify-between items-center text-xs">
                <span className="text-[#e2be68] font-semibold">Audited Exposure:</span>
                <span className="text-white font-black tabular-nums">{dynamicAmount}</span>
              </div>
            )}

            <div className="space-y-1.5 text-[11px] font-mono text-slate-300">
              {sampleLines?.map((s, idx) => (
                <div key={idx} className="flex justify-between">
                  <span className="text-slate-400">{s.label}:</span>
                  <span className="text-white font-semibold tabular-nums">{s.value}</span>
                </div>
              ))}
              <div className="flex justify-between pt-1 border-t border-slate-800">
                <span className="text-slate-400">Demand_Letter_Suite.docx</span>
                <span className="text-emerald-400">Editable</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Deposit_Depreciation_Audit.xlsx</span>
                <span className="text-[#c8a24a]">Formulas</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#c8a24a]/20 text-[#e2be68] border border-[#c8a24a]/40">
              {badge}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-600/40">
              100% Client-Side Privacy
            </span>
          </div>

          <h3 className="text-2xl font-extrabold text-white tracking-tight">
            {dynamicAmount ? `Download ${dynamicAmount} Recovery & Demand Suite` : title}
          </h3>
          <p className="text-sm text-slate-300">{desc}</p>

          {/* Free vs VIP Contrast Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="bg-[#09192e]/80 border border-emerald-500/30 rounded-xl p-3 space-y-1">
              <div className="font-bold text-emerald-400 uppercase tracking-wider text-[10px]">
                ✓ Already Included Free
              </div>
              <p className="text-slate-300 leading-relaxed">
                Printable 《Statutory Brief》 (PDF), 3-line statutory summary, and plain-text notice.
              </p>
            </div>
            <div className="bg-[#c8a24a]/10 border border-[#c8a24a]/40 rounded-xl p-3 space-y-1">
              <div className="font-bold text-[#e2be68] uppercase tracking-wider text-[10px]">
                ★ VIP Turnkey Kit ({price})
              </div>
              <p className="text-slate-200 leading-relaxed">
                Court-ready <strong className="text-white">.DOCX Certified Mail Demand Letter</strong> +{' '}
                <strong className="text-white">.XLSX Depreciation &amp; Evidence Ledger</strong>.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200">
            {features.map((f, i) => (
              <div key={i} className="flex items-center space-x-2">
                <span className="text-[#059669] font-bold">✓</span>
                <span>{f}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            {hasActivePass ? (
              <button
                type="button"
                onClick={() => window.print()}
                className="flex-1 bg-[#059669] hover:bg-emerald-500 text-white font-bold px-5 py-3 rounded-xl text-sm cursor-pointer"
              >
                Pass Active: Print Certified Brief
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleCheckout(pid, checkoutUrl)}
                data-offer-action="buy"
                data-offer-id={pid}
                className="flex-1 bg-[#c8a24a] hover:bg-[#e2be68] text-[#09192e] font-extrabold px-5 py-3 rounded-xl text-sm cursor-pointer transition"
              >
                Get Statutory Defense Kit ({price})
              </button>
            )}

            <button
              type="button"
              onClick={() => handleCheckout(MATRIX_ALL_ACCESS_PID, allAccessUrl)}
              data-offer-action="buy"
              data-offer-id={MATRIX_ALL_ACCESS_PID}
              className="px-4 py-3 rounded-xl bg-[#09192e] hover:bg-slate-900 text-slate-200 border border-slate-700 text-xs font-semibold cursor-pointer"
            >
              All-Access Matrix Pass
            </button>

            <button
              type="button"
              onClick={() => setShowQr(!showQr)}
              className="px-4 py-3 rounded-xl bg-[#09192e] hover:bg-slate-900 text-slate-200 border border-slate-700 text-xs font-semibold cursor-pointer"
            >
              {showQr ? 'Hide QR' : 'Pay on Phone'}
            </button>
          </div>

          {showQr && (
            <div className="p-4 bg-[#09192e] border border-slate-700 rounded-xl flex items-center gap-4">
              <img src={qrImageUrl} alt="Mobile Checkout QR" className="w-20 h-20 rounded bg-white p-1" />
              <div className="text-xs text-slate-300">
                <div className="font-bold text-white mb-1">Bypass Corporate Firewall</div>
                Scan with your phone camera to check out via Apple Pay / Google Pay in seconds.
              </div>
            </div>
          )}

          <div className="flex flex-wrap justify-between items-center text-[11px] text-slate-400 pt-2 border-t border-white/10">
            <span>30-Day Money-Back Guarantee · Instant Receipt</span>
            <button
              type="button"
              onClick={() => setShowPassModal(true)}
              className="text-[#c8a24a] hover:underline font-semibold cursor-pointer"
            >
              Enter Pass Key
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
