# AOS website revamp

Production-oriented React frontend for Alpha and Omega Signals Limited. It positions AOS as an education-first market learning, community and technology membership without performance claims, fabricated social proof or implied regulatory status.

## Local development

```bash
npm install
npm run dev
```

Build with `npm run build` and preview with `npm run preview`.

## Editing content

Edit `src/data/siteContent.ts` for company details, copy, services, pricing, affiliate percentage, bot status/features, team profiles, platform placeholders, FAQs, contact details and risk wording. Design tokens and responsive styling are in `src/App.css`.

## Replacing images

The build uses styled placeholders and never requests missing files. Add approved, optimised WebP/AVIF assets under `public/images`, then replace the relevant placeholder with a sized, accessible `<img>` (lazy-loaded below the fold). Ratios: hero/bot 16:10, lifestyle 16:8, community 16:9, portrait 4:5 and articles 16:10.

## Integrations

- Connect login to an identity provider; fake authentication is intentionally absent.
- Connect contact/waitlist forms to a protected endpoint, with abuse controls and privacy disclosures.
- Publish platforms only after recording official website, regulator, licence reference, supported regions/accounts, integration method and verification date.
- Update the production hostname in `index.html`, `public/robots.txt` and `public/sitemap.xml`.

## Deployment

For Vercel or Netlify, use `npm run build` and publish `dist`. Add an SPA rewrite to `index.html`. Keep production secrets in host-managed environment variables.

## Required pre-launch approval

Legal placeholders, subscription/cancellation terms, affiliate terms, privacy/cookies, financial-promotion boundaries, bot capabilities, platform claims and jurisdictional availability require review by a qualified UK financial-services solicitor or compliance professional. Confirm the domain, email, hours, image permissions and accessibility content. Do not add FCA, performance, partnership or testimonial claims without evidence and consent.
