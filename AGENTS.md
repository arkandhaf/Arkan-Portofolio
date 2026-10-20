# Portfolio development

This project uses Astro 5, TypeScript, Tailwind CSS 4, and one React island.

- Use `.astro` components for static sections. Hydrate only interactive components.
- Preserve bilingual content in `src/data/portfolioData.ts` and use `Localized.astro` for static copy.
- Global UI behavior is in `src/scripts/portfolio.ts`; React language synchronization uses the `portfolio:language` document event.
- Run `npm test` and `npm run build` before handing off a migration or behavior change.
- Output is static HTML in `dist/`. No Next.js server or adapter is required.
