import type { Metadata } from 'next';
import SmallClaimsRoiCalc from '@/components/calculators/SmallClaimsRoiCalc';
import CalculatorAuthoritySection from '@/components/CalculatorAuthoritySection';
import {
  JsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  webApplicationJsonLd
} from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Small Claims Recovery ROI Calculator (2026)',
  description:
    'Compute net expected recovery in Small Claims Court: principal + 2x/3x statutory damages minus filing fees and executive time cost.',
  alternates: {
    canonical: '/calculators/small-claims-roi/'
  }
};

const SMALL_CLAIMS_FAQS = [
  {
    question: 'What is the Small Claims Court limit for security deposit lawsuits in 2026?',
    answer:
      'Small Claims dollar limits vary by state: California allows individuals up to $12,500 (Cal. CCP § 116.221), Texas allows $20,000, New York City allows $10,000, Florida allows $8,000, and Illinois allows $10,000. Statutory 2x or 3x bad-faith damages count toward the court’s jurisdictional cap.'
  },
  {
    question: 'Can I recover my Small Claims filing fee and process server costs?',
    answer:
      'Yes. In virtually all US Small Claims Courts, the prevailing tenant recovers court filing fees ($30–$100), certified mail or process-server fees, and statutory interest on top of the judgment.'
  },
  {
    question: 'Do I need a lawyer to sue my landlord in Small Claims Court?',
    answer:
      'No. In fact, states like California and Michigan prohibit attorneys from representing parties at the initial Small Claims hearing, leveling the playing field for tenants armed with itemized evidence and statutory citations.'
  },
  {
    question: 'What is the typical settlement rate after sending a Certified Demand Letter?',
    answer:
      'Most landlords settle before the hearing once they receive a Certified Mail Demand Letter citing the exact 2x/3x bad-faith penalty statute and Small Claims filing deadline, because losing in court exposes them to treble damages plus public judgment records.'
  },
  {
    question: 'What if my total claim with 3x damages exceeds the Small Claims limit?',
    answer:
      'You can either waive the excess amount to stay in fast, low-cost Small Claims Court (typically resolved in 30–60 days without lawyers) or file in Limited Civil / County Court if the excess justifies higher filing fees.'
  },
  {
    question: 'How do I calculate whether Small Claims Court is worth my time?',
    answer:
      'Use the Net Expected Recovery formula: (Withheld Principal + Statutory Bad-Faith Damages) × Win Probability − (Filing Fee + Service Cost + Hours Spent × Hourly Rate). For most deposit disputes over $800, ROI exceeds 500%.'
  }
];

