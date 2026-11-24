# Design system: Rukshan Dias portfolio

Dark, restrained, premium, glass. One neutral type colour family and one accent. Colour lives in surfaces and artwork, never in type.

Built with the `ui-ux-pro-max` skill (v2.15.0), then adjusted by hand. The skill's combined `--design-system` result was a light luxury-fashion system (gold accent, Cormorant serif), which doesn't fit this site, so it was rejected. The targeted searches were used instead:

| Search | Match used |
|---|---|
| `glassmorphism dark` (style) | **Glassmorphism**: blur 10–20px, translucent fill 10–30%, 1px light border. Accessibility "conditional": needs 4.5:1 text, visible focus, reduced motion |
| `developer portfolio dark` (color) | **Portfolio/Personal: monochrome + blue accent** (light palette, inverted here for dark) |
| `technical modern clean sans` (typography) | **Modern Dark Cinema (Inter system)**: one family, 700 display, 600 headings, 400 body, 500 uppercase labels |
| `reduced motion`, `focus visible keyboard`, `contrast dark mode text` (ux) | High-severity rules, written into the sections below |

The skill's Inter pairing suggests gradient text for headings. That conflicts with the hard rule below, so it was dropped.

---

## 1. The rule that overrides everything

**Text is never multicoloured.**

- Headings and body: white and zinc neutrals only.
- One accent (`--accent`, periwinkle `#8EA4FF`) for **links, focus rings and the active nav state**. Nothing else in type.
- No gradient text (`bg-clip-text text-transparent`). No rainbow, cyan, emerald, purple or amber text. No coloured tags, chips or badges. Chips are neutral.
- The one large type effect on the site is the **glass headline in the hero** (a material effect, not a colour change).
- Colour lives in: the hero shader, glass surface tints, project artwork and screenshots, and the folder art.

If a design needs to signal state (success or error in the contact form), use an icon plus words, with the text in a neutral colour. A tinted surface is fine; tinted text is not.

---

## 2. Colour tokens

Contrast is measured against `--ground` (`#07090F`). WCAG AA needs 4.5:1 for body text and 3:1 for large text (24px+, or 18.66px+ bold).

### Surfaces (colour allowed)

| Token | Value | Use |
|---|---|---|
| `--ground` | `#07090F` | Page background, hero ground |
| `--surface` | `#0D1018` | Solid fallback for glass panels |
| `--raised` | `#141824` | Inputs, hovered rows |
| `--glass` | `rgba(255,255,255,0.04)` | Card fill over `--ground` |
| `--glass-strong` | `rgba(255,255,255,0.07)` | Nav, modal, hovered card |
| `--line` | `rgba(255,255,255,0.08)` | Hairline borders |
| `--line-strong` | `rgba(255,255,255,0.14)` | Hover and focus-within borders |
| `--highlight` | `inset 0 1px 0 rgba(255,255,255,0.06)` | Glass top-edge light |

### Artwork hues (surfaces and art only, never text)

One hue family, blue. These are also the hero shader's `colors` prop, in order (ground, then four accents):

`["#07090F", "#2F4CFF", "#6F8CFF", "#1B2A6B", "#E8EDFF"]`

`#2F4CFF` is only 3.4:1 on ground. **Never use it for text.**

### Type colours

| Token | Tailwind | Hex | On ground | Use |
|---|---|---|---|---|
| `--fg` | `zinc-50` | `#FAFAFA` | 19.1:1 | Headings, primary text, primary CTA fill |
| `--fg-2` | `zinc-300` | `#D4D4D8` | 13.5:1 | Body copy |
| `--fg-3` | `zinc-400` | `#A1A1AA` | 7.8:1 | Meta, labels, captions. **Lowest text colour allowed** |
| `--accent` | — | `#8EA4FF` | 8.4:1 (7.5:1 on `--raised`) | Links, focus ring, active nav |

