import type { Metadata } from 'next';
import LeaseBreakCalc from '@/components/calculators/LeaseBreakCalc';
import CalculatorAuthoritySection from '@/components/CalculatorAuthoritySection';
import StatutoryAuditStamp from '@/components/StatutoryAuditStamp';
import {
  JsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  webApplicationJsonLd
} from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Lease Break Mitigation Calculator (2026)',
  description:
    'Model landlord duty to mitigate damages, vacancy proration, and early-termination buyout ROI across all 51 US jurisdictions.',
  alternates: {
    canonical: '/calculators/lease-break-mitigation/'
  }
};

const LEASE_BREAK_FAQS = [
  {
    question: 'Does a landlord have a legal duty to mitigate damages when I break my lease early?',
    answer:
      'Yes, in over 40 US jurisdictions—including California (Cal. Civ. Code § 1951.2), New York (N.Y. Real Prop. Law § 227-e), Texas (Tex. Prop. Code § 91.006), and Illinois (735 ILCS 5/9-213.1)—landlords must make reasonable efforts to re-rent the unit and cannot leave it vacant to bill you for the remaining lease term.'
  },
  {
    question: 'Can a landlord collect double rent from both me and the new replacement tenant?',
    answer:
      'No. Double-dipping is illegal nationwide. The moment a replacement tenant’s lease begins, your ongoing rent liability terminates—even if you have several months left on your original lease.'
  },
  {
    question: 'Should I pay a 2-month early-termination buyout fee or rely on duty to mitigate?',
    answer:
      'Compare the buyout fee against expected local vacancy days plus reasonable re-leasing costs. In tight rental markets where units re-lease in 14–30 days, prorated vacancy under the duty to mitigate is often 40%–65% cheaper than a flat 2-month buyout fee.'
  },
  {
    question: 'What happens if my lease has a liquidated-damages early termination clause?',
    answer:
      'Some states (such as Florida under Fla. Stat. § 83.595) allow an optional 2-month liquidated-damages buyout if separately initialed at signing. In states like New York (RPL § 227-e), any lease clause waiving the landlord’s duty to mitigate is void as contrary to public policy.'
  },
  {
    question: 'Can I present a qualified replacement tenant to cut my lease-break liability to $0?',
    answer:
      'Yes. If you refer a credit-qualified applicant willing to sign at the same rent and the landlord unreasonably rejects them, the landlord has failed to mitigate damages and cannot charge you for subsequent vacancy.'
  },
  {
    question: 'Do military servicemembers or domestic violence survivors owe lease-break fees?',
    answer:
      'No. Under the federal Servicemembers Civil Relief Act (50 U.S.C. § 3955) and state safe-housing statutes, qualifying military PCS/deployment orders and documented domestic violence/stalking survivors can terminate leases early without buyout penalties.'
  }
];

