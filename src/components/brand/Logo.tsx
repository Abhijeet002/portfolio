import { useId } from "react";
import { MARK } from "./mark";

type LogoMarkProps = {
  /** Rendered size in pixels. */
  size?: number;
  /** Blink the cursor. Automatically disabled for visitors who prefer reduced motion. */
  animated?: boolean;
  className?: string;
};

/**
 * The logo mark. Decorative by default: wrap it in a labelled link or pair it with visible
 * text, since the mark alone isn't a meaningful name for assistive technology.
 */
export default function LogoMark({ size = 40, animated = false, className }: LogoMarkProps) {
  // Unique per instance so two logos on one page never share (and clash on) a gradient id.
  const gradientId = `logo-gradient-${useId().replace(/:/g, "")}`;
  const { chevron, cursor, gradient } = MARK;

  return (
    <svg
      viewBox={MARK.viewBox}
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={gradient.from} />
          <stop offset="1" stopColor={gradient.to} />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx={MARK.cornerRadius} fill={`url(#${gradientId})`} />
      <path
        d={chevron.d}
        fill="none"
        stroke="#fff"
        strokeWidth={chevron.strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x={cursor.x}
        y={cursor.y}
        width={cursor.width}
        height={cursor.height}
        rx={cursor.rx}
        fill="#fff"
        opacity={cursor.opacity}
        className={animated ? "logo-cursor-blink" : undefined}
      />
    </svg>
  );
}