export default function SmallClaimsRoiPage() {
  return (
    <div className="container-page py-10 space-y-8">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: 'Home', url: 'https://tenantfig.com/' },
            {
              name: 'Small Claims ROI Calculator',
              url: 'https://tenantfig.com/calculators/small-claims-roi/'
            }
          ]),
          webApplicationJsonLd({
            name: 'Small Claims Court ROI Calculator',
            description:
              'Evaluate net expected recovery and ROI of filing a security deposit claim in Small Claims Court.',
            url: 'https://tenantfig.com/calculators/small-claims-roi/'
          }),
          faqJsonLd(SMALL_CLAIMS_FAQS)
        ]}
      />
      <div className="space-y-2 border-b border-slate-200 pb-6">
        <div className="text-xs font-mono uppercase tracking-widest text-[#c8a24a] font-bold">
          CALCULATOR 05 · LITIGATION ROI WORKBENCH
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2747] tracking-tight">
          Small Claims Court Recovery ROI Calculator
        </h1>
        <p className="text-slate-600 max-w-3xl text-sm sm:text-base">
          Quantify net expected recovery after Small Claims filing fees and your hourly time cost across all 51 US court limits.
        </p>
      </div>
      <SmallClaimsRoiCalc />

      <CalculatorAuthoritySection
        badge="SMALL CLAIMS LITIGATION ECONOMICS"
        formulaTitle="Net Expected Recovery & Statutory Cap Formula"
        formulaExplanation="Before paying a court clerk, evaluate your expected value (EV) by capping total statutory damages at your state’s Small Claims ceiling and netting out filing fees, service of process, and opportunity cost:"
        formulaBox="Net Expected Recovery = MIN(Court Cap, Principal + Bad-Faith Penalty) × Win % − (Filing Fee + Service + Time Cost)"
        tableTitle="2026 Major State Small Claims Caps, Filing Fees & Multipliers"
        tableHeaders={['State', 'Small Claims Cap', 'Typical Filing Fee', 'Bad-Faith Multiplier']}
        tableRows={[
          {
            item: 'California (CA)',
            standard: '$12,500 (Individual)',
            citation: '$30–$75 tiered fee',
            impact: 'Up to 2x statutory penalty + principal (3x total)'
          },
          {
            item: 'Texas (TX)',
            standard: '$20,000 (Justice Ct)',
            citation: '$54 filing + service',
            impact: '3x wrongful withholding + $100 + fees'
          },
          {
            item: 'New York City (NY)',
            standard: '$10,000 ($5k Town)',
            citation: '$15–$20 filing fee',
            impact: 'Up to 2x punitive damages (GOL § 7-108)'
          },
          {
            item: 'Florida (FL)',
            standard: '$8,000',
            citation: '$55–$300 tiered fee',
            impact: 'Forfeiture of deductions + court costs/fees'
          },
          {
            item: 'Massachusetts (MA)',
            standard: '$7,000 (No cap on 3x)',
            citation: '$40–$150 filing fee',
            impact: 'Mandatory 3x damages + attorney fees'
          }
        ]}
        walkthroughTitle="Real-Case Math: $2,200 Withheld Deposit in California Small Claims"
        walkthroughScenario="Suppose a landlord wrongfully withholds $2,200 past California’s 21-day deadline. You spend $50 on filing, $40 on service, and 6 hours preparing your binder (valued at $50/hr)."
        walkthroughSteps={[
          {
            label: 'Calculate Statutory Claim Ceiling',
            math: '$2,200 + $4,400 = $6,600',
            note: 'Cal. Civ. Code § 1950.5(l) allows the $2,200 principal plus up to 2x ($4,400) in bad-faith damages—well under the $12,500 cap.'
          },
          {
            label: 'Apply Conservative Win Probability (85%)',
            math: '$6,600 × 85% = $5,610',
            note: 'Missed statutory deadlines and missing $125+ receipts carry high judicial win rates.'
          },
          {
            label: 'Deduct Filing, Service & Time Cost',
            math: '$5,610 − $390 = $5,220 Net EV',
            note: 'Subtracting $90 hard costs and $300 time cost leaves +$5,220 net expected recovery (1,338% ROI on costs).'
          }
        ]}
        walkthroughResult="Result: Filing costs $90 upfront (recoverable on win) to unlock up to $6,600 in judgment leverage—often forcing a full pre-trial settlement."
        rebuttalTitle="Landlord Rebuttal Counter-Scripts"
        rebuttals={[
          {
            claim: 'Sue me—court costs and lawyers will eat up your deposit.',
            statute: 'Cal. CCP § 116.221 / State Fee Recovery',
            script:
              'Small Claims Court bars attorneys in many states, costs under $75 to file, and awards prevailing tenants their filing fees plus 2x–3x statutory damages.'
          },
          {
            claim: 'I’ll just offer you 50% back to close the file.',
            statute: 'Statutory Bad-Faith Multiplier',
            script:
              'Because the statutory return window has expired, Small Claims exposure is 2x to 3x the withheld principal; a 50% offer is rejected.'
          },
          {
            claim: 'You didn’t send a formal demand first.',
            statute: 'Pre-Suit Good Faith Demand',
            script:
              'A Certified Mail Demand Letter with a 7-day cure deadline satisfies pre-filing notice and establishes bad faith if ignored.'
          }
        ]}
        roiHeadline="Maximize Your Small Claims Leverage Before Paying Filing Fees"
        roiSubhead="Model your exact court ROI for free, or download the Trial-Ready Exhibit Binder to force a pre-trial settlement."
        proRoiExample="208x ROI ($5,220 ÷ $24.99)"
        freeItems={[
          '51-jurisdiction Small Claims cap & filing fee model',
          'Net Expected Recovery calculation with time-cost factor',
          'Free printable Statutory Action Brief & pre-suit summary',
          '100% private client-side ROI calculation'
        ]}
        proItems={[
          'Trial-Ready Small Claims Exhibit Binder & Index (.DOCX)',
          'Certified Pre-Suit Demand Letter (7-Day Settlement Trigger)',
          '5-Tab .XLSX Damages, Interest & Fee Recovery Ledger',
          'Judge-Ready Oral Script & Evidence Checklist'
        ]}
        faqs={SMALL_CLAIMS_FAQS}
      />
    </div>
  );
}
