"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Labels = { copy: string; copied: string; selected: string; write: string; status: string };

export default function CopyEmail({ email, labels }: { email: string; labels: Labels }) {
  const [state, setState] = useState<"idle" | "copied" | "selected">("idle");
  const textRef = useRef<HTMLSpanElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const reset = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2200);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      // Clipboard refused: select the address so Ctrl+C still works.
      const node = textRef.current;
      if (node) {
        const range = document.createRange();
        range.selectNodeContents(node);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
      setState("selected");
    }
    reset();
  };

  return (
    <>
      <span
        ref={textRef}
        className="min-w-0 text-[clamp(1.05rem,4.2vw,1.375rem)] font-bold [overflow-wrap:anywhere] select-all [font-stretch:108%]"
      >
        {email}
      </span>
      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={copy} className="btn btn-primary">
          {state === "copied" ? <Check strokeWidth={2} aria-hidden="true" /> : <Copy strokeWidth={1.8} aria-hidden="true" />}
          {state === "copied" ? labels.copied : state === "selected" ? labels.selected : labels.copy}
        </button>
        <a className="btn btn-secondary" href={`mailto:${email}`}>
          {labels.write}
        </a>
      </div>
      <span className="sr-only" role="status" aria-live="polite">
        {state === "copied" ? labels.status : ""}
      </span>
    </>
  );
}
