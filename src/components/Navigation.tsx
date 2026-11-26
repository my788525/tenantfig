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

const MOBILE_CALCULATORS = [
  { href: '/calculators/security-deposit-penalty/', label: 'Security Deposit Penalty' },
  { href: '/calculators/wear-and-tear-deduction/', label: 'Wear & Tear Deduction' },
  { href: '/calculators/rent-increase-cap/', label: 'Rent Increase Cap' },
  { href: '/calculators/lease-break-mitigation/', label: 'Lease Break Mitigation' },
  { href: '/calculators/small-claims-roi/', label: 'Small Claims ROI' }
];

const MOBILE_DIRECTORY = [
  { href: '/states/', label: '51 States' },
  { href: '/cities/', label: '25 Cities' },
  { href: '/cases/', label: 'Cases' },
  { href: '/guides/', label: 'Guides' },
  { href: '/statutes/', label: 'Statute Index' },
  { href: '/methodology/', label: 'Methodology' },
  { href: '/changelog/', label: 'Changelog' }
];

export default function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#0f2747] text-white border-b border-[#c8a24a]/30 shadow-md no-print">
      <div className="container-page flex items-center justify-between h-16 px-5 sm:px-6">
        <Link href="/" className="flex items-center space-x-2.5 group min-w-0">
          <div className="w-8 h-8 shrink-0 rounded-lg bg-[#09192e] border border-[#c8a24a]/70 flex items-center justify-center font-black text-sm text-white group-hover:border-[#c8a24a] transition">
            TF
          </div>
          <div className="flex items-center min-w-0">
            <span className="font-extrabold tracking-tight text-lg text-white truncate">TenantFig</span>
            <span className="hidden sm:inline-block ml-2 text-[10px] font-mono uppercase tracking-widest text-[#c8a24a] border border-[#c8a24a]/40 px-1.5 py-0.5 rounded shrink-0">
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
          aria-expanded={open}
          className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-white/20 text-slate-200 hover:text-white hover:bg-white/10 transition shrink-0"
        >
          {open ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-[#09192e] border-t border-white/10 px-5 py-5 space-y-5 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#c8a24a] font-bold px-2 mb-1.5">
              Calculators
            </div>
            <div className="space-y-0.5">
              {MOBILE_CALCULATORS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-3 rounded-xl text-sm font-semibold text-slate-100 hover:bg-white/10 transition"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="border-t border-white/10 pt-4">
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#c8a24a] font-bold px-2 mb-1.5">
              Statutory Index &amp; Governance
            </div>
            <div className="grid grid-cols-2 gap-1">
              {MOBILE_DIRECTORY.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-3 rounded-xl text-sm font-medium text-slate-200 hover:bg-white/10 transition"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="border-t border-white/10 pt-4">
            <Link
              href="/calculators/security-deposit-penalty/"
              onClick={() => setOpen(false)}
              className="block w-full text-center px-4 py-3 rounded-xl text-sm font-extrabold bg-[#c8a24a] hover:bg-[#e2be68] text-[#09192e] transition shadow-md"
            >
              Launch Deposit Penalty Audit →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
