"use client";

import {
  Children,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const HASH_TO_INDEX: Record<string, number> = {
  "#home": 0,
  "#about": 1,
  "#projects": 2,
  "#work": 3,
};

const DESKTOP_MEDIA = "(min-width: 900px)";
const INDEX_TO_HASH = ["#home", "#about", "#projects", "#work"];

function isDesktopViewport() {
  return window.matchMedia(DESKTOP_MEDIA).matches;
}

function isVerticallyScrollable(el: HTMLElement): boolean {
  const { overflowY } = window.getComputedStyle(el);
  if (overflowY !== "auto" && overflowY !== "scroll" && overflowY !== "overlay") {
    return false;
  }
  return el.scrollHeight > el.clientHeight + 2;
}

/** Nearest ancestor that can scroll on the Y axis (including `el` itself). */
function getVerticalScrollParent(start: EventTarget | null): HTMLElement | null {
  let el: HTMLElement | null =
    start instanceof HTMLElement ? start : start instanceof Node ? start.parentElement : null;
  while (el) {
    if (isVerticallyScrollable(el)) return el;
    el = el.parentElement;
  }
  return null;
}

export function CardPager({ children }: { children: ReactNode }) {
  const cards = Children.toArray(children);
  const [active, setActive] = useState(0);
  const cooldown = useRef(false);
  const touchY = useRef<number | null>(null);

  const goTo = useCallback(
    (nextIndex: number) => {
      const next = Math.max(0, Math.min(cards.length - 1, nextIndex));
      if (next === active || cooldown.current) return;

      setActive(next);
      cooldown.current = true;

      const nextHash = INDEX_TO_HASH[next];
      if (nextHash && window.location.hash !== nextHash) {
        window.history.replaceState(null, "", nextHash);
        // `replaceState` does not trigger `hashchange`; dispatch so nav highlights stay in sync.
        window.dispatchEvent(new Event("hashchange"));
      }

      window.setTimeout(() => {
        cooldown.current = false;
      }, 760);
    },
    [active, cards.length]
  );

  const step = useCallback((direction: number) => goTo(active + direction), [
    active,
    goTo,
  ]);

  useEffect(() => {
    const syncFromHash = () => {
      const index = HASH_TO_INDEX[window.location.hash];
      if (typeof index === "number") setActive(index);
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      if (!isDesktopViewport()) return;

      const scrollEl = getVerticalScrollParent(event.target);
      if (scrollEl) {
        const { scrollTop, scrollHeight, clientHeight } = scrollEl;
        const delta = event.deltaY;
        const atTop = scrollTop <= 1;
        const atBottom = scrollTop + clientHeight >= scrollHeight - 2;
        if ((delta > 0 && !atBottom) || (delta < 0 && !atTop)) {
          return;
        }
      }

      if (Math.abs(event.deltaY) < 18) return;
      event.preventDefault();
      step(event.deltaY > 0 ? 1 : -1);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [step]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!isDesktopViewport()) return;

      if (event.key === "ArrowDown" || event.key === "PageDown" || event.key === " ") {
        event.preventDefault();
        step(1);
      }

      if (event.key === "ArrowUp" || event.key === "PageUp") {
        event.preventDefault();
        step(-1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [step]);

  useEffect(() => {
    const onTouchStart = (event: TouchEvent) => {
      if (!isDesktopViewport()) return;

      touchY.current = event.touches[0]?.clientY ?? null;
    };

    const onTouchEnd = (event: TouchEvent) => {
      if (!isDesktopViewport()) return;

      if (touchY.current === null) return;

      const delta = touchY.current - (event.changedTouches[0]?.clientY ?? touchY.current);
      if (Math.abs(delta) > 42) step(delta > 0 ? 1 : -1);
      touchY.current = null;
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [step]);

  return (
    <div className="pointer-events-none absolute inset-0">
      {cards.map((card, index) => {
        const isActive = index === active;

        return (
          <div
            key={index}
            aria-hidden={!isActive}
            className="pf-card-layer"
            style={{
              opacity: isActive ? 1 : 0,
              filter: isActive ? "blur(0px)" : "blur(14px)",
              transform: isActive ? "scale(1)" : "scale(0.985)",
              pointerEvents: "none",
              zIndex: isActive ? 2 : 1,
            }}
          >
            {card}
          </div>
        );
      })}
    </div>
  );
}
