import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#1C1917", color: "#FAF9F6", padding: "60px 66px", position: "relative", flexDirection: "column", justifyContent: "space-between", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", fontSize: 24, fontWeight: 700, letterSpacing: 2 }}>
          <div style={{ display: "flex", width: 13, height: 13, borderRadius: 7, background: "#E96AA7", marginRight: 16 }} />
          CONNECTING THE DOTS
        </div>
        <div style={{ display: "flex", flexDirection: "column", width: 760 }}>
          <div style={{ display: "flex", color: "#F18DBD", fontSize: 23, fontWeight: 700, letterSpacing: 4, marginBottom: 16 }}>PROJECT PRESENTATION</div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 87, fontWeight: 800, lineHeight: 1.04, letterSpacing: -4 }}>
            <span>Career</span>
            <span>Lighthouse</span>
          </div>
          <div style={{ display: "flex", fontSize: 27, color: "#E7E1DB", lineHeight: 1.4, marginTop: 24, maxWidth: 670 }}>A framework for systemic employability infrastructure in Africa.</div>
        </div>
        <div style={{ display: "flex", position: "absolute", right: 76, top: 168, width: 230, height: 230, borderRadius: 115, background: "#B30059", alignItems: "center", justifyContent: "center", border: "3px solid #F18DBD" }}>
          <svg width="84" height="94" viewBox="0 0 84 94"><path d="M14 6 L78 47 L14 88 Z" fill="#FAF9F6" /></svg>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #69615D", paddingTop: 22, fontSize: 22 }}>
          <span style={{ color: "#F18DBD", fontWeight: 700 }}>WATCH THE PRESENTATION</span>
          <span>detounogwo.com</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
