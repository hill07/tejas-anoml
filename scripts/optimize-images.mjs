// Converts the source photos in assets-src/ into responsive WebP files in src/assets/
// and generates the PWA / favicon icons from the monogram.
import sharp from 'sharp';
import fs from 'node:fs';

const src = 'assets-src';
const siteArtwork = 'assets-src/site-artwork';
const out = 'src/assets';
const publicOptimized = 'public/optimized';
fs.mkdirSync(out, { recursive: true });
fs.mkdirSync('public/icons', { recursive: true });
fs.mkdirSync(publicOptimized, { recursive: true });

const photos = [
  ['malta-mdina.jpg', 'malta-mdina', [640, 1280]],
  ['mandap.jpg', 'mandap', [640, 1280]],
  ['attire-mehndi.jpg', 'attire-mehndi', [480, 800]],
  ['attire-haldi.jpg', 'attire-haldi', [480, 800]],
  ['attire-sangeet.jpg', 'attire-sangeet', [480, 800]],
  ['attire-reception.jpg', 'attire-reception', [480, 800]],
  ['attire-ceremony.jpg', 'attire-ceremony', [480, 800]],
];

for (const [file, name, widths] of photos) {
  for (const w of widths) {
    await sharp(`${src}/${file}`).resize({ width: w, withoutEnlargement: true }).webp({ quality: 78 }).toFile(`${out}/${name}-${w}.webp`);
  }
}

// Monogram keeps its transparency.
for (const w of [160, 480]) {
  await sharp(`${src}/monogram.png`).resize({ width: w }).webp({ quality: 85, alphaQuality: 90 }).toFile(`${out}/monogram-${w}.webp`);
}

// Icons on an ivory background so they read on any home screen.
const ivory = { r: 247, g: 239, b: 226, alpha: 1 };
async function icon(size, file, pad = 0.12) {
  const inner = Math.round(size * (1 - pad * 2));
  const logo = await sharp(`${src}/monogram.png`).resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: ivory } })
    .composite([{ input: logo, gravity: 'center' }]).png().toFile(file);
}
await icon(192, 'public/icons/icon-192.png');
await icon(512, 'public/icons/icon-512.png', 0.18);
await icon(180, 'public/icons/apple-touch-icon.png');
await icon(64, 'public/favicon.png', 0.04);
// Social share image
const og = await sharp(`${src}/malta-mdina.jpg`).resize(1200, 630, { fit: 'cover' }).jpeg({ quality: 80 }).toBuffer();
await sharp(og).toFile('public/og-image.jpg');

// Optimize the larger public artwork used by the homepage and event invitations.
for (const width of [640, 1080]) {
  await sharp(`${siteArtwork}/home.jpeg`)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(`${publicOptimized}/home-${width}.webp`);
}

const artwork = [
  ['ourstory.png', 'ourstory'],
  ['weddinginvite.png', 'weddinginvite'],
  ['wardroom.png', 'wardroom'],
  ['travelinfo.png', 'travelinfo'],
  ['weddingguide.png', 'weddingguide'],
  ['more.png', 'more'],
  ['thingstodo.png', 'thingstodo'],
];
for (const [file, name] of artwork) {
  await sharp(`${siteArtwork}/${file}`)
    .resize({ width: 640, withoutEnlargement: true })
    .webp({ quality: 78, alphaQuality: 85 })
    .toFile(`${publicOptimized}/${name}.webp`);
}

const invitationPhotos = [
  ['mehndi.png', 'mehndi'],
  ['Haldi.jpeg', 'haldi'],
  ['Wedding.jpeg', 'wedding'],
  ['reception.jpeg', 'reception'],
];
for (const [file, name] of invitationPhotos) {
  await sharp(`${siteArtwork}/${file}`)
    .resize({ width: 720, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(`${publicOptimized}/${name}.webp`);
}

console.log('done');
