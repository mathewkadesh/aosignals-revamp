export interface Service { title: string; description: string; icon: string }
export interface TeamMember { name: string; role: string; bio: string; image: string; social?: { facebook?: string; instagram?: string } }
export interface FAQ { category: 'Education & signals'|'Membership & billing'|'Bot & platforms'|'Risk & protection'; question: string; answer: string }
export interface Plan { id: string; name: string; price: number; period: string; billingNote: string; description: string; valueNote: string; bestFor: string; badge: string; icon: 'calendar'|'range'|'award'|'robot'; features: string[]; featured?: boolean; oneOff?: boolean }

// Public-directory assets are referenced by absolute path, which bypasses Vite's
// base-aware asset pipeline — so the deploy base must be prepended by hand.
// See: https://vite.dev/guide/assets.html#the-public-directory
export const withBase=(path:string)=>`${import.meta.env.BASE_URL.replace(/\/$/,'')}${path}`

export const siteContent = {
  company: { name: 'Alpha and Omega Signals Limited', shortName: 'AOS', number: '16325407', country: 'United Kingdom' },
  hero: {
    eyebrow: 'Strategy  •  Signals  •  Live analysis  •  Coaching',
    title: 'Learn the strategy. Understand the market.',
    body: 'Access the AOS trading course, educational signals, regular live analysis and a focused member community—all built around learning and personal judgement.',
  },
  membership: {
    name: 'AOS Complete', currency: '£', affiliatePercentage: 20,
    plans: [
      { id: 'monthly', name: 'Monthly membership', price: 200, period: 'month', billingNote: 'Billed monthly', description: 'Complete AOS membership with maximum flexibility and no long-term term.', valueNote: 'Start with full access and review your membership month by month.', bestFor: 'New members who want flexibility', badge: 'Most flexible', icon: 'calendar', features: ['Full course and learning library','Analysis, signals and live sessions','Private member community'] },
      { id: 'six-month', name: 'Six-month membership', price: 900, period: '6 months', billingNote: 'Billed every 6 months', description: 'A focused six-month learning cycle with the complete membership experience.', valueNote: 'Equivalent to £150/month — save £300 compared with monthly billing.', bestFor: 'Members building consistent habits', badge: 'Popular choice', icon: 'range', features: ['Everything in monthly membership','Six months of guided development','Lower effective monthly cost'] },
      { id: 'annual', name: 'Annual membership', price: 1600, period: 'year', billingNote: 'Billed annually', description: 'Twelve months of structured education, market context and community support.', valueNote: 'About £133/month — save £800 compared with monthly billing.', bestFor: 'Long-term learning and best overall value', badge: 'Best value', icon: 'award', features: ['Everything in complete membership','Full year of learning continuity','Lowest effective monthly cost'], featured: true },
      { id: 'aos-robot', name: 'AOS Robot', price: 600, period: 'one-off', billingNote: 'One-time technology licence', description: 'A rule-based automation add-on designed to support selected AOS strategy workflows.', valueNote: 'Includes configuration, market monitoring, activity history and emergency stop controls. Platform compatibility and availability apply.', bestFor: 'Members seeking structured execution support', badge: 'Technology add-on', icon: 'robot', features: ['Configurable risk controls','Monitoring and activity history','Manual emergency stop'], oneOff: true },
    ] as Plan[],
  },
  services: [
    { title: 'AOS trading course', icon: 'BookOpen', description: 'Build knowledge from market foundations through to structured analysis.' },
    { title: 'Strategy', icon: 'Waypoints', description: 'Learn the core AOS framework and develop a more repeatable process.' },
    { title: 'Educational signals', icon: 'Radio', description: 'See market observations and the reasoning behind how an expert approaches them.' },
    { title: 'Live analysis', icon: 'ChartNoAxesCombined', description: 'Join regular sessions examining forex market structure in real time.' },
    { title: 'Coaching and mentoring', icon: 'MessagesSquare', description: 'Develop trading habits, leadership and confidence through guided support.' },
    { title: 'Community learning', icon: 'Users', description: 'Learn alongside members who value preparation, discipline and progress.' },
  ] as Service[],
  botFeatures: ['Rule-based execution', 'Configurable risk settings', 'Market monitoring', 'Activity history', 'Emergency stop control', 'Selected platform connectivity'],
  benefits: ['Access to the AOS trading course', 'Access to AOS market analysis', 'Access to the educational signals group', 'Live trading and analysis sessions', 'Training sessions and learning library', 'Private member community', 'Selected CEO Q&A sessions', 'Affiliate eligibility, subject to separate terms'],
  team: [
    { name: 'Yakshan Karuna', role: 'Co-founder, CEO and Senior Trader', bio: 'Brings more than five years of foreign-exchange trading experience and more than ten years of leadership across different industries to AOS strategy, analysis and education.', image: withBase('/images/founder/yakshan-executive-v2.webp'), social: { facebook: 'https://www.facebook.com/profile.php?id=100075401247951', instagram: 'https://www.instagram.com/yakshan_karuna/' } },
    { name: 'Veena Yakshan', role: 'Co-founder and Director', bio: 'Brings more than ten years of accounting and payroll experience, alongside a strong background in leadership and member support.', image: withBase('/images/team/veena-yakshan.webp') },
  ] as TeamMember[],
  productStatus: 'Coming soon',
  images: {
    generatedHero: withBase('/images/founder/yakshan-trading-workspace-hero.png'), generatedWorkshop: withBase('/images/generated/aos-learning-workshop.webp'),
    generatedProductSuite: withBase('/images/generated/aos-product-suite.webp'),
    founderExecutive: withBase('/images/founder/yakshan-executive-v2.webp'), founderEducator: withBase('/images/founder/yakshan-educator-v2.webp'),
    founderWorkshop: withBase('/images/founder/yakshan-workshop-v3.webp'),
    heroDashboard: withBase('/images/hero/aos-hero-dashboard.webp'), heroLifestyle: withBase('/images/hero/aos-hero-lifestyle.webp'),
    botDesktop: withBase('/images/bot/aos-bot-interface.webp'), botMobile: withBase('/images/bot/aos-bot-mobile.webp'), botCloudHero: withBase('/images/bot/aos-bot-cloud-hero-v3.webp'),
    communityEvent: withBase('/images/community/aos-community-event.webp'), learningSession: withBase('/images/community/aos-learning-session.webp'),
    lifestyle: withBase('/images/lifestyle/long-term-freedom.webp'), companyVision: withBase('/images/about/aos-company-vision.webp'),
    educationRoadmap: withBase('/images/education/education-roadmap.webp'), signalsInterface: withBase('/images/signals/educational-signals-interface.webp'),
    membership: withBase('/images/membership/aos-membership-experience.webp'),
    insights: ['/images/insights/insight-01.webp','/images/insights/insight-02.webp','/images/insights/insight-03.webp'].map(withBase),
  },
  contact: {
    email: 'hello@aosignals.co.uk', hours: 'We aim to reply within two working days.',
    topics: ['General enquiry', 'Membership & billing', 'AOS Bot waitlist', 'Partnership enquiry', 'Platform integration', 'Press & media'],
  },
  risk: 'Trading financial markets involves risk and may not be suitable for everyone. Losses can exceed expectations, particularly where leveraged products are used. AOS provides educational information and does not provide personalised financial advice. Past performance is not a reliable indicator of future results.',
  faqs: [
    { category:'Education & signals', question:'Is AOS a broker or investment adviser?', answer:'No. AOS is positioned as a trading-education, general market-analysis and member-community business. It does not currently hold client money or execute customer trades. The precise regulatory classification of future signals, integrations and automation must be professionally reviewed before launch.' },
    { category:'Education & signals', question:'What makes an AOS signal educational?', answer:'An educational observation should identify the instrument and time frame, explain market context, show the area being studied, describe scenario reasoning and state what would invalidate the idea. It is not a command, personalised recommendation or guaranteed outcome.' },
    { category:'Education & signals', question:'How should I use live analysis?', answer:'Use sessions to examine how structure, scheduled events, volatility and risk are discussed in real time. Record the reasoning and test it against your own knowledge. A live session does not determine whether a trade is suitable for you.' },
    { category:'Membership & billing', question:'What is included in AOS membership?', answer:'The current proposition combines the structured course, general market analysis, educational signals, live learning sessions, training resources and private community access. Final service availability and access rules will be confirmed in the membership terms.' },
    { category:'Membership & billing', question:"What is the difference between the four options?", answer:'Monthly, six-month and annual options provide the complete membership with different billing periods and effective monthly costs. The £600 AOS Robot is shown separately as a one-time technology licence and is not recurring membership.' },
    { category:'Membership & billing', question:'How do renewal and cancellation work?', answer:'Membership plans are intended to renew at the end of their billing period until cancelled. The final checkout must clearly show the renewal date, cancellation method and cooling-off information before payment. Access would normally continue until the paid period ends, subject to the approved terms.' },
    { category:'Membership & billing', question:'What refund rights apply?', answer:'Statutory consumer rights remain unaffected. Cooling-off rights, immediate digital access, faulty or misdescribed services, duplicate payments and service problems require fair treatment under the final solicitor-approved cancellation and refund policy.' },
    { category:'Bot & platforms', question:'What is the £600 AOS Robot option?', answer:'It is a proposed one-time technology licence for rule-based monitoring, configurable controls, activity history and emergency-stop functions. It is separate from membership. Product availability, supported platforms, hosting costs and final functionality remain subject to technical, legal and regulatory approval.' },
    { category:'Bot & platforms', question:'Will the bot keep running when my device is offline?', answer:'Only a properly configured cloud-hosted deployment could continue independently of a personal device. Hosting would normally involve a separate third-party cost. Availability, security, monitoring and platform compatibility must be confirmed before this feature is offered.' },
    { category:'Bot & platforms', question:'Can automation prevent losses?', answer:'No. Automation can apply predefined rules consistently, but it can fail through incorrect settings, outages, latency, API changes, slippage, software defects or unexpected market behaviour. Human supervision and risk management remain necessary.' },
    { category:'Risk & protection', question:'Are profits or performance guaranteed?', answer:'No. No course, strategy, signal, live session or automated tool can guarantee profit or eliminate market risk. Past, hypothetical and backtested performance cannot reliably predict future results.' },
    { category:'Risk & protection', question:'Is trading suitable for everyone?', answer:'No. Consider your knowledge, experience, objectives, debts, dependants, emergency funds and ability to absorb loss. Leveraged products can create rapid losses. Independent financial, legal or tax advice may be appropriate.' },
    { category:'Risk & protection', question:'How can I identify an AOS impersonation attempt?', answer:'Verify the official website and contact channels. AOS should never ask for your password, seed phrase or unexpected remote-device access. Report cloned social accounts, unusual payment requests and suspicious messages through the official contact route.' },
    { category:'Risk & protection', question:'Where can I read the complete risk information?', answer:'The Trading Risk Disclosure is linked beside relevant product information and in the footer. Read it before purchasing education connected to trading or considering any technology tool.' },
  ] as FAQ[],
}
