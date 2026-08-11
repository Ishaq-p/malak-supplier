# Supplier Website — Next.js

Same classic, professional 4-page supplier site (Home, About, Products,
Contact), rebuilt as a Next.js App Router project so it's ready to deploy
on Vercel or any Node host.

## Stack

- Next.js 15 (App Router), React 19
- No CSS framework — one hand-written stylesheet (`app/globals.css`) with
  design tokens at the top
- Fonts loaded via `next/font/google` (Source Serif 4 / IBM Plex Sans /
  IBM Plex Mono) — self-hosted automatically by Next at build time
- Plain JavaScript, no TypeScript — swap to `.tsx` later if you want types

## Getting started

```
npm install
npm run dev
```

Visit `http://localhost:3000`. Note: `next/font` needs internet access the
first time it builds (to fetch the font files), so `npm run build` /
`npm run dev` won't work fully offline the very first time.

## File structure

```
app/
  layout.js          Root layout — fonts + global CSS
  page.js             Home
  about/page.js       About
  products/page.js    Products
  contact/page.js     Contact
  globals.css         All styling — colors, type, layout in one file
components/
  Header.js           Top bar + nav + mobile menu + language switch (client)
  Footer.js            Site footer
  CtaBand.js           Reusable bottom CTA band
  SpecCard.js          Category card + product "spec tag" card
  ProductCatalogue.js  Filter tabs + product grid (client)
  ContactForm.js        Contact form, wired for EmailJS (client)
  ImageWithFallback.js  Shows a dashed placeholder box until a real image exists
data/
  content.json        ALL editable text, in English ("en") and Turkish ("tr")
lib/
  lang.js              Resolves ?lang=en|tr from the URL
public/
  images/               Put real photos and the logo here
```

## 1. Edit everything through `data/content.json`

Nearly all text — nav labels, hero copy, product descriptions, addresses,
footer — lives in `data/content.json`, split into an `"en"` and a `"tr"`
section with identical structure. You do not need to touch any page or
component file to change copy.

Anything in `[square brackets]`, like `[Your Company Name]` or
`[+90 000 000 00 00]`, is a placeholder — replace it in both the `en` and
`tr` sections. UI labels (buttons, nav, form field names) are already
written in both languages and don't need brackets replaced.

## 2. Add real images

Drop image files into `public/images/` and point to them from
`data/content.json` with a root-relative path, e.g.:

```json
"logo": "/images/logo.png"
```

Until you do, every image slot shows a dashed "Image placeholder" box
(handled by `components/ImageWithFallback.js`) instead of a broken-image
icon. Once you're using real, fixed images, you can swap `<ImageWithFallback>`
for Next's built-in `next/image` component for automatic optimization —
it isn't used by default here so the placeholder fallback behavior works
out of the box.

Recommended sizes: logo as square SVG/PNG; hero 1600×1200 or larger;
category/product photos 800×600, landscape, consistent style.

## 3. Products page

`data/content.json` → `products_page.items` ships with 6 sample products
(name, category, spec code, CAS number, description, image) so you can see
the card format — styled like a certificate-of-analysis tag. Each one
carries a "Sample entry — replace" ribbon. Replace the array with your
real catalogue. To remove the ribbon once you're using real products, open
`components/ProductCatalogue.js` and drop the `sampleBadgeText` prop (or
set `showSampleBadge={false}` on `<ProductCard>` in
`components/SpecCard.js`).

Filter buttons are generated automatically from whatever category names
appear in your product list.

## 4. Contact form (EmailJS)

The form (`components/ContactForm.js`) is already wired to call
`@emailjs/browser` (included in `package.json`):

1. Create a free account at https://www.emailjs.com, set up a Service and
   an Email Template.
2. In `components/ContactForm.js`, replace `SERVICE_ID`, `TEMPLATE_ID`, and
   `PUBLIC_KEY` at the top of the file with your real values.
3. Field names are already `name`, `company`, `email`, `phone`, `subject`,
   `message` — make sure your EmailJS template uses the same variable
   names.

Until it's configured, submitting the form shows a friendly inline error
instead of failing silently.

## 5. Map

In `app/contact/page.js`, find the `<iframe>` inside `.map-frame` and swap
its `src` for your real embed URL (Google Maps → Share → Embed a map →
copy the `src="..."` value).

## 6. Language switching

EN / TR links in the top bar switch language via a `?lang=en` / `?lang=tr`
query parameter on the current page — no cookies or localStorage needed,
and it works with the App Router's server-rendered pages out of the box.
Default is English (`lib/lang.js` → `DEFAULT_LANG`).

To add a third language: duplicate the `"en"` block in `content.json`
under a new key (e.g. `"ar"`), translate it, add `"ar"` to
`SUPPORTED_LANGS` in `lib/lang.js`, and add a matching
`<Link href={withLang(pathname, "ar")}>AR</Link>` next to the EN/TR links
in `components/Header.js`.

Note: the `<html lang="...">` attribute in `app/layout.js` is currently
static (`"en"`), since the root layout doesn't receive the `?lang` query
param in the App Router. If this matters for you (e.g. for accessibility
tooling), consider moving to path-based locales (`/en/...`, `/tr/...`)
using `next-intl` or the built-in `i18n` routing conventions instead of a
query parameter — a bigger change, so it's left as-is here to keep the
template simple.

## 7. Deploying

Push to a Git repo and import it on Vercel (zero-config for Next.js), or
run:

```
npm run build
npm run start
```

on any Node.js host.

## Notes

- Colors, fonts, and spacing all live in `app/globals.css` under the
  `:root` block at the top.
- The "spec tag" card style (dashed perforation, monospace reference code,
  small "CoA" stamp) is the signature visual detail — meant to evoke a
  certificate of analysis, fitting for a chemical supplier. Adjust or
  simplify in `app/globals.css` under `.spec-card` if you'd rather not
  have it.
