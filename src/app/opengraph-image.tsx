import { ImageResponse } from "next/og";

export const size        = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt         = "Granger Wang — Filmmaker · Videographer · Content Creator";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background:     "#07090d",
          width:          "100%",
          height:         "100%",
          display:        "flex",
          flexDirection:  "column",
          alignItems:     "flex-start",
          justifyContent: "flex-end",
          padding:        "80px 88px",
          position:       "relative",
        }}
      >
        {/* Atmospheric gradient */}
        <div
          style={{
            position:   "absolute",
            inset:      0,
            background: "radial-gradient(ellipse 65% 70% at 85% 20%, rgba(196,163,90,0.09) 0%, transparent 65%)",
          }}
        />

        {/* Gold accent rule */}
        <div
          style={{
            position:   "absolute",
            top:        80,
            left:       88,
            width:      56,
            height:     2,
            background: "#c4a35a",
          }}
        />

        {/* Eyebrow */}
        <div
          style={{
            fontSize:      16,
            color:         "#4a4845",
            letterSpacing: "4px",
            textTransform: "uppercase",
            marginBottom:  32,
            fontFamily:    "serif",
          }}
        >
          Portfolio
        </div>

        {/* Name */}
        <div
          style={{
            display:       "flex",
            flexDirection: "column",
            fontSize:      112,
            fontWeight:    700,
            lineHeight:    0.88,
            letterSpacing: "-2px",
            marginBottom:  28,
            fontFamily:    "serif",
          }}
        >
          <span style={{ color: "#f0ece4" }}>GRANGER</span>
          <span style={{ WebkitTextStroke: "2px #f0ece4", color: "transparent" }}>
            WANG
          </span>
        </div>

        {/* Disciplines */}
        <div
          style={{
            fontSize:      18,
            color:         "#c4a35a",
            letterSpacing: "4px",
            textTransform: "uppercase",
            marginBottom:  14,
            fontFamily:    "serif",
          }}
        >
          Filmmaker · Videographer · Content Creator
        </div>

        {/* Location */}
        <div
          style={{
            fontSize:      14,
            color:         "#706c67",
            letterSpacing: "2px",
            textTransform: "uppercase",
            fontFamily:    "serif",
          }}
        >
          Atlanta &amp; Athens, Georgia
        </div>
      </div>
    ),
    { ...size },
  );
}
