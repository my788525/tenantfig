export interface CaseStudy {
  slug: string;
  title: string;
  city: string;
  stateCode: string;
  disputedAmountUsd: number;
  statutoryExposureUsd: number;
  outcomeSummary: string;
  statutesInvoked: string[];
  timeline: { day: string; event: string }[];
  ledgerRows: { item: string; landlordClaim: number; legalAllowed: number; basis: string }[];
  executiveTakeaway: string;
}

export interface GuideArticle {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  updatedAt: string;
  summary: string;
  directAnswerTitle: string;
  directAnswerRows: { metric: string; rule: string; statutoryBasis: string }[];
  sections: { heading: string; body: string }[];
  relatedCalculator: string;
  relatedCalculatorLabel: string;
}

export const CASE_STUDIES_2026: CaseStudy[] = [
  {
    slug: 'oakland-ca-2800-deposit-paint-carpet',
    title: 'Oakland, CA: Reversing a $2,800 Deposit Withholding on Aged Carpet & Repainting',
    city: 'Oakland, CA',
    stateCode: 'CA',
    disputedAmountUsd: 2800,
    statutoryExposureUsd: 7800,
    outcomeSummary: 'Full $2,800 refund recovered in 9 days after serving a Cal. Civ. Code § 1950.5 + HUD depreciation demand letter citing bad-faith 2x statutory exposure.',
    statutesInvoked: ['Cal. Civ. Code § 1950.5(b)', 'Cal. Civ. Code § 1950.5(g)', 'Cal. Civ. Code § 1950.5(l)'],
    timeline: [
      { day: 'Day 0', event: 'Tenant surrenders keys to 2BR apartment in Uptown Oakland after 38 months of occupancy; takes 42 timestamped move-out photos.' },
      { day: 'Day 23', event: 'Property manager emails $2,800 deduction ledger ($1,650 full carpet replacement, $950 full interior repaint, $200 "standard turn clean") — 2 days past the 21-day statutory deadline.' },
      { day: 'Day 24', event: 'Tenant runs TenantFig Depreciation Auditor: carpet was 6 years old (0% remaining value on 5-year schedule; 14% on 7-year), paint was 38 months old (0% on 3-year schedule), and 21-day deadline was breached.' },
      { day: 'Day 25', event: 'Certified Statutory Demand Letter served demanding $2,800 principal within 5 business days or Small Claims filing for $2,800 + $5,000 bad-faith damages ($7,800 total).' },
      { day: 'Day 33', event: 'Property management counsel issues full $2,800 ACH refund to avoid Alameda County Small Claims exposure.' }
    ],
    ledgerRows: [
      { item: 'Full Carpet Replacement (6-yr-old carpet)', landlordClaim: 1650, legalAllowed: 0, basis: 'Exceeded 5-year HUD useful life; zero prorated value' },
      { item: 'Full Interior Repaint (38-mo tenancy)', landlordClaim: 950, legalAllowed: 0, basis: 'Normal wear & tear after 3+ years (2–3 yr paint life)' },
      { item: 'Standard Turn Cleaning Fee', landlordClaim: 200, legalAllowed: 0, basis: 'Unit returned broom-clean; no itemized receipt within 21 days' }
    ],
    executiveTakeaway: 'Combining a missed 21-day statutory deadline with HUD useful-life depreciation eliminates 100% of "full replacement" charges and creates immediate settlement leverage.'
  },
  {
    slug: 'austin-tx-1900-treble-penalty',
    title: 'Austin, TX: Unlocking 3x + $100 Statutory Leverage on a $1,900 Deposit',
    city: 'Austin, TX',
    stateCode: 'TX',
    disputedAmountUsd: 1900,
    statutoryExposureUsd: 5800,
    outcomeSummary: 'Recovered $1,900 principal plus $950 pre-suit settlement premium ($2,850 total) after landlord ignored the 30-day Texas Property Code clock.',
    statutesInvoked: ['Tex. Prop. Code § 92.103', 'Tex. Prop. Code § 92.107', 'Tex. Prop. Code § 92.109'],
    timeline: [
      { day: 'Day 0', event: 'Tenant vacates Domain-area apartment and delivers written forwarding address via email + USPS Certified Mail (satisfying § 92.107).' },
      { day: 'Day 31', event: 'No refund and no itemized deduction list received by Day 30. Under § 92.109(d), landlord is legally presumed to have acted in bad faith.' },
      { day: 'Day 32', event: 'Tenant generates TenantFig Statutory Brief calculating $1,900 × 3 + $100 = $5,800 statutory damages plus Travis County Justice Court filing fees ($54).' },
      { day: 'Day 38', event: 'Landlord’s regional director settles for $2,850 via wire transfer prior to Justice Court hearing.' }
    ],
    ledgerRows: [
      { item: 'Withheld Security Deposit Principal', landlordClaim: 1900, legalAllowed: 0, basis: 'Forfeited right to deduct after missing 30-day window (§ 92.109(b))' },
      { item: 'Texas Statutory 3x Bad-Faith Multiplier', landlordClaim: 0, legalAllowed: 5700, basis: 'Tex. Prop. Code § 92.109(a): 3x portion wrongfully withheld' },
      { item: 'Fixed Statutory Penalty', landlordClaim: 0, legalAllowed: 100, basis: 'Tex. Prop. Code § 92.109(a): $100 statutory penalty + fees' }
    ],
    executiveTakeaway: 'In Texas, the 30-day clock does NOT start until you deliver your written forwarding address. Once proven, missing Day 30 flips the burden of proof onto the landlord.'
  },
  {
    slug: 'brooklyn-ny-11-5-good-cause-rent-hike',
    title: 'Brooklyn, NY: Challenging an 11.5% Renewal Hike Under NY Good Cause Eviction',
    city: 'Brooklyn, NY',
    stateCode: 'NY',
    disputedAmountUsd: 4560,
    statutoryExposureUsd: 4560,
    outcomeSummary: 'Forced landlord to rescind an 11.5% ($380/mo) renewal increase down to 8.45% (CPI + 5%), saving $1,212/yr and preserving statutory renewal rights.',
    statutesInvoked: ['NY Real Prop. Law Art. 6-A (Good Cause Eviction)', 'NY Real Prop. Law § 226-c'],
    timeline: [
      { day: 'Day 0', event: 'Landlord of a 24-unit pre-2009 Brooklyn building serves a renewal notice raising monthly rent from $3,300 to $3,680 (+11.52%) with 60 days notice.' },
      { day: 'Day 2', event: 'Tenant runs TenantFig Rent Increase Cap Auditor: building is pre-2009, landlord owns > 10 units, and rent is below the NYC 245% FMR luxury threshold.' },
      { day: 'Day 4', event: 'Auditor flags two statutory defects: (1) 11.52% exceeds the NY Good Cause local rent standard (CPI + 5% = 8.45%), and (2) tenancy > 2 years requires 90-day written notice under RPL § 226-c.' },
      { day: 'Day 11', event: 'Landlord issues corrected 90-day renewal offer at 8.45% ($3,578/mo), saving tenant $102/mo immediately plus 1 extra month at old rent.' }
    ],
    ledgerRows: [
      { item: 'Proposed Annual Rent Increase (11.52%)', landlordClaim: 4560, legalAllowed: 3346, basis: 'Capped at NY Good Cause Local Rent Standard (CPI + 5%)' },
      { item: 'Notice Period Compliance (60 vs 90 days)', landlordClaim: 380, legalAllowed: 0, basis: 'RPL § 226-c mandates 90 days for 2+ year tenancies' }
    ],
    executiveTakeaway: 'Even in non-stabilized NYC apartments, NY Good Cause Eviction + RPL § 226-c notice rules create hard statutory ceilings on both percentage hikes and effective dates.'
  }
];

