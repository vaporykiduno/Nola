# Nola — local replica

A local, static Vite build of nola.se's front end, used for testing design
and content changes before they go live. Built from the **NUI 1.0** Figma
design system (colors, typography, spacing/radius/elevation, header,
footer, buttons, product/article/project cards, accordion, badges), not by
scraping the live site — see "Content & provenance" below.

## Getting started

```bash
npm install
npm run dev      # starts the dev server, prints a localhost URL
npm run build    # production build to dist/
npm run preview  # preview the production build locally
```

## Project structure

```
index.html                 Home
produkter/                 Product listing + product detail (parco/)
kollektioner/               Kollektioner listing
projekt/                    Project listing + a project detail page
journal/                    Journal listing + an article page
om-nola/                    About
kontakt/                    Contact (mailto/tel only — see note below)
aterbruk-fynd/               Clearance listing (stock badges)

src/
  styles/
    tokens.css              CSS custom properties = Figma design tokens
    fonts.css                Font stack + how to add the real licensed fonts
    base.css                 Reset, typography classes, buttons
    components.css           Header, footer, cards, accordion, etc.
  partials/
    header.html, footer.html Shared markup, injected at runtime
  js/
    main.js, include.js, header.js, accordion.js
  assets/
    nola-logo.svg, nola-logo-inverse.svg   Real logo, exported from Figma
```

Pages are plain HTML files (Vite multi-page build — see `vite.config.js`
for the page list). Header/footer are injected client-side via
`src/js/include.js` so markup stays DRY without a framework; add new pages
by copying an existing page's `<head>`/`<body>` shell and adding the file
to `vite.config.js`'s `rollupOptions.input` so it's included in `build`.

## Content & provenance

- **Design system**: colors, typography, spacing, and components come
  directly from the NUI 1.0 Figma file, via Figma's design-context API.
- **Real, non-editorial data**: office addresses/phone numbers in the
  footer and Kontakt page came from the Figma file's own footer component
  (your company's actual contact info).
- **Everything else (product names, copy, images)** is representative
  placeholder content, not copied from the live nola.se site. nola.se's
  `robots.txt` explicitly opts AI agents out of crawling it, so this
  project was deliberately built from the design system rather than by
  scraping the live pages. Swap in real product data/copy/photos yourself
  as needed.
- **Fonts**: the real site uses licensed fonts (GT Walsheim, "Self
  Modern"). This repo does not bundle them — see `src/styles/fonts.css`
  for how to drop in your own licensed font files.
- **Logo**: `src/assets/nola-logo.svg` is the real wordmark, exported
  from the Figma file.
- **Social icons / "AAA" badge**: kept as simple placeholder shapes,
  per the design system's own notes — these are third-party trademarked
  marks, sourced from an official brand-assets kit before shipping this
  for real.

## Known gaps (v1 scope)

The Figma design system itself is documented as a *core UI kit* (audited
2026-08-20), not a full page-by-page replica — see its "Notes &
Assumptions" page for the full list (inferred disabled/error states, no
confirmed hover behavior on a few elements, etc.). This build covers one
representative page per site section; it is not an exhaustive clone of
every product/article/project on the live site.
