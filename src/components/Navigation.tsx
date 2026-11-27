'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const CALCULATOR_LINKS = [
  {
    href: '/calculators/security-deposit-penalty/',
    label: 'Deposit Penalty',
    desc: '14–60 day clocks & 2x/3x statutory damages'
  },
  {
    href: '/calculators/wear-and-tear-deduction/',
    label: 'Wear & Tear',
    desc: 'HUD 4350.3 carpet & paint depreciation'
  },
  {
    href: '/calculators/rent-increase-cap/',
    label: 'Rent Cap',
    desc: 'CA AB 1482, NYC Good Cause & 25 metro caps'
  },
  {
    href: '/calculators/lease-break-mitigation/',
    label: 'Lease Break',
    desc: 'Landlord mitigation duty & vacancy proration'
  },
  {
    href: '/calculators/small-claims-roi/',
    label: 'Small Claims ROI',
    desc: 'Net recovery modeling & court venue limits'
  },
  {
    href: '/calculators/lease-clause-scanner/',
    label: 'Lease Clause Scanner',
    desc: 'Detect void waivers & illegal lease terms'
  },
  {
    href: '/calculators/deduction-invoice-auditor/',
    label: 'Deduction Invoice Auditor',
    desc: 'Line-by-line receipt & market benchmark audit'
  }
];

const JURISDICTION_LINKS = [
  {
    href: '/states/',
    label: '51 States Index',
    desc: 'All 50 U.S. states + Washington, D.C. statutes'
  },
  {
    href: '/cities/',
    label: '25 Metro Cities',
    desc: 'Municipal rent control & local ordinances'
  },
  {
    href: '/statutes/',
    label: 'Statute Reference Table',
    desc: 'Verified deadlines, multipliers & venue limits'
  }
];

const RESEARCH_LINKS = [
  {
    href: '/cases/',
    label: 'Case Studies',
    desc: 'Real-world statutory recovery breakdowns'
  },
  {
    href: '/guides/',
    label: 'Legal Guides',
    desc: 'Step-by-step tenant defense playbooks'
  },
  {
    href: '/methodology/',
    label: 'Methodology',
    desc: 'Statutory verification & calculation standards'
  },
  {
    href: '/editorial-policy/',
    label: 'Editorial Policy',
    desc: 'Primary source citations & update cadence'
  }
];

const MOBILE_CALCULATORS = [
  { href: '/wizard/', label: '4-Step Action Wizard' },
  { href: '/calculators/security-deposit-penalty/', label: 'Security Deposit Penalty' },
  { href: '/calculators/wear-and-tear-deduction/', label: 'Wear & Tear Deduction' },
  { href: '/calculators/lease-clause-scanner/', label: 'Lease Clause Scanner' },
  { href: '/calculators/deduction-invoice-auditor/', label: 'Deduction & Receipt Auditor' },
  { href: '/calculators/rent-increase-cap/', label: 'Rent Increase Cap' },
  { href: '/calculators/lease-break-mitigation/', label: 'Lease Break Mitigation' },
  { href: '/calculators/small-claims-roi/', label: 'Small Claims ROI' }
];

const MOBILE_DIRECTORY = [
  { href: '/states/', label: '51 States' },
  { href: '/cities/', label: '25 Cities' },
  { href: '/cases/', label: 'Cases' },
  { href: '/pitfalls/', label: 'Pitfalls & Traps' },
  { href: '/guides/', label: 'Guides' },
  { href: '/toolkits/', label: 'VIP Toolkits' },
  { href: '/statutes/', label: 'Statute Index' },
  { href: '/methodology/', label: 'Methodology' },
  { href: '/editorial-policy/', label: 'Editorial Policy' }
];

type DropdownKey = 'calculators' | 'jurisdictions' | 'research' | null;

