export interface PitfallVignette {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  lossExposure: string;
  category: string;
  applicableStatute: string;
  jurisdictions: string[];
  realWorldScenario: string;
  hiddenBlackHole: string;
  exactSurvivalMove: string[];
  relatedToolHref: string;
  relatedToolLabel: string;
}

export interface PitfallFaq {
  question: string;
  answer: string;
}

export const PITFALLS_2026: PitfallVignette[] = [
  {
    id: 'forwarding-address-trap',
    number: '01',
    title: 'The Missing Forwarding Address Trap',
    shortTitle: 'Missing Forwarding Address',
    lossExposure: 'Forfeits 2x–3x Penalty Clock',
    category: 'STATUTORY CLOCKS',
    applicableStatute:
      'Tex. Prop. Code § 92.107 · Mich. Comp. Laws § 554.611 · N.C. Gen. Stat. § 42-52 · Fla. Stat. § 83.49(3)(a)',
    jurisdictions: ['TX', 'MI', 'NC', 'FL'],
    realWorldScenario:
      'An Austin software engineer moves out on May 31, hands the keys to the leasing office, and assumes the landlord’s 30-day deposit return clock starts immediately. On July 5—day 35—she emails demanding her $2,400 deposit plus Texas’s 3x bad-faith penalty ($7,200). The property manager replies with a smile: “We never received your written forwarding address, so our 30-day clock hasn’t even started yet.”',
    hiddenBlackHole:
      'In several major states—most notably Texas (§ 92.107), Michigan (4-day notice rule under § 554.611), North Carolina (§ 42-52), and Florida (§ 83.49)—the landlord’s statutory 14-to-30-day deadline to return your deposit or send an itemized list is legally tolled (paused) until you deliver a written forwarding address. Even worse, in Michigan, failing to send your forwarding address in writing within 4 days of move-out relieves the landlord of the 30-day itemization requirement altogether.',
    exactSurvivalMove: [
      'Deliver your forwarding address in writing on or before move-out day—never rely on verbally telling the leasing agent or updating a resident portal that locks you out after lease end.',
      'Send the written forwarding address via USPS Certified Mail (Return Receipt Requested) AND email with a PDF attachment on the exact day you surrender keys.',
      'If you already moved out without sending it, send a formal Written Forwarding Address Notice today via Certified Mail; the statutory clock begins the day the landlord receives it.'
    ],
    relatedToolHref: '/calculators/security-deposit-penalty/',
    relatedToolLabel: 'Verify Your State Clock →'
  },
  {
    id: 'accord-and-satisfaction-trap',
    number: '02',
    title: 'The "Accord & Satisfaction" Partial Refund Check Trap',
    shortTitle: 'Partial Check "Payment in Full"',
    lossExposure: 'Permanent Waiver of $1,800+ Balance',
    category: 'UCC § 3-311 WAIVER',
    applicableStatute: 'UCC § 3-311 (Accord and Satisfaction by Use of Instrument) · State Commercial Codes',
    jurisdictions: ['ALL 51'],
    realWorldScenario:
      'A Denver product manager had a $2,600 security deposit. Forty-five days after move-out, the landlord mails a check for $800 with a bogus $1,800 deduction for “full apartment repainting and carpet replacement.” In tiny print on the back above the endorsement line—or in the accompanying memo—it says: “Cashing this check constitutes full and final settlement of all security deposit claims.” Needing the cash, the tenant mobile-deposits the $800 check and plans to sue for the remaining $1,800 in small claims.',
    hiddenBlackHole:
      'Under Uniform Commercial Code (UCC) § 3-311, adopted in virtually every U.S. state, endorsing and depositing a check tendered in good faith as “full satisfaction” of a disputed debt legally extinguishes your right to sue for the remaining $1,800. Small claims judges routinely dismiss the tenant’s $1,800 claim on the spot because cashing the check created a binding “Accord and Satisfaction” contract.',
    exactSurvivalMove: [
      'Inspect both the front memo line AND the back endorsement area of any partial refund check before mobile-depositing it.',
      'If it contains “Payment in Full,” “Full and Final Settlement,” or similar restrictive language, DO NOT endorse or cash it.',
      'Send a Certified Mail rejection letter returning a copy (or holding the uncashed check) stating that the partial tender is rejected as full settlement, and demand the full undisputed balance plus statutory penalties. (Check your state’s specific UCC § 3-311(c) exception rules before depositing.)'
    ],
    relatedToolHref: '/wizard/',
    relatedToolLabel: 'Generate Rebuttal Letter →'
  },
  {
    id: 'mailbox-key-drop-trap',
    number: '03',
    title: 'The Mailbox Key-Drop Trap',
    shortTitle: 'Unverified Key Surrender',
    lossExposure: '$400–$2,500+ Holdover Rent',
    category: 'POSSESSION & CLOCK START',
    applicableStatute:
      'Cal. Civ. Code § 1950.5(g) · N.Y. Gen. Oblig. § 7-108(1-a)(e) · State Holdover Statutes',
    jurisdictions: ['ALL 51'],
    realWorldScenario:
      'On Sunday evening, the last day of his lease in Chicago, a consultant locks the apartment, drops the keys into the building’s unmarked “Office Drop Box” as instructed over the phone, and flies out for work. Two weeks later, the landlord claims they didn’t find the keys until Thursday—charging 4 days of prorated holdover rent ($480) and pushing the move-out date forward so the landlord’s own 30-day deposit deadline hasn’t expired.',
    hiddenBlackHole:
      'In nearly every state, the landlord’s statutory deposit clock does not start until “termination of tenancy AND delivery of possession”—which legally means returning the keys. Without timestamped, verifiable proof of when you surrendered the keys, the landlord controls the calendar, can bill daily holdover rent (sometimes at 150%–200% per diem under lease holdover clauses), and resets their statutory penalty deadline.',
    exactSurvivalMove: [
      'Never drop keys in an unstaffed drop box without a simultaneous, timestamped evidence trail.',
      'Best practice: Hand keys directly to the manager and get a signed, dated Key Surrender Receipt (even a quick photo of a handwritten receipt signed by the agent).',
      'If forced to use a drop box, record a continuous, uncut smartphone video showing the empty unit, locking the door, dropping the keys into the box, and the date/time—then immediately email the video link and timestamped photos to the landlord so the delivery timestamp is locked in their inbox.'
    ],
    relatedToolHref: '/calculators/lease-clause-scanner/',
    relatedToolLabel: 'Scan Holdover Clauses →'
  },
  {
    id: 'casual-text-vs-certified-mail-trap',
    number: '04',
    title: 'The Casual Text / Email vs. USPS Certified Mail Trap',
    shortTitle: 'Unverified Text vs. Certified Mail',
    lossExposure: 'Lost Bad-Faith Multiplier (2x–3x)',
    category: 'EVIDENTIARY PROOF',
    applicableStatute:
      'Tex. Prop. Code § 92.109 · Mass. Gen. Laws ch. 186 § 15B · Small Claims Evidence Rules',
    jurisdictions: ['ALL 51'],
    realWorldScenario:
      'A Boston tenant texts her landlord three times asking where her $3,200 deposit is. The landlord ignores the texts. Six weeks later, she files in small claims court seeking Massachusetts’s mandatory 3x damages ($9,600). At the hearing, the landlord claims he “never got those texts because he changed phones” or that he mailed a check to an old address, and the judge declines to award bad-faith treble damages because there is no formal statutory demand on the record.',
    hiddenBlackHole:
      'Judges treat casual text messages and unacknowledged emails as informal chatter, not statutory notice. Many state statutes explicitly require written notice delivered to the landlord’s statutory address, and proving “bad faith” or “willful retention” to unlock 2x or 3x damages requires showing the landlord received a formal, unmistakable statutory demand and still refused to comply.',
    exactSurvivalMove: [
      'Stop negotiating over SMS. Every critical notice—forwarding address, itemized deduction objection, and statutory demand—must go via USPS Certified Mail with Return Receipt Requested (PS Form 3811) or USPS Tracking.',
      'Always address it to the exact legal entity and notice address listed in your lease (not just the maintenance guy’s cell).',
      'Pair the Certified Mail tracking number with a same-day PDF copy via email so you have both physical proof of delivery and digital timestamp proof for the small claims judge.'
    ],
    relatedToolHref: '/calculators/small-claims-roi/',
    relatedToolLabel: 'Model Small Claims ROI →'
  },
  {
    id: 'full-replacement-carpet-paint-trap',
    number: '05',
    title: 'The Full-Replacement Carpet & Paint Trap',
    shortTitle: 'Illegal 100% Replacement Billing',
    lossExposure: '$1,200–$3,500+ Overcharge',
    category: 'HUD 4350.3 DEPRECIATION',
    applicableStatute:
      'HUD Handbook 4350.3 App. 5 · Cal. Civ. Code § 1950.5(b)(2) · State Wear & Tear Laws',
    jurisdictions: ['ALL 51'],
    realWorldScenario:
      'After living in a Seattle 2-bedroom for 4 years, a couple moves out with two small coffee stains on the bedroom carpet and minor scuff marks on the living room wall. The landlord attaches a $2,800 contractor invoice for brand-new luxury carpet and a full-unit repaint—deducting 100% of it from their $3,000 deposit. Thinking “well, there was a stain,” the tenants swallow the loss.',
    hiddenBlackHole:
      'Landlords routinely bill outgoing tenants 100% of capital-upgrade replacement costs. Under HUD Handbook 4350.3 and state landlord-tenant law, you NEVER owe for normal wear and tear, and even for actual tenant-caused damage, you only owe the depreciated remaining useful life—not brand-new replacement value. Standard useful life is 5–7 years for apartment carpet and 2–3 years for interior paint. On a 4-year-old paint job, remaining useful life is $0 (0%). On a 4-year-old 5-year carpet, at most 20% of the damaged room’s value applies.',
    exactSurvivalMove: [
      'Never accept a flat “carpet replacement” or “full repaint” invoice at face value—demand the original installation date and itemized square-footage invoice.',
      'Run the age of the carpet and paint through HUD 4350.3 useful-life proration: Paint (2–3 yr life) after 3+ years = $0 liability; Carpet (5–7 yr life) after 5+ years = $0 to 28% max.',
      'Serve a written Line-Item Rebuttal citing the exact depreciated calculation and demanding refund of the unlawful overcharge within 7 days.'
    ],
    relatedToolHref: '/calculators/wear-and-tear-deduction/',
    relatedToolLabel: 'Calculate HUD Depreciation →'
  },
  {
    id: 'ab1482-good-cause-exemption-loophole',
    number: '06',
    title: 'The AB 1482 / Good Cause Exemption Notice Loophole',
    shortTitle: 'Missing Statutory Exemption Notice',
    lossExposure: '$2,400–$6,000+/Yr Illegal Rent Hike',
    category: 'RENT CAP EXEMPTIONS',
    applicableStatute:
      'Cal. Civ. Code § 1946.2(e)(8) & § 1947.12(d)(5) · N.Y. Real Prop. Law § 214 (Good Cause)',
    jurisdictions: ['CA', 'NY', 'OR', 'WA'],
    realWorldScenario:
      'A San Diego family rents a single-family home (SFH) from a private LLC. At renewal, the landlord serves an 18% rent increase ($3,800 → $4,484/mo). When the tenants point out California’s AB 1482 cap (5% + CPI, max 10%), the landlord brushes them off: “Single-family homes are exempt from AB 1482—pay the 18% or move out.”',
    hiddenBlackHole:
      'In California, a single-family home or condo is ONLY exempt from AB 1482 rent caps and just-cause eviction if TWO strict conditions are met: (1) it is not owned by a REIT, corporation, or LLC with a corporate member, AND (2) the landlord timely served the mandatory statutory written exemption notice (exact statutory wording under Cal. Civ. Code § 1946.2(e)(8)). If the landlord forgot to put that exact notice in your lease—or is an LLC with a corporate member—they LOST the exemption, and the rent cap applies in full. Similarly, under NYC Good Cause Eviction (2024–2026), landlords claiming small-landlord or new-construction exemptions must serve mandatory statutory Good Cause disclosure notices.',
    exactSurvivalMove: [
      'Check your lease and renewal notices word-for-word for the mandatory statutory exemption disclosure text—if it’s missing, the landlord’s “SFH exemption” claim is void.',
      'Look up the owner’s deed/LLC entity on your Secretary of State portal: if an LLC has any corporate member or the property is corporate-owned, it is NOT exempt under AB 1482.',
      'Serve a formal Rent Cap Objection citing the missing statutory notice and tendering only the maximum lawful capped rent.'
    ],
    relatedToolHref: '/calculators/rent-increase-cap/',
    relatedToolLabel: 'Audit Your Rent Increase →'
  }
];

