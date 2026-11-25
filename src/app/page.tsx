export default function Home() {
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24, textAlign: "center" }}>
      <div>
        <p style={{ letterSpacing: "0.14em", textTransform: "uppercase", color: "#FFDD00", fontWeight: 700 }}>Zen Teleprompter</p>
        <h1 style={{ fontSize: "clamp(32px, 6vw, 64px)", margin: "8px 0" }}>Read it. Record it. Fix everything.</h1>
        <p style={{ color: "#A9A9A9" }}>The new site is on its way.</p>
      </div>
    </main>
  );
}
