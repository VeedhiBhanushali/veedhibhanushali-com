"use client";

import type { CSSProperties } from "react";
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

type ExpandableAboutBodyProps = {
  text: string;
  label: string;
  paragraphStyle: CSSProperties;
  /** Visible lines before clamp (default 5 keeps cards compact). */
  lineClamp?: number;
  /** Merged onto the outer wrapper (e.g. `self-stretch` in a flex column). */
  className?: string;
};

function splitAboutText(text: string): { intro: string; bullets: string[] } {
  const lines = text.split(/\r?\n/);
  let i = 0;
  while (i < lines.length && lines[i].trim().length === 0) i += 1;

  const introLines: string[] = [];
  for (; i < lines.length; i += 1) {
    const line = lines[i];
    if (line.trim().length === 0) break;
    introLines.push(line);
  }

  while (i < lines.length && lines[i].trim().length === 0) i += 1;

  const bullets: string[] = [];
  for (; i < lines.length; i += 1) {
    const raw = lines[i].trim();
    if (!raw) continue;
    if (raw.startsWith("- ")) bullets.push(raw.slice(2).trim());
    else bullets.push(raw);
  }

  return { intro: introLines.join("\n").trim(), bullets };
}

export function ExpandableAboutBody({
  text,
  label,
  paragraphStyle,
  lineClamp = 5,
  className,
}: ExpandableAboutBodyProps) {
  const [open, setOpen] = useState(false);
  const [needsReadMore, setNeedsReadMore] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descId = useId();

  const marginTop = paragraphStyle.marginTop;
  const textStyle: CSSProperties = { ...paragraphStyle, marginTop: 0 };
  const parsed = splitAboutText(text);

  const measure = useCallback(() => {
    const el = contentRef.current;
    if (!el) return;
    setNeedsReadMore(el.scrollHeight > el.clientHeight + 2);
  }, [text, lineClamp]);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    const el = contentRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(el);
    return () => ro.disconnect();
  }, [measure]);

  useEffect(() => {
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <div
        className={`min-w-0 w-full max-w-full self-stretch ${className ?? ""}`}
        style={{ marginTop }}
      >
        <div
          ref={contentRef}
          className="break-words [overflow-wrap:anywhere]"
          style={{
            ...textStyle,
            width: "100%",
            maxWidth: "100%",
            wordBreak: "break-word",
            overflowWrap: "anywhere",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitBoxPack: "start",
            WebkitLineClamp: lineClamp,
            WebkitBoxOrient: "vertical",
          }}
        >
          {parsed.intro ? (
            <p className="whitespace-pre-line">{parsed.intro}</p>
          ) : null}
          {parsed.bullets.length ? (
            <ul className={`list-disc pl-5 ${parsed.intro ? "mt-[0.7em]" : ""} space-y-[0.35em]`}>
              {parsed.bullets.map((b, idx) => (
                <li key={`${label}-${idx}`}>{b}</li>
              ))}
            </ul>
          ) : null}
        </div>
        {needsReadMore ? (
          <button
            type="button"
            className="mt-4 text-left text-[13px] font-medium tracking-[-0.02em] text-[#0a0a0a] underline decoration-black/25 underline-offset-[3px] transition-colors hover:text-black hover:decoration-black/50"
            style={{ fontFamily: "Satoshi, var(--font-sans)" }}
            onClick={() => setOpen(true)}
          >
            Read more
          </button>
        ) : null}
      </div>

      {open ? (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8"
          role="presentation"
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-black/35 backdrop-blur-[2px]" aria-hidden />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descId}
            className="relative z-[1] max-h-[min(82vh,680px)] w-full max-w-lg overflow-y-auto rounded-[22px] border border-black/[0.1] bg-white p-6 shadow-[0_24px_64px_-16px_rgba(0,0,0,0.25)] sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              id={titleId}
              className="text-[20px] font-semibold leading-snug tracking-[-0.03em] text-[#171717]"
              style={{ fontFamily: "Satoshi, var(--font-sans)" }}
            >
              {label}
            </h2>
            <div
              id={descId}
              className="mt-4 text-black/75"
              style={{
                ...textStyle,
                color: "rgba(0,0,0,0.82)",
              }}
            >
              {parsed.intro ? <p className="whitespace-pre-line">{parsed.intro}</p> : null}
              {parsed.bullets.length ? (
                <ul className={`list-disc pl-5 ${parsed.intro ? "mt-[0.7em]" : ""} space-y-[0.35em]`}>
                  {parsed.bullets.map((b, idx) => (
                    <li key={`${label}-modal-${idx}`}>{b}</li>
                  ))}
                </ul>
              ) : null}
            </div>
            <button
              type="button"
              className="mt-6 rounded-full border border-black/[0.12] bg-black/[0.04] px-4 py-2 text-[14px] font-medium text-[#0a0a0a] transition-colors hover:bg-black/[0.07]"
              style={{ fontFamily: "Satoshi, var(--font-sans)" }}
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
