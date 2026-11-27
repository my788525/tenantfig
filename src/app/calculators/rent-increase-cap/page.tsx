import type { Metadata } from 'next';
import RentIncreaseCapCalc from '@/components/calculators/RentIncreaseCapCalc';
import CalculatorAuthoritySection from '@/components/CalculatorAuthoritySection';
import StatutoryAuditStamp from '@/components/StatutoryAuditStamp';
import {
  JsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  webApplicationJsonLd
} from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Rent Increase Cap Auditor (25 Cities, 2026)',
  description:
    'Audit proposed rent hikes against CA AB 1482, NYC Good Cause Eviction, LA RSO, SF, Seattle, Portland, and 25 major metro ordinances.',
  alternates: {
    canonical: '/calculators/rent-increase-cap/'
  }
};

const RENT_CAP_FAQS = [
  {
    question: 'What is the maximum legal rent increase in California under AB 1482 in 2026?',
    answer:
      'Under the California Tenant Protection Act (AB 1482, Cal. Civ. Code § 1947.12), annual rent increases for covered units are capped at 5% plus the local CPI inflation rate, or 10% total—whichever is lower. Local ordinances like Los Angeles RSO or San Francisco often impose even stricter caps.'
  },
  {
    question: 'How does NYC Good Cause Eviction cap rent increases in 2026?',
    answer:
      'New York’s Good Cause Eviction Law (N.Y. Real Prop. Law Art. 6-A) establishes a local rent standard equal to 5% plus CPI, capped at 10% maximum. Increases above that threshold are presumptively unreasonable unless the landlord proves documented operating-cost increases.'
  },
  {
    question: 'How many days’ advance written notice is required for a rent increase?',
    answer:
      'Notice periods depend on jurisdiction and hike size: California requires 30 days for increases of 10% or less and 90 days for increases over 10% (Cal. Civ. Code § 827); Seattle requires 180 days written notice for any rent increase (SMC 7.24.030); New York requires 30, 60, or 90 days based on tenancy length (RPL § 226-c).'
  },
  {
    question: 'What happens if my landlord sends a rent increase without the required notice period?',
    answer:
      'A rent increase notice that violates the statutory advance-notice window or omits mandatory exemption/cap disclosures is legally defective and unenforceable until properly re-served with the full statutory notice period.'
  },
  {
    question: 'Are single-family homes and newer buildings exempt from rent caps?',
    answer:
      'Under CA AB 1482 and NYC Good Cause, buildings constructed within the last 15 years (rolling exemption) or individually owned single-family homes/condos may be exempt—but only if the landlord served the mandatory statutory written exemption notice in the lease.'
  },
  {
    question: 'Can a landlord split one 12% hike into two 6% hikes within 12 months?',
    answer:
      'No. Under CA AB 1482, Oregon SB 608, and most municipal rent-stabilization ordinances, cumulative rent increases within any 12-month rolling period cannot exceed the annual statutory cap.'
  }
];

