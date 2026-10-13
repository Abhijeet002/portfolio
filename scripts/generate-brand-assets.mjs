/**
 * Generates every raster brand asset from the master SVG at src/app/icon.svg.
 * Run after changing the logo:  npm run brand:icons
 *
 * Outputs
 *   src/app/favicon.ico            16/32/48 px, for browsers and tools that request /favicon.ico
 *   src/app/apple-icon.png         180 px, full-bleed (iOS applies its own rounded mask)
 *   public/icons/icon-192.png      PWA manifest icon
 *   public/icons/icon-512.png      PWA manifest icon
 *   public/icons/maskable-512.png  PWA maskable icon, mark kept inside the 80% safe zone
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const masterPath = path.join(root, "src/app/icon.svg");
const master = await readFile(masterPath, "utf8");

/** The master with square corners, for platforms that apply their own mask. */
const fullBleed = master.replace(/<rect width="64" height="64" rx="16"/, '<rect width="64" height="64"');
if (fullBleed === master) throw new Error("Could not find the background rect in icon.svg");

/** Shrinks the artwork to 80% and centres it on a full-bleed background (maskable safe zone). */
const maskable = fullBleed.replace(
  /(<rect width="64" height="64" fill="url\(#g\)"\/>)([\s\S]*)(<\/svg>)/,
  '$1<g transform="translate(6.4 6.4) scale(0.8)">$2</g>$3',
);

const png = (svg, size) =>
  sharp(Buffer.from(svg), { density: Math.max(72, (72 * size) / 64) * 4 })
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toBuffer();

/** Packs PNG images into a single .ico (PNG-compressed entries are supported by all modern browsers). */
function toIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(images.length, 4);

  const entries = [];
  let offset = 6 + images.length * 16;
  for (const { size, data } of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2); // no palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // colour planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    offset += data.length;
  }
  return Buffer.concat([header, ...entries, ...images.map((image) => image.data)]);
}

const icoSizes = [16, 32, 48];
const ico = toIco(await Promise.all(icoSizes.map(async (size) => ({ size, data: await png(master, size) }))));

await mkdir(path.join(root, "public/icons"), { recursive: true });
const outputs = [
  ["src/app/favicon.ico", ico],
  ["src/app/apple-icon.png", await png(fullBleed, 180)],
  ["public/icons/icon-192.png", await png(master, 192)],
  ["public/icons/icon-512.png", await png(master, 512)],
  ["public/icons/maskable-512.png", await png(maskable, 512)],
];

for (const [file, data] of outputs) {
  await writeFile(path.join(root, file), data);
  console.log(`✓ ${file} (${data.length.toLocaleString()} bytes)`);
}
