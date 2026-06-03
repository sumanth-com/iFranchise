/**
 * Render square favicons from BrandNav: trim, center, solid brand background, size-tuned fill.
 */

/** @param {import('sharp')} sharp */
export async function loadTrimmedLogo(sharp, sourcePath) {
  const trimmed = await sharp(sourcePath)
    .trim({ threshold: 12 })
    .png()
    .toBuffer();
  return sharp(trimmed);
}

/**
 * @param {typeof import('sharp')} sharpModule
 * @param {import('sharp').Sharp} logoSharp
 * @param {number} size
 * @param {{ fill?: number, bg?: { r: number, g: number, b: number, alpha: number }, sharpen?: boolean }} opts
 */
export async function renderFaviconSquare(sharpModule, logoSharp, size, opts = {}) {
  const fill = opts.fill ?? 0.86;
  const bg = opts.bg ?? { r: 10, g: 6, b: 24, alpha: 1 };
  const inner = Math.max(8, Math.round(size * fill));

  let pipeline = logoSharp.clone().resize(inner, inner, {
    fit: 'inside',
    withoutEnlargement: false,
    kernel: size <= 32 ? 'lanczos3' : 'lanczos2',
  });

  if (opts.sharpen && size <= 48) {
    pipeline = pipeline.sharpen({ sigma: 0.8, m1: 0.5, m2: 0.25 });
  }

  const logoPng = await pipeline.png().toBuffer();

  return sharpModule({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: bg,
    },
  })
    .composite([{ input: logoPng, gravity: 'center' }])
    .png({ compressionLevel: 9, effort: 10 })
    .toBuffer();
}

/** Build a multi-size .ico from PNG buffers (16, 32, 48). */
export function encodeIco(pngBuffers) {
  const entries = pngBuffers.map((buf) => {
    const width = buf.readUInt32BE(16);
    const height = buf.readUInt32BE(20);
    return { width, height, buf };
  });

  const count = entries.length;
  const headerSize = 6 + count * 16;
  let offset = headerSize;
  const parts = [];

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(count, 4);

  entries.forEach((entry, index) => {
    const w = entry.width >= 256 ? 0 : entry.width;
    const h = entry.height >= 256 ? 0 : entry.height;
    const dirOffset = 6 + index * 16;
    header.writeUInt8(w, dirOffset);
    header.writeUInt8(h, dirOffset + 1);
    header.writeUInt8(0, dirOffset + 2);
    header.writeUInt8(0, dirOffset + 3);
    header.writeUInt16LE(1, dirOffset + 4);
    header.writeUInt16LE(32, dirOffset + 6);
    header.writeUInt32LE(entry.buf.length, dirOffset + 8);
    header.writeUInt32LE(offset, dirOffset + 12);
    parts.push(entry.buf);
    offset += entry.buf.length;
  });

  return Buffer.concat([header, ...parts]);
}
