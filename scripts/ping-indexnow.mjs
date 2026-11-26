import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const SITE_HOST = 'tenantfig.com';
const FETCH_TIMEOUT_MS = 20000;

function withTimeout(promise, ms = FETCH_TIMEOUT_MS) {
  return new Promise((resolve) => {
    const t = setTimeout(() => resolve({ timedOut: true }), ms);
    promise.then(
      (v) => { clearTimeout(t); resolve(v); },
      (e) => { clearTimeout(t); resolve({ error: e && e.message }); }
    );
  });
}

function findKeyFile() {
  try { return readdirSync('public').find((f) => /^[a-f0-9]{32}\.txt$/.test(f)); } catch { return undefined; }
}

function collectUrlsLocal() {
  const urls = new Set();
  for (const dir of ['out', 'dist']) {
    if (!existsSync(join(dir, 'sitemap.xml'))) continue;
    try {
      const xml = readFileSync(join(dir, 'sitemap.xml'), 'utf8');
      const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
      locs.forEach((l) => urls.add(l));
    } catch {}
  }
  return urls;
}

async function main() {
  const keyFile = findKeyFile();
  if (!keyFile) { console.log('[indexnow] no key file, skip'); return; }
  const KEY = readFileSync(join('public', keyFile), 'utf8').trim();
  if (!KEY) { console.log('[indexnow] empty key, skip'); return; }
  const urlList = [...collectUrlsLocal()];
  if (!urlList.length) { console.log('[indexnow] no urls in out|dist sitemap, skip'); return; }
  const chunks = [];
  for (let i = 0; i < urlList.length; i += 10000) chunks.push(urlList.slice(i, i + 10000));
  for (const c of chunks) {
    const res = await withTimeout(
      fetch('https://api.indexnow.org/indexnow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ host: SITE_HOST, key: KEY, keyLocation: `https://${SITE_HOST}/${keyFile}`, urlList: c }),
      })
    );
    if (res && res.error) console.log('[indexnow] submit failed (ignored):', res.error);
    else if (res && res.timedOut) console.log('[indexnow] submit timed out (ignored)');
    else console.log('[indexnow] submitted', res.status, `(${c.length} urls)`);
  }
}

main().catch((e) => console.log('[indexnow] error (ignored):', e.message)).finally(() => process.exit(0));
