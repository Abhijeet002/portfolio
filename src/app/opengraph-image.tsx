import { ImageResponse } from "next/og";
import { SITE } from "@/config/site";
import { MARK } from "@/components/brand/mark";

export const alt = `${SITE.name}, ${SITE.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social preview card shown when the site is shared (LinkedIn, WhatsApp, Slack, X…). */
export default function OpengraphImage() {
  const { chevron, cursor, gradient } = MARK;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "linear-gradient(135deg, #030712 0%, #111827 55%, #1e1b4b 100%)",
          color: "#f9fafb",
        }}
      >
        <svg width="112" height="112" viewBox={MARK.viewBox}>
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor={gradient.from} />
              <stop offset="1" stopColor={gradient.to} />
            </linearGradient>
          </defs>
          <rect width="64" height="64" rx={MARK.cornerRadius} fill="url(#g)" />
          <path
            d={chevron.d}
            fill="none"
            stroke="#fff"
            strokeWidth={chevron.strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x={cursor.x} y={cursor.y} width={cursor.width} height={cursor.height} rx={cursor.rx} fill="#fff" />
        </svg>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, letterSpacing: -2, lineHeight: 1.05 }}>{SITE.name}</div>
          <div
            style={{
              marginTop: 18,
              fontSize: 40,
              backgroundImage: `linear-gradient(90deg, ${gradient.from}, ${gradient.to})`,
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {SITE.role}
          </div>
          <div style={{ marginTop: 28, fontSize: 28, color: "#9ca3af", maxWidth: 900 }}>{SITE.tagline}</div>
        </div>
      </div>
    ),
    size,
  );
}
