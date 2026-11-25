import { OG_SIZE, renderOg } from "@/lib/og";

export const alt = "Zen Teleprompter. Write to the Founder.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOg("Support", "Write to the Founder.");
}
