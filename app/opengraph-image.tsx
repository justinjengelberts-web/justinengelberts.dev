import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Justin Engelberts - Full-stack Product Engineer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, #1a1a2e 0%, transparent 50%), radial-gradient(circle at 75% 75%, #16213e 0%, transparent 50%)",
        }}
      >
        {/* Subtle grid overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "24px",
          }}
        >
          {/* Name */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "-0.02em",
            }}
          >
            Justin Engelberts
          </div>

          {/* Tagline */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              fontSize: 28,
              color: "#a1a1aa",
            }}
          >
            <span>Full-stack Product Engineer</span>
            <span style={{ color: "#52525b" }}>·</span>
            <span>AI-native</span>
            <span style={{ color: "#52525b" }}>·</span>
            <span>High Velocity</span>
          </div>

          {/* Accent line */}
          <div
            style={{
              width: 120,
              height: 4,
              marginTop: 16,
              background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
              borderRadius: 2,
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
