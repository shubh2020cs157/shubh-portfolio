# Shubh Kamal Sharma — Portfolio

Personal developer portfolio built with **Next.js 16 (App Router)**, Tailwind CSS v4, and a dark cyan/neon design system. Includes a visitor views counter, a public recommendations form with admin moderation, and a contact form — all backed by Upstash Redis and Resend.

## Tech Stack

| Layer | Technologies |
| --- | --- |
| **Framework** | Next.js 16 (App Router, React 19, Turbopack) |
| **Styling** | Tailwind CSS v4 + CSS custom properties (design tokens) |
| **Fonts** | Space Grotesk · Inter · JetBrains Mono (via `next/font`) |
| **Animation** | Framer Motion (scroll reveals, marquee) |
| **Forms** | React Hook Form + Zod + Resend (email delivery) |
| **Data** | Upstash Redis (views counter, reviews KV store) |
| **Analytics** | Vercel Analytics |
| **Deploy** | Vercel (Edge + Node runtimes) |

## Local Development

```bash
# 1. Install dependencies
pnpm install

# 2. Set up environment variables
cp .env.example .env.local
# Edit .env.local and fill in your values (see below)

# 3. Start dev server
pnpm dev
# → http://localhost:3000
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Required | Description |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes | Resend API key — [resend.com](https://resend.com) |
| `CONTACT_FROM_EMAIL` | Yes | Sender address (verified Resend domain, or `onboarding@resend.dev` for dev) |
| `CONTACT_TO_EMAIL` | Yes | Where contact form emails are delivered |
| `UPSTASH_REDIS_REST_URL` | Yes | Upstash Redis REST URL — [console.upstash.com](https://console.upstash.com) |
| `UPSTASH_REDIS_REST_TOKEN` | Yes | Upstash Redis REST token |
| `ADMIN_TOKEN` | Yes | Secret for `/admin` dashboard — generate with `openssl rand -hex 32` |
| `NEXT_PUBLIC_BASE_URL` | Yes | Your deployed URL e.g. `https://shubhkamalsharma.vercel.app` |
| `NEXT_PUBLIC_SITE_URL` | Yes | Same as above — used in admin approval email links |

### Local dev without a verified Resend domain

Set `CONTACT_FROM_EMAIL=onboarding@resend.dev` — limited to 100 emails/day and can only deliver to the email associated with your Resend account.

## Deployment (Vercel)

1. Push to GitHub
2. Import project at [vercel.com/new](https://vercel.com/new)
3. Add all environment variables in **Settings → Environment Variables**
4. Deploy — Vercel auto-detects Next.js and configures build settings

## Project Structure

```text
app/
  layout.tsx                  # Root layout: fonts, theme script, metadata, Analytics
  page.tsx                    # Single-page composition (ISR, revalidate = 60s)
  opengraph-image.tsx         # Dynamic OG image (1200×630, Edge runtime)
  robots.ts                   # robots.txt
  sitemap.ts                  # sitemap.xml
  error.tsx                   # Route-level error boundary
  global-error.tsx            # Root-level error boundary
  not-found.tsx               # 404 page
  actions/
    send-message.ts           # Contact form → Resend email
    submit-recommendation.ts  # Recommendation form → Redis (pending) + Resend notification
    moderate-review.ts        # Admin approve/reject → Redis
  admin/
    layout.tsx                # Minimal admin layout (no navbar/footer)
    login/page.tsx            # Admin login page
    reviews/page.tsx          # Pending + approved reviews dashboard
  api/
    views/route.ts            # GET/POST views counter (Edge runtime, dedup by IP+UA hash)
    admin/login/route.ts      # POST admin token → httpOnly cookie (Node runtime)
  recommend/
    page.tsx                  # Public recommendation submission page
    thank-you/page.tsx        # Post-submit confirmation
components/
  layout/                     # SiteNavbar, SiteFooter, ViewsCounter
  hero/                       # HeroSection, TechMarquee
  about/                      # AboutSection
  journey/                    # JourneySection (experience timeline + approach)
  projects/                   # ProjectsSection, ProjectCard
  skills/                     # SkillsSection
  reviews/                    # ReviewsSection, ReviewCard
  contact/                    # ContactSection, ContactForm
  recommend/                  # RecommendForm, StarRating
  admin/                      # AdminLoginForm, AdminReviewList, AdminSignOutButton
  providers/                  # ThemeProvider (dark/light, anti-flash)
  ui/                         # GlassPanel, GradientButton, GhostButton, SectionHeader,
                              # FadeInView, TechChip, FloatingLabelInput, BrandIcons…
lib/
  content/                    # All copy: profile, experience, projects, skills, education
  schemas/                    # Zod schemas: contact, recommendation
  auth/admin.ts               # Constant-time token verification, cookie helpers
  redis.ts                    # Upstash client singleton + review/views helpers
  techIcons.tsx               # Tech icon map + renderTechIcon() helper
  utils/cn.ts                 # clsx + tailwind-merge helper
proxy.ts                      # Next.js 16 proxy (admin route protection)
```

## Key Features

- **Dark / Light theme** — anti-flash inline script sets correct theme before React hydrates; no flicker on any browser
- **Reviews system** — visitors submit via `/recommend`; admin approves at `/admin/reviews`; approved reviews appear on home page within 60 s (ISR)
- **Views counter** — deduplicated by `sha256(ip + userAgent)` with 1 h TTL; no PII stored
- **Contact form** — Zod-validated server action + honeypot spam trap; delivers via Resend
- **Security headers** — HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- **Admin auth** — constant-time token comparison, httpOnly Secure SameSite=Strict cookie, 7-day session

## Commands

```bash
pnpm dev          # Development server (Turbopack)
pnpm build        # Production build
pnpm start        # Serve production build locally
pnpm lint         # ESLint
npx tsc --noEmit  # TypeScript check
```
