import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const src = path.resolve(__dirname, '..', 'src', 'assets')
const pub = path.resolve(__dirname, '..', 'public')

const images = [
  { file: path.join(src, 'team_member_treasure.png'), sizes: [400, 800] },
  { file: path.join(src, 'team_member_marcus.png'), sizes: [400, 800] },
]

async function main() {
  for (const img of images) {
    if (!fs.existsSync(img.file)) {
      console.warn('  skip (not found):', img.file)
      continue
    }
    const ext = path.extname(img.file)
    const base = path.basename(img.file, ext)

    for (const size of img.sizes) {
      const out = path.join(path.dirname(img.file), `${base}@${size}.webp`)
      await sharp(img.file)
        .resize({ width: size, withoutEnlargement: true })
        .webp({ quality: 85 })
        .toFile(out)
      const orig = fs.statSync(img.file).size
      const webp = fs.statSync(out).size
      console.log(`  ${base}.png (${(orig / 1024).toFixed(0)} KB) → ${base}@${size}.webp (${(webp / 1024).toFixed(0)} KB)`)
    }
  }

  // Also optimize reply_flow_logo.png to WebP
  const logoPath = path.join(pub, 'reply_flow_logo.png')
  if (fs.existsSync(logoPath)) {
    const logoWebP = path.join(pub, 'reply_flow_logo.webp')
    await sharp(logoPath)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(logoWebP)
    const orig = fs.statSync(logoPath).size
    const webp = fs.statSync(logoWebP).size
    console.log(`  reply_flow_logo.png (${(orig / 1024).toFixed(0)} KB) → reply_flow_logo.webp (${(webp / 1024).toFixed(0)} KB)`)
  }
}

main().catch(console.error)
