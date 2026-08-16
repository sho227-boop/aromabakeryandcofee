# Aroma Bakery & Coffee — Website

A restrained, editorial, forest-green boutique-bakery site — built as static
HTML/CSS/JS with no build step, across four pages: `index.html` (a
deliberately simplified homepage), `menu.html` (the full menu),
`custom-cakes.html`, plus `privacy.html`/`terms.html`.

## ⚠️ Before this goes live

1. **Real assets seen but not yet committed: the official logo and a
   storefront photo.** Both were shared as chat images, which this
   environment cannot save to disk as files — there was no accessible
   upload path to read their bytes from. Everything is wired up and ready
   for them:
   - **Logo** — used in the intro splash (`.intro-logo`, present on every
     page, a circular placeholder right now) and referenced in a `TODO`
     comment next to `.header-brand` for the header wordmark. Save the real
     file to `assets/img/aroma-logo.png` (or `.svg`) and swap both spots
     for `<img>` tags — do not redraw the logo in HTML/CSS, per the brief.
   - **Storefront photo** — the homepage hero image (`.hero-img` in
     `index.html`) has a `TODO` comment showing the exact `<img>` markup to
     drop in (`assets/img/hero-storefront.jpg`, `fetchpriority="high"`, no
     lazy-loading — it's the LCP element).
   - All other product/interior photos remain generic labeled placeholders
     (`.ph-photo`, `data-caption` describes what belongs there, several
     carry dev-only labels like `EDITORIAL_01`, `MENU_DESSERTS`,
     `CUSTOM_CAKE_HERO` — strip those labels once real assets are in) —
     none of those were supplied yet.
2. **Business facts are real and confirmed** — both locations' addresses,
   phone `(445) 245-9284` / `tel:+14452459284`, hours, and the contact email
   `aromabakerycoffe@gmail.com` (spelled exactly as provided, do not "fix"
   it) are live in `index.html`, the footer, and the JSON-LD schema
   (`Organization` + one `Bakery` entry per location). If any of these
   change, update all four places: the `#locations` section, the footer,
   the `<head>` schema, and the `tel:`/`mailto:` links scattered through
   the CTAs.
3. **One brand, two Instagram accounts.** Aroma is a single brand
   ("Aroma Bakery & Coffee") with two Philadelphia locations that each run
   their own Instagram: Old City is `@aroma_bakery_coffee`, Northeast
   Philadelphia is `@aroma_bakery_ne` and goes by the name "Aroma Bakery"
   (no "& Coffee") in its own branding. The site-wide header/mobile-nav/
   footer Instagram link points at the primary `@aroma_bakery_coffee`
   account; each location card in `#locations` has its own correct
   Instagram button pointing at its own handle. Don't merge these into one
   account or swap them.

Swap remaining photo placeholders by replacing each `.ph-photo` div's classes
with a real `<img>` (see "Swapping in real photos" below). Nothing else needs
to change — the design system, layout and motion already work around your
final photography.

## How the design was built

### Site map

- `index.html` — the **homepage**, deliberately restrained: intro splash →
  hero (one image, one line, one CTA) → editorial moving photo strip → menu
  category teasers (4 cards) → one atmosphere photo → locations → a small
  curated "Follow Aroma" section → footer. No Custom Cakes section, no
  detailed menu, no "two locations" headline copy — those live on their own
  pages/sections instead, per the "let the imagery do the work, don't
  explain everything" direction.
- `menu.html` — the full tabbed menu (Sweet / Bread / Breakfast / Lunch /
  Coffee), moved off the homepage wholesale. Supports deep links from the
  homepage's category cards via `menu.html#panel-<tab>` — `main.js` reads
  that hash on load, activates the right tab, and scrolls to it (the
  target panel starts `hidden`, so a plain anchor jump can't reach it on
  its own).
- `custom-cakes.html` — its own dedicated, very visual page (hero + 5-image
  editorial gallery + closing CTA), reachable from every page's nav. Not a
  homepage section or a `#custom-cakes` anchor.
- `privacy.html` / `terms.html` — unchanged legal pages.

### Design system

- **Palette** — CSS custom properties in `:root` (`assets/css/styles.css`):
  deep forest green `#18352D` as the primary brand color (an accent system
  over cream/ivory surfaces, never a full green wash), a dark green
  `#102720` for the intro/deepest sections, soft taupe, chocolate brown and
  a muted, sparingly-used gold. Unchanged from before this pass.
- **Type** — Cormorant Garamond (editorial serif headlines) + Manrope (sans
  body/nav), loaded from Google Fonts at a trimmed set of weights only.
- **Intro splash** — a full-screen `#102720` title card (`.intro-splash` /
  `#introSplash`, present on every page) that fades the logo in from a
  slight blur+scale, then a subtitle, then dismisses itself after ~2.6s.
  Shows once per browser session via `sessionStorage`, and collapses to a
  fast plain fade under `prefers-reduced-motion`.
- **Editorial moving strip** (`#story` on the homepage) — the site's one
  deliberate exception to "no sliding motion": a slow (46s per loop, 64s on
  mobile), continuously-looping photography strip, pure CSS `transform`,
  no JS/carousel library. Two identical copies of the same 5 mixed-aspect-
  ratio images sit back to back in `.editorial-track`; translating exactly
  `-50%` loops seamlessly since both halves are pixel-identical. Under
  `prefers-reduced-motion` the animation stops, the duplicate copy is
  hidden (`.editorial-dup`), and the single set wraps into a static grid —
  content stays, only the motion goes.
- **Motion** — IntersectionObserver-driven reveals (opacity + translateY),
  a subtle hero cinematic zoom, header shrink-on-scroll, mobile full-screen
  nav with staggered link entrance (scrollable if content exceeds the
  viewport), and the editorial strip above. That's the whole motion system
  — everything else is a small hover/transition, matching the "only three
  noticeable types of movement" direction.
- **Menu content** covers every category from the brief (Signature Mousse
  Cakes, Russian & European Cakes, Individual Desserts, Macarons,
  Tartlets, Rolls & Pastries, Cookies, Custom Cakes & Celebrations, Breads,
  Croissants, Quiches & Savory, Coffee & Espresso, Matcha, Tea, Cold
  Drinks) on `menu.html`. No prices, flavors, or hours were invented —
  anywhere specifics aren't confirmed, copy says "ask about today's
  selection" / "call for details." The menu intro also notes that
  "selection and availability may vary by location."
- **Footer** (same on every page) links to `privacy.html` and `terms.html`
  (generic legal boilerplate, `noindex`, clearly marked as unreviewed
  templates — get these looked at by an attorney before relying on them)
  and credits "Created by CROWNE Creative" → https://crownecreative.com at
  the very bottom. All external links (Instagram, Maps, CROWNE Creative)
  use `rel="noopener noreferrer"`.
- **Locations** — one brand, two Philadelphia locations, each with its own
  address/phone/hours/Instagram/Get-Directions link. The homepage no longer
  headlines "Two Locations. One Aroma." — just a short "Find your nearest
  Aroma" before the two cards.
- **Responsive/a11y hardening** (all preserved from before, still true):
  `min-width:0` reset globally on `*` to prevent the classic flex/grid
  "min-width:auto" blowout; `overflow-x:clip` on `html`/`body`; safe-area
  insets (`env(safe-area-inset-*)`) on the header and mobile nav; a
  dedicated iPad (768–1024px) tuning pass on grids instead of just
  interpolating between mobile and desktop layouts. Newly verified at zero
  horizontal overflow, across all four pages, at 320/375/390/430/768/820/
  1024/1280/1440/1920px.
- **Pages without a hero** (`menu.html`, `custom-cakes.html`) force the
  header's solid "scrolled" style immediately via `main.js` — the header is
  transparent-over-cream by default (designed to overlay a dark hero
  image), which would otherwise render the cream wordmark invisible
  against a cream page background with nothing dark behind it.

## Swapping in real photos

Each placeholder is a `<div class="ph-photo ..." data-tone="...">`. Replace
it with:

```html
<img class="ph-photo" src="assets/img/your-photo.jpg" alt="Descriptive alt text"
     loading="lazy" width="1200" height="1500">
```

(Drop `loading="lazy"` only on the hero image — it must load eagerly.) Keep
the `.ph-photo`/wrapper classes so sizing, hover states and object-fit
treatment (add `object-fit:cover` in CSS if switching to `<img>`) keep
working. Use real, unedited Aroma photography — crop out any Instagram UI
chrome before use.

## Running locally

No build step — just serve the folder:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Files

```
index.html              Homepage — intro, hero, editorial strip, menu teasers,
                         locations, Follow Aroma, footer
menu.html               Full tabbed menu
custom-cakes.html       Dedicated Custom Cakes page
privacy.html            Generic privacy policy (noindex, unreviewed template)
terms.html              Generic terms of use (noindex, unreviewed template)
assets/css/styles.css   Design system + all section styles + animations
assets/css/legal.css    Minimal styles for privacy.html / terms.html
assets/js/main.js       Intro splash, header transition, mobile nav, scroll
                         reveal, menu tabs (+ #panel-<tab> deep-linking)
robots.txt
sitemap.xml
```