export default function LeaseBreakMitigationPage() {
  return (
    <div className="container-page py-10 space-y-8">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: 'Home', url: 'https://tenantfig.com/' },
            {
              name: 'Lease Break Mitigation Calculator',
              url: 'https://tenantfig.com/calculators/lease-break-mitigation/'
            }
          ]),
          webApplicationJsonLd({
            name: 'Lease Break Mitigation Calculator',
            description:
              'Calculate prorated vacancy liability vs early-termination buyout fees under state mitigation duties.',
            url: 'https://tenantfig.com/calculators/lease-break-mitigation/'
          }),
          faqJsonLd(LEASE_BREAK_FAQS)
        ]}
      />
      <div className="space-y-2 border-b border-slate-200 pb-6">
        <div className="text-xs font-mono uppercase tracking-widest text-[#c8a24a] font-bold">
          CALCULATOR 04 · DUTY TO MITIGATE MODEL
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2747] tracking-tight">
          Lease Break Mitigation &amp; Buyout Calculator
        </h1>
        <p className="text-slate-600 max-w-3xl text-sm sm:text-base">
          Compare your lease buyout fee against prorated vacancy liability under your state’s statutory or common-law landlord duty to mitigate damages.
        </p>
      </div>
      <StatutoryAuditStamp />
      <LeaseBreakCalc />

      <CalculatorAuthoritySection
        badge="DUTY TO MITIGATE & BUYOUT LAW"
        formulaTitle="Mitigated Vacancy Liability vs. Flat Buyout Formula"
        formulaExplanation="Under statutory mitigation rules, a landlord’s recoverable damages are limited to actual lost rent during the reasonable re-rental window plus documented advertising/turnover costs—never an automatic windfall for the full remaining lease:"
        formulaBox="Mitigated Liability = (Monthly Rent × (Vacancy Days ÷ 30)) + Reasonable Re-Leasing Cost − Mitigation Failure Offset"
        tableTitle="2026 State Duty-to-Mitigate & Early-Termination Rules"
        tableHeaders={['State', 'Mitigation Rule', 'Governing Statute', 'Anti-Waiver Protection']}
        tableRows={[
          {
            item: 'California (CA)',
            standard: 'Mandatory Duty to Mitigate',
            citation: 'Cal. Civ. Code § 1951.2',
            impact: 'Landlord must prove reasonable re-rental efforts'
          },
          {
            item: 'New York (NY)',
            standard: 'Strict Statutory Duty',
            citation: 'N.Y. Real Prop. Law § 227-e',
            impact: 'Any lease waiver of mitigation is void'
          },
          {
            item: 'Texas (TX)',
            standard: 'Mandatory Statutory Duty',
            citation: 'Tex. Prop. Code § 91.006',
            impact: 'Waiver clauses void; bars double rent'
          },
          {
            item: 'Illinois (IL)',
            standard: 'Mandatory Statutory Duty',
            citation: '735 ILCS 5/9-213.1',
            impact: 'Landlord must take reasonable measures to re-rent'
          },
          {
            item: 'Florida (FL)',
            standard: 'Elective Buyout or Mitigate',
            citation: 'Fla. Stat. § 83.595',
            impact: 'Max 2-month buyout only if separately initialed'
          }
        ]}
        walkthroughTitle="Real-Case Math: $5,400 Buyout Fee vs. 21-Day Re-Rental"
        walkthroughScenario="Suppose your rent is $2,700/month with 5 months left on the lease. Your landlord demands a 2-month buyout fee ($5,400), but apartments in your building re-lease in 21 days with $350 in listing fees."
        walkthroughSteps={[
          {
            label: 'Calculate Prorated Vacancy Rent',
            math: '$2,700 × (21 ÷ 30) = $1,890',
            note: 'You only owe rent for the 21 days the unit actually sits vacant before the new tenant’s lease starts.'
          },
          {
            label: 'Add Documented Re-Leasing Cost',
            math: '$1,890 + $350 = $2,240',
            note: 'Landlords may recover reasonable, receipted marketing or turnover costs directly tied to early re-rental.'
          },
          {
            label: 'Compare Against Flat 2-Month Buyout',
            math: '$5,400 − $2,240 = $3,160 Saved',
            note: 'Invoking your state’s duty to mitigate saves $3,160 compared to paying an inflated flat buyout fee.'
          }
        ]}
        walkthroughResult="Result: Refer a qualified replacement tenant and serve a Mitigation Notice to cut your $5,400 buyout exposure down to ~$2,240 (or $0 if back-to-back)."
        rebuttalTitle="Landlord Rebuttal Counter-Scripts"
        rebuttals={[
          {
            claim: 'You owe all remaining months unless you pay our 2-month buyout.',
            statute: 'N.Y. RPL § 227-e / Tex. Prop. Code § 91.006',
            script:
              'State law obligates landlords to mitigate damages by re-renting at fair market value; flat penalty clauses that exceed actual vacancy damages are unenforceable.'
          },
          {
            claim: 'We don’t accept tenant-referred replacement applicants.',
            statute: 'Cal. Civ. Code § 1951.2 / Common Law',
            script:
              'Unreasonably rejecting a credit-qualified replacement applicant constitutes a failure to mitigate, terminating further rent liability.'
          },
          {
            claim: 'We raised the asking rent by 15% for the next tenant.',
            statute: 'Duty to Mitigate Fair-Market Rule',
            script:
              'Delaying re-rental by listing the unit substantially above your current rent shifts the resulting vacancy risk onto the landlord.'
          }
        ]}
        roiHeadline="Cut Your Lease-Break Liability by 40%–75% With Statutory Leverage"
        roiSubhead="Model buyout vs. vacancy ROI for free, or download the Early-Termination & Mitigation Notice Kit."
        proRoiExample="126x ROI ($3,160 ÷ $24.99)"
        freeItems={[
          '51-state duty-to-mitigate statutory check',
          'Buyout fee vs. prorated vacancy break-even math',
          'Free printable Statutory Action Brief & notice summary',
          '100% private client-side calculation'
        ]}
        proItems={[
          'Editable .DOCX Notice of Surrender & Duty to Mitigate',
          'Qualified Replacement Tenant Referral Letter (.DOCX)',
          '5-Tab .XLSX Vacancy Proration & Double-Dip Audit Sheet',
          '51-State Mitigation & SCRA Exemption Citations'
        ]}
        faqs={LEASE_BREAK_FAQS}
      />
    </div>
  );
}
