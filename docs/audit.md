# Site audit against the design system

Audited on 2026-11-24, against `docs/design-system.md`, on branch `feat/glass-redesign` (based on `bbc8813`).

**How it was tested:** a production build (`next build && next start`) driven by headless Chrome at 390, 768 and 1440px. The checks were: console errors, horizontal overflow, LCP/CLS observers, a WCAG contrast pass over every visible text node and placeholder, a 25-stop keyboard Tab walk with screenshots of each focused element, a scan for focusable-but-invisible elements, accessible names from the ARIA snapshot, an internal link and anchor check, and `prefers-reduced-motion: reduce` emulation. Lint and build were clean before any changes.

**Baseline numbers (local, no throttling):**

| | 390 | 768 | 1440 |
|---|---|---|---|
| LCP | 904ms (profile photo) | 1268ms (H1, held back by its entrance animation) | 240ms (profile photo) |
| CLS | 0 | 0 | 0 |
| Horizontal overflow | none | none | none |
| Console errors | 0 | 0 | 0 |
| Page height | — | — | 11,363px |

There were no broken internal links or missing anchors.

**Status key:** ✅ fixed · ⏳ planned in a later step of this branch · ⬜ open

---

## P0: broken or blocking

### P0-1. Mobile GitHub and LinkedIn nav buttons have no accessible name ✅

- **Where:** `components/layout/Navbar.js:40-57`
- **Problem:** Below 640px the text label is `hidden` (display:none) and the icon has no title. The ARIA snapshot at 390px shows two links with an empty name. A screen reader announces "link" twice.
- **Fix:** Added `aria-label="GitHub profile (opens in a new tab)"` and the LinkedIn equivalent, and set the icons to `aria-hidden`. The visible label is at the start of each name, so WCAG 2.5.3 still passes.

### P0-2. Carousel arrows take keyboard focus while invisible ✅

- **Where:** `components/sections/Projects.js:124-137`
- **Problem:** The previous/next buttons are `opacity-0` until mouse hover. Tabbing lands on them (tab stop 13 on the homepage) and the screenshot shows nothing focused. This fails WCAG 2.4.7 (Focus Visible) on all 8 carousel buttons.
- **Fix:** Added `group-focus-within/carousel:opacity-100 focus-visible:opacity-100` and a visible `focus-visible:ring-2`. This becomes moot once step 4 replaces the cards, but it is fixed now so the checkpoint is shippable.

### P0-3. Text below WCAG AA contrast ✅

- **Where:** 34 instances across 9 files. The main ones:
  - `Contact.js:66,81,96`: the "Email", "LinkedIn" and "GitHub" labels, `neutral-500`, 4.1:1
  - `Contact.js:129,140,153`: placeholders, `neutral-600`, 2.5:1
  - `Footer.js:5`: `neutral-500`, 4.2:1
  - `Footer.js:8`: "Designed & Built…", `neutral-600`, 2.5:1
  - `app/projects/[slug]/page.js:267,279,375,391`: breadcrumb and sidebar headings, 4.1–4.4:1
  - `Screenshot.js:26`: captions
  - `case-studies/shared.js:135`, plus the cost tables in all three case studies
- **Problem:** Body-size text needs 4.5:1. Measured values ranged from 2.5:1 to 4.4:1.
- **Fix:** `text-neutral-500` → `text-neutral-400` (7.8:1) everywhere. The footer credit `neutral-600` → `neutral-400`. Placeholders → `neutral-400/80` (about 5:1). Decorative `aria-hidden` glyphs (`·`, `/`, code line numbers) are exempt and were left alone. A re-run of the contrast pass reports no failures on non-decorative text.

---

## P1: hurts a recruiter's first impression

### P1-1. Multicoloured text breaks the design system's hard rule ⏳ (hero and projects in steps 3–4) / ⬜ (rest)

Instances:

- **Gradient text:**
  - `Hero.js:56`: "Dias." in blue→purple
  - `Projects.js:43`: every stat value in cyan→blue
  - `app/projects/[slug]/page.js:293`: the case-study lead paragraph in blue→purple
- **Coloured tags:**
  - `Projects.js:310,437`: blue-400 tech tags (87 text nodes on the homepage are blue-400)
  - `Experience.js:110-123`: emerald organisation names and tags for work, blue for education
