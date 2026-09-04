# Daniel Sherratt — Stay A While.

Single-page Next.js portfolio for Daniel Sherratt, Creative Director, London. Copy and gallery frames are hardcoded in `src/content`.

## Setup

```bash
cp .env.example .env.local
npm install
npm run dev
```

Set `NEXT_PUBLIC_SITE_URL` to the production origin before deploying. That value drives canonicals, sitemap, Open Graph, and the AI discovery files.

## Discovery URLs

- `/robots.txt`
- `/sitemap.xml`
- `/llms.txt`
- `/llms-full.txt`
- `/index.md`
- `/feed.json`

## Content

Edit `src/content/site.ts` for identity and links. Gallery images live in `src/content/gallery/` (1–38). Captions are numbered alts in `src/content/gallery-images.ts` until real titles are supplied.
# dan-portfolio
