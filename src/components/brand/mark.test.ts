import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { MARK } from "./mark";

const iconSvg = readFileSync(fileURLToPath(new URL("../../app/icon.svg", import.meta.url)), "utf8");

// The favicon is a static file, so it can't import MARK. Fail loudly if the two drift apart.
describe("icon.svg stays in sync with the logo mark", () => {
  it.each([
    ["viewBox", `viewBox="${MARK.viewBox}"`],
    ["corner radius", `rx="${MARK.cornerRadius}"`],
    ["gradient start", `stop-color="${MARK.gradient.from}"`],
    ["gradient end", `stop-color="${MARK.gradient.to}"`],
    ["chevron path", `d="${MARK.chevron.d}"`],
    ["chevron stroke", `stroke-width="${MARK.chevron.strokeWidth}"`],
    [
      "cursor",
      `<rect x="${MARK.cursor.x}" y="${MARK.cursor.y}" width="${MARK.cursor.width}" height="${MARK.cursor.height}" rx="${MARK.cursor.rx}"`,
    ],
  ])("matches the %s", (_label, fragment) => {
    expect(iconSvg).toContain(fragment);
  });
});
