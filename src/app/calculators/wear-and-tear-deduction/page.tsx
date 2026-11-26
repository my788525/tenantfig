import type { Metadata } from 'next';
import WearAndTearCalc from '@/components/calculators/WearAndTearCalc';
import CalculatorAuthoritySection from '@/components/CalculatorAuthoritySection';
import {
  JsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  webApplicationJsonLd
} from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Normal Wear & Tear Deduction Auditor (2026)',
  description:
    'Prorate apartment carpet (5–7 yr) and interior paint (2–3 yr) useful-life depreciation to dispute unlawful security deposit deductions.',
  alternates: {
    canonical: '/calculators/wear-and-tear-deduction/'
  }
};

const WEAR_AND_TEAR_FAQS = [
  {
    question: 'What is the HUD useful life for apartment carpet and interior paint?',
    answer:
      'Under HUD Handbook 4350.3 and standard California/IRS residential depreciation schedules, apartment-grade carpet has a useful life of 5 to 7 years (60–84 months) and standard interior flat paint has a useful life of 2 to 3 years (24–36 months). Once an item reaches or exceeds its useful life, its remaining depreciable value is $0.'
  },
  {
    question: 'Can a landlord charge me for full carpet replacement if there is a pet stain?',
    answer:
      'No. Even when actual tenant-caused damage exceeds normal wear and tear, landlords may only charge the prorated remaining useful life of the damaged item—never 100% of brand-new replacement cost. For example, a 4-year-old carpet with a 5-year useful life has only 20% remaining value.'
  },
  {
    question: 'Is routine move-out painting or steam cleaning considered normal wear and tear?',
    answer:
      'Yes. Minor nail holes, light scuff marks, faded paint, and normal carpet traffic patterns after 2 or more years of occupancy are legally classified as normal wear and tear in all 51 US jurisdictions and cannot be deducted from a security deposit.'
  },
  {
    question: 'What if my lease says the tenant pays 100% of carpet replacement regardless of age?',
    answer:
      'Anti-waiver provisions such as Cal. Civ. Code § 1953, N.Y. Gen. Oblig. Law § 7-108, and Tex. Prop. Code § 92.006 void lease clauses that waive statutory normal-wear-and-tear protections or shift routine turnover depreciation onto the tenant.'
  },
  {
    question: 'How do I prove the age of carpet or paint in Small Claims Court?',
    answer:
      'Demand the landlord’s original installation invoice, vendor receipt, or prior move-in inspection checklist. Under laws like Cal. Civ. Code § 1950.5(g) and RCW § 59.18.280, the landlord bears the burden of proof to substantiate both the cost and remaining useful life of any deduction.'
  },
  {
    question: 'Can a landlord deduct for blinds, appliances, or vinyl flooring at full retail price?',
    answer:
      'No. Window blinds (3–5 years), refrigerators/ranges (8–10 years), and vinyl plank flooring (7–10 years) all depreciate on straight-line schedules. Charging full retail replacement for depreciated fixtures is an unlawful betterment.'
  }
];

