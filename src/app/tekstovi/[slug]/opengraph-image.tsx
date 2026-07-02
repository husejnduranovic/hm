import { ImageResponse } from "next/og";
import { getArticle, getArticles } from "@/lib/content";
import { formatDateBs } from "@/lib/utils";
import { siteConfig } from "@/data/site";
import { loadOgFonts, OG_COLORS, OG_SIZE } from "@/lib/og";

export const alt = siteConfig.name;
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return getArticles().map((a) => ({ slug: a.slug }));
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  const fonts = await loadOgFonts();

  const title = article?.title ?? siteConfig.name;
  const fontSize = title.length > 90 ? 50 : title.length > 60 ? 58 : 66;

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
          width="400"
          height="400"
          viewBox="-100 -100 200 200"
          style={{ position: "absolute", right: -80, bottom: -110, opacity: 0.18 }}
        >
          <g fill="none" stroke={OG_COLORS.gold} strokeWidth="2.5">
            <rect x="-58" y="-58" width="116" height="116" />
            <rect x="-58" y="-58" width="116" height="116" transform="rotate(45)" />
          </g>
        </svg>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="28" height="28" viewBox="-100 -100 200 200">
            <g fill={OG_COLORS.gold}>
              <rect x="-62" y="-62" width="124" height="124" />
              <rect x="-62" y="-62" width="124" height="124" transform="rotate(45)" />
            </g>
          </svg>
          <div
            style={{
              fontFamily: "Inter",
              fontSize: 22,
              letterSpacing: 7,
              color: OG_COLORS.gold,
              textTransform: "uppercase",
            }}
          >
            {siteConfig.name}
          </div>
          {article && (
            <div
              style={{
                marginLeft: 18,
                fontFamily: "Inter",
                fontSize: 20,
                color: OG_COLORS.paperSoft,
                border: `1px solid ${OG_COLORS.goldSoft}`,
                borderRadius: 999,
                padding: "6px 22px",
              }}
            >
              {article.categoryName}
            </div>
          )}
        </div>

        <div
          style={{
            fontFamily: "Fraunces",
            fontSize,
            lineHeight: 1.08,
            color: OG_COLORS.paper,
            maxWidth: 1000,
            display: "flex",
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "Inter",
            fontSize: 23,
          }}
        >
          <div style={{ color: OG_COLORS.paperSoft, display: "flex" }}>
            {article ? `${article.author} · ${formatDateBs(article.date)}` : siteConfig.tagline}
          </div>
          <div style={{ color: OG_COLORS.gold, display: "flex" }}>{siteConfig.domainLabel}</div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
