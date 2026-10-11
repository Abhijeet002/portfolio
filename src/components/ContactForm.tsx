"use client";

import { useId, useRef, useState } from "react";
import { Send } from "lucide-react";
import {
  CONTACT_LIMITS,
  buildMailtoUrl,
  validateContact,
  type ContactErrors,
  type ContactFields,
} from "@/lib/contact";

const EMPTY: ContactFields = { name: "", email: "", subject: "", message: "" };
const FIELD_ORDER: (keyof ContactFields)[] = ["name", "email", "subject", "message"];

const inputClass =
  "w-full rounded-xl border bg-gray-900/60 px-4 py-3 text-gray-100 placeholder:text-gray-500 transition-colors focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40";

/**
 * Composes an email in the visitor's own mail app. There is no backend, so nothing is
 * stored or sent from this site; the visitor reviews and sends the message themselves.
 */
export default function ContactForm({ to }: { to: string }) {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [fields, setFields] = useState<ContactFields>(EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const fieldId = (name: keyof ContactFields) => `${id}-${name}`;
  const errorId = (name: keyof ContactFields) => `${id}-${name}-error`;

  const update = (name: keyof ContactFields) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const next = { ...fields, [name]: event.target.value };
    setFields(next);
    // Once the visitor has tried to submit, re-validate as they type so errors clear promptly.
    if (submitted) setErrors(validateContact(next));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);

    const nextErrors = validateContact(fields);
    setErrors(nextErrors);

    const firstInvalid = FIELD_ORDER.find((name) => nextErrors[name]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`#${CSS.escape(fieldId(firstInvalid))}`)?.focus();
      return;
    }

    window.location.href = buildMailtoUrl(to, fields);
  };

  const describedBy = (name: keyof ContactFields, extra?: string) =>
    [errors[name] ? errorId(name) : null, extra].filter(Boolean).join(" ") || undefined;

  const fieldError = (name: keyof ContactFields) =>
    errors[name] ? (
      <p id={errorId(name)} className="mt-2 text-sm text-rose-300">
        {errors[name]}
      </p>
    ) : null;

  const borderFor = (name: keyof ContactFields) => (errors[name] ? "border-rose-400/70" : "border-white/10");
  const messageLength = fields.message.trim().length;

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={fieldId("name")} className="mb-2 block text-sm font-medium text-gray-200">
            Name
          </label>
          <input
            id={fieldId("name")}
            name="name"
            type="text"
            autoComplete="name"
            maxLength={CONTACT_LIMITS.name}
            value={fields.name}
            onChange={update("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy("name")}
            className={`${inputClass} ${borderFor("name")}`}
            placeholder="Your name"
          />
          {fieldError("name")}
        </div>
        <div>
          <label htmlFor={fieldId("email")} className="mb-2 block text-sm font-medium text-gray-200">
            Email
          </label>
          <input
            id={fieldId("email")}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={fields.email}
            onChange={update("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email")}
            className={`${inputClass} ${borderFor("email")}`}
            placeholder="you@example.com"
          />
          {fieldError("email")}
        </div>
      </div>

      <div>
        <label htmlFor={fieldId("subject")} className="mb-2 block text-sm font-medium text-gray-200">
          Subject <span className="font-normal text-gray-500">(optional)</span>
        </label>
        <input
          id={fieldId("subject")}
          name="subject"
          type="text"
          maxLength={CONTACT_LIMITS.subject}
          value={fields.subject}
          onChange={update("subject")}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={describedBy("subject")}
          className={`${inputClass} ${borderFor("subject")}`}
          placeholder="What's this about?"
        />
        {fieldError("subject")}
      </div>

      <div>
        <div className="mb-2 flex items-baseline justify-between gap-4">
          <label htmlFor={fieldId("message")} className="block text-sm font-medium text-gray-200">
            Message
          </label>
          <span
            id={`${id}-message-count`}
            className={`text-xs ${messageLength > CONTACT_LIMITS.message ? "text-rose-300" : "text-gray-500"}`}
          >
            {messageLength}/{CONTACT_LIMITS.message}
          </span>
        </div>
        <textarea
          id={fieldId("message")}
          name="message"
          rows={6}
          value={fields.message}
          onChange={update("message")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describedBy("message", `${id}-message-count`)}
          className={`${inputClass} ${borderFor("message")} resize-y`}
          placeholder="Tell me about the role, project or idea…"
        />
        {fieldError("message")}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-gray-400">Opens your email app with the message ready to send.</p>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all hover:from-indigo-500 hover:to-purple-500"
        >
          <Send aria-hidden="true" className="h-4 w-4" />
          Compose email
        </button>
      </div>
    </form>
  );
}
