import { describe, expect, it } from "vitest";
import { formatDate, formatDuration, formatYearMonth, monthsInRange, parseYearMonth } from "./date";

describe("parseYearMonth", () => {
  it("parses valid year-months", () => {
    expect(parseYearMonth("2025-09")).toEqual({ year: 2025, month: 9 });
  });

  it.each(["2025-9", "2025-13", "2025-00", "25-09", "", "2025-09-01"])("rejects %j", (value) => {
    expect(() => parseYearMonth(value)).toThrow(/Invalid year-month/);
  });
});

describe("monthsInRange", () => {
  const now = new Date(Date.UTC(2026, 9, 11)); // Oct 2026

  it("counts both the start and end month", () => {
    expect(monthsInRange("2024-04", "2024-07", now)).toBe(4);
  });

  it("counts a single-month range as one month", () => {
    expect(monthsInRange("2024-04", "2024-04", now)).toBe(1);
  });

  it("runs an open range up to now", () => {
    expect(monthsInRange("2025-09", undefined, now)).toBe(14);
  });

  it("spans year boundaries", () => {
    expect(monthsInRange("2024-11", "2025-02", now)).toBe(4);
  });

  it("never goes negative for inverted ranges or future starts", () => {
    expect(monthsInRange("2025-05", "2025-01", now)).toBe(0);
    expect(monthsInRange("2027-01", undefined, now)).toBe(0);
  });
});

describe("formatDuration", () => {
  it.each([
    [0, "0 months"],
    [-3, "0 months"],
    [Number.NaN, "0 months"],
    [1, "1 month"],
    [11, "11 months"],
    [12, "1+ year"],
    [17, "1+ year"],
    [18, "1.5+ years"],
    [24, "2+ years"],
    [30, "2.5+ years"],
  ])("formats %d months as %j", (months, expected) => {
    expect(formatDuration(months)).toBe(expected);
  });
});

describe("formatters", () => {
  it("formats year-months in UTC regardless of server timezone", () => {
    expect(formatYearMonth("2025-01")).toBe("Jan 2025");
  });

  it("formats ISO timestamps and returns null for garbage", () => {
    expect(formatDate("2025-03-04T10:00:00Z")).toBe("Mar 4, 2025");
    expect(formatDate("not a date")).toBeNull();
  });
});
