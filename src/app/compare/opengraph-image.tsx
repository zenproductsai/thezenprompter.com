import { OG_SIZE, renderOg } from "@/lib/og";

export const alt = "Zen Teleprompter: Video Editor";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOg("Compare", "Teleprompter apps, side by side.");
}
