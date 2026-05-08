"use client";

import { motion } from "framer-motion";
import {
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export function PageReveal({
  children,
  className = "absolute inset-0",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function TypewriterLines({ lines }: { lines: string[] }) {
  const [lineIndex, setLineIndex] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const line = lines[lineIndex] ?? "";
    const isComplete = characterCount === line.length;
    const isEmpty = characterCount === 0;
    const delay = isComplete && !isDeleting ? 1450 : isDeleting ? 26 : 42;

    const timeout = window.setTimeout(() => {
      if (isComplete && !isDeleting) {
        setIsDeleting(true);
        return;
      }

      if (isEmpty && isDeleting) {
        setIsDeleting(false);
        setLineIndex((index) => (index + 1) % lines.length);
        return;
      }

      setCharacterCount((count) => count + (isDeleting ? -1 : 1));
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [characterCount, isDeleting, lineIndex, lines]);

  const currentLine = lines[lineIndex] ?? "";

  return (
    <span aria-label={currentLine}>
      {currentLine.slice(0, characterCount)}
      <motion.span
        aria-hidden="true"
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        |
      </motion.span>
    </span>
  );
}

export function HeroLeadTypewriter({
  line1,
  line2Before,
  line2Link,
  line2After,
  line3,
  href,
  linkClassName = "font-normal text-inherit no-underline decoration-transparent underline-offset-2 hover:underline hover:decoration-black/20",
}: {
  line1: string;
  line2Before: string;
  line2Link: string;
  line2After: string;
  line3: string;
  href: string;
  linkClassName?: string;
}) {
  const line2FullLength =
    line2Before.length + line2Link.length + line2After.length;

  const lengths = useMemo(
    () => [line1.length, line2FullLength, line3.length],
    [line1.length, line2FullLength, line3.length],
  );

  const [lineIndex, setLineIndex] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const currentLen = lengths[lineIndex] ?? 0;

  useEffect(() => {
    const isComplete = characterCount === currentLen;
    const isEmpty = characterCount === 0;
    const delay = isComplete && !isDeleting ? 1450 : isDeleting ? 26 : 42;

    const timeout = window.setTimeout(() => {
      if (isComplete && !isDeleting) {
        setIsDeleting(true);
        return;
      }

      if (isEmpty && isDeleting) {
        setIsDeleting(false);
        setLineIndex((index) => (index + 1) % 3);
        return;
      }

      setCharacterCount((count) => count + (isDeleting ? -1 : 1));
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [characterCount, isDeleting, lineIndex, currentLen]);

  const ariaLabel = useMemo(() => {
    if (lineIndex === 0) return line1.slice(0, characterCount);
    if (lineIndex === 1) {
      const c = characterCount;
      if (c <= line2Before.length) return line2Before.slice(0, c);
      const r = c - line2Before.length;
      if (r <= line2Link.length) return line2Before + line2Link.slice(0, r);
      return (
        line2Before +
        line2Link +
        line2After.slice(0, r - line2Link.length)
      );
    }
    return line3.slice(0, characterCount);
  }, [
    lineIndex,
    characterCount,
    line1,
    line2Before,
    line2Link,
    line2After,
    line3,
  ]);

  function renderLine2(count: number): ReactNode {
    if (count <= line2Before.length) {
      return line2Before.slice(0, count);
    }
    const inLink = count - line2Before.length;
    if (inLink <= line2Link.length) {
      return (
        <>
          {line2Before}
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClassName}
          >
            {line2Link.slice(0, inLink)}
          </a>
        </>
      );
    }
    const inAfter = inLink - line2Link.length;
    return (
      <>
        {line2Before}
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClassName}
        >
          {line2Link}
        </a>
        {line2After.slice(0, inAfter)}
      </>
    );
  }

  let content: ReactNode;
  if (lineIndex === 0) {
    content = line1.slice(0, characterCount);
  } else if (lineIndex === 1) {
    content = renderLine2(characterCount);
  } else {
    content = line3.slice(0, characterCount);
  }

  return (
    <span aria-label={ariaLabel}>
      {content}
      <motion.span
        aria-hidden="true"
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        |
      </motion.span>
    </span>
  );
}

export function SkillMarquee({ skills }: { skills: string[] }) {
  const repeatedSkills = useMemo(() => [...skills, ...skills], [skills]);

  return (
    <div className="overflow-hidden">
      <div className="pf-skill-marquee flex w-max items-center gap-3">
        {repeatedSkills.map((skill, index) => (
          <span
            key={`${skill}-${index}`}
            className="rounded-full border border-[#d2d2d2] bg-white/72 px-4 py-2 text-black/60"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export function DraggableScroll({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, x: 0, scrollLeft: 0 });

  return (
    <div
      ref={ref}
      className={className}
      onPointerDown={(event) => {
        const node = ref.current;
        if (!node) return;
        drag.current = {
          active: true,
          x: event.clientX,
          scrollLeft: node.scrollLeft,
        };
        node.setPointerCapture(event.pointerId);
      }}
      onPointerMove={(event) => {
        const node = ref.current;
        if (!node || !drag.current.active) return;
        node.scrollLeft = drag.current.scrollLeft - (event.clientX - drag.current.x);
      }}
      onPointerUp={(event) => {
        ref.current?.releasePointerCapture(event.pointerId);
        drag.current.active = false;
      }}
      onPointerCancel={() => {
        drag.current.active = false;
      }}
    >
      {children}
    </div>
  );
}
