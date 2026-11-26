import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/content/site";

// A web app manifest, for "Add to Home Screen" and the browser's idea of the site's name and icon.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "Zen Teleprompter",
    description: "Teleprompter and one-tap video editor for iPhone and iPad.",
    start_url: "/",
    display: "browser",
    background_color: "#0b0b0b",
    theme_color: "#0b0b0b",
    icons: [
      { src: "/icon.png", sizes: "256x256", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
