import { OG_SIZE, renderOg } from "@/lib/og";

export const alt = "Zen Teleprompter: Video Editor. Graba una vez. Un toque lo termina.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOg("Teleprompter y editor de video", "Graba una vez. Un toque lo termina.");
}
