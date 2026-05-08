"use client";

import { useEffect, useMemo, useState } from "react";

export type SectionNavItem = {
  label: string;
  href: string;
  /** Only used for the desktop sidebar absolute positioning. */
  top?: number;
};

function normalizeHash(hash: string) {
  if (!hash) return "#home";
  if (hash.startsWith("#")) return hash;
  return `#${hash}`;
}

function useActiveSection(items: SectionNavItem[]) {
  const hrefs = useMemo(() => items.map((i) => i.href), [items]);
  const [activeHref, setActiveHref] = useState<string>(hrefs[0] ?? "#home");

  useEffect(() => {
    const setFromHash = () => {
      const h = normalizeHash(window.location.hash);
      if (hrefs.includes(h)) setActiveHref(h);
    };

    setFromHash();
    window.addEventListener("hashchange", setFromHash);
    return () => window.removeEventListener("hashchange", setFromHash);
  }, [hrefs]);

  useEffect(() => {
    const els = hrefs
      .map((href) => document.querySelector(href))
      .filter(Boolean) as HTMLElement[];
    if (!els.length || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (!visible?.target) return;
        const id = (visible.target as HTMLElement).id;
        if (!id) return;
        const next = `#${id}`;
        if (hrefs.includes(next)) setActiveHref(next);
      },
      {
        // Bias toward the section nearest the top/center while scrolling.
        root: null,
        rootMargin: "-20% 0px -65% 0px",
        threshold: [0.05, 0.15, 0.3, 0.6],
      },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [hrefs]);

  return activeHref;
}

export function SidebarSectionNav({ items }: { items: SectionNavItem[] }) {
  const activeHref = useActiveSection(items);

  return (
    <>
      {items.map((item) => {
        const isActive = item.href === activeHref;
        return (
          <a
            key={item.href}
            href={item.href}
            className="absolute block transition-colors hover:text-black"
            style={{
              top: `${item.top ?? 0}px`,
              left: "57.1px",
              fontSize: "20px",
              lineHeight: 1,
              color: isActive ? "#000" : "var(--pf-text-muted)",
              fontWeight: isActive ? 500 : 400,
            }}
          >
            {item.label}
          </a>
        );
      })}
    </>
  );
}

export function HeaderSectionNav({ items }: { items: SectionNavItem[] }) {
  const activeHref = useActiveSection(items);

  return (
    <ul className="flex flex-wrap items-center gap-x-7 gap-y-3 text-[15px] sm:text-[17px]">
      {items.map((item) => {
        const isActive = item.href === activeHref;
        return (
          <li key={item.href}>
            <a
              href={item.href}
              className={
                isActive
                  ? "font-medium text-black"
                  : "text-black/50 transition-colors hover:text-black"
              }
            >
              {item.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

