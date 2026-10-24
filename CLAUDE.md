# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

A static, multi-page Vite replica of the nola.se front end, used to test
design and content changes before they go live. It is built from the
**NUI 1.0** Figma design system (file `H0t4kADOyBlXxerTWNcDq1`), not by
scraping the live site. See `README.md` for full provenance notes.

No framework, no TypeScript, no test suite, no linter. Plain HTML, CSS
custom properties, and small ES modules.

## Commands

```bash
npm install
npm run dev      # Vite dev server
npm run build    # production build to dist/
npm run preview  # serve dist/ locally
```

There are no tests or lint scripts. To verify a change, run `npm run build`
and check the page in `npm run dev`.

## Layout

- `index.html` and `<section>/index.html` (`produkter/`, `kollektioner/`,
  `projekt/`, `journal/`, `om-nola/`, `kontakt/`, `aterbruk-fynd/`) are the
  pages. Detail pages live one level deeper, e.g. `produkter/parco/`.
- `src/styles/tokens.css` holds the design tokens as CSS custom properties.
  It is the single source of truth for color, type, spacing, radius and
  elevation values taken from Figma.
- `src/styles/base.css` holds the reset, typography classes (`.h1-xl`,
  `.h1`…`.h6-eyebrow`, `.body-text`, `.accent-*`) and buttons (`.btn`).
- `src/styles/components.css` holds header, footer, cards, accordion,
  badges, grids.
- `src/styles/fonts.css` holds the font stack and the commented-out
  `@font-face` blocks for the licensed fonts.
- `src/partials/header.html` and `footer.html` are injected at runtime
  into `[data-include]` placeholders by `src/js/include.js`.
- `src/js/main.js` is the single entry module. It imports the CSS, loads
  partials, then runs `initHeader()` and `initAccordions()` on the
  `includes:loaded` event.

## Conventions

- **Use tokens, not raw values.** Colors, sizes and spacing must come from
  `var(--…)` in `tokens.css`. If Figma adds a value, add a token first.
- **Class naming is BEM-ish**: `block__element` and `block--modifier`,
  with `is-open` / `is-studio`-style state classes.
- **JS hooks use `data-*` attributes** (`data-header`, `data-menu-toggle`,
  `data-submenu-trigger`, `data-accordion-group`), not classes.
- **Accordions are native `<details class="accordion-item">`.** Wrap them in
  `[data-accordion-group]` to get one-open-at-a-time behavior.
- **Content is Swedish.** Pages use `lang="sv"`, and copy, alt text and URL
  slugs are in Swedish (e.g. `/om-nola/`, `/aterbruk-fynd/`).
- **Accessibility basics are expected**: skip link, `aria-current` on the
  active nav link, `aria-expanded` on toggles, meaningful `alt` text, and
  `aria-hidden="true"` on decorative arrows.
- **Images are placeholders** from `placehold.co`. Do not hotlink or copy
  images, product data or copy from nola.se. Its `robots.txt` opts AI
  agents out of crawling.

## Adding a page

1. Copy an existing page's full `<head>`/`<body>` shell, including the two
   `data-include` placeholders, the skip link, `<main id="main">`, and the
   `<script type="module" src="/src/js/main.js">` tag.
2. Put it at `<section>/<slug>/index.html`.
3. Add it to `build.rollupOptions.input` in `vite.config.js`. Pages not
   listed there work in dev but are missing from `npm run build`.

## Known issues

- **Partials are missing from the build.** `include.js` fetches
  `/src/partials/*.html` at runtime, but Vite does not copy them into
  `dist/`. Header and footer therefore only render under `npm run dev`,
  not under `npm run preview` or a deployed `dist/`.
- **Header submenu opens on hover over the whole nav box.** In
  `src/js/header.js` the `mouseenter` listener sits on
  `.site-header__nav-box`, so the "Om Nola" submenu opens when the cursor
  passes anywhere in the nav. A click-to-toggle fix was committed and then
  reverted, so the intended behavior is still undecided. Ask before
  changing it.
- **Licensed fonts are not bundled.** GT Walsheim and Self Modern fall back
  to system fonts until licensed `.woff2` files are added under
  `src/assets/fonts/` and the `@font-face` rules in `fonts.css` are
  uncommented. Never commit font files without confirming the license.
- **Social icons and the "AAA" badge are placeholder shapes.** Real marks
  must come from the official brand-asset kits.
- **Coverage is one representative page per section**, not a full clone.
