import { OG_SIZE, renderOg } from "@/lib/og";

export const alt = "Zen Teleprompter: Video Editor. Every release, newest first.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOg("What's new", "Every release, newest first.");
}
