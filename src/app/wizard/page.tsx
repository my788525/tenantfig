import type { Metadata } from 'next';
import TenantActionWizard from '@/components/TenantActionWizard';
import ToolPaywallDossier from '@/components/ToolPaywallDossier';
import StatutoryAuditStamp from '@/components/StatutoryAuditStamp';
import {
  JsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  webApplicationJsonLd
} from '@/components/JsonLd';

export const metadata: Metadata = {
  title: '4-Step Deposit Recovery Wizard (2026)',
  description:
    'Guided 4-step tenant statutory wizard across all 51 US jurisdictions and 25 metro rent-cap cities. Generate a free printable Statutory Action Brief and match the exact legal kit.',
  alternates: {
    canonical: '/wizard/'
  }
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
      'Yes. Step 4 generates a free printable 《Personalized Tenant Statutory Action Brief》, a 1-click Copy Free 3-Line Statutory Summary button, and a copyable Certified Demand / Rebuttal Notice at $0.'
  },
  {
    question: 'Which digital kit should I choose if my landlord refuses to settle?',
    answer:
      'For standard deposit withholding, choose the $24.99 Deposit Recovery VIP Suite. For rent-hike or lease-break disputes, choose the $29.99 Rent-Hike & Lease-Break Rebuttal VIP Kit. For Small Claims Court filings or 3+ violations, choose the $39.99 Small Claims Trial-Ready Exhibit Binder.'
  },
  {
    question: 'What is the ROI of sending a Certified Mail Statutory Demand Letter?',
    answer:
      'On a typical $2,400 deposit dispute with 2x statutory damages ($4,800–$7,200 exposure), investing $29.99 in a Statutory Demand Kit represents 160x–240x leverage and frequently forces a full settlement before you ever pay Small Claims filing fees.'
  },
  {
    question: 'Does the wizard cover municipal rent caps like CA AB 1482 and NYC Good Cause?',
    answer:
      'Yes. Step 2 supports all 51 US states plus 25 major metro rent-stabilization and just-cause ordinances, including California AB 1482, NYC Good Cause Eviction, Los Angeles RSO, San Francisco, Seattle, and Portland.'
  },
  {
    question: 'Is my lease or deposit data uploaded to a server when I use the wizard?',
    answer:
      'No. All 4 steps run 100% client-side in your browser. Zero personal data, landlord names, or financial figures leave your device.'
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
        <p className="text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 max-w-3xl">
          <strong className="text-[#0f2747]">Ballpark vs. Exact Audit:</strong> General state averages only provide a rough estimate—exact statutory deadlines, forwarding-address triggers, 2x/3x multipliers, and 25-city rent caps must be calculated interactively on-site below.
        </p>
      </div>

      <StatutoryAuditStamp />

      <TenantActionWizard />

      {/* Free 1-Page Summary vs. Pro Statutory Demand Kit Comparison Table */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-5 no-print">
        <div className="space-y-1">
          <div className="text-xs font-mono uppercase tracking-widest text-[#c8a24a] font-bold">
            DELIVERABLE COMPARISON · FREE VS. PRO KIT
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f2747]">
            Free 1-Page Summary vs. Pro Statutory Demand Kit
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Every wizard run unlocks a free printable Statutory Action Brief. Upgrade only when you need editable court-ready .DOCX demand letters and .XLSX evidence ledgers.
          </p>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead className="bg-slate-50 text-[#0f2747] border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 font-bold">Deliverable / Capability</th>
                <th className="py-3 px-4 font-bold text-emerald-700">Free 1-Page Summary ($0)</th>
                <th className="py-3 px-4 font-bold text-[#0f2747]">Pro Statutory Demand Kit ($24.99–$39.99)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-3 px-4 font-semibold text-[#0f2747]">51-State &amp; 25-City Statutory Diagnosis</td>
                <td className="py-3 px-4 text-emerald-700 font-semibold">✓ Included</td>
                <td className="py-3 px-4 text-emerald-700 font-semibold">✓ Included + Full Citation Matrix</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-[#0f2747]">Printable 《Statutory Action Brief》 (PDF)</td>
                <td className="py-3 px-4 text-emerald-700 font-semibold">✓ 1-Page Summary</td>
                <td className="py-3 px-4 text-emerald-700 font-semibold">✓ Multi-Exhibit Trial Binder</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-[#0f2747]">Editable .DOCX Certified Mail Demand Letter</td>
                <td className="py-3 px-4 text-slate-400">Plain-text 3-line notice only</td>
                <td className="py-3 px-4 text-emerald-700 font-semibold">✓ Full .DOCX Suite (7-Day Cure Trigger)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-[#0f2747]">5-Tab .XLSX Depreciation &amp; Damages Ledger</td>
                <td className="py-3 px-4 text-slate-400">On-screen estimate only</td>
                <td className="py-3 px-4 text-emerald-700 font-semibold">✓ Court-Ready Formulas &amp; Interest Tab</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-[#0f2747]">ROI Leverage on $2,500 Deposit Dispute</td>
                <td className="py-3 px-4 text-slate-700">Instant Deadline Verification</td>
                <td className="py-3 px-4 text-[#0f2747] font-extrabold">83x–250x Recovery Leverage</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Static-rendered ToolPaywallDossier so static HTML carries data-matrix-offer="1" */}
      <ToolPaywallDossier
        badge="FLAGSHIP STATUTORY DEFENSE KIT"
        title="Download the Editable Statutory Demand & Small Claims Dossier"
        desc="Get instant access to the court-ready .DOCX Certified Mail Demand Letter Suite, 5-Tab .XLSX Depreciation & Damages Workbook, and 51-State Citation Matrix."
        docType="Tenant Action Wizard Pro Kit"
        sampleLines={[
          { label: 'Jurisdiction Coverage', value: '51 US States + 25 Cities' },
          { label: 'Typical Deposit Leverage', value: '2x–3x Statutory Damages' },
          { label: 'Guarantee', value: '30-Day Money-Back' }
        ]}
      />

      {/* Bing High-Intent FAQs */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4 no-print">
        <div className="space-y-1">
          <div className="text-xs font-mono uppercase tracking-widest text-[#c8a24a] font-bold">
            2026 WIZARD FAQ
          </div>
          <h2 className="text-xl font-extrabold text-[#0f2747]">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {WIZARD_FAQS.map((f, idx) => (
            <details
              key={f.question}
              open={idx === 0}
              className="group border border-slate-200 rounded-xl px-4 py-3.5 bg-slate-50/50 open:bg-white open:border-[#0f2747]/30 transition"
            >
              <summary className="cursor-pointer list-none flex items-center justify-between gap-3 text-sm font-bold text-[#0f2747]">
                <span>{f.question}</span>
                <span className="text-xs font-mono text-[#c8a24a] shrink-0 group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed border-t border-slate-100 pt-2.5">
                {f.answer}
              </p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
