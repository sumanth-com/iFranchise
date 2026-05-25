/**
 * Curated franchise insights (4 articles) for investors and brand owners.
 */

import { BLOG_POST_IMAGES, blogPhoto } from './blog/blogImages';

const authors = [
  {
    name: 'Priya Mehta',
    role: 'Franchise Investment Advisor',
    bio: 'Priya helps investors compare franchise models, unit economics, and payback before they commit capital.',
    avatar: blogPhoto('1573496359142-b8d87734a5a2', 'avatar'),
  },
  {
    name: 'Arjun Kapoor',
    role: 'Brand Expansion Consultant',
    bio: 'Arjun works with QSR and retail brands on FOFO, FICO, and multi-city rollout planning across India.',
    avatar: blogPhoto('1472099645785-5658abf4ff4e', 'avatar'),
  },
  {
    name: 'Neha Sharma',
    role: 'Franchise Operations Lead',
    bio: 'Neha focuses on outlet performance, breakeven tracking, and operator onboarding for growing franchise networks.',
    avatar: blogPhoto('1580489944761-15a19d654956', 'avatar'),
  },
  {
    name: 'Rahul Menon',
    role: 'Market Research, iFranchise',
    bio: 'Rahul tracks category demand, city-level expansion, and investor interest across India’s franchise ecosystem.',
    avatar: blogPhoto('1507003211169-0a1dd7228f2d', 'avatar'),
  },
];

/** @typedef {{ id: string, heading: string, body: string[], quote?: string }} BlogSection */

/** @param {string} slug @param {BlogSection[]} sections */
function withSectionIds(slug, sections) {
  return sections.map((s, i) => ({
    ...s,
    id: `${slug}-s${i + 1}`,
  }));
}

/** @param {string} src @param {string} alt */
function packImages(src, alt) {
  return {
    thumbnail: src,
    image: src,
    imageAlt: alt,
  };
}

