import type { Metadata } from 'next';
import TenantActionWizard from '@/components/TenantActionWizard';
import {
  JsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  webApplicationJsonLd
} from '@/components/JsonLd';

export const metadata: Metadata = {
  title: '4-Step Tenant Action & Deposit Recovery Wizard (2026)',
  description:
    'Guided 4-step tenant statutory wizard across all 51 US jurisdictions and 25 metro rent-cap cities. Generate a free printable Statutory Action Brief and match the exact legal kit.'
};

const WIZARD_FAQS = [
  {
    question: 'How does the 4-Step Tenant Action Wizard calculate my statutory damages?',
    answer:
      'It cross-references your state’s 2026 security deposit return deadline, forwarding-address trigger, and bad-faith multiplier (2x or 3x plus fixed penalties) or local metro rent cap to estimate recoverable damages and generate a personalized Statutory Action Brief.'
  },
  {
    question: 'Is the Personalized Tenant Statutory Action Brief free to print and copy?',
    answer:
      'Yes. Step 4 generates a free printable 《Personalized Tenant Statutory Action Brief》, a 1-click Copy Free 3-Line Statutory Summary button, and a copyable Certified Demand / Rebuttal Notice.'
  },
  {
    question: 'Which digital kit should I choose if my landlord refuses to settle?',
    answer:
      'For standard deposit withholding, choose the $24.99 Deposit Recovery VIP Suite. For rent-hike or lease-break disputes, choose the $29.99 Rent-Hike & Lease-Break Rebuttal VIP Kit. For Small Claims Court filings or 3+ violations, choose the $39.99 Small Claims Trial-Ready Exhibit Binder.'
  }
];

export default function WizardPage() {
  return (
    <div className="container-page py-10 space-y-8">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: 'Home', url: 'https://tenantfig.com/' },
            { name: 'Tenant Action Wizard', url: 'https://tenantfig.com/wizard/' }
          ]),
          webApplicationJsonLd({
            name: 'TenantFig 4-Step Tenant Action & Recovery Wizard',
            description:
              'Guided 4-step statutory dispute wizard covering 51 US jurisdictions and 25 metro rent-cap ordinances with printable Statutory Action Brief.',
            url: 'https://tenantfig.com/wizard/'
          }),
          faqJsonLd(WIZARD_FAQS)
        ]}
      />

      <div className="space-y-2 border-b border-slate-200 pb-6 no-print">
        <div className="text-xs font-mono uppercase tracking-widest text-[#c8a24a] font-bold">
          GUIDED WORKFLOW · 51 JURISDICTIONS · 25 METRO CAPS
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2747] tracking-tight">
          4-Step Tenant Action &amp; Recovery Wizard
        </h1>
        <p className="text-slate-600 max-w-3xl text-sm sm:text-base">
          Diagnose your deposit, rent-hike, lease-break, or small-claims dispute in 60 seconds and print a free personalized 《Statutory Action Brief》.
        </p>
      </div>

      <TenantActionWizard />
    </div>
  );
}
