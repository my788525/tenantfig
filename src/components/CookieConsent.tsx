'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'tenantfig_cookie_consent';

const EU_UK_CH_COUNTRIES = new Set([
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR',
  'HU', 'IS', 'IE', 'IT', 'LV', 'LI', 'LT', 'LU', 'MT', 'NL', 'NO', 'PL',
  'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'CH', 'GB', 'UK'
]);

const US_PRIVACY_STATES = new Set([
  'CA', 'VA', 'CO', 'CT', 'UT', 'TX', 'OR', 'MT', 'FL', 'IA',
  'IN', 'TN', 'DE', 'NE', 'NH', 'NJ', 'MN', 'MD', 'KY', 'RI'
]);

function shouldShowForGeo(country: string, regionCode: string): boolean {
  if (EU_UK_CH_COUNTRIES.has(country)) return true;
  return country === 'US' && US_PRIVACY_STATES.has(regionCode);
}

async function fetchWithTimeout(url: string, timeoutMs = 2000): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { cache: 'no-store', signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let cancelled = false;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return;
    } catch {
      return;
    }

    (async () => {
      try {
        const res = await fetchWithTimeout('/api/geo', 2000);
        if (res.ok) {
          const data = (await res.json()) as { country?: string; regionCode?: string };
          const country = (data.country ?? '').trim().toUpperCase();
          const regionCode = (data.regionCode ?? '').trim().toUpperCase();
          if (!cancelled && shouldShowForGeo(country, regionCode)) {
            setVisible(true);
          }
          return;
        }
      } catch {
        // Fall through to /cdn-cgi/trace fallback
      }

      try {
        const traceRes = await fetchWithTimeout('/cdn-cgi/trace', 2000);
        if (traceRes.ok) {
          const text = await traceRes.text();
          const match = text.match(/^loc=([A-Z]{2})$/m);
          const country = match ? match[1].toUpperCase() : '';
          if (!cancelled && EU_UK_CH_COUNTRIES.has(country)) {
            setVisible(true);
          }
        }
      } catch {
        // Geo detection failed; keep banner hidden
      }
    })();

    return () => {
      cancelled = true;
    };
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
