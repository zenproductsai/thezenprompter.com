#!/usr/bin/env node
// Tells the IndexNow engines (Bing, Yandex, Naver, Seznam, Yep) that the site's pages changed.
// Run after a deploy has gone live: `node scripts/indexnow.mjs`. Google does not take IndexNow; it reads
// the sitemap through Search Console, which needs its own property for https://thezenprompter.com/.
import fs from 'node:fs'; import path from 'node:path'; import { fileURLToPath } from 'node:url';
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const keyFile = fs.readdirSync(path.join(root, 'public')).find(f => /^[0-9a-f]{32}\.txt$/.test(f));
if (!keyFile) throw new Error('No IndexNow key file in public/');
const key = keyFile.replace('.txt', '');
const host = 'thezenprompter.com';
const sitemap = await (await fetch(`https://${host}/sitemap.xml`)).text();
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
// The key file must be live first, or every engine answers 403.
const live = await fetch(`https://${host}/${keyFile}`);
if (!live.ok || (await live.text()).trim() !== key) throw new Error(`Key file not live yet (${live.status}). Deploy first.`);
const r = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key, keyLocation: `https://${host}/${keyFile}`, urlList: urls }),
});
console.log(`IndexNow: ${r.status} for ${urls.length} URL(s): ${urls.join(', ')}`);
if (r.status !== 200 && r.status !== 202) process.exit(1);