const posts = [
  {
    slug: 'how-to-evaluate-franchise-opportunity-india',
    title: 'How to Evaluate a Franchise Opportunity in India',
    category: 'Investor Guide',
    date: '2026-04-18',
    readTime: '9 min read',
    ...packImages(BLOG_POST_IMAGES[0], 'Investors reviewing franchise documents in a meeting'),
    excerpt:
      'A practical framework to compare brands, investment bands, payback, and support before you sign a franchise agreement.',
    quote:
      'The best franchise decisions are boring on paper: clear costs, clear support, and clear unit economics.',
    introHighlight:
      'Most costly franchise mistakes happen before signing, when excitement replaces structured comparison.',
    author: authors[0],
    sections: withSectionIds('evaluate', [
      {
        heading: 'Start with fit, not fame',
        body: [
          'A famous logo does not guarantee a franchise that fits your city, capital, or time. Begin with category demand in your catchment, the business model you can actually run (FOFO, FICO, or hybrid), and the total cash you can deploy without draining personal reserves.',
          'Write three filters before you meet any brand: maximum all-in investment, target payback window, and how many hours per week you will spend on the business. Use these filters in the first call so you do not waste weeks on formats that were never right for you.',
          'When two brands pass the filter, compare them on the same spreadsheet columns: setup cost, royalty, marketing fund, expected AUV band, and support during the first twelve months. Consistency beats charisma in franchise selection.',
        ],
      },
      {
        heading: 'What to verify in the disclosure pack',
        body: [
          'Request the full disclosure pack early: sample agreements, itemised setup costs, and a list of what is excluded from the quoted investment (civil work, GST, deposits, initial inventory). Many disputes start because “total investment” meant different things to the brand and the investor.',
          'Clarify every recurring fee in writing: royalty, marketing contribution, technology charges, and mandatory purchases from approved vendors. Ask whether fees apply on gross or net sales and whether discounts are shared.',
          'Payback claims should come with assumptions you can challenge—rent per sq.ft., staffing norms, and sales ramp month by month. If the brand cannot explain unit economics in plain numbers, treat that as a serious signal, not a paperwork delay.',
        ],
      },
      {
        heading: 'Site, competition, and local demand',
        body: [
          'Franchise performance is local. Walk the catchment at peak and lean hours. Count direct and indirect competitors, note delivery density for food formats, and sanity-check whether the proposed store size matches how people actually shop in that micro-market.',
          'For food brands, understand delivery mix and kitchen capacity. For retail, understand inventory turns and shrinkage norms for your store size. A strong national brand can still fail on a weak local site.',
          'Match rent to a realistic sales band. If rent crosses your category’s healthy rent-to-sales ratio, fix the site or fix the model before you sign.',
        ],
      },
      {
        heading: 'Decision checklist before you sign',
        body: [
          'Speak with at least two franchisees in cities and catchments similar to yours. Ask about real payback timing, surprise costs after opening, and how quickly the franchisor responds when operations slip.',
          'Model two scenarios on the same template: a conservative case with slower ramp and higher rent, and a base case using brand assumptions. Proceed only if the conservative case still meets your return hurdle.',
          'Before execution, confirm territory scope on a map, supplier and working-capital norms, local compliance support, and how disputes escalate. Signed clarity on fees and renewal terms protects both sides.',
        ],
      },
      {
        heading: 'Use iFranchise to shortlist faster',
        body: [
          'Start on iFranchise by filtering opportunities on investment band, category, and city so your first conversations are with brands that already match your budget and location.',
          'Download brochures where available and note FOFO, FICO, or hybrid model options before you book a call. Arrive with a comparison sheet so meetings focus on validation, not basic discovery.',
          'When a brand passes your filters, schedule a site visit in a comparable catchment and speak with an existing franchisee in the same format. That combination saves months compared to evaluating brands at random.',
        ],
      },
    ]),
  },
  {
    slug: 'fofo-vs-fico-franchise-model-guide',
    title: 'FOFO vs FICO: Choosing the Right Franchise Model',
    category: 'Investor Guide',
    date: '2026-04-10',
    readTime: '8 min read',
    ...packImages(BLOG_POST_IMAGES[1], 'Quick-service restaurant counter and dining area'),
    excerpt:
      'Understand owner-operated vs investor-operated models so your role, risk, and returns match how you want to build wealth.',
    quote: 'Pick the model that fits how you want to spend your time—not just the headline ROI.',
    introHighlight:
      'FOFO and FICO solve different problems: hands-on entrepreneurship versus capital deployment with professional operations.',
    author: authors[1],
    sections: withSectionIds('fofo-fico', [
      {
        heading: 'FOFO: franchise-owned, franchise-operated',
        body: [
          'In FOFO you invest and operate. You own the P&L, hiring decisions, and daily customer experience. When execution is strong, upside is meaningful; when execution slips, the risk sits with you—not with a distant operator.',
          'FOFO suits people who want a proven brand system but are ready to be present in the business. It is rarely passive, even when the brand is well known.',
          'Success in FOFO usually comes from operator skill plus brand pull. If you have category experience, FOFO can compound what you already know.',
        ],
      },
      {
        heading: 'FICO: franchise-investor, company-operated',
        body: [
          'In FICO you typically provide capital while the franchisor or an approved operator runs the outlet. Your role shifts to governance: reviewing monthly reports, visiting sites, and holding the operator accountable to agreed targets.',
          'Returns are often framed as revenue share, minimum guarantee, or a fixed return on deployed capital. Each structure carries different risk if sales underperform or costs run high.',
          'FICO is not “hands-off” by default. You still need disciplined monitoring. The difference is where you spend time—in oversight rather than shift management.',
        ],
      },
      {
        heading: 'How to choose for your situation',
        body: [
          'If you have operating experience in the category and want direct control, FOFO can be the better fit. If you are building a portfolio of units and prefer professional operations per site, FICO can scale with less daily involvement.',
          'Many investors learn with one FOFO unit, then move to FICO for additional cities once they trust the operator, reporting rhythm, and true unit economics.',
          'Choose based on weekly time, risk appetite, and whether your edge is operations or capital allocation—not based on which brochure promises a faster payback.',
        ],
      },
      {
        heading: 'Questions to ask the franchisor',
        body: [
          'Ask for a side-by-side comparison of FOFO and FICO for the same format: investment, fee stack, expected payback, and your obligations under each agreement.',
          'Clarify who holds the lease, who employs staff, who approves capex, and how marketing money is split between national campaigns and local store needs.',
          'Understand exit rules early: whether you can sell, how transfer approval works, and what happens if performance misses agreed thresholds.',
        ],
      },
      {
        heading: 'A simple timeline that works',
        body: [
          'Week one: define your weekly time budget, capital band, and target cities. Week two: compare three to five brands on the same spreadsheet columns before any site visit.',
          'Week three: speak with franchisees under each model you are considering. Week four: run FOFO and FICO scenarios with conservative rent and sales assumptions.',
          'Only after those steps schedule legal review and signing. Rushing to a deposit before model clarity is where most first-time investors lose leverage.',
        ],
      },
    ]),
  },
  {
    slug: 'franchise-unit-economics-checklist',
    title: 'Unit Economics Checklist Before You Sign',
    category: 'For Operators',
    date: '2026-03-28',
    readTime: '7 min read',
    ...packImages(BLOG_POST_IMAGES[2], 'Business analytics dashboard on a laptop'),
    excerpt:
      'Breakeven, contribution margin, and working capital—what to model line by line before you commit to a franchise unit.',
    quote: 'If the spreadsheet only works on best-case rent and best-case sales, it is not ready for a signature.',
    introHighlight:
      'Unit economics turn marketing brochures into decisions you can defend to partners, lenders, and your future self.',
    author: authors[2],
    sections: withSectionIds('unit-economics', [
      {
        heading: 'Revenue assumptions that survive reality',
        body: [
          'Anchor revenue to comparable outlets, not network averages alone. Match rent band, store size, and catchment type. If the brand only shares a national AUV, ask for a tier that looks like your planned location.',
          'Build a twelve to eighteen month ramp. Mature sales in month one are rare in food and retail. Account for reviews, delivery visibility, and repeat visits building over time.',
          'Where channels differ, model them separately. Dine-in, delivery, and catering can carry different commissions, packaging cost, and refund rates. Blended assumptions hide margin leaks.',
        ],
      },
      {
        heading: 'Cost stack every franchisee should model',
        body: [
          'Place every recurring cost on one sheet: COGS, labour, rent, utilities, royalty, marketing fund, payment fees, insurance, and local compliance. A single missing line can erase an otherwise attractive margin.',
          'Include franchisor-mandated spends from day one: POS, apps, uniforms, audits, and periodic refreshes. Treat them as operating cost, not as surprises in year two.',
          'Rebuild payback using cash you actually invest, including debt EMI and opening working capital. Brochure payback often ignores both.',
        ],
      },
      {
        heading: 'Working capital and surprises',
        body: [
          'Hold three to six months of operating cash beyond opening day. Inventory timing, vendor credit, and payroll cycles can leave the P&L healthy while the bank account is tight.',
          'Ask who funds launch marketing, equipment replacement, and compliance upgrades after year one. If the cost is yours, it belongs in the model now.',
          'Stress-test seasonality. Local festivals, holidays, and school calendars can move sales sharply in many formats.',
        ],
      },
      {
        heading: 'Sign-off checklist',
    body: [
          'Sign only when a conservative case still clears your minimum return. If only the optimistic case works, pause and renegotiate assumptions or walk away.',
          'Save the model with dated inputs and sources. Revisit at ninety days post-open with real rent, labour, and sales. Early reality checks prevent expensive denial later.',
          'A useful final test is combined stress: lower sales and higher rent together. Resilient units survive that pair; fragile units do not.',
        ],
      },
      {
        heading: 'Share the model with people who matter',
    body: [
          'If you have a co-investor or spouse involved in the decision, walk them through the same spreadsheet line by line. Hidden disagreement on payback assumptions causes conflict after opening.',
          'For bank or family funding, attach a one-page summary: investment, monthly costs, breakeven sales, and payback under conservative and base cases. Lenders respond better to clarity than to brand slides alone.',
          'Keep a version dated before signing and update it at thirty, ninety, and one hundred eighty days post-open. That habit turns your first unit into a repeatable playbook for the next city.',
        ],
      },
    ]),
  },
  {
    slug: 'franchise-demand-india-2026',
    title: 'Where Franchise Demand Is Heading in India',
    category: 'Market Insight',
    date: '2026-03-15',
    readTime: '6 min read',
    ...packImages(BLOG_POST_IMAGES[3], 'Indian food service and dining spread'),
    excerpt:
      'Food, retail, and service formats continue to attract investors—here is how to read category momentum and city-level opportunity.',
    quote:
      'Growth is uneven by city and format; winners align brand strength with local demand and operator quality.',
    introHighlight:
      'National headlines hide local reality: tier-2 food and compact QSR formats remain active while oversized formats face rent pressure.',
    author: authors[3],
    sections: withSectionIds('demand-2026', [
      {
        heading: 'Categories investors are watching',
    body: [
          'Food and beverage still lead franchise interest in India, especially QSR, café formats, and delivery-ready kitchens. Investors like defined tickets, repeatable menus, and visible footfall proxies.',
          'Apparel and lifestyle retail attract capital where mall and high-street rents align with brand positioning. Success depends on inventory discipline as much as footfall.',
          'Service formats—wellness, education, home services—grow where repeat revenue and moderate capex appeal to first-time franchisees expanding beyond a single city.',
        ],
      },
      {
        heading: 'City and format fit',
    body: [
          'Metro markets reward experience and differentiation. Tier-2 markets often reward efficient box sizes, strong delivery, and rent discipline.',
          'Oversized units remain a common payback mistake. Match square footage and staffing to local spending power, not to a hero store photo from another city.',
          'Before you commit, sanity-check rent-to-sales guardrails for your category, delivery commission impact, and labour availability for training and retention.',
        ],
      },
      {
        heading: 'What serious investors expect now',
    body: [
          'Transparent investment bands and model options (FOFO/FICO) are baseline. Investors increasingly arrive with comparison spreadsheets and specific questions on unit economics.',
          'Brands that share comparable outlet data and post-opening support convert serious leads faster than brands that sell territory on narrative alone.',
          'Trust is built when numbers, responsibilities, and escalation paths are clear before the agreement is signed.',
    ],
  },
  {
        heading: 'Using data in your decision',
    body: [
          'Compare brands on the same fields: investment range, space requirement, model type, payback band, and cities open for expansion. Then validate locally with site visits and franchisee conversations.',
          'On iFranchise you can shortlist by category and investment band, open detail pages, and download brochures where available—so your first meeting is about verification, not discovery.',
          'Whether you invest or list a brand, clarity on economics and support is what turns interest into sustainable network growth.',
    ],
  },
  {
        heading: 'Where to look in the next ninety days',
    body: [
          'If you are expanding in tier-2, prioritise formats with smaller boxes, strong delivery, and transparent unit economics over hero stores built for metro rents.',
          'Track two to three categories only—food, retail, or services—and compare at least four brands per category on the same fields before you commit time to site visits.',
          'Revisit demand quarterly: rent, labour, and delivery commissions move faster than brochure payback charts. A brand that looked ideal six months ago may need a fresh model before you sign.',
        ],
      },
    ]),
  },
];

export const blogPosts = posts;

/** @deprecated Listing page no longer uses filters; kept for compatibility. */
export const blogCategories = ['All'];

export const getBlogBySlug = (slug) => blogPosts.find((post) => post.slug === slug);

export const formatDisplayDate = (isoDate) =>
  new Date(isoDate).toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
