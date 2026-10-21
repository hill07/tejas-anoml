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
Photos live in `assets-src/`; after replacing one, run `npm run optimize-images` to regenerate the WebP files and icons.

## RSVP replies

With no configuration, a submitted RSVP is saved in the guest's own browser only — it does **not** reach you.

Set `VITE_RSVP_ENDPOINT` at build time (or in your host's env) to POST each reply as JSON. The payload includes **`eventAttendance`** (every event with `guestCount`) and **`guestCountBySlug`** for spreadsheets.

**Google Sheets:** paste `scripts/google-sheet-rsvp.gs` into Apps Script, set your spreadsheet ID, deploy as a web app (Anyone), then:

```bash
VITE_RSVP_ENDPOINT=https://script.google.com/macros/s/…/exec npm run build
```

Other backends (e.g. Formspree) can use the same JSON body.

## Deploy

It's a static single-page app. Any static host works; deep links need an SPA fallback, already configured for:

- **Netlify** — build command `npm run build`, publish directory `dist` (`public/_redirects` handles routing).
- **Vercel** — import the folder; framework preset "Vite" (`vercel.json` handles routing).
- **Cloudflare Pages** — build `npm run build`, output `dist` (`_redirects` is honoured).