export default function RentIncreaseCapPage() {
  return (
    <div className="container-page py-10 space-y-8">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: 'Home', url: 'https://tenantfig.com/' },
            {
              name: 'Rent Increase Cap Auditor',
              url: 'https://tenantfig.com/calculators/rent-increase-cap/'
            }
          ]),
          webApplicationJsonLd({
            name: 'Rent Increase Cap Auditor 2026',
            description:
              '25-city municipal rent cap and statutory notice-period compliance calculator.',
            url: 'https://tenantfig.com/calculators/rent-increase-cap/'
          }),
          faqJsonLd(RENT_CAP_FAQS)
        ]}
      />
      <div className="space-y-2 border-b border-slate-200 pb-6">
        <div className="text-xs font-mono uppercase tracking-widest text-[#c8a24a] font-bold">
          CALCULATOR 03 · 25 METRO ORDINANCES
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2747] tracking-tight">
          Rent Increase Cap &amp; Notice Period Auditor
        </h1>
        <p className="text-slate-600 max-w-3xl text-sm sm:text-base">
          Test renewal rent hikes against CA AB 1482, NYC Good Cause Eviction, local RSO limits, and mandatory 30/60/90/180-day notice rules.
        </p>
      </div>
      <StatutoryAuditStamp />
      <RentIncreaseCapCalc />

      {/* Worked Verification Math Example */}
      <section className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-3 no-print">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-xs font-mono uppercase tracking-widest text-[#c8a24a] font-bold">
            WORKED VERIFICATION MATH EXAMPLE
          </div>
          <span className="text-[11px] font-mono text-slate-500">
            Rent Cap Excess + Prorated Wear-and-Tear &amp; 2x–3x Penalty Verification
          </span>
        </div>
        <h2 className="text-lg font-extrabold text-[#0f2747]">
          $2,800 Rent Hit With 14% Hike + Move-Out Deposit Offset Verification
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-1">
            <div className="font-bold text-[#0f2747]">1. AB 1482 Rent Cap Ceiling</div>
            <div className="font-mono font-bold text-emerald-700">$2,800 × 1.088 = $3,046.40/mo</div>
            <p className="text-slate-600">
              A 14% demand ($3,192/mo) exceeds the 8.8% cap (5% + 3.8% CPI) by $145.60/mo ($1,747.20/yr illegal overcharge).
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-1">
            <div className="font-bold text-[#0f2747]">2. Prorated Wear-and-Tear Check</div>
            <div className="font-mono font-bold text-emerald-700">$600 Paint × (1 − 3/3) = $0</div>
            <p className="text-slate-600">
              If a landlord offsets a disputed hike against a $2,800 deposit for 3-year-old paint (HUD 2–3 yr life), lawful deduction is $0.
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-1">
            <div className="font-bold text-[#0f2747]">3. 2x–3x Statutory Penalty Math</div>
            <div className="font-mono font-bold text-emerald-700">$2,800 × 3 = $8,400 Exposure</div>
            <p className="text-slate-600">
              Bad-faith withholding of $2,800 triggers 2x statutory penalty + principal (3x = $8,400) under Cal. Civ. Code §1950.5(l).
            </p>
          </div>
        </div>
      </section>

      <CalculatorAuthoritySection
        badge="2026 STATE & METRO RENT CAP LAW"
        formulaTitle="Statutory Rent Cap & Annualized Overcharge Formula"
        formulaExplanation="Every rent-stabilized or just-cause jurisdiction enforces both a percentage ceiling (often tied to 5% + regional CPI, capped at 10%) and a strict written notice clock. An increase fails if it breaches either the dollar cap or the notice-day floor:"
        formulaBox="Illegal Annual Overcharge = MAX(0, Proposed Monthly Rent − (Current Rent × (1 + Statutory Cap %))) × 12 Months"
        tableTitle="2026 Major State & Metro Rent Cap & Notice Matrix"
        tableHeaders={['Jurisdiction', '2026 Cap Rule', 'Notice Period', 'Governing Statute']}
        tableRows={[
          {
            item: 'California Statewide',
            standard: 'MIN(5% + CPI, 10%)',
            citation: 'Cal. Civ. Code § 1947.12 (AB 1482)',
            impact: '30 days (≤10%) / 90 days (>10%)'
          },
          {
            item: 'New York City (Good Cause)',
            standard: 'MIN(5% + CPI, 10%)',
            citation: 'N.Y. Real Prop. Law Art. 6-A',
            impact: '30 / 60 / 90 days by tenure'
          },
          {
            item: 'Los Angeles (RSO Units)',
            standard: '4%–6% Annual RSO Cap',
            citation: 'LAMC § 151.06 / LAHD',
            impact: 'Written RSO notice required'
          },
          {
            item: 'Seattle, WA',
            standard: 'No Cap (Notice / EDRA)',
            citation: 'Seattle Mun. Code § 7.24.030',
            impact: '180-day mandatory advance notice'
          },
          {
            item: 'Oregon Statewide',
            standard: 'MIN(7% + CPI, 10%)',
            citation: 'Or. Rev. Stat. § 90.323 (SB 608)',
            impact: '90-day written notice required'
          }
        ]}
        walkthroughTitle="Real-Case Math: $2,800 Apartment Hit With a 14% Renewal Hike"
        walkthroughScenario="Assume your landlord proposes raising your $2,800/month rent to $3,192/month (+14.0%) in a covered California AB 1482 metro with an 8.8% combined cap (5% + 3.8% CPI) and only 30 days' notice."
        walkthroughSteps={[
          {
            label: 'Compute Maximum Legal Rent',
            math: '$2,800 × 1.088 = $3,046.40',
            note: 'Under Cal. Civ. Code § 1947.12, the maximum lawful rent is $3,046.40/month (+$246.40).'
          },
          {
            label: 'Isolate Illegal Monthly Excess',
            math: '$3,192 − $3,046.40 = $145.60/mo',
            note: 'The landlord is attempting to collect $145.60/month ($1,747.20/year) above the statutory ceiling.'
          },
          {
            label: 'Flag Defective Notice Period',
            math: '30 Days vs. 90 Days Req.',
            note: 'Because the hike exceeded 10%, Cal. Civ. Code § 827 requires 90 days written notice—making the 30-day notice void.'
          }
        ]}
        walkthroughResult="Result: You block $1,747.20 in annual overcharges immediately and defer any lawful increase until a valid 90-day notice expires."
        rebuttalTitle="Landlord Rebuttal Counter-Scripts"
        rebuttals={[
          {
            claim: 'Market rents in your neighborhood went up 15% this year.',
            statute: 'Cal. Civ. Code § 1947.12 / NYC RPL Art. 6-A',
            script:
              'Comparable market listings cannot override statutory rent-cap ceilings; any increase above 5% + CPI (max 10%) is void as a matter of law.'
          },
          {
            claim: 'Our property is a single-family home/condo so caps don’t apply.',
            statute: 'Cal. Civ. Code § 1947.12(e)(8)',
            script:
              'The single-family exemption is forfeited unless the landlord delivered the exact statutory written exemption notice in the lease.'
          },
          {
            claim: 'Sign the renewal by Friday or your rent goes up anyway.',
            statute: 'Cal. Civ. Code § 827 / SMC § 7.24.030',
            script:
              'A landlord cannot enforce a rent increase without serving the full 30-, 60-, 90-, or 180-day statutory written notice.'
          }
        ]}
        roiHeadline="Stop an Illegal $1,747/Year Rent Hike With One Certified Notice"
        roiSubhead="Audit your renewal letter for free, or download the formal Rent-Cap Objection & Notice-Defect Packet."
        proRoiExample="70x ROI ($1,747 ÷ $24.99)"
        freeItems={[
          '25-city statutory rent-cap & CPI ceiling check',
          '30/60/90/180-day notice-period defect verification',
          'Free printable Statutory Action Brief & 3-line summary',
          '100% private client-side calculation'
        ]}
        proItems={[
          'Editable .DOCX Rent-Cap & Notice-Defect Objection Letter',
          '5-Tab .XLSX 12-Month Overcharge & CPI Audit Workbook',
          'City-Specific RSO / AB 1482 / NYC Good Cause Citations',
          'Certified Mail Proof-of-Service & Follow-Up Script'
        ]}
        faqs={RENT_CAP_FAQS}
      />
    </div>
  );
}
