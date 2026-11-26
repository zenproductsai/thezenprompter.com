import { OG_SIZE, renderOg } from "@/lib/og";

export const alt = "Zen Teleprompter: Video Editor. Grave uma vez. Um toque finaliza.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOg("Teleprompter e editor de vídeo", "Grave uma vez. Um toque finaliza.");
}
