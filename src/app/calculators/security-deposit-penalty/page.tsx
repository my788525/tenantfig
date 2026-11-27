import type { Metadata } from 'next';
import DepositPenaltyCalc from '@/components/calculators/DepositPenaltyCalc';
import CalculatorAuthoritySection from '@/components/CalculatorAuthoritySection';
import StatutoryAuditStamp from '@/components/StatutoryAuditStamp';
import {
  JsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  webApplicationJsonLd
} from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Security Deposit Penalty Calculator (2026)',
  description:
    'Audit landlord security deposit return deadlines, forwarding-address clock triggers, and 2x/3x statutory bad-faith damages across all 51 US jurisdictions.',
  alternates: {
    canonical: '/calculators/security-deposit-penalty/'
  }
};

const DEPOSIT_PENALTY_FAQS = [
  {
    question: 'How many days does a landlord have to return a security deposit in 2026?',
    answer:
      'Statutory return deadlines range from 14 days (New York, Alaska, Hawaii, Vermont, Nebraska) to 21 days (California, Minnesota, Wisconsin) to 30 days (Texas, Illinois, Massachusetts, Ohio, Pennsylvania, New Jersey). Missing the deadline typically forfeits the landlord’s right to withhold any deductions.'
  },
  {
    question: 'When can a tenant sue for 2x or 3x security deposit damages?',
    answer:
      'When a landlord withholds a deposit past the statutory deadline or retains funds in bad faith without an itemized statement and required receipts, states award 2x to 3x statutory damages: California awards up to 2x penalty plus principal (3x total), Texas awards 3x + $100 + attorney fees, and Massachusetts awards mandatory 3x damages.'
  },
  {
    question: 'Does the return deadline start if I didn’t provide a forwarding address?',
    answer:
      'In states like Texas (Tex. Prop. Code § 92.107) and Florida (Fla. Stat. § 83.49), the landlord’s statutory clock or penalty trigger depends on the tenant providing a written forwarding address. In California (Cal. Civ. Code § 1950.5) and New York (GOL § 7-108), the 21-day or 14-day clock runs automatically from move-out and key surrender.'
  },
  {
    question: 'What happens if the landlord sends an itemized list late, after the deadline?',
    answer:
      'Under statutes such as N.Y. Gen. Oblig. Law § 7-108(1-a)(e) and Mass. Gen. Laws ch. 186 § 15B, a late itemized statement completely forfeits the landlord’s right to retain any portion of the deposit—even for legitimate cleaning or repairs.'
  },
  {
    question: 'Can a landlord deduct for damages without attaching vendor receipts?',
    answer:
      'No in strict receipt states. California (Cal. Civ. Code § 1950.5(g)) requires receipts or invoices for deductions totaling $125 or more, and Washington (RCW § 59.18.280) requires documentation for all claimed repairs.'
  }
];

