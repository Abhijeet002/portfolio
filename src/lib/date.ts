/** Matches an ISO year-month such as "2025-09". */
const YEAR_MONTH_PATTERN = /^(\d{4})-(0[1-9]|1[0-2])$/;

export type YearMonth = { year: number; month: number };

/** Parses "YYYY-MM". Throws on malformed input so bad data fails the build, not the visitor. */
export function parseYearMonth(value: string): YearMonth {
  const match = YEAR_MONTH_PATTERN.exec(value);
  if (!match) {
    throw new Error(`Invalid year-month "${value}". Expected the format YYYY-MM.`);
  }
  return { year: Number(match[1]), month: Number(match[2]) };
}

/**
 * Number of calendar months covered by a range, counting both the start and end month
 * (Apr–Jul = 4). An open range (no end) runs to `now`. Ranges that end before they start
 * count as 0 rather than going negative.
 */
export function monthsInRange(start: string, end: string | undefined, now: Date = new Date()): number {
  const from = parseYearMonth(start);
  const to = end ? parseYearMonth(end) : { year: now.getUTCFullYear(), month: now.getUTCMonth() + 1 };
  const months = (to.year - from.year) * 12 + (to.month - from.month) + 1;
  return Math.max(0, months);
}

/** "4 months", "1+ year", "1.5+ years": rounds down to the nearest half year so it never overstates. */
export function formatDuration(totalMonths: number): string {
  if (!Number.isFinite(totalMonths) || totalMonths <= 0) return "0 months";
  if (totalMonths < 12) return `${totalMonths} ${totalMonths === 1 ? "month" : "months"}`;

  const years = Math.floor(totalMonths / 6) / 2;
  return `${years}+ ${years === 1 ? "year" : "years"}`;
}

const monthYearFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

/** "2025-09" → "Sep 2025". */
export function formatYearMonth(value: string): string {
  const { year, month } = parseYearMonth(value);
  return monthYearFormatter.format(new Date(Date.UTC(year, month - 1, 1)));
}

const fullDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

/** ISO timestamp → "Mar 4, 2025". Returns null for unparseable input instead of "Invalid Date". */
export function formatDate(iso: string): string | null {
  const time = Date.parse(iso);
  return Number.isNaN(time) ? null : fullDateFormatter.format(new Date(time));
}