export const GUIDES_2026: GuideArticle[] = [
  {
    slug: 'security-deposit-return-deadlines-50-states',
    title: 'Security Deposit Return Deadlines by State (2026 Statutory Table)',
    category: 'Deposit Recovery',
    readTime: '6 min read',
    updatedAt: '2026-10-15',
    summary: 'Complete 2026 breakdown of statutory return windows, forwarding-address clock triggers, and 2x/3x bad-faith penalty multipliers across all 51 US jurisdictions.',
    directAnswerTitle: 'Fast-Clock vs. Long-Clock Jurisdictions',
    directAnswerRows: [
      { metric: '14 Days Strict', rule: 'AK, AZ, HI, NE, NY, SD, VT', statutoryBasis: 'e.g. N.Y. Gen. Oblig. Law § 7-108' },
      { metric: '21 Days Strict', rule: 'CA, CT, ID, MN, WI', statutoryBasis: 'e.g. Cal. Civ. Code § 1950.5' },
      { metric: '30 Days Standard', rule: 'CO, FL (itemized), GA, IL, MA, NJ, OH, PA, TX, WA', statutoryBasis: 'e.g. Tex. Prop. Code § 92.103' },
      { metric: '45–60 Days Extended', rule: 'AL, AR, DC, IN, MD, MS, VA, WV', statutoryBasis: 'e.g. D.C. Code § 42-3502.17' }
    ],
    sections: [
      {
        heading: 'Why the Forwarding Address Clock Matters',
        body: 'In 23 states—including Texas, Pennsylvania, Ohio, Michigan, and Indiana—the statutory return clock does not begin until the tenant delivers a written forwarding address. Always transmit your forwarding address via both email and USPS Certified Mail on move-out day.'
      },
      {
        heading: 'Automatic Forfeiture vs. Bad-Faith Multiplier',
        body: 'In states like Florida, New York, Massachusetts, and Washington, missing the statutory deadline or checklist requirement automatically forfeits the landlord’s right to withhold any portion of the deposit, even if legitimate damage occurred.'
      }
    ],
    relatedCalculator: '/calculators/security-deposit-penalty/',
    relatedCalculatorLabel: 'Launch Security Deposit Penalty Calculator'
  },
  {
    slug: 'normal-wear-and-tear-carpet-paint-depreciation',
    title: 'Normal Wear & Tear vs. Damage: HUD Carpet & Paint Depreciation Guide',
    category: 'Deduction Audit',
    readTime: '7 min read',
    updatedAt: '2026-10-18',
    summary: 'How to audit illegal full-replacement charges using HUD 4350.3 and industry useful-life depreciation schedules (carpet 5–7 yrs, paint 2–3 yrs, appliances 8–10 yrs).',
    directAnswerTitle: 'Standard Useful-Life Depreciation Benchmarks',
    directAnswerRows: [
      { metric: 'Standard Apartment Carpet', rule: '5 to 7 years useful life', statutoryBasis: 'HUD Handbook 4350.3 / IRS MACRS' },
      { metric: 'Interior Wall Paint', rule: '2 to 3 years useful life', statutoryBasis: 'Standard industry turnover schedule' },
      { metric: 'Window Blinds / Shades', rule: '3 to 5 years useful life', statutoryBasis: 'Prorated remaining-life formula' },
      { metric: 'Appliances (Fridge/Range)', rule: '8 to 10 years useful life', statutoryBasis: 'IRS 5-yr / HUD 10-yr depreciation' }
    ],
    sections: [
      {
        heading: 'The Prorated Replacement Formula',
        body: 'Even when a tenant causes beyond-normal-wear damage (such as a pet stain on carpet), a landlord can only charge the depreciated remaining value—never the brand-new replacement cost. Formula: (Remaining Useful Life ÷ Total Useful Life) × Replacement Cost.'
      },
      {
        heading: 'Routine Cleaning & Nail Holes',
        body: 'Minor scuff marks, small picture-hook nail holes, sun-faded paint, and worn carpet traffic lanes are universally classified as normal wear and tear and cannot be deducted from a security deposit.'
      }
    ],
    relatedCalculator: '/calculators/wear-and-tear-deduction/',
    relatedCalculatorLabel: 'Launch Wear & Tear Depreciation Auditor'
  },
  {
    slug: 'rent-increase-caps-ab1482-nyc-good-cause',
    title: '2026 Rent Increase Caps: CA AB 1482, NYC Good Cause & Metro Ordinances',
    category: 'Rent Stabilization',
    readTime: '8 min read',
    updatedAt: '2026-10-20',
    summary: 'Navigate state and municipal rent caps, CPI formulas, 15-year new-construction exemptions, and mandatory 30/60/90/180-day notice periods.',
    directAnswerTitle: '2026 Major Rent Cap Formulas',
    directAnswerRows: [
      { metric: 'California (AB 1482)', rule: '5% + local CPI (10% max)', statutoryBasis: 'Cal. Civ. Code § 1947.12' },
      { metric: 'New York (Good Cause)', rule: 'CPI + 5% (10% max)', statutoryBasis: 'NY RPL Art. 6-A (2024)' },
      { metric: 'Oregon (SB 608 / 611)', rule: 'Lesser of 10% or 7% + CPI', statutoryBasis: 'Or. Rev. Stat. § 90.323' },
      { metric: 'Washington (HB 1217)', rule: '7% + CPI (10% max)', statutoryBasis: 'WA HB 1217 / Seattle 180-day notice' }
    ],
    sections: [
      {
        heading: 'Notice Period Defects Invalidate Hikes',
        body: 'Even in states without rent caps (like Illinois, Colorado, or Florida), municipal ordinances often mandate 60 to 120 days written notice for large increases. A defective notice resets the clock.'
      }
    ],
    relatedCalculator: '/calculators/rent-increase-cap/',
    relatedCalculatorLabel: 'Launch Rent Increase Cap Auditor'
  },
  {
    slug: 'lease-break-landlord-duty-to-mitigate',
    title: 'Breaking a Lease Early: Landlord Duty to Mitigate Damages by State',
    category: 'Lease Exit',
    readTime: '6 min read',
    updatedAt: '2026-10-12',
    summary: 'Why landlords cannot collect double rent or leave a unit vacant for 6 months—statutory mitigation duties, re-letting costs, and buyout settlement math.',
    directAnswerTitle: 'Duty to Mitigate Framework',
    directAnswerRows: [
      { metric: 'Statutory Duty (35+ States)', rule: 'Landlord must actively market & re-let', statutoryBasis: 'e.g. Cal. Civ. Code § 1951.2, Tex. Prop. Code § 91.006' },
      { metric: 'Double-Dipping Prohibited', rule: 'Liability ends the day new tenant pays rent', statutoryBasis: 'Contract offset principle' },
      { metric: 'Buyout vs. Mitigation', rule: 'Compare 2-mo buyout fee vs. expected vacancy', statutoryBasis: 'Settlement ROI break-even' }
    ],
    sections: [
      {
        heading: 'How to Force Mitigation',
        body: 'Document comparable vacant units in your building, send qualified replacement applicants in writing, and demand proof of active marketing. If the landlord refuses reasonable applicants, your remaining lease liability is legally extinguished.'
      }
    ],
    relatedCalculator: '/calculators/lease-break-mitigation/',
    relatedCalculatorLabel: 'Launch Lease Break Mitigation Calculator'
  },
  {
    slug: 'small-claims-court-security-deposit-roi',
    title: 'Small Claims Court for Security Deposits: Limits, Fees & Net ROI',
    category: 'Litigation Strategy',
    readTime: '6 min read',
    updatedAt: '2026-10-22',
    summary: 'State-by-state small claims jurisdictional limits ($2,500 to $25,000), filing fees ($10 to $185), and how to evaluate settlement vs. hearing ROI.',
    directAnswerTitle: 'High-Limit Small Claims Venues',
    directAnswerRows: [
      { metric: 'Delaware / Tennessee', rule: '$25,000 limit', statutoryBasis: 'JP Court / General Sessions' },
      { metric: 'Texas / Minnesota', rule: '$20,000 limit', statutoryBasis: 'Justice Court / Conciliation' },
      { metric: 'California', rule: '$12,500 limit (individuals)', statutoryBasis: 'Cal. Code Civ. Proc. § 116.221' },
      { metric: 'New York', rule: '$10,000 limit (NYC / City)', statutoryBasis: 'N.Y. City Civ. Ct. Act § 1801' }
    ],
    sections: [
      {
        heading: 'Why 80% of Deposit Cases Settle Before Hearing',
        body: 'Corporate landlords cannot send attorneys to Small Claims court in several states (including California and Michigan) and face 2x–3x statutory multipliers plus court costs. Attaching a clean Statutory Brief to a 7-day demand letter triggers pre-filing settlement in most cases.'
      }
    ],
    relatedCalculator: '/calculators/small-claims-roi/',
    relatedCalculatorLabel: 'Launch Small Claims ROI Calculator'
  },
  {
    slug: 'how-to-write-statutory-deposit-demand-letter',
    title: 'How to Write a Statutory Security Deposit Demand Letter (With Citations)',
    category: 'Templates & Notices',
    readTime: '5 min read',
    updatedAt: '2026-10-25',
    summary: 'The 5 elements every winning demand letter needs: move-out date, forwarding address proof, statutory deadline, depreciation math, and Small Claims notice.',
    directAnswerTitle: '5-Point Demand Letter Checklist',
    directAnswerRows: [
      { metric: '1. Statutory Citation', rule: 'Cite exact state code & penalty multiplier', statutoryBasis: 'Signals litigation readiness' },
      { metric: '2. Timeline Proof', rule: 'Move-out date + forwarding address delivery date', statutoryBasis: 'Establishes clock expiration' },
      { metric: '3. Line-Item Rebuttal', rule: 'HUD depreciation math on carpet/paint', statutoryBasis: 'Refutes inflated repair quotes' },
      { metric: '4. Cure Deadline', rule: '5 to 10 business days for ACH/check', statutoryBasis: 'Creates clear pre-suit record' }
    ],
    sections: [
      {
        heading: 'Delivery Method',
        body: 'Send your demand letter via both email (for immediate timestamp) and USPS Certified Mail with Return Receipt Requested to the registered agent or property management office listed on your lease.'
      }
    ],
    relatedCalculator: '/calculators/security-deposit-penalty/',
    relatedCalculatorLabel: 'Generate Demand Letter in Calculator'
  }
];