export default function SecurityDepositPenaltyPage() {
  return (
    <div className="container-page py-10 space-y-8">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: 'Home', url: 'https://tenantfig.com/' },
            {
              name: 'Security Deposit Penalty Calculator',
              url: 'https://tenantfig.com/calculators/security-deposit-penalty/'
            }
          ]),
          webApplicationJsonLd({
            name: 'Security Deposit Penalty Calculator 2026',
            description:
              '51-jurisdiction statutory deposit return deadline and 2x/3x bad-faith multiplier calculator.',
            url: 'https://tenantfig.com/calculators/security-deposit-penalty/'
          }),
          faqJsonLd(DEPOSIT_PENALTY_FAQS)
        ]}
      />
      <div className="space-y-2 border-b border-slate-200 pb-6">
        <div className="text-xs font-mono uppercase tracking-widest text-[#c8a24a] font-bold">
          CALCULATOR 01 · 51 JURISDICTIONS VERIFIED
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2747] tracking-tight">
          Security Deposit Penalty &amp; Deadline Calculator
        </h1>
        <p className="text-slate-600 max-w-3xl text-sm sm:text-base">
          Verify whether your landlord missed the statutory return clock, check forwarding-address triggers, and compute exact 2x/3x bad-faith damages plus fixed penalties.
        </p>
      </div>
      <StatutoryAuditStamp />
      <DepositPenaltyCalc />

      {/* Worked Verification Math Example */}
      <section className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-3 no-print">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-xs font-mono uppercase tracking-widest text-[#c8a24a] font-bold">
            WORKED VERIFICATION MATH EXAMPLE
          </div>
          <span className="text-[11px] font-mono text-slate-500">
            Prorated Wear-and-Tear + 2x–3x Statutory Penalty
          </span>
        </div>
        <h2 className="text-lg font-extrabold text-[#0f2747]">
          $2,400 Deposit + $900 Carpet Claim (4-Yr-Old Carpet) → $6,660 Statutory Exposure
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-1">
            <div className="font-bold text-[#0f2747]">1. Prorated Wear-and-Tear</div>
            <div className="font-mono font-bold text-emerald-700">$900 × (1 − 4/5) = $180</div>
            <p className="text-slate-600">
              Under HUD 5-year carpet useful life, 80% is normal wear ($720 disallowed); max lawful deduction is $180.
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-1">
            <div className="font-bold text-[#0f2747]">2. Wrongfully Withheld Principal</div>
            <div className="font-mono font-bold text-emerald-700">$2,400 − $180 = $2,220</div>
            <p className="text-slate-600">
              If the landlord missed the 14–30 day return clock, full forfeiture applies ($2,400 principal owed).
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-1">
            <div className="font-bold text-[#0f2747]">3. 2x–3x Statutory Penalty Math</div>
            <div className="font-mono font-bold text-emerald-700">$2,220 + (2 × $2,220) = $6,660</div>
            <p className="text-slate-600">
              CA Civ. Code §1950.5(l) awards up to 2x bad-faith penalty + principal (3x total); MA/TX award 3x damages ($6,660–$7,200).
            </p>
          </div>
        </div>
      </section>

      <CalculatorAuthoritySection
        badge="51-STATE DEPOSIT PENALTY LAW"
        formulaTitle="Statutory Bad-Faith Multiplier & Forfeiture Formula"
        formulaExplanation="Once a landlord misses the statutory return deadline or withholds funds without itemized receipts, courts apply the state’s bad-faith multiplier on top of the wrongfully withheld principal:"
        formulaBox="Total Statutory Exposure = Wrongfully Withheld Principal + (Withheld Principal × Bad-Faith Multiplier) + Fixed Statutory Penalty"
        tableTitle="2026 High-Volume State Deposit Deadlines & Multipliers"
        tableHeaders={['State', 'Return Deadline', 'Bad-Faith Damages', 'Governing Statute']}
        tableRows={[
          {
            item: 'California (CA)',
            standard: '21 Calendar Days',
            citation: 'Cal. Civ. Code § 1950.5(g),(l)',
            impact: 'Principal + up to 2x penalty (3x total)'
          },
          {
            item: 'New York (NY)',
            standard: '14 Calendar Days',
            citation: 'N.Y. Gen. Oblig. Law § 7-108',
            impact: 'Full forfeiture + up to 2x punitive'
          },
          {
            item: 'Texas (TX)',
            standard: '30 Days (w/ Address)',
            citation: 'Tex. Prop. Code §§ 92.103–109',
            impact: '3x withheld + $100 + attorney fees'
          },
          {
            item: 'Massachusetts (MA)',
            standard: '30 Calendar Days',
            citation: 'M.G.L. ch. 186 § 15B',
            impact: 'Mandatory 3x damages + 5% interest + fees'
          },
          {
            item: 'Washington (WA)',
            standard: '30 Calendar Days',
            citation: 'RCW § 59.18.280',
            impact: 'Up to 2x deposit + court costs & fees'
          }
        ]}
        walkthroughTitle="Real-Case Math: $2,500 Deposit Held 28 Days in New York"
        walkthroughScenario="Suppose you vacated your NYC apartment on May 1, surrendered keys, and provided your forwarding address—yet 28 days later you have received neither your $2,500 deposit nor an itemized statement."
        walkthroughSteps={[
          {
            label: 'Verify Statutory Clock Expiration',
            math: '28 Days > 14-Day Limit',
            note: 'Under N.Y. Gen. Oblig. Law § 7-108(1-a)(e), the 14-day window expired on May 15.'
          },
          {
            label: 'Apply Deduction Forfeiture Rule',
            math: '$2,500 Principal Owed',
            note: 'By missing the 14-day clock, the landlord forfeited all rights to deduct cleaning or repair charges.'
          },
          {
            label: 'Add Willful Bad-Faith Multiplier',
            math: '$2,500 + $5,000 = $7,500',
            note: 'Willful retention exposes the landlord to up to 2x punitive damages ($5,000) on top of the $2,500 principal.'
          }
        ]}
        walkthroughResult="Result: A $2,500 deposit dispute escalates to $7,500 in statutory exposure—giving you decisive settlement leverage."
        rebuttalTitle="Landlord Rebuttal Counter-Scripts"
        rebuttals={[
          {
            claim: 'We mailed the itemized list on Day 35 because repairs took longer.',
            statute: 'N.Y. GOL § 7-108 / Cal. Civ. Code § 1950.5',
            script:
              'Statutory deadlines are strict; if final vendor invoices aren’t ready, the landlord must send good-faith estimates within the window or forfeit deductions.'
          },
          {
            claim: 'Our lease gives us 45 days to return security deposits.',
            statute: 'State Anti-Waiver Statutes',
            script:
              'Private lease clauses cannot extend a shorter statutory return deadline; the 14-, 21-, or 30-day state clock governs.'
          }
        ]}
        roiHeadline="Convert a Late Deposit Into 2x–3x Settlement Leverage"
        roiSubhead="Verify your exact deadline for free, or send a Certified Statutory Demand Letter before filing in Small Claims."
        proRoiExample="300x ROI ($7,500 ÷ $24.99)"
        freeItems={[
          '51-jurisdiction return deadline & forwarding-address check',
          'Exact 2x / 3x bad-faith statutory damages calculation',
          'Free printable Statutory Action Brief & 3-line summary',
          '100% private client-side audit'
        ]}
        proItems={[
          'Editable .DOCX Certified Mail Deposit Demand Letter',
          '5-Tab .XLSX Penalty, Interest & Receipt Audit Workbook',
          '51-State Statutory Citation & Multiplier Reference',
          'Small Claims Filing & Exhibit Cover Checklist'
        ]}
        faqs={DEPOSIT_PENALTY_FAQS}
      />
    </div>
  );
}
