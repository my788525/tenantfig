'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const NAV_LINKS = [
  { href: '/calculators/security-deposit-penalty/', label: 'Deposit Penalty' },
  { href: '/calculators/wear-and-tear-deduction/', label: 'Wear & Tear' },
  { href: '/calculators/rent-increase-cap/', label: 'Rent Caps' },
  { href: '/states/', label: '51 States' },
  { href: '/cities/', label: '25 Cities' },
  { href: '/cases/', label: 'Cases' },
  { href: '/guides/', label: 'Guides' }
];

export default function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#0f2747] text-white border-b border-[#c8a24a]/30 shadow-md no-print">
      <div className="container-page flex items-center justify-between h-16">
        <Link href="/" className="flex items-center space-x-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-[#09192e] border border-[#c8a24a]/70 flex items-center justify-center font-black text-sm text-white group-hover:border-[#c8a24a] transition">
            TF
          </div>
          <div>
            <span className="font-extrabold tracking-tight text-lg text-white">TenantFig</span>
            <span className="hidden sm:inline-block ml-2 text-[10px] font-mono uppercase tracking-widest text-[#c8a24a] border border-[#c8a24a]/40 px-1.5 py-0.5 rounded">
              2026 STATUTORY
            </span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center space-x-1">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-3 py-2 rounded-lg text-xs font-semibold text-slate-200 hover:text-white hover:bg-white/10 transition"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/calculators/small-claims-roi/"
            className="ml-2 px-3.5 py-2 rounded-lg text-xs font-bold bg-[#059669] hover:bg-emerald-500 text-white transition shadow-sm"
          >
            Small Claims ROI
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label="Toggle Menu"
          className="lg:hidden px-3 py-1.5 rounded-lg border border-white/20 text-xs font-semibold text-slate-200 hover:bg-white/10"
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-[#09192e] border-t border-white/10 px-4 py-3 space-y-1">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:bg-white/10"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/calculators/lease-break-mitigation/"
            onClick={() => setOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:bg-white/10"
          >
            Lease Break Mitigation
          </Link>
          <Link
            href="/calculators/small-claims-roi/"
            onClick={() => setOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-bold text-emerald-400 hover:bg-white/10"
          >
            Small Claims ROI
          </Link>
        </div>
      )}
    </header>
  );
}