`zinc-500` (`#71717A`) is 4.1:1 on ground, which fails AA. Use it only for decorative, `aria-hidden` glyphs such as `·` separators.

Placeholders use `zinc-400` at 80% opacity (about 5:1), and every field also has a visible label.

---

## 3. Typography

One family: **Inter** (already loaded through `next/font`, so no extra request). Use `font-feature-settings: "ss01", "cv11"` for the alternate `a` and `1`. Use `tabular-nums` wherever numbers sit in columns or stats.

| Role | Size (mobile → desktop) | Weight | Tracking | Line height | Colour |
|---|---|---|---|---|---|
| Display (hero glass headline) | `clamp(2.75rem, 8vw, 6rem)` | 700 | -0.04em | 1.0 | Glass effect |
| H1 (case study) | 2.25 → 3.5rem | 700 | -0.03em | 1.08 | `--fg` |
| H2 (section) | 1.875 → 2.5rem | 600 | -0.02em | 1.15 | `--fg` |
| H3 (card title) | 1.125 → 1.25rem | 600 | -0.01em | 1.3 | `--fg` |
| Body large | 1.125rem | 400 | 0 | 1.65 | `--fg-2` |
| Body | 1rem | 400 | 0 | 1.6 | `--fg-2` |
| Small | 0.875rem | 400/500 | 0 | 1.5 | `--fg-3` |
| Label / eyebrow | 0.75rem uppercase | 500 | +0.14em | 1.4 | `--fg-3` |

Rules:

- Body text is never below 16px. Small text is never below 12px.
- Keep measure to 65ch or less. Use `text-balance` on headings and `text-pretty` on paragraphs.
- Use one H1 per page, and don't skip heading levels.

---

## 4. Spacing and layout

