# Arrise Digital — Website

A premium, multi-page website for **Arrise Digital**, a creative digital growth studio. Built with the Next.js App Router, TypeScript, Tailwind CSS and Framer Motion.

**Brand:** Partners in Progress.  
**Positioning:** We don't just generate leads. We build businesses.

---

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 15 (App Router, React 19) |
| Language | TypeScript |
| Styling | Tailwind CSS 3 + custom design tokens |
| Animation | Framer Motion (CSS marquee + scroll reveals) |
| Icons | Lucide React |
| Forms | React Hook Form + Zod |
| Email | Resend REST API (server route) |
| Fonts | Space Grotesk, Inter, Instrument Serif via `next/font` |

No UI component library is used — the design system is custom.

---

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Production build:

```bash
npm run build
npm start
```

Type check:

```bash
npm run typecheck
```

---

## Environment variables

Copy `.env.example` to `.env.local` and fill in the values.

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes (for the contact form) | Sends project enquiries by email |
| `CONTACT_TO_EMAIL` | Recommended | Inbox that receives enquiries (defaults to the public email) |
| `CONTACT_FROM_EMAIL` | Recommended | Verified sender, e.g. `Arrise Digital <hello@yourdomain.com>` |
| `CONTACT_WEBHOOK_URL` | Optional | Slack/Discord/Zapier notification for new enquiries |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical production URL used for metadata and sitemap |

### Contact form behaviour

The form posts to `app/api/contact/route.ts`. That route:

1. Validates the payload server-side with the same Zod schema used on the client.
2. Silently accepts honeypot submissions (spam protection).
3. Applies a best-effort in-memory rate limit (6 submissions / 10 minutes per IP).
4. Sends a formatted HTML email through Resend.
5. Optionally posts a short notification to `CONTACT_WEBHOOK_URL`.

**The form never fakes a success state.** If `RESEND_API_KEY` is missing or delivery fails, the API returns a clear error and the UI tells the visitor to email directly. Configure Resend before launch.

---

## Editing content

All content lives in typed data files — no CMS required:

| File | Contains |
| --- | --- |
| `data/services.ts` | Service copy, deliverables, benefits, process, FAQs, related work |
| `data/projects.ts` | Case studies, categories, palettes, gallery captions |
| `data/insights.ts` | Articles, categories, takeaways, category colour tones |
| `data/faqs.ts` | Homepage and services FAQs |
| `data/testimonials.ts` | Verified testimonials (intentionally empty) |
| `data/company.ts` | Stats, process steps, differentiators, industries |
| `data/navigation.ts` | Header/footer navigation |
| `lib/site.ts` | Brand name, email, phone, social links, location, availability |

Pages read from these files at build time. Project and insight detail routes use `generateStaticParams`.

---

## Accuracy and verification notes

This site was rebuilt from the existing Arrise Digital website and the supplied brand brief. Before publishing, please confirm the following:

- **Projects:** The six project names (Bangles by Beauty, Le Brew, ABS Utility Solutions, Bon Appétit, SMP Food Products, Dhiya Garments) come from the existing site. The industry, services delivered, challenge/solution copy and gallery captions are **drafted placeholders** and must be verified or replaced with approved case-study content. No client metrics or results are invented. `liveUrl` is intentionally empty until confirmed.
- **Testimonials:** The testimonial data is empty by design. The homepage renders an honest "references on request" state instead of fabricated reviews. Add entries only with written client approval.
- **Metrics:** Only `15M+ video views` (from the existing site) and `3 hrs → 20 mins` (described as a demonstrated workflow) are used, each with a caveat. The `6+ brands` figure reflects the six listed projects; adjust it if the real client count differs.
- **Contact details:** Email (`arrisedigital@gmail.com`), WhatsApp (`+91 93639 73591`), Instagram and GitHub are taken from the existing site. The placeholder New York address was deliberately removed. Update `lib/site.ts` if the verified details change.
- **Legal pages:** Privacy and Terms are practical starting points, not legal advice. Have them reviewed for your jurisdiction before launch.

---

## Structure

```
app/
  page.tsx                 Home
  about/                   About
  services/                Services overview
  services/[slug]/         Four service pages
  work/                    Filterable portfolio
  work/[slug]/             Case studies
  insights/                Blog index
  insights/[slug]/         Articles
  contact/                 Enquiry form
  privacy-policy/ terms/   Legal
  api/contact/             Server-side form delivery
  sitemap.ts robots.ts     SEO routes
  opengraph-image.tsx      Generated social image
components/
  layout/                  Header, footer, page hero, legal layout
  sections/                Page sections (hero, services, work, process…)
  ui/                      Reveal, buttons, marquee, accordion, covers…
  forms/                   Contact form
data/                      Typed content
lib/                       Site config, validation, utilities
```

---

## Design system

- **Palette:** paper `#F7F7F5`, ink `#111111`, muted `#777777`, line `#E5E5E5`, accent `#FF6B00`.
- **Type:** Space Grotesk (display), Inter (body), Instrument Serif (editorial italic accents).
- **Motion:** reveals on scroll, hover-preview services, magnetic buttons, marquee, custom cursor, scroll progress. All animation respects `prefers-reduced-motion`.
- **Visuals:** project and insight covers are generated with CSS/SVG (no stock imagery or broken external assets). Replace with real project imagery in `components/ui/project-cover.tsx` / `insight-cover.tsx` when assets are available.

---

## Accessibility

- Semantic landmarks and heading order
- Skip-to-content link
- Keyboard-accessible navigation, accordions and filters
- Visible focus styles
- Form labels, `aria-invalid`, `aria-describedby` and alert messaging
- Reduced-motion support
- Custom cursor disabled on touch devices and when reduced motion is requested

---

## Deployment

The project deploys to Vercel with no extra configuration. Add the environment variables above in the project settings, then set `NEXT_PUBLIC_SITE_URL` to the production domain so canonical URLs, Open Graph metadata and the sitemap resolve correctly.

`/opengraph-image` is generated at request time with `next/og`. Replace it with a designed asset if preferred.