- **Other coloured text:**
  - `shared.js:58,62`: cyan monospace numbers in the case studies
  - `shared.js:172-173`: an amber callout heading
  - `SnakeNNCaseStudy.js:285,288,450` and `WumpusWorldCaseStudy.js:334,353,459,460`: coloured inline spans
  - `Contact.js:107`: an emerald success icon (an icon, so allowed, but the surface around it is emerald too)

**Problem:** The homepage renders 13 distinct text colours. The palette reads as "template" and pulls the eye away from the content.

**Fix:**

- Headings and values → `--fg`
- Organisation names → `--fg-2`
- Tags → the neutral chip from design system §8
- Links stay `--accent`
- Callouts → a neutral heading on a tinted surface

### P1-2. Hero says three different things and offers three equal CTAs ⏳ (step 3)

- **Where:**
  - `Hero.js:47`: the badge says "AI solutions consultant"
  - `Hero.js:64`: the H2 says "Data Scientist & Software Engineer · Melbourne"
  - `app/layout.js:9`: the title says "AI Solutions & Software Development Consultant"
  - `Hero.js:80-116`: View Projects, Contact Me and Resume carry equal visual weight (two of them identical), with GitHub and LinkedIn above them in the nav
- **Problem:** In a 10-second scan a recruiter can't tell which role to file you under, or which button matters.
- **Fix:** One positioning line ("Data Scientist & Software Engineer" is what the site's content proves), one eyebrow (role · Melbourne), one primary CTA (View projects) and one secondary (Download CV). Contact stays one tap away in the nav and section bar.

### P1-3. Page is 11,363px tall; projects alone take about 4,500px at 1440 ⏳ (step 4)

- **Where:** `Projects.js:274-381` and `Projects.js:385-481`. Each featured card stacks a carousel, a title, context, tags, three prose blocks, stats and links. Five more cards follow.
- **Problem:** Projects are the proof, but a recruiter has to scroll about five screens to see that NeuroDrive, Snake-NN and Wumpus exist.
- **Fix:** A compact grouped overview (the folder cards) that shows every project at a glance. The detail stays on the existing `/projects/[slug]` case-study pages.

### P1-4. Content is invisible until JavaScript runs ⬜

- **Where:**
  - `components/ui/SectionReveal.js:10`: `initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}` is server-rendered onto every section below the hero
  - `Hero.js:24-38`: the whole hero text column starts at `opacity: 0`
- **Problem:** With JS slow or blocked, everything is blank. LCP at 768px is the H1, held to 1268ms by its entrance animation. Blur reveals are also expensive to paint.
- **Fix:** Render content visible on the server, and reveal only after hydration (a CSS `@starting-style` or a class added on mount). Drop the `filter: blur()` reveals, per design system §7.

### P1-5. `prefers-reduced-motion` mostly ignored ⬜

- **Where:**
  - `Hero.js:18-19` and `Hero.js:152`: infinite `animate-pulse` orbs and ring
  - `Hero.js:129-149`: infinite float and particle loops
  - `SmoothScroller.js:7`: Lenis inertia always on
  - `MagneticEffect.js:10-16`
  - `CustomCursor.js:10-14`
  - `SectionReveal.js`
- **Problem:** Under reduce emulation, 3 CSS animations are still running, and the Framer Motion loops keep going (there is no `MotionConfig reducedMotion="user"` at the root). Only `MobileSectionNav` and `AnimatedGridBackground` respect the setting.
- **Fix:** Wrap the app in `<MotionConfig reducedMotion="user">`, prefix the CSS pulses with `motion-safe:`, and skip Lenis, the magnetic effect and the cursor when reduce is set. The hero shader (step 3) must render a still frame.

### P1-6. Screenshot lightbox is mouse-only and has no dialog semantics ⏳ (step 4) / ⬜

- **Where:** `Projects.js:92-95` (a `div onClick` opens it) and `Projects.js:162-239` (the modal)
- **Problem:**
  - The lightbox can't be opened from the keyboard.
  - It has no `role="dialog"` or `aria-modal`.
  - Esc doesn't close it, focus isn't trapped, and focus isn't returned afterwards.
  - On touch screens the arrows never appear (they are hover-only), leaving 6px dots (`Projects.js:151`) as the only control, far below the 44px minimum.
- **Fix:** If the carousel survives step 4: use a `<button>` trigger, a native `<dialog>` (which gives Esc and focus handling for free), always-visible arrows on `(hover: none)`, and 44px dot hit areas.

### P1-7. No skip link ⬜

- **Where:** `app/layout.js:61-63`
- **Problem:** A keyboard user tabs through 9 nav stops before reaching the content.
- **Fix:** Add a visually hidden "Skip to content" link as the first focusable element, targeting `<main id="main">`.

### P1-8. Positioning drift across SEO surfaces ⬜

- **Where:**
  - `app/layout.js:9-10`: "AI Solutions & Software Development Consultant"
  - `lib/site.js:27`: `jobTitle: "Data Scientist & Software Engineer"`
  - `app/opengraph-image.js:13`: "Software Engineer & Data Scientist"
- **Problem:** Search results, LinkedIn previews and the page itself each describe you differently.
- **Fix:** Pick one order and use it in all three places, plus the hero. This needs your call; I haven't changed it.

### P1-9. Contact form errors aren't announced ⬜

- **Where:** `Contact.js:157-159`
- **Problem:** The error `<p>` appears silently. The success state replaces the form without moving focus.
- **Fix:** Add `role="alert"` to the error. Move focus to the success heading (`tabIndex={-1}`) after a send.

---

## P2: polish

| # | Where | Problem | Fix | Status |
|---|---|---|---|---|
| P2-1 | `app/page.js:20-24` + `SectionReveal.js:7` | Each `<section id>` is wrapped in another unlabelled `<section>` | Make `SectionReveal` render a `div` | ⬜ |
| P2-2 | `Hero.js:60` | The subtitle is an `<h2>`, so the outline reads h1 "Rukshan Dias." → h2 "Data Scientist…" → h2 "Featured Projects" | Use a `<p>` | ⏳ step 3 |
| P2-3 | `Projects.js:284,287`; `Navbar.js:44,53`; `Skills.js:93`; `About.js:16-28` | Coloured glow shadows and hover gradients (blue/purple/emerald) | Use the neutral border step from design system §6 | ⬜ |
| P2-4 | `AnimatedGridBackground.js:11-53` | A fixed full-viewport layer (300% size) translating forever, plus two 50–60vw blurred orbs scaling forever. Constant compositing on every page | A static background, or one still radial gradient | ⬜ |
| P2-5 | `Projects.js:97-114` | Every carousel slide is rendered stacked, so all 3–5 screenshots per card download when the card enters view (about 15 large images) | Render only the current slide, with the next one preloaded on hover | ⏳ step 4 |
| P2-6 | `app/sitemap.js:5` | `lastModified: new Date()` stamps every URL with the build time, so crawlers see constant churn | Use `page.datePublished` or a fixed content date | ⬜ |
| P2-7 | `app/opengraph-image.js:18-20,147,171` | The social card uses gradient "Dias", purple, and blue chips | Match design system §1–2 | ⬜ |
| P2-8 | `app/globals.css:46` | Dead `font-family: Arial` (Inter's class wins) | Remove it | ⬜ |
| P2-9 | `Contact.js:47-49` | The heading "Let's Work Together" is followed by "Let's work together." | Drop the repeat from the lead | ⬜ |
| P2-10 | `Projects.js:491-500` | "View All Projects on GitHub" is a second white primary CTA, competing with the hero's | Make it a secondary button or a text link | ⬜ |
| P2-11 | `CustomCursor.js` | A blue cursor ring on desktop. It adds motion and a second accent, and it lags the real pointer | Remove it, or keep it only under `motion-safe` | ⬜ |
| P2-12 | `Hero.js:164` | The profile photo is served at `quality={90}` with a 1s blur-in | `quality={75}`, no filter animation. Moot once the hero is replaced | ⏳ step 3 |

---

## Coverage summary

| Area | Result |
|---|---|
| Hierarchy and scannability (10s) | P1-2, P1-3 |
| Project cards | P0-2, P1-3, P1-6, P2-5 |
| Contrast (WCAG AA) | P0-3 ✅ |
| Mobile layout | No overflow at 390. P0-1 ✅, P1-6 (touch arrows and dots) |
| Focus states | Default rings are visible on links and buttons. P0-2 ✅, P1-7 |
| Reduced motion | P1-5 |
| Performance (LCP/CLS) | CLS 0 everywhere. LCP fine locally; P1-4 holds the H1 back. P2-4, P2-5 |
| SEO and metadata | Solid: canonical, OG, Twitter, Person JSON-LD, per-project JSON-LD, sitemap, robots. P1-8, P2-6, P2-7 |
| Links and CTAs (resume, GitHub, contact) | All present and working. `/cv.pdf` resolves. P1-2, P2-10 |
| Multicoloured text | P1-1 (13 distinct text colours on the homepage) |