function TenantFigCrest() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-9 h-9 shrink-0"
      aria-hidden="true"
    >
      <rect width="36" height="36" rx="8" fill="#0f2747" />
      <rect x="0.75" y="0.75" width="34.5" height="34.5" rx="7.25" stroke="#c8a24a" strokeOpacity="0.45" strokeWidth="1.5" />
      {/* Legal Shield Outline */}
      <path
        d="M18 5.5L28 9.2V17.4C28 23.6 23.7 28.5 18 30.6C12.3 28.5 8 23.6 8 17.4V9.2L18 5.5Z"
        fill="#09192e"
        stroke="#c8a24a"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {/* Architectural Pillar inside Shield */}
      <path d="M12.5 12H23.5" stroke="#c8a24a" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M13.5 23.5H22.5" stroke="#c8a24a" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M15.2 12.6V23M18 12.6V23M20.8 12.6V23" stroke="#e2be68" strokeWidth="1.4" strokeLinecap="round" />
      {/* Emerald Accent Check / Key Seal */}
      <circle cx="26.5" cy="25.5" r="5.2" fill="#09192e" stroke="#10b981" strokeWidth="1.4" />
      <path
        d="M24.3 25.5L25.8 27L28.9 23.9"
        stroke="#10b981"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setActiveDropdown(null);
        setMobileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const toggleDropdown = (key: Exclude<DropdownKey, null>) => {
    setActiveDropdown((prev) => (prev === key ? null : key));
  };

  return (
    <header ref={navRef} className="sticky top-0 z-40 bg-[#0f2747] text-white border-b border-[#c8a24a]/30 shadow-md no-print">
      <div className="container-page flex items-center justify-between h-[72px] px-5 sm:px-6 gap-4">
        {/* Bespoke Brand Crest + Full Unclipped Wordmark */}
        <Link href="/" className="flex items-center gap-3 group shrink-0 whitespace-nowrap">
          <TenantFigCrest />
          <div className="flex flex-col leading-none shrink-0">
            <span className="font-extrabold tracking-tight text-lg text-white whitespace-nowrap group-hover:text-[#e2be68] transition">
              TenantFig
            </span>
            <span className="mt-1 text-[10px] font-mono uppercase tracking-[0.14em] text-[#c8a24a] whitespace-nowrap">
              Statutory Defense
            </span>
          </div>
        </Link>

        {/* Clean Airy Single-Row Desktop Navigation (5 Items + 1 CTA) */}
        <nav className="hidden lg:flex items-center gap-6" aria-label="Primary Navigation">
          <Link
            href="/wizard/"
            onClick={() => setActiveDropdown(null)}
            className="text-sm font-semibold text-slate-200 hover:text-white transition whitespace-nowrap"
          >
            Action Wizard
          </Link>

          {/* Calculators Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown('calculators')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              type="button"
              onClick={() => toggleDropdown('calculators')}
              aria-expanded={activeDropdown === 'calculators'}
              className="inline-flex items-center gap-1 py-2 text-sm font-semibold text-slate-200 hover:text-white transition whitespace-nowrap"
            >
              <span>Calculators</span>
              <span className="text-[11px] text-[#c8a24a]" aria-hidden="true">▾</span>
            </button>
            {activeDropdown === 'calculators' && (
              <div className="absolute left-0 top-full pt-1.5 w-80 z-50">
                <div className="bg-[#09192e] border border-[#c8a24a]/35 rounded-xl shadow-2xl p-2 space-y-0.5">
                  {CALCULATOR_LINKS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setActiveDropdown(null)}
                      className="block px-3.5 py-2.5 rounded-lg hover:bg-white/10 transition group"
                    >
                      <div className="text-sm font-semibold text-white group-hover:text-[#e2be68] transition">
                        {item.label}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">{item.desc}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 51 States & Cities Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown('jurisdictions')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              type="button"
              onClick={() => toggleDropdown('jurisdictions')}
              aria-expanded={activeDropdown === 'jurisdictions'}
              className="inline-flex items-center gap-1 py-2 text-sm font-semibold text-slate-200 hover:text-white transition whitespace-nowrap"
            >
              <span>51 States &amp; Cities</span>
              <span className="text-[11px] text-[#c8a24a]" aria-hidden="true">▾</span>
            </button>
            {activeDropdown === 'jurisdictions' && (
              <div className="absolute left-0 top-full pt-1.5 w-72 z-50">
                <div className="bg-[#09192e] border border-[#c8a24a]/35 rounded-xl shadow-2xl p-2 space-y-0.5">
                  {JURISDICTION_LINKS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setActiveDropdown(null)}
                      className="block px-3.5 py-2.5 rounded-lg hover:bg-white/10 transition group"
                    >
                      <div className="text-sm font-semibold text-white group-hover:text-[#e2be68] transition">
                        {item.label}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">{item.desc}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link
            href="/pitfalls/"
            onClick={() => setActiveDropdown(null)}
            className="text-sm font-semibold text-slate-200 hover:text-white transition whitespace-nowrap"
          >
            Pitfalls &amp; Traps
          </Link>

          {/* Research Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown('research')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              type="button"
              onClick={() => toggleDropdown('research')}
              aria-expanded={activeDropdown === 'research'}
              className="inline-flex items-center gap-1 py-2 text-sm font-semibold text-slate-200 hover:text-white transition whitespace-nowrap"
            >
              <span>Research</span>
              <span className="text-[11px] text-[#c8a24a]" aria-hidden="true">▾</span>
            </button>
            {activeDropdown === 'research' && (
              <div className="absolute right-0 top-full pt-1.5 w-72 z-50">
                <div className="bg-[#09192e] border border-[#c8a24a]/35 rounded-xl shadow-2xl p-2 space-y-0.5">
                  {RESEARCH_LINKS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setActiveDropdown(null)}
                      className="block px-3.5 py-2.5 rounded-lg hover:bg-white/10 transition group"
                    >
                      <div className="text-sm font-semibold text-white group-hover:text-[#e2be68] transition">
                        {item.label}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">{item.desc}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link
            href="/toolkits/"
            onClick={() => setActiveDropdown(null)}
            className="text-sm font-semibold text-[#e2be68] hover:text-white transition whitespace-nowrap"
          >
            Toolkits
          </Link>

          <Link
            href="/wizard/"
            onClick={() => setActiveDropdown(null)}
            className="px-4 py-2 rounded-lg text-sm font-bold bg-[#059669] hover:bg-emerald-500 text-white transition shadow-sm whitespace-nowrap shrink-0"
          >
            Start Audit →
          </Link>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle Menu"
          aria-expanded={mobileOpen}
          className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-white/20 text-slate-200 hover:text-white hover:bg-white/10 transition shrink-0"
        >
          {mobileOpen ? (
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

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#09192e] border-t border-white/10 px-5 py-5 space-y-5 max-h-[calc(100vh-4.5rem)] overflow-y-auto">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#c8a24a] font-bold px-2 mb-1.5">
              Calculators
            </div>
            <div className="space-y-0.5">
              {MOBILE_CALCULATORS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
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
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-3 rounded-xl text-sm font-medium text-slate-200 hover:bg-white/10 transition"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="border-t border-white/10 pt-4">
            <Link
              href="/wizard/"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center px-4 py-3 rounded-xl text-sm font-extrabold bg-[#059669] hover:bg-emerald-500 text-white transition shadow-md"
            >
              Start Audit →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