export const PITFALL_FAQS: PitfallFaq[] = [
  {
    question: 'Does sending a forwarding address late still protect my security deposit?',
    answer:
      'Yes, in most states. In jurisdictions like Texas, Michigan, North Carolina, and Florida, sending your written forwarding address late does not erase your deposit—it simply starts the landlord’s statutory return clock from the date they receive your written notice. Send it immediately via USPS Certified Mail.'
  },
  {
    question: 'What if I already cashed a partial deposit refund check marked "Payment in Full"?',
    answer:
      'Under UCC § 3-311, cashing a check marked "Payment in Full" can create a binding Accord and Satisfaction. However, some states have consumer-protection exceptions or require conspicuous notice (UCC § 3-311(b)), or allow a 90-day tender-back repayment window (UCC § 3-311(c)(2)). Consult your state’s specific commercial code or a local tenant clinic immediately.'
  },
  {
    question: 'Why does USPS Certified Mail matter if my landlord already reads my texts?',
    answer:
      'Small claims judges require verifiable proof of statutory notice and delivery date to award 2x or 3x bad-faith damages. Text messages can be disputed as undelivered, truncated, or informal, whereas USPS Certified Mail with Return Receipt creates an indisputable court-admissible delivery record.'
  },
  {
    question: 'Can a landlord charge 100% of new carpet or paint if I damaged one room?',
    answer:
      'No. Under HUD Handbook 4350.3 and state landlord-tenant law, you are only responsible for the depreciated remaining useful life of the damaged area—not brand-new replacement of an entire unit. Carpet typically depreciates over 5–7 years and interior paint over 2–3 years.'
  }
];
