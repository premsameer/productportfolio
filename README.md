# Prem Sameer — Product, AI & Growth

A warm editorial portfolio built with Next.js, shadcn/ui and Motion. Cream surfaces, a restrained sage accent, self-hosted Newsreader and Source Sans 3, slow mesh gradients, and reduced-motion support.

## Run and deploy

Use Node 22.13 or newer. Run `npm ci`, `npx next dev --port 5173`, or `npm run build`. The production build exports static pages to `out/`. Vercel configuration uses static hosting with no environment variables required.

## Content

Homepage content lives in `app/page.tsx`; the design system lives in `app/globals.css`. Nine native case-study routes are generated from `lib/case-studies.json`, including the full available text and tables from eight supplied Notion pages. The SEO project uses the available portfolio summary and links to its source repository. Unknown metrics are not presented as results.

## Design references

The current design follows the owner's warm editorial brief. shadcn/ui supplies the button primitive; the AnimatedGroup pattern from Motion Primitives is adapted for restrained entrances. Organic CSS contours reflect the Haikei reference. Lottie is retained as an unused earlier experiment. No third-party artwork is copied. Manus was not used because no authenticated workspace was available.
