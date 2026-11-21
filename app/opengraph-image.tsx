import { ImageResponse } from "next/og";

export const alt = "Arrise Digital — Partners in Progress";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#111111",
          color: "#F7F7F5",
          padding: "64px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: "-120px",
            top: "-120px",
            width: "520px",
            height: "520px",
            borderRadius: "9999px",
            background: "#FF6B00",
            opacity: 0.14,
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26 }}>
          <svg width="40" height="46" viewBox="0 0 116 132">
            <path
              fill="#FF6B00"
              d="M75 10 L26 58 C19 67 17 78 22 88 C27 97 40 98 50 88 C38 84 38 71 48 66 L75 44 L100 64 L105 34 Z"
            />
            <path
              fill="rgba(247,247,245,0.7)"
              d="M34 128 C72 124 100 100 102 68 C80 88 54 108 34 128 Z"
            />
            <rect x="94" y="1" width="14" height="15" rx="3" fill="#FF8A00" />
            <rect x="107" y="18" width="9" height="9" rx="2" fill="#FF9E00" />
          </svg>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>ARRISE</span>
            <span style={{ color: "rgba(247,247,245,0.65)" }}>DIGITAL</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 18,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "#FF6B00",
              marginBottom: 24,
            }}
          >
            Independent digital growth studio
          </div>
          <div
            style={{
              fontSize: 92,
              lineHeight: 0.94,
              letterSpacing: "-0.05em",
              fontWeight: 600,
              maxWidth: 900,
            }}
          >
            We don&apos;t just generate leads. We build businesses.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(247,247,245,0.18)",
            paddingTop: 24,
            fontSize: 20,
            color: "rgba(247,247,245,0.6)",
          }}
        >
          <span>Partners in Progress.</span>
          <span>arrisedigital.vercel.app</span>
        </div>
      </div>
    ),
    size,
  );
}
