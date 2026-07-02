import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";
import { loadOgFonts, OG_COLORS, OG_SIZE } from "@/lib/og";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function OpengraphImage() {
  const fonts = await loadOgFonts();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: OG_COLORS.bg,
          padding: 80,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 30,
            left: 30,
            right: 30,
            bottom: 30,
            border: `1px solid ${OG_COLORS.goldSoft}`,
            borderRadius: 28,
            display: "flex",
          }}
        />
        <svg
          width="420"
          height="420"
          viewBox="-100 -100 200 200"
          style={{ position: "absolute", right: -90, top: -90, opacity: 0.22 }}
        >
          <g fill="none" stroke={OG_COLORS.gold} strokeWidth="2.5">
            <rect x="-58" y="-58" width="116" height="116" />
            <rect x="-58" y="-58" width="116" height="116" transform="rotate(45)" />
            <rect x="-36" y="-36" width="72" height="72" transform="rotate(22.5)" />
          </g>
        </svg>

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="34" height="34" viewBox="-100 -100 200 200">
            <g fill={OG_COLORS.gold}>
              <rect x="-62" y="-62" width="124" height="124" />
              <rect x="-62" y="-62" width="124" height="124" transform="rotate(45)" />
            </g>
          </svg>
          <div
            style={{
              fontFamily: "Inter",
              fontSize: 25,
              letterSpacing: 9,
              color: OG_COLORS.gold,
              textTransform: "uppercase",
            }}
          >
            {siteConfig.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontFamily: "Fraunces",
              fontSize: 86,
              lineHeight: 1.04,
              color: OG_COLORS.paper,
              maxWidth: 940,
            }}
          >
            Znanje koje spaja razum i predaju
          </div>
          <div
            style={{
              marginTop: 30,
              fontFamily: "Inter",
              fontSize: 29,
              color: OG_COLORS.paperSoft,
            }}
          >
            Tekstovi, predavanja i odgovori iz hanefijskog fikha
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "Inter",
            fontSize: 24,
          }}
        >
          <div style={{ color: OG_COLORS.gold, display: "flex" }}>{siteConfig.domainLabel}</div>
          <div style={{ color: OG_COLORS.paperSoft, display: "flex" }}>{siteConfig.tagline}</div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
