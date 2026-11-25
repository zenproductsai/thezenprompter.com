import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zen Teleprompter",
  description: "Read your script under the camera, then let Fix everything finish the video.",
  // Placeholder while the site is built: kept out of search until the real pages ship.
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#0B0B0B", color: "#F2F2F2", fontFamily: "system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
