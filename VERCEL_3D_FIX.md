# Vercel-safe 3D visual upgrade

This version uses the exact images supplied by the user as local assets:

- `public/blackhole-cinematic.jpg`
- `public/galaxy.jpg`
- `public/mountains.jpg`
- `public/shark.jpg`

The homepage references only root-relative local URLs, so it does not depend on Lovable's `/__l5e/` asset host.


Deploy:
- Build command: `npm run build`
- Output directory: `dist`
