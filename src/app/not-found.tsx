import type { Metadata } from "next";
import Link from "next/link";
import { Icon, Wave } from "@/components/ui";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <div className="wrap" style={{ paddingTop: 60, display: "grid", gap: 18, maxWidth: 760 }}>
      <span className="tc y">404 · Cut</span>
      <h1 className="disp d2">This page was cut.</h1>
      <p className="lede">It isn&apos;t here, or it moved. The rest of the take is fine.</p>
      <Wave seed={404} cuts={[[30, 60]]} label="A waveform with a long cut in the middle" />
      <div className="ctas">
        <Link className="key" href="/">Home</Link>
        <Link className="ghost" href="/help">Help centre <Icon name="arrow-right" /></Link>
      </div>
    </div>
  );
}
