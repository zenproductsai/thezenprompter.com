import { OG_SIZE, renderOg } from "@/lib/og";

export const alt = "Zen Teleprompter: Video Editor. The cutting room.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOg("Blog", "The cutting room.");
}
