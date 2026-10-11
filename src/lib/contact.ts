export const CONTACT_LIMITS = {
  name: 80,
  subject: 120,
  /** Kept well under the ~2,000 character URL limit some mail clients enforce on mailto links. */
  message: 1500,
} as const;

export type ContactFields = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactFields, string>>;

// Pragmatic check: one "@", no spaces, and a dot in the domain. Full RFC 5322 validation
// rejects nothing useful here and the mail client is the real validator.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(fields: ContactFields): ContactErrors {
  const errors: ContactErrors = {};
  const name = fields.name.trim();
  const email = fields.email.trim();
  const subject = fields.subject.trim();
  const message = fields.message.trim();

  if (!name) errors.name = "Please enter your name.";
  else if (name.length > CONTACT_LIMITS.name) errors.name = `Keep your name under ${CONTACT_LIMITS.name} characters.`;

  if (!email) errors.email = "Please enter your email so I can reply.";
  else if (!EMAIL_PATTERN.test(email)) errors.email = "That email address doesn't look right.";

  if (subject.length > CONTACT_LIMITS.subject)
    errors.subject = `Keep the subject under ${CONTACT_LIMITS.subject} characters.`;

  if (!message) errors.message = "Please write a short message.";
  else if (message.length < 10) errors.message = "Could you add a little more detail?";
  else if (message.length > CONTACT_LIMITS.message)
    errors.message = `Keep the message under ${CONTACT_LIMITS.message} characters.`;

  return errors;
}

/** Builds a mailto: URL with every user-supplied value percent-encoded. */
export function buildMailtoUrl(to: string, fields: ContactFields): string {
  const name = fields.name.trim();
  const subject = fields.subject.trim() || `Hello from ${name}`;
  const body = `${fields.message.trim()}\n\n— ${name}\n${fields.email.trim()}`;
  const params = `subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return `mailto:${to}?${params}`;
}
