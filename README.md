# Aroma Bakery & Coffee — Website Redesign

A complete editorial redesign of the Aroma Bakery & Coffee website: full-bleed
photography, oversized serif headlines, a forest-green luxury palette, and
scroll-driven motion — built as static HTML/CSS/JS with no build step.

## ⚠️ Before this goes live

1. **Placeholder photography only.** Every image slot is a labeled color panel
   (`.ph-photo` in `assets/css/styles.css`), not a real or AI-generated photo —
   per the design brief, fake/AI food imagery is explicitly out. Each block's
   `data-caption` describes exactly what real Aroma photo belongs there
   (e.g. "Old City storefront/interior photo"). Search `index.html` for
   `data-caption` to find every slot, including the two storefront photos in
   the Locations section.
2. **Business facts are now real and confirmed** — both locations' addresses,
   phone `(445) 245-9284`, hours, the Instagram handle
   `@aroma_bakery_coffee`, and the contact email `aromabakerycoffe@gmail.com`
   (spelled exactly as provided, do not "fix" it) are live in `index.html`,
   the footer, and the LocalBusiness JSON-LD schema (as a `@graph` with one
   `Bakery` entry per location). If any of these change, update all four
   places: the `#locations` section, the footer, the `<head>` schema, and the
   `tel:`/`mailto:` links scattered through the CTAs.
3. **Logo.** The header currently renders "Aroma / Bakery & Coffee" as styled
   text. Swap in the real logo mark if one exists.

Swap photo placeholders by replacing each `.ph-photo` div's classes with a real
`<img>` (see "Swapping in real photos" below). Nothing else needs to change —
the design system, layout and motion already work around your final
photography.

## How the design was built

- **Palette** — CSS custom properties in `:root` (`assets/css/styles.css`)
  exactly matching the brief's forest/sage/cream/chocolate/gold system. Green
  is used as an accent/section color, not a background wash.
- **Type** — Cormorant Garamond (editorial serif headlines) + Manrope (sans
  body/nav), loaded from Google Fonts.
- **Sections**, in order: sticky/transitioning header → full-viewport hero →
  editorial intro (asymmetrical, overlapping photos) → marquee → pastry case
  (mixed-size editorial grid) → full-bleed photo break → tabbed menu (Sweet /
  Bread / Breakfast / Lunch / Coffee) → fruit-shaped dessert horizontal
  gallery → chocolate feature → bread/lunch → quiche feature → bakery case
  panorama → Instagram mosaic → **Our Locations** (split-screen, cream/forest
  alternating cards, one per location, each with its own address/phone/hours
  and Get Directions/Call CTAs) → footer.
- The site is written throughout to never imply a single location — copy
  says "two Philadelphia locations" / "Old City and Northeast Philadelphia"
  in the intro, bakery-case section, hero CTA, nav, and footer.
- **Motion** — IntersectionObserver-driven reveals (opacity + translateY),
  a subtle hero cinematic zoom, header shrink-on-scroll, mobile full-screen
  nav with staggered link entrance, a slow marquee, and a scroll-linked pan
  on the bakery-case panorama. Everything respects
  `prefers-reduced-motion: reduce`.
- **Menu content** follows the brief's categories exactly (Pastries & Tarts,
  Cakes & Celebrations, Bread, Quiche, Breakfast/Brunch, Lunch & Savory,
  Coffee & Drinks). No prices, flavors, or hours were invented — anywhere
  specifics aren't confirmed, copy says "ask about today's selection" /
  "call for details," matching the brief's content rule.

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
