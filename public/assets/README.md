# Portfolio assets

Add your own images with these exact names. Each slot renders a complete technical wireframe when its image is absent or cannot load.

Astro detects these files during the build. Run `npm run build` again after adding or replacing assets before deployment.

- `mxc-last-day.jpg` — Indosat MXC photograph; recommended 1200 × 1000.
- `itb-campus.jpg` — ITB campus photograph in Education; recommended 1200 × 1000.
- `ixplore-certificate.png` — i-Xplore certificate; recommended 1600 × 1000.
- `ixplore-certificate.pdf` — original certificate, linked from its card; the PNG is its rendered preview.
- `satu-innovation-top30.jpg` — SATU Top 30 award; recommended 1600 × 1000.
- `relpool-dashboard.png` — RELPOOL screenshot; recommended 1800 × 700.

The fallback dashboard and topology are illustrative, not live network telemetry.

All paths are configurable in `src/data/portfolioData.ts` under `export const assets`. See `PANDUAN-KONTEN.md` for the Indonesian editing guide.
