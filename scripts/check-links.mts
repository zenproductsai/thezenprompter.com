// Loads every page in the sitemap from a running build and checks every internal link and image on
// it returns 200. Copied from zenpasswords.com. Usage: npm run build && npx next start -p 3210, then
// node scripts/check-links.mts http://localhost:3210
const base = process.argv[2] ?? "http://localhost:3210";
const sm = await (await fetch(`${base}/sitemap.xml`)).text();
const pages = [...sm.matchAll(/<loc>https:\/\/thezenprompter\.com([^<]*)<\/loc>/g)].map((m) => m[1] || "/");
const seen = new Map<string, number>();
const bad: string[] = [];
const external = new Set<string>();
const status = async (u: string) => {
  if (!seen.has(u)) seen.set(u, (await fetch(`${base}${u}`, { redirect: "manual" })).status);
  return seen.get(u)!;
};
for (const p of pages) {
  const st = await status(p);
  if (st !== 200) { bad.push(`${st} page ${p}`); continue; }
  const html = await (await fetch(`${base}${p}`)).text();
  const refs = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map((m) => m[1].replace(/&amp;/g, "&"));
  for (const r of refs) {
    if (/^https?:\/\/(www\.)?zenproducts\.ai/.test(r)) { external.add(r); continue; }
    if (!r.startsWith("/") || r.startsWith("//") || r.startsWith("/_next")) continue;
    const path = r.split("#")[0].split("?")[0] || "/";
    const s = await status(path);
    if (s !== 200) bad.push(`${s} ${path}  (on ${p})`);
  }
}
console.log(`pages ${pages.length}, internal targets ${seen.size}`);
console.log("links still pointing at zenproducts.ai:\n  " + [...external].sort().join("\n  "));
if (bad.length) { console.log(`BROKEN ${bad.length}:\n  ` + [...new Set(bad)].join("\n  ")); process.exit(1); }
console.log("ALL LINKS OK");
