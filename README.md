# Liquid Verse

Upgrade my existing portfolio site to a premium 

"Liquid Minimalism + Cinematic Developer" aesthetic. Keep all existing content, 

copy, and section order — only redesign the visual system and add motion.

DESIGN SYSTEM

- Base: near-black gradient background (#0a0a12 → #12121f), soft ambient glow blobs 

  (blurred, animated, low-opacity purple/blue/teal) drifting behind content.

- Liquid Glass: frosted glass cards (backdrop-blur, 1px translucent border, subtle 

  inner highlight) for skill tiles, project cards, and the nav bar.

- Bento Grid: rebuild the Skills and Highlights sections as an asymmetric bento grid 

  (mixed 1x1, 2x1, 1x2 cells) instead of uniform lists.

- Typography: large, kinetic hero headline — animate "Vishnu Kumar" with a 

  letter-stagger reveal + gradient text fill (blue→violet) on load.

- Subtle 3D: add a lightweight 3D/parallax element in the hero (floating glass shard, 

  particle field, or tilting card on mouse move) using CSS 3D transforms or 

  react-three-fiber (keep it performant, no heavy models).

MOTION

- Scroll-based reveal animations (fade + slide-up, staggered) for every section using 

  Framer Motion / IntersectionObserver.

- Smooth parallax on the hero background and profile image (background moves slower 

  than foreground on scroll).

- Micro-interactions: magnetic hover on buttons, glass cards lift + glow on hover, 

  smooth cursor-follow highlight on project cards.

- Sticky nav that condenses/blurs more strongly as user scrolls.

CONSTRAINTS

- Keep it fast: lazy-load 3D/heavy motion, respect prefers-reduced-motion, no layout 

  shift.

- Keep dark theme, mobile-first responsive, and all current links/content intact.

- Use Tailwind CSS + Framer Motion (+ react-three-fiber only if needed for the hero 

  3D element).

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/698cccd7-e722-4897-ac30-f193044ad48f).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
