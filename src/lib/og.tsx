import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const OG_SIZE = { width: 1200, height: 630 };

/** One card design for every page type: the kicker as a timecode, the title in Barlow capitals,
 *  and a waveform with cut marks along the foot. Text only, no screenshots or people. */
export async function renderOg(kicker: string, title: string) {
  const [font, icon] = await Promise.all([
    readFile(join(process.cwd(), "src/assets/BarlowCondensed-ExtraBold.ttf")),
    readFile(join(process.cwd(), "public/icon.png")),
  ]);
  const iconSrc = `data:image/png;base64,${icon.toString("base64")}`;
  let s = 7;
  const rnd = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  const cuts = [[14, 20], [41, 46], [63, 70]];
  const bars = Array.from({ length: 72 }, (_, k) => {
    const cut = cuts.some(([a, b]) => k >= a && k < b);
    return { cut, h: Math.round((cut ? 0.15 + rnd() * 0.1 : 0.3 + rnd() * 0.7) * 90) };
  });
  const size = title.length > 46 ? 74 : title.length > 28 ? 92 : 112;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#0b0b0b", color: "#f4f4f1", fontFamily: "Barlow", padding: "56px 68px 44px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 36, textTransform: "uppercase", letterSpacing: 1 }}>
          <img src={iconSrc} width={60} height={60} style={{ borderRadius: 14 }} alt="" />
          Zen Teleprompter: Video Editor
        </div>
        <div style={{ display: "flex", marginTop: 46, fontSize: 30, color: "#ffdd00", letterSpacing: 4, textTransform: "uppercase" }}>{kicker}</div>
        <div style={{ display: "flex", marginTop: 10, fontSize: size, lineHeight: 0.95, textTransform: "uppercase", maxWidth: 1060 }}>{title}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: "auto", height: 100 }}>
          {bars.map((b, k) => (
            <div key={k} style={{ width: 10, height: b.h, background: b.cut ? "#ffdd00" : "#f4f4f1", opacity: b.cut ? 0.9 : 0.75, borderRadius: 2 }} />
          ))}
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: [{ name: "Barlow", data: font, weight: 800, style: "normal" }] },
  );
}
