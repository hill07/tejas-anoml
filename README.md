# Anmol & Tejas — Wedding Website

Guest website for Anmol & Tejas's wedding celebrations, 27 – 30 June 2027 in Mdina & St Julian's, Malta.
React 18 + TypeScript + Vite + Tailwind CSS + React Router.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
```

## Production build

```bash
npm run build      # type-checks, then outputs static files to dist/
npm run preview    # serves dist/ at http://localhost:4173
```

## Editing content

All wording, events, venues, hotels, coaches, FAQs and contacts live in `src/data/wedding.ts`.
Photos live in `assets-src/`; after replacing one, run `npm run optimize-images` to regenerate the WebP files and icons. The script also regenerates optimized homepage, navigation artwork and invitation images from `assets-src/site-artwork/` into `public/optimized/`. The full-resolution site artwork stays out of the production bundle.

## RSVP replies

Each reply is posted to a Google Sheet. The web app URL lives in `src/lib/rsvpSheet.ts` (`RSVP_SHEET_URL`). The Apps Script to paste into the sheet is `scripts/google-sheet-rsvp.gs`. A copy is also kept in the guest's browser so they can edit it on the same device.

## Deploy

It's a static single-page app. Any static host works; deep links need an SPA fallback, already configured for:

- **Netlify** — build command `npm run build`, publish directory `dist` (`public/_redirects` handles routing).
- **Vercel** — import the folder; framework preset "Vite" (`vercel.json` handles routing).
- **Cloudflare Pages** — build `npm run build`, output `dist` (`_redirects` is honoured).
