import { ImageResponse } from "next/og"
import { siteConfig } from "@/lib/site"

interface OgImageOptions {
  eyebrow: string
  title: string
  description: string
}

export const ogImageSize = {
  width: 1200,
  height: 630,
}

export const ogImageContentType = "image/png"

export function createOgImage({
  eyebrow,
  title,
  description,
}: OgImageOptions) {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(circle at top left, rgba(201,137,10,0.3), transparent 34%), linear-gradient(135deg, #12110E 0%, #1A1916 55%, #23211B 100%)",
          color: "#F4F0E8",
          fontFamily: "Arial, sans-serif",
          padding: "56px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            border: "1px solid rgba(244,240,232,0.12)",
            borderRadius: "28px",
            padding: "48px",
            flexDirection: "column",
            justifyContent: "space-between",
            background: "rgba(8, 8, 8, 0.18)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "18px",
              maxWidth: "820px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                fontSize: "26px",
                color: "#C9890A",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              <span
                style={{
                  display: "flex",
                  width: "12px",
                  height: "12px",
                  borderRadius: "999px",
                  background: "#C9890A",
                }}
              />
              {eyebrow}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: "68px",
                lineHeight: 1.05,
                fontWeight: 700,
              }}
            >
              {title}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: "28px",
                lineHeight: 1.35,
                color: "rgba(244,240,232,0.72)",
                maxWidth: "760px",
              }}
            >
              {description}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "rgba(244,240,232,0.6)",
              fontSize: "24px",
            }}
          >
            <span>{siteConfig.name}</span>
            <span>{siteConfig.url.replace("https://", "")}</span>
          </div>
        </div>
      </div>
    ),
    ogImageSize
  )
}
