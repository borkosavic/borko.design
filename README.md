# borko.design

## Run and build

- Install deps: `npm install`
- Build for live/production (minified): `npm run build`
- Build CSS once (unminified, local): `npm run build:dev`
- Go Live workflow: run `npm run dev`, then click `Go Live` in VS Code
- CSS watch only: `npm run dev:css`
- Static dev server with auto-reload: `npm run dev:serve`
- Open: `http://localhost:4173/`
- Important: VS Code task `Tailwind Watch` is configured to auto-start on folder open (`.vscode/tasks.json`). If VS Code asks for permission, allow automatic tasks once.

## Logo scroll animation

The logo animation is implemented in `src/app.js` with static HTML and Tailwind-built CSS only.

- Phase 1 (scroll start): the `b.d + smile` mark is rendered as a fixed overlay clone and interpolates from the hero position to the header anchor.
- Phase 2 (after docking): the header mark becomes active and the smile disappears, then letters are added inside the core block as `b(orko).d(esign)` in discrete steps.
- Stability details:
  - The hero mark is hidden with `visibility` (not removed), so layout does not jump.
  - Animation updates are `requestAnimationFrame`-throttled.
  - Resize recomputes travel distances and wordmark width.
  - `prefers-reduced-motion: reduce` disables the flight and switches to an immediate docked state on scroll.