export default function WearAndTearPage() {
  return (
    <div className="container-page py-10 space-y-8">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: 'Home', url: 'https://tenantfig.com/' },
            {
              name: 'Wear & Tear Deduction Auditor',
              url: 'https://tenantfig.com/calculators/wear-and-tear-deduction/'
            }
          ]),
          webApplicationJsonLd({
            name: 'Wear & Tear Depreciation Auditor',
            description:
              'HUD 4350.3 and industry useful-life depreciation calculator for carpet, paint, blinds, and appliances.',
            url: 'https://tenantfig.com/calculators/wear-and-tear-deduction/'
          }),
          faqJsonLd(WEAR_AND_TEAR_FAQS)
        ]}
      />
      <div className="space-y-2 border-b border-slate-200 pb-6">
        <div className="text-xs font-mono uppercase tracking-widest text-[#c8a24a] font-bold">
          CALCULATOR 02 · HUD 4350.3 DEPRECIATION ENGINE
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2747] tracking-tight">
          Normal Wear &amp; Tear Depreciation Auditor
        </h1>
        <p className="text-slate-600 max-w-3xl text-sm sm:text-base">
          Audit inflated carpet, paint, and appliance replacement deductions using HUD/IRS useful-life depreciation schedules and generate a line-item rebuttal notice.
        </p>
      </div>
      <WearAndTearCalc />

      <CalculatorAuthoritySection
        badge="HUD 4350.3 & STATE DEPRECIATION LAW"
        formulaTitle="Straight-Line Useful-Life Depreciation Formula"
        formulaExplanation="Courts and housing authorities prohibit landlords from profiting through 'betterment'—charging a departing tenant full brand-new replacement cost for an aged apartment fixture. Even if damage beyond normal wear and tear occurred, recoverable landlord damages are strictly capped at remaining depreciated value:"
        formulaBox="Max Allowable Deduction = Replacement Cost × MAX(0, (Useful Life Months − Age Months) ÷ Useful Life Months)"
        tableTitle="2026 HUD & Industry Useful-Life Depreciation Schedule"
        tableHeaders={['Fixture / Surface', 'Useful Life', 'Primary Authority', 'Tenancy Impact']}
        tableRows={[
          {
            item: 'Interior Flat Paint',
            standard: '2–3 Years (24–36 mo)',
            citation: 'HUD Handbook 4350.3 / CA DCA',
            impact: '$0 owed after 36 months'
          },
          {
            item: 'Apartment-Grade Carpet',
            standard: '5–7 Years (60–84 mo)',
            citation: 'HUD 4350.3 / IRS Pub. 527',
            impact: '50% max at Year 2.5–3.5'
          },
          {
            item: 'Mini-Blinds & Shades',
            standard: '3–5 Years (36–60 mo)',
            citation: 'HUD Useful-Life Schedule',
            impact: '$0 owed after 5 years'
          },
          {
            item: 'Vinyl / Laminate Flooring',
            standard: '7–10 Years (84–120 mo)',
            citation: 'IRS MACRS 5/7-Yr Class',
            impact: 'Prorated per remaining year'
          },
          {
            item: 'Refrigerator / Dishwasher',
            standard: '8–10 Years (96–120 mo)',
            citation: 'HUD / NAHB Life Expectancy',
            impact: 'Repair cost capped at FMV'
          }
        ]}
        walkthroughTitle="Real-Case Math: $1,850 Carpet Claim Disputed After 48 Months"
        walkthroughScenario="Suppose a landlord withholds $1,850 from your $2,400 deposit for full living-room carpet replacement after a 4-year (48-month) tenancy, claiming pet wear."
        walkthroughSteps={[
          {
            label: 'Establish Useful Life Baseline',
            math: '60 Months (5 Yrs)',
            note: 'Standard apartment-grade nylon carpet carries a 5-year (60-month) useful life under HUD 4350.3.'
          },
          {
            label: 'Calculate Remaining Useful Life',
            math: '12 ÷ 60 = 20%',
            note: 'With 48 months elapsed since installation, only 12 months (20%) of economic life remained.'
          },
          {
            label: 'Apply Prorated Cap & Disallow Overcharge',
            math: '$1,850 × 20% = $370',
            note: 'Even assuming actionable damage, $1,480 of the $1,850 deduction is unlawful betterment and must be refunded.'
          }
        ]}
        walkthroughResult="Result: You dispute $1,480 in illegal overcharges—and if withheld in bad faith, many states award 2x–3x statutory damages ($2,960–$4,440)."
        rebuttalTitle="Landlord Rebuttal Counter-Scripts"
        rebuttals={[
          {
            claim: 'Our lease requires professional carpet replacement on move-out.',
            statute: 'Cal. Civ. Code § 1953 / Anti-Waiver Law',
            script:
              'State anti-waiver statutes void any lease provision requiring tenants to pay for normal wear and tear or full replacement of depreciated fixtures.'
          },
          {
            claim: 'The vendor charged $1,200 to repaint the entire unit.',
            statute: 'HUD Handbook 4350.3 (2–3 Yr Paint Life)',
            script:
              'Routine turnover repainting after 24–36 months of occupancy is an ordinary landlord operating expense, not recoverable tenant damage.'
          },
          {
            claim: 'We do not have the original carpet installation receipt.',
            statute: 'Cal. Civ. Code § 1950.5(g) / RCW § 59.18.280',
            script:
              'The landlord carries the statutory burden to prove both the item’s installation date and itemized actual cost; unsubstantiated deductions fail in Small Claims Court.'
          }
        ]}
        roiHeadline="Turn a $1,480 Depreciation Dispute Into an Instant Settlement"
        roiSubhead="Use the free calculator to verify the exact prorated dollar cap, or export the court-ready demand package."
        proRoiExample="59x ROI ($1,480 ÷ $24.99)"
        freeItems={[
          'Instant HUD 4350.3 straight-line depreciation calculation',
          'Printable 1-page Statutory Action Brief & summary',
          'Copyable 3-line plain-text depreciation rebuttal notice',
          'Zero account signup; 100% private in-browser audit'
        ]}
        proItems={[
          'Editable .DOCX Certified Mail Depreciation Demand Letter',
          '5-Tab .XLSX Carpet, Paint & Fixture Audit Ledger',
          '51-State Anti-Waiver & Receipt-Rule Citation Matrix',
          'Small Claims Judge-Ready Exhibit Cover Sheet'
        ]}
        faqs={WEAR_AND_TEAR_FAQS}
      />
    </div>
  );
}
