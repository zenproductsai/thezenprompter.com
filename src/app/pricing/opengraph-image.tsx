import { OG_SIZE, renderOg } from "@/lib/og";

export const alt = "Zen Teleprompter. 3 days free. Then one plan.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOg("Pricing", "3 days free. Then one plan.");
}
