import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Shubh Kamal Sharma — Full-Stack & GenAI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px",
          backgroundColor: "#131313",
          backgroundImage:
            "radial-gradient(circle, rgba(59,73,76,0.6) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Cyan glow top-right */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(0,229,255,0.12) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        {/* Status badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 14px",
            borderRadius: 6,
            border: "1px solid rgba(59,73,76,0.4)",
            backgroundColor: "rgba(53,53,52,0.5)",
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "#00e5ff",
            }}
          />
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 11,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#00e5ff",
            }}
          >
            System Status · Online
          </span>
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 0.9,
            letterSpacing: "-0.02em",
            color: "#e5e2e1",
            marginBottom: 24,
            textShadow: "0 0 40px rgba(0,229,255,0.25)",
          }}
        >
          SHUBH KAMAL
          <br />
          <span style={{ color: "#00e5ff" }}>SHARMA</span>
        </div>

        {/* Role */}
        <div
          style={{
            fontSize: 22,
            color: "#bac9cc",
            marginBottom: 40,
          }}
        >
          Full-Stack SDE & Generative AI Engineer
        </div>

        {/* Tags row */}
        <div style={{ display: "flex", gap: 12 }}>
          {["Next.js", "FastAPI", "LangChain", "AWS", "Kafka"].map((t) => (
            <div
              key={t}
              style={{
                padding: "4px 12px",
                borderRadius: 4,
                border: "1px solid rgba(0,229,255,0.2)",
                backgroundColor: "rgba(0,229,255,0.08)",
                fontFamily: "monospace",
                fontSize: 12,
                letterSpacing: "0.1em",
                color: "#c3f5ff",
                textTransform: "uppercase",
              }}
            >
              {t}
            </div>
          ))}
        </div>

        {/* Bottom URL */}
        <div
          style={{
            position: "absolute",
            bottom: 48,
            right: 80,
            fontFamily: "monospace",
            fontSize: 14,
            color: "#849396",
            letterSpacing: "0.05em",
          }}
        >
          shubhkamalsharma.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}
