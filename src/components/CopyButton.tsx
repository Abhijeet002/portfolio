"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

type CopyState = "idle" | "copied" | "error";

/** Copies text to the clipboard, with a fallback for browsers without the async Clipboard API. */
async function copyText(text: string): Promise<void> {
  if (navigator.clipboard?.writeText && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  try {
    if (!document.execCommand("copy")) throw new Error("Copy command was rejected");
  } finally {
    document.body.removeChild(textarea);
  }
}

export default function CopyButton({ value, label }: { value: string; label: string }) {
  const [state, setState] = useState<CopyState>("idle");
  const resetTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  const handleCopy = async () => {
    clearTimeout(resetTimer.current);
    try {
      await copyText(value);
      setState("copied");
    } catch {
      setState("error");
    }
    resetTimer.current = setTimeout(() => setState("idle"), 2000);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={label}
        className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-gray-200 transition-colors hover:border-indigo-400/60 hover:text-white"
      >
        {state === "copied" ? (
          <Check aria-hidden="true" className="h-3.5 w-3.5 text-emerald-400" />
        ) : (
          <Copy aria-hidden="true" className="h-3.5 w-3.5" />
        )}
        {state === "copied" ? "Copied" : state === "error" ? "Copy failed" : "Copy"}
      </button>
      {/* Announces the result to screen readers. */}
      <span role="status" className="sr-only">
        {state === "copied" ? "Copied to clipboard" : state === "error" ? "Could not copy to clipboard" : ""}
      </span>
    </>
  );
}
