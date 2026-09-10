# Prem Sameer — Product, AI & Growth

Portfolio based on Prem Sameer's supplied Notion content. Six featured explorations and eight linked work stories. Built with Next.js, shadcn/ui, Motion Primitives and a custom Lottie-format animation.

## Run

Node 22.13 or newer. Run `npm ci`, then `npx next dev --port 5173`. Run `npm run build` to produce the static `out/` folder.

## Deploy

Import this branch into Vercel. The checked-in vercel.json configures the build and output. No secrets or environment variables are required. For another static host, upload the contents of out/.

## Content

Edit app/page.tsx for portfolio content and links. Edit app/globals.css for the palette and layout. Work-study metrics come from the supplied Notion pages; targets and unknown placeholders are not represented as achieved results. The SEO card links to its original Notion section because its bookmark destination was unavailable.

## Design resources

- shadcn/ui: button primitive, restyled for this portfolio.
- Motion Primitives: AnimatedGroup pattern adapted for project entrances and reduced motion (https://motion-primitives.com/docs/animated-group).
- LottieFiles: format reference; animation is original geometric motion, rendered with lottie-react, not a downloaded LottieFiles asset.
- Haikei: abstract geometric background inspiration; card backgrounds are original CSS contours, not exported Haikei assets.
- Realtime Colors: role-based palette approach, charcoal #151716, text #f5f6ef, accent #d9ff70. Palette preview: https://www.realtimecolors.com/?colors=f5f6ef-151716-d9ff70-beead5-b6a1f1
- Godly.design: editorial typography and portfolio layout reference. No third-party site design or artwork was copied.
- Manus: reviewed as a separate AI building service; no authenticated Manus workspace was available or used.

Original portfolio: https://premsameer1405.notion.site/Prem-Sameer-PM-Portfolio-34b0733b4c2481048787ecc1ee5aeec5
