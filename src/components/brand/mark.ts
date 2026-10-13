/**
 * Geometry for the logo mark: a chevron that reads as both an "A" and a shell prompt,
 * followed by a cursor. Drawn on a 64×64 grid.
 *
 * This is the single source of truth for the mark. `src/app/icon.svg` mirrors these values
 * (a unit test keeps them in sync), and `npm run brand:icons` generates every raster icon
 * from that SVG.
 */
export const MARK = {
  viewBox: "0 0 64 64",
  cornerRadius: 16,
  gradient: { from: "#6366f1", to: "#a855f7" },
  chevron: { d: "M15 44 L28 18 L41 44", strokeWidth: 6 },
  cursor: { x: 40, y: 40, width: 12, height: 5, rx: 2.5, opacity: 0.85 },
} as const;
