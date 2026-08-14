# Real 3D image upgrade

The Visual Universe section now uses Three.js directly.

The uploaded images are mapped to actual 3D geometry:
- black hole: textured disk + event horizon sphere + torus
- galaxy: 3D textured box/card
- mountains: subdivided plane with the image also used as a displacement map
- shark: textured 3D box
- additional wireframe torus, lighting, particles and pointer-controlled scene rotation

Install:
npm install

Build:
npm run build

All image paths are local root-relative URLs under public/.
