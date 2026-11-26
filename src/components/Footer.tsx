import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#09192e] text-slate-300 border-t border-[#c8a24a]/30 mt-16 no-print">
      <div className="container-page py-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-xs">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-base text-white">TenantFig</span>
            <span className="text-[10px] font-mono text-[#c8a24a] border border-[#c8a24a]/40 px-1.5 py-0.5 rounded">
              US-51
            </span>
          </div>
          <p className="text-slate-400 leading-relaxed">
            Executive U.S. tenant statutory defense &amp; deposit recovery workbench. Verified 2026 statutory clocks, 2x/3x multipliers, HUD depreciation schedules, and municipal rent caps.
          </p>
          <p className="text-[11px] text-slate-500">
            Educational &amp; quantitative modeling only. Not a law firm or legal advice.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">Calculators</h3>
          <ul className="space-y-2">
            <li><Link href="/calculators/security-deposit-penalty/" className="hover:text-white">Security Deposit Penalty</Link></li>
            <li><Link href="/calculators/wear-and-tear-deduction/" className="hover:text-white">Wear &amp; Tear Auditor</Link></li>
            <li><Link href="/calculators/rent-increase-cap/" className="hover:text-white">Rent Increase Cap</Link></li>
            <li><Link href="/calculators/lease-break-mitigation/" className="hover:text-white">Lease Break Mitigation</Link></li>
            <li><Link href="/calculators/small-claims-roi/" className="hover:text-white">Small Claims ROI</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">Statutory Index</h3>
          <ul className="space-y-2">
            <li><Link href="/states/" className="hover:text-white">All 50 States + DC Statutes</Link></li>
            <li><Link href="/cities/" className="hover:text-white">Top 25 Metro Rent Caps</Link></li>
            <li><Link href="/cases/" className="hover:text-white">Real-Ledger Case Studies</Link></li>
            <li><Link href="/guides/" className="hover:text-white">Statutory Defense Guides</Link></li>
            <li><Link href="/statutes/" className="hover:text-white">Master Citation Ledger</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">Governance</h3>
          <ul className="space-y-2">
            <li><Link href="/methodology/" className="hover:text-white">Audit Methodology</Link></li>
            <li><Link href="/changelog/" className="hover:text-white">2026 Statutory Changelog</Link></li>
            <li><Link href="/about/" className="hover:text-white">About TenantFig</Link></li>
            <li><Link href="/contact/" className="hover:text-white">Contact</Link></li>
            <li><Link href="/privacy/" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link href="/terms/" className="hover:text-white">Terms of Use</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5">
        <div className="container-page flex flex-col sm:flex-row justify-between items-center gap-2 text-[11px] text-slate-500">
          <span>© 2026 TenantFig.com · Verified U.S. Statutory Defense Platform</span>
          <div className="flex items-center space-x-4">
            <a href="/llms.txt" className="hover:text-slate-300">llms.txt</a>
            <a href="/sitemap.xml" className="hover:text-slate-300">sitemap.xml</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
