/**
 * Restaura las imágenes del sitio en public/images/.
 *
 * Se ejecuta automáticamente con `npm install` (postinstall).
 * Las URLs firmadas del manifiesto tienen vigencia limitada (~6 días desde
 * su generación). Si expiraron, copia manualmente las imágenes a
 * public/images/ o vuelve a generar el manifiesto.
 */
import { createWriteStream, existsSync, mkdirSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import https from 'node:https';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const outDir = path.join(root, 'public', 'images');
const manifestPath = path.join(root, 'assets-images.json');

function download(url, dest, redirects = 5) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if ([301, 302, 303, 307, 308].includes(res.statusCode) && redirects > 0) {
          res.resume();
          resolve(download(res.headers.location, dest, redirects - 1));
          return;
        }
        if (res.statusCode !== 200) {
          res.resume();
          reject(new Error(`HTTP ${res.statusCode}`));
          return;
        }
        const file = createWriteStream(dest);
        res.pipe(file);
        file.on('finish', () => file.close(resolve));
        file.on('error', reject);
      })
      .on('error', reject);
  });
}

async function main() {
  if (!existsSync(manifestPath)) {
    console.log('[images] sin manifiesto, nada que hacer');
    return;
  }
  const { images } = JSON.parse(await readFile(manifestPath, 'utf8'));
  mkdirSync(outDir, { recursive: true });

  let restored = 0;
  let skipped = 0;
  let failed = 0;

  for (const { file, url } of images) {
    const dest = path.join(outDir, file);
    if (existsSync(dest)) {
      skipped++;
      continue;
    }
    try {
      await download(url, dest);
      restored++;
      console.log(`[images] OK ${file}`);
    } catch (err) {
      failed++;
      console.warn(`[images] FALLO ${file}: ${err.message}`);
    }
  }

  console.log(`[images] restauradas: ${restored}, existentes: ${skipped}, fallidas: ${failed}`);
  if (failed > 0) {
    console.warn('[images] Las URLs firmadas pueden haber expirado. Copia las imágenes manualmente a public/images/.');
  }
}

main();