4px base unit, on a spacious scale (the skill's density dial set to 3):

`4, 8, 12, 16, 24, 32, 48, 64, 96, 128`

| Thing | Value |
|---|---|
| Container | `max-w-6xl` (72rem), centred |
| Gutters | 24px mobile, 48px from `sm` |
| Section padding | 96px block (`py-24`), 128px on `lg` for the hero to projects gap |
| Card padding | 24px mobile, 32px desktop |
| Grid gap | 24px; 32px between large cards |
| Breakpoints | 390 (design floor), `sm` 640, `md` 768, `lg` 1024, `xl` 1280, 1440 (design ceiling) |

Anchored sections keep `scroll-margin-top: 6rem` so headings clear the fixed nav.

---

## 5. Radii

| Token | Value | Use |
|---|---|---|
| `--r-sm` | 8px | Chips, small buttons, code |
| `--r-md` | 12px | Inputs, buttons, image frames |
| `--r-lg` | 16px | Cards |
| `--r-xl` | 24px | Large panels, modals, folders |
| `--r-full` | 9999px | Pills, nav buttons, avatar |

Nested radius = outer radius minus padding (for example, a 24px card with 8px padding has 16px inner frames).

---

## 6. Elevation and glass

- **Glass recipe:** `--glass` fill, 1px `--line` border, `--highlight` inset. Add `backdrop-blur-xl` (24px) **only on things that float over content**: the nav, the mobile section bar and modals. Cards sit on a flat ground and don't need blur. Blur on dozens of cards is expensive to paint.
- **Shadows:** one soft dark drop only, `0 24px 48px -24px rgba(0,0,0,0.6)`. No coloured glows behind cards or buttons.
- **Hover:** the border steps from `--line` to `--line-strong`, and the fill from `--glass` to `--glass-strong`. Optional `translateY(-2px)`.

---

## 7. Motion

| Token | Value | Use |
|---|---|---|
| `--dur-micro` | 150ms | Colour and border changes |
| `--dur-ui` | 240ms | Buttons, hover lift, folder open |
| `--dur-reveal` | 480ms | Section and card entrance |
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Everything that enters |
| `--ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Exits, about 30% faster than the entrance |

Rules:

1. **Entrances:** opacity plus at most 16px of `translateY`. No `filter: blur()` reveals, which are expensive and smear text. Stagger children 60–140ms.
2. **Nothing loops forever** except the hero shader. The shader pauses when off screen or when the tab is hidden.
3. **Content is visible without JS.** Don't server-render `opacity: 0` on content. Reveal only what is below the fold, and only after hydration.
4. **`prefers-reduced-motion: reduce`:**
   - The hero shader renders one still frame, or the gradient fallback, with no animation loop.
   - No transforms, parallax, magnetic buttons, custom cursor springs or smooth-scroll inertia.
   - Opacity fades of 150ms or less are allowed. Everything else appears in its final state.
5. Animate only `transform` and `opacity`, never `width`, `height`, `top` or `left`.

---

## 8. Components

### Buttons

| Variant | Recipe |
|---|---|
| Primary | `--fg` fill, `--ground` text (19:1), `--r-full`, `h-12 px-6`, 600 weight. Hover: `zinc-200` fill. One per view |
| Secondary | `--glass` fill, `--line` border, `--fg` text. Hover: `--glass-strong` and `--line-strong` |
| Text link | `--accent` text, underline offset 4px, underline on hover. External links end with `↗` and announce "(opens in a new tab)" |

Every button and link is at least 44×44px of hit area on touch.

### Focus

Every interactive element has `focus-visible:outline-2 outline-offset-2 outline-[--accent]` (8.4:1 on ground). Never remove a focus outline without a replacement. Controls that fade in on hover must also show on `:focus-visible` and `:focus-within`.

### Chips and tags

Neutral only: `--glass` fill, `--line` border, `--fg-3` text, `--r-sm`, 12px text. No per-technology colours.

### Cards

Glass recipe (section 6), `--r-lg`, 24/32px padding. The title is H3 in `--fg`, and the title link covers the card (`after:absolute after:inset-0`) so the whole card is one target. Secondary links sit above it with `relative z-10`.

### Section header

An H2 in `--fg`, an optional one-line lead in `--fg-3`, then a hairline `--line` rule. No icons in headings.

### Stats

The value in `--fg` (600 weight, tabular-nums) and the label in `--fg-3`. **Not** gradient or accent-coloured.

### Nav

Fixed, `--glass-strong` plus `backdrop-blur-xl`, a bottom `--line` border, `h-16`, `z-50`. Links in `--fg-3`; hover and active states in `--fg`. The active section is marked by a 1px `--accent` underline. Icon-only buttons need an `aria-label`.

---

## 9. Imagery and art

- Project screenshots stay true colour. They are artwork.
- Folder and card art uses the single blue hue family from section 2, or the "glacier" preset. No red/orange/green mixes.
- Every image needs `width` and `height` (or `fill` inside a sized box) to keep CLS under 0.1. Only the LCP image gets `preload`/`priority`.
- Decorative art is `aria-hidden`.

---

## 10. Anti-patterns (from the skill, plus this site's own)

- Gradient or multicoloured text, and colour-coded tech tags
- Coloured glow shadows (`shadow-[0_0_40px_rgba(59,130,246,…)]`)
- Infinite pulse, float or particle animations
- Blur-in reveals
- Content that only appears on hover
- `zinc-500` or darker for text
- Emoji as icons (use Lucide)
- More than one primary CTA per view

## 11. Pre-delivery checklist

- [ ] No text uses a colour other than zinc neutrals or `--accent`
- [ ] All text is 4.5:1 or better (3:1 if large)
- [ ] Tab through the page: every stop has a visible ring and nothing invisible takes focus
- [ ] Reduced motion: no running animations except opacity fades
- [ ] Layout holds at 390, 768 and 1440 with no horizontal scroll
- [ ] LCP under 2.5s and CLS under 0.1 on a throttled mobile profile
- [ ] Resume, GitHub and contact are each reachable within one scroll of the hero
