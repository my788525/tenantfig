'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'tenantfig_cookie_consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        setVisible(true);
      }
    } catch {
      // Ignore storage access errors in restricted browsers
    }
  }, []);

  const handleChoice = (choice: 'accepted' | 'essential') => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ status: choice, updatedAt: new Date().toISOString() })
      );
    } catch {
      // Ignore storage errors
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie and Privacy Consent"
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-4xl bg-[#09192e] text-slate-200 border border-[#c8a24a]/40 rounded-2xl p-4 sm:p-5 shadow-2xl no-print"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1 text-xs leading-relaxed">
          <div className="font-bold text-white uppercase tracking-wider text-[11px]">
            Privacy &amp; Cookie Preferences (GDPR / CCPA)
          </div>
          <p className="text-slate-300">
            TenantFig calculators run 100% client-side in your browser. We use essential local storage and privacy-respecting analytics/advertising cookies (including Google AdSense) to keep tools free. Review our{' '}
            <Link href="/privacy/" className="text-[#e2be68] underline font-semibold hover:text-white">
              Privacy Policy
            </Link>
            .
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => handleChoice('essential')}
            className="px-3.5 py-2 rounded-xl border border-slate-600 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold cursor-pointer transition"
          >
            Essential Only
          </button>
          <button
            type="button"
            onClick={() => handleChoice('accepted')}
            className="px-4 py-2 rounded-xl bg-[#c8a24a] hover:bg-[#e2be68] text-[#09192e] text-xs font-extrabold cursor-pointer transition"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
