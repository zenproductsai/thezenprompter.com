import { OG_SIZE, renderOg } from "@/lib/og";

export const alt = "Zen Teleprompter: Video Editor. Find the fix.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOg("Help centre", "Find the fix.");
}
