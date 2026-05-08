"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useId, useState } from "react";

function ResumeModal({
  open,
  onClose,
  resumeUrl,
}: {
  open: boolean;
  onClose: () => void;
  resumeUrl: string;
}) {
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[220] flex items-center justify-center p-4 sm:p-8"
      role="presentation"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/35 backdrop-blur-[2px]" aria-hidden />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-[1] flex w-full max-w-5xl flex-col overflow-hidden rounded-[22px] border border-black/[0.12] bg-white shadow-[0_24px_64px_-16px_rgba(0,0,0,0.25)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 border-b border-black/[0.08] bg-white px-5 py-4 sm:px-6">
          <div className="min-w-0">
            <h2
              id={titleId}
              className="truncate text-[16px] font-semibold tracking-[-0.03em] text-[#171717] sm:text-[18px]"
              style={{ fontFamily: "Satoshi, var(--font-sans)" }}
            >
              Resume
            </h2>
            <p className="mt-0.5 text-[12px] text-black/50 sm:text-[13px]">
              Preview inline. Download anytime.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <a
              href={resumeUrl}
              download
              className="rounded-full border border-black/[0.12] bg-black/[0.04] px-4 py-2 text-[13px] font-medium text-[#0a0a0a] transition-colors hover:bg-black/[0.07]"
              style={{ fontFamily: "Satoshi, var(--font-sans)" }}
            >
              Download
            </a>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-black/[0.12] bg-white px-4 py-2 text-[13px] font-medium text-[#0a0a0a] transition-colors hover:bg-black/[0.04]"
              style={{ fontFamily: "Satoshi, var(--font-sans)" }}
            >
              Close
            </button>
          </div>
        </div>

        <div className="relative h-[72vh] min-h-[420px] w-full bg-[#f6f7f8]">
          <iframe title="Resume PDF" src={resumeUrl} className="absolute inset-0 h-full w-full" />
        </div>
      </div>
    </div>
  );
}

export function ResumePopupButton({
  resumeUrl,
  buttonClassName,
  buttonStyle,
  children,
}: {
  resumeUrl: string;
  buttonClassName: string;
  buttonStyle?: CSSProperties;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={buttonClassName}
        style={buttonStyle}
      >
        {children}
      </button>
      <ResumeModal open={open} onClose={() => setOpen(false)} resumeUrl={resumeUrl} />
    </>
  );
}

