# Aroma Bakery & Coffee — Website

A restrained, editorial, forest-green boutique-bakery site — built as static
HTML/CSS/JS with no build step, across seven pages: `index.html` (a
deliberately simplified homepage), `menu.html` (the full menu),
`custom-cakes.html`, `about.html`, `locations.html`, plus
`privacy.html`/`terms.html`.

## ⚠️ Before this goes live

1. **Real assets now committed: the official logo and the three drink-menu
   graphics.** All four live in `assets/img/`:
   - **`aroma-logo.jpg`** — the real Aroma mark (circular badge, dark forest
     fill, gold linework/typography, unaltered). Wired in as a real `<img>`
     everywhere it belongs: the intro splash on every page, the header
     brand mark (replacing the old text lockup), the footer, and the
     favicon. Not redrawn, not distorted — displayed via `object-fit:cover`
     inside a circular crop at each size it appears.
   - **`menu-coffee-espresso.jpg` / `menu-tea.jpg` / `menu-matcha.jpg`** —
     the real, finished drink-menu artwork, displayed full size and
     unaltered on `menu.html`'s Drinks tab (`object-fit:contain`, no
     recropping, no rewritten prices).
   - Everything else (product/interior photography, the hero storefront
     shot, the 7 custom-cake photos, About/Locations photography, the
     signature mousse video) remains generic labeled `.ph-photo`
     placeholders — none of those have been supplied yet. Swap each one for
     a real `<img>` per "Swapping in real photos" below.
2. **Business facts are real and confirmed** — both locations' addresses,
   phone `(445) 245-9284` / `tel:+14452459284`, hours (every day,
   9:00 AM – 6:00 PM at both locations), and the contact email
   `aromabakerycoffe@gmail.com` (spelled exactly as provided, do not "fix"
   it) are live in `locations.html`, the footer on every page, and the
   JSON-LD schema in `index.html` (`Organization` + one `Bakery` entry per
   location). If any of these change, update all of: `locations.html`, the
   footer, the `<head>` schema, and the `tel:`/`mailto:` links scattered
   through the CTAs.
3. **One brand, two Instagram accounts.** Aroma is a single brand
   ("Aroma Bakery & Coffee") with two Philadelphia locations that each run
   their own Instagram: Old City is `@aroma_bakery_coffee`, Northeast
   Philadelphia is `@aroma_bakery_ne` and goes by the name "Aroma Bakery"
   (no "& Coffee") in its own branding. The site-wide header/mobile-nav/
   footer Instagram link points at the primary `@aroma_bakery_coffee`
   account. Don't merge these into one account or swap them.
4. **WhatsApp ordering is wired but inert.** `custom-cakes.html`'s primary
   CTA is "Order on WhatsApp" (`.whatsapp-cta`), built entirely from a
   single `WHATSAPP_NUMBER` constant near the bottom of `assets/js/main.js`.
   It's currently the placeholder string
   `"REPLACE_WITH_AROMA_WHATSAPP_NUMBER"`, which intentionally fails the
   "looks like a real number" check, so the link stays inert (`aria-disabled`,
   tooltip) rather than pointing at a guessed number. Once the real
   ordering number is known, put it in that one constant (digits only,
   international format, e.g. `"12155551234"`) and every `.whatsapp-cta`
   link on the site updates automatically.

Swap remaining photo placeholders by replacing each `.ph-photo` div's classes
with a real `<img>` (see "Swapping in real photos" below). Nothing else needs
to change — the design system, layout and motion already work around your
final photography.

## How the design was built

### Site map

- `index.html` — the **homepage**, deliberately restrained: intro splash →
  hero (one image, one line, one CTA) → signature mousse video feature →
  menu category teasers (4 cards) → "Order a Custom Cake" CTA strip → one
  atmosphere photo → a small "Visit Our Locations →" link → a curated
  "Follow Aroma" section → footer. No Custom Cakes section, no detailed
  menu, no locations section — those live on their own pages instead, per
  the "let the imagery do the work, don't explain everything" direction.
- `menu.html` — the full tabbed menu (Sweet / Bread / Breakfast / Lunch /
  Coffee), moved off the homepage wholesale. The Sweet tab's dessert
  categories use dark, editorial `.food-editorial` panels rather than a
  text list; the Coffee tab leads with large `.drink-menu-art` artwork
  slots for Coffee & Espresso / Tea / Matcha. Supports deep links from the
  homepage's category cards via `menu.html#panel-<tab>` — `main.js` reads
  that hash on load, activates the right tab, and scrolls to it (the
  target panel starts `hidden`, so a plain anchor jump can't reach it on
  its own).
- `custom-cakes.html` — its own dedicated, very visual page: short intro →
  a 7-image mixed editorial gallery (`.cc-item-1`…`.cc-item-7`, one hero +
  supporting + wide + balanced portrait/landscape) → a closing "Order on
  WhatsApp" CTA. Reachable from every page's nav. Not a homepage section.
- `about.html` — deliberately minimal: one dark, low-exposure image hero
  ("OUR STORY" / "Aroma Bakery & Coffee" / one short supporting line) and a
  short 2-paragraph intro directly below it. No image/text split, no
  gallery, no closing quote section — kept intentionally short.
