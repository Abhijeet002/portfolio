import { describe, expect, it } from "vitest";
import { CONTACT_LIMITS, buildMailtoUrl, validateContact, type ContactFields } from "./contact";

const valid: ContactFields = {
  name: "Jane Doe",
  email: "jane@example.com",
  subject: "Frontend role",
  message: "Hi Abhijeet, we'd love to talk about a role.",
};

describe("validateContact", () => {
  it("accepts a complete message", () => {
    expect(validateContact(valid)).toEqual({});
  });

  it("treats whitespace-only fields as empty", () => {
    const errors = validateContact({ name: "   ", email: " ", subject: "", message: "\n\t" });
    expect(Object.keys(errors).sort()).toEqual(["email", "message", "name"]);
  });

  it.each(["jane", "jane@", "jane@example", "ja ne@example.com", "@example.com"])("rejects email %j", (email) => {
    expect(validateContact({ ...valid, email }).email).toBeDefined();
  });

  it("enforces length limits", () => {
    expect(validateContact({ ...valid, message: "short" }).message).toBeDefined();
    expect(validateContact({ ...valid, message: "a".repeat(CONTACT_LIMITS.message + 1) }).message).toBeDefined();
    expect(validateContact({ ...valid, name: "a".repeat(CONTACT_LIMITS.name + 1) }).name).toBeDefined();
    expect(validateContact({ ...valid, subject: "a".repeat(CONTACT_LIMITS.subject + 1) }).subject).toBeDefined();
  });
});

describe("buildMailtoUrl", () => {
  it("percent-encodes every user value so it can't inject extra headers", () => {
    const url = buildMailtoUrl("me@example.com", {
      ...valid,
      subject: "Hi&cc=attacker@example.com",
      message: "Line 1\nLine 2 & more?",
    });
    expect(url.startsWith("mailto:me@example.com?subject=")).toBe(true);
    expect(url).not.toContain("&cc=");
    const params = new URLSearchParams(url.split("?")[1]);
    expect(params.get("subject")).toBe("Hi&cc=attacker@example.com");
    expect(params.get("body")).toContain("Line 1\nLine 2 & more?");
    expect(params.get("body")).toContain("jane@example.com");
  });

  it("falls back to a default subject", () => {
    const params = new URLSearchParams(buildMailtoUrl("me@example.com", { ...valid, subject: "  " }).split("?")[1]);
    expect(params.get("subject")).toBe("Hello from Jane Doe");
  });
});
