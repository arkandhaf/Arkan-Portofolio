# Arkan — engineering portfolio

A bilingual portfolio built with **Astro 5, TypeScript, Tailwind CSS 4, and React**. All sections render to static HTML. Only the interactive vendor terminal hydrates React, using `client:visible`.

## Local development

Use Node.js 22.12+ and npm.

```sh
npm ci
npm run dev
```

Open **http://localhost:4321**. Astro prints another port if it is already occupied.

```sh
npm run build   # Astro/TypeScript checks, then static build
npm test        # Run after building; tests inspect dist and exercise interactions
npm run preview
```

Deploy the generated **`dist/`** directory to any static host. No server adapter, backend, environment secrets, or Next.js runtime is needed. The local preview is not a production server.

## Source layout

```text
src/
  layouts/BaseLayout.astro       HTML shell, metadata, local fonts
  pages/index.astro             Page composition
  components/*.astro            Static sections and reusable UI
  components/CliTerminalPreview.tsx
                                The single interactive React island
  scripts/portfolio.ts          EN/ID, theme, menu, reveal/section observers
  data/portfolioData.ts          Bilingual copy, project metrics/logs, CLI commands
  styles/globals.css            Shared responsive design system
public/assets/                 Optional photos, certificates, dashboard screenshot
tests/portfolio.test.tsx        Static output and interaction regression tests
```

## Language and interactions

`Localized.astro` renders English text with EN/ID data attributes. A small TypeScript module updates static text, accessible labels, document language, and metadata without reloading. Both language switches stay synchronized, and language/theme preferences persist in localStorage. Controls continue working when storage is blocked.

The terminal subscribes to the `portfolio:language` document event and reads the selected language when it hydrates. Arrow keys, Home, and End navigate vendor tabs; the copy button copies the active workflow. CLI examples are illustrative and depend on platform/software versions.

Geist Sans and Geist Mono are self-hosted from Fontsource packages. GSAP and ScrollTrigger animate the hero sequence, section reveals, staggered metrics, desktop diagram parallax, and hover/focus arrows. GSAP is imported directly by the main entry after the DOM is ready and refreshes positions after language, font, image, and island updates. `gsap.matchMedia()` keeps parallax on desktop; the owner requested full automatic movement independent of OS animation settings. The network packet dash flow is also driven by GSAP. Animations, listeners, and triggers are cleaned up on Astro navigation and HMR. Main content is visible even if JavaScript or the animation bundle fails; interactive controls require JavaScript.

Animations start automatically on page load and section entry. There are no playback controls, and legacy `arkan-motion` storage values are ignored. GSAP uses the full hero/section movement even when OS animations are disabled, as requested by the owner. Decorative CSS animations still follow system preferences.

## Content and assets

Edit text, links, and metrics in `src/data/portfolioData.ts`. The supplied contact URLs are placeholders and should be checked before publishing. Portfolio claims follow the supplied brief; no live infrastructure is queried. Fernet is labeled AES-128, reflecting its encryption implementation.

Add the five image files documented in `public/assets/README.md`. Rebuild after adding assets. Missing images render technical wireframes without sending broken image requests; failed image loads reveal the fallback.

## Verification

The regression suite checks static content, one lazy React island, local asset references, bilingual metadata, persisted/blocked-storage preferences, mobile navigation, vendor commands and keyboard navigation, clipboard success/failure, and language selection before React hydration. DOM tests do not measure browser layout or Lighthouse performance.

The online dependency audit found three advisories in the Astro 5 dependency tree (one critical, one high, one low). npm recommends upgrading Astro to 7.4.1; installing that upgrade was canceled, so this checkout and its lockfile retain the tested Astro 5.18.2 setup. Before production use, update Astro and its React integration together and repeat the build/tests. The website builds to static files and does not use an image optimization endpoint or server rendering.

See **PANDUAN-KONTEN.md** for photo filenames, social URL editing, and automatic animations.
