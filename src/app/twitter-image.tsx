import { OG_SIZE, renderOg } from "@/lib/og";

export const alt = "Zen Teleprompter. Record once. One tap finishes it.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOg("Teleprompter and one-tap editor", "Record once. One tap finishes it.");
}