- `locations.html` — a dedicated Locations page: wide photographic hero →
  a single map showing both real addresses (a key-free Google Maps
  directions-embed between the two locations) → a short "Explore Our
  Locations" intro → two editorial location cards (photo, name, thin gold
  divider, description, address, hours, "Get Directions →"). The header/
  mobile-nav/footer "Locations" link on every page points here — it no
  longer scrolls to a homepage anchor.
- `privacy.html` / `terms.html` — still exist on disk (generic unreviewed
  legal templates) but are intentionally **not linked** anywhere in the
  customer-facing site (nav, mobile nav, or footer) — reachable only by
  direct URL.

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
- **Signature mousse video feature** (`#mousse` on the homepage,
  immediately after the hero) — the site's second and last deliberate
  motion moment after the green intro. `.mousse-video-placeholder` stands
  in for a real `<video id="mousseVideo">` (autoplay/muted/loop/playsinline,
  no controls, `preload="metadata"`, not the LCP element) — the exact
  markup to drop in is in an HTML comment right above `.mousse-feature` in
  `index.html`. It's purely decorative/atmosphere footage: `aria-hidden`
  and out of tab order, with the heading + one-line supporting copy
  carrying the actual meaning, so no screen-reader user is ever required
  to interact with a player. `main.js` already contains the
  `prefers-reduced-motion` handling for it (pauses instead of autoplaying,
  falls back to the `poster` frame) — guarded on `getElementById`, so it's
  a no-op today and activates automatically the moment the real `<video>`
  replaces the placeholder div. No further JS changes needed. Framed at
  16:9 desktop / 4:3 tablet (≤1024px) / 4:5 mobile (≤640px), `object-fit:
  cover`, generous cream space around it — not a full-bleed background.
- **Motion** — IntersectionObserver-driven reveals (opacity + translateY),
  a subtle hero cinematic zoom, header shrink-on-scroll, mobile full-screen
  nav with staggered link entrance (scrollable if content exceeds the
  viewport), and the mousse video above. That's the whole motion system —
  everything else is a small hover/transition, matching the "only two
  memorable motion moments" direction (green intro, then real food in
  motion).
- **Menu content** covers every category from the brief (Signature Mousse
  Cakes, Russian & European Cakes, Individual Desserts, Macarons,
  Tartlets, Rolls & Pastries, Cookies, Custom Cakes & Celebrations, Breads,
  Croissants, Quiches & Savory, Coffee & Espresso, Matcha, Tea, Cold
  Drinks) on `menu.html`. No prices, flavors, or hours were invented —
  anywhere specifics aren't confirmed, copy says "ask about today's
  selection" / "call for details." The menu intro also notes that
  "selection and availability may vary by location."
- **Footer** (same on every page) keeps to customer-facing links only —
  Home, Menu, About, Custom Cakes, Locations, Contact, Instagram — and
  credits "Created by CROWNE Creative" → https://crownecreative.com at the
  very bottom, kept small and understated. `privacy.html`/`terms.html` are
  deliberately not linked (see "Site map" above). All external links
  (Instagram, Maps, CROWNE Creative) use `rel="noopener noreferrer"`.
- **Locations** — one brand, two Philadelphia locations, each with its own
  address/hours/Get-Directions link, now on a dedicated `locations.html`
  (see "Site map" above) rather than a homepage anchor section.
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

## Adding the signature mousse video

Replace the `.mousse-video-placeholder` div in `index.html` (inside
`.mousse-frame`) with the `<video>` markup already written out in the HTML
comment directly above `.mousse-feature`. In short:

```html
<video id="mousseVideo" class="mousse-video" autoplay muted loop playsinline
       preload="metadata" poster="assets/img/signature-mousse-poster.jpg"
       aria-hidden="true" tabindex="-1">
  <source src="assets/video/aroma-signature-mousse.webm" type="video/webm">
  <source src="assets/video/aroma-signature-mousse.mp4" type="video/mp4">
</video>
```

Target a 6–10s clip, no audio track, optimized MP4/H.264 (+ WebM if
practical) at a resolution appropriate for a ~960px-wide display frame —
don't ship a 4K source. `main.js`'s reduced-motion handling picks this
element up automatically by `id`; nothing else needs to change.

## Running locally

No build step — just serve the folder:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Files

```
index.html              Homepage — intro, hero, signature mousse video
                         feature, menu teasers, Custom Cake CTA, atmosphere
                         photo, small locations link, Follow Aroma, footer
menu.html               Full tabbed menu (editorial dessert panels + drink art slots)
custom-cakes.html       Dedicated Custom Cakes page (7-image gallery, WhatsApp CTA)
about.html              Dedicated About page — one dark image hero + short intro only
locations.html          Dedicated Locations page (hero, map, two location cards)
privacy.html            Generic privacy policy (noindex, unreviewed template,
                         intentionally unlinked from the site)
terms.html              Generic terms of use (noindex, unreviewed template,
                         intentionally unlinked from the site)
assets/css/styles.css   Design system + all section styles + animations
assets/css/legal.css    Minimal styles for privacy.html / terms.html
assets/js/main.js       Intro splash, header transition, mobile nav, scroll
                         reveal, menu tabs (+ #panel-<tab> deep-linking),
                         WhatsApp link builder (WHATSAPP_NUMBER constant)
robots.txt
sitemap.xml
```
