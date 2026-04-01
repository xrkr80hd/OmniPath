# OmniPath Screen Assets

Use this folder for user-supplied visual assets that drive the staged screen flow.

## Folders

- `title-sequence/`
  - Put the 8 to 10 rotating landing/title-screen assets here.
  - Use this for videos, stills, overlays, or approved screen-specific media.

- `game-interface/`
  - Put page-2-specific media here if that screen later needs its own backgrounds or overlays.

## Notes

- Keep screen media in `public/` so Next.js can serve it directly.
- Do not put React components or TypeScript files in this folder.
- If you want predictable ordering, name files with numeric prefixes such as:
  - `01-gate.mp4`
  - `02-threshold.mp4`
  - `03-embers.mp4`
