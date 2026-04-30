import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#131313",
          borderRadius: 6,
          border: "1px solid rgba(0,229,255,0.25)",
        }}
      >
        <span
          style={{
            fontFamily: "sans-serif",
            fontSize: 10,
            fontWeight: 700,
            color: "#00e5ff",
            letterSpacing: "-0.5px",
          }}
        >
          SKS
        </span>
      </div>
    ),
    { ...size }
  );
}
