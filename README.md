# Aroma Bakery & Coffee — Website Redesign

A complete editorial redesign of the Aroma Bakery & Coffee website: full-bleed
photography, oversized serif headlines, a forest-green luxury palette, and
scroll-driven motion — built as static HTML/CSS/JS with no build step.

## ⚠️ Before this goes live

1. **Two real assets are seen but not yet committed: the official logo and
   the Old City storefront photo.** Both were shared as chat images, which
   this environment cannot save to disk as files — there was no accessible
   upload path to read their bytes from. Everything is wired up and ready
   for them:
   - **Logo** — used in the intro splash (`.intro-logo` in `index.html`,
     a circular placeholder right now) and referenced in a `TODO` comment
     next to `.header-brand` for the header wordmark. Save the real file to
     `assets/img/aroma-logo.png` (or `.svg`) and swap both spots for
     `<img>` tags — do not redraw the logo in HTML/CSS, per the brief.
   - **Old City storefront photo** — the hero image (`.hero-img` in
     `index.html`) has a `TODO` comment showing the exact `<img>` markup to
     drop in (`assets/img/hero-storefront.jpg`, `fetchpriority="high"`, no
     lazy-loading — it's the LCP element).
   - All other product/interior photos remain generic labeled placeholders
     (`.ph-photo`, `data-caption` describes what belongs there) — none of
     those were supplied yet.
2. **Business facts are real and confirmed** — both locations' addresses,
   phone `(445) 245-9284` / `tel:+14452459284`, hours, the Instagram handle
   `@aroma_bakery_coffee`, and the contact email `aromabakerycoffe@gmail.com`
   (spelled exactly as provided, do not "fix" it) are live in `index.html`,
   the footer, and the JSON-LD schema (`Organization` + one `Bakery` entry
   per location). If any of these change, update all four places: the
   `#locations` section, the footer, the `<head>` schema, and the
   `tel:`/`mailto:` links scattered through the CTAs.

Swap remaining photo placeholders by replacing each `.ph-photo` div's classes
with a real `<img>` (see "Swapping in real photos" below). Nothing else needs
to change — the design system, layout and motion already work around your
final photography.

## How the design was built

- **Palette** — CSS custom properties in `:root` (`assets/css/styles.css`):
  deep forest green `#18352D` as the primary brand color (an accent system
  over cream/ivory surfaces, never a full green wash), a dark green
  `#102720` for the intro/deepest sections, soft taupe, chocolate brown and
  a muted, sparingly-used gold.
- **Type** — Cormorant Garamond (editorial serif headlines) + Manrope (sans
  body/nav), loaded from Google Fonts at a trimmed set of weights only.
- **Intro splash** — a full-screen `#102720` title card (`.intro-splash` /
  `#introSplash`) that fades the logo in from a slight blur+scale, then a
  subtitle, then dismisses itself after ~2.6s. Shows once per browser
  session via `sessionStorage`, and collapses to a fast plain fade under
  `prefers-reduced-motion`.
- **Sections**, in order: intro splash → sticky/transitioning header →
  full-viewport hero → editorial intro (asymmetrical, overlapping photos) →
  marquee → pastry case (mixed-size editorial grid) → full-bleed photo
  break → tabbed menu (Sweet / Bread / Breakfast / Lunch / Coffee, with a
  `#custom-cakes` anchor) → fruit-shaped dessert horizontal gallery →
  chocolate feature → bread/lunch → quiche feature → bakery case panorama →
  Instagram mosaic → **Our Locations** (split-screen, cream/forest
  alternating cards, one per location, each with its own address/phone/hours
  and Get Directions/Call CTAs) → footer.
- The site is written throughout to never imply a single location — copy
  says "two Philadelphia locations" / "Old City and Northeast Philadelphia"
  in the intro, bakery-case section, hero CTA, nav, and footer.
- **Motion** — IntersectionObserver-driven reveals (opacity + translateY),
  a subtle hero cinematic zoom, header shrink-on-scroll, mobile full-screen
  nav with staggered link entrance (scrollable if content exceeds the
  viewport), a slow marquee, and a scroll-linked pan on the bakery-case
  panorama. Everything respects `prefers-reduced-motion: reduce`.
- **Menu content** covers every category from the brief (Signature Mousse
  Cakes, Macarons, Tarts & Tartlets, Rolls & Pastries, Cookies, Cakes &
  Slices, Custom Cakes & Celebrations, Bread, Croissants & Baked Goods,
  Breakfast/Brunch, Lunch, Quiche, Coffee & Espresso, Matcha & Tea, Cold
  Drinks). No prices, flavors, or hours were invented — anywhere specifics
  aren't confirmed, copy says "ask about today's selection" / "call for
  details."
- **Responsive/a11y hardening**: `min-width:0` reset globally on `*` to
  prevent the classic flex/grid "min-width:auto" blowout (a nested flex or
  grid item's intrinsic content size silently forcing its container wider
  than the viewport — this actually broke the Locations section at 320px
  during testing and is fixed at the root, not patched per-section);
  `overflow-x:clip` on `html`/`body`; safe-area insets (`env(safe-area-inset-*)`)
  on the header and mobile nav for notched phones; a dedicated iPad
  (768–1024px) tuning pass on the menu grid and pastry-case grid instead of
  just interpolating between the mobile and desktop layouts; verified with
  zero horizontal overflow at 320/360/375/390/414/430/768/820/1024/1280/
  1440/1920px widths.

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
index.html              All markup/sections/SEO metadata
assets/css/styles.css   Design system + all section styles + animations
assets/js/main.js       Header transition, mobile nav, scroll reveal, menu tabs, parallax
robots.txt
sitemap.xml
```
