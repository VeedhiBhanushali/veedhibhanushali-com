"use client";

import { useEffect } from "react";

const DESKTOP_MIN = 700;

export function LayoutModeGate() {
  useEffect(() => {
    const root = document.documentElement;

    function apply() {
      const isDesktop = window.innerWidth >= DESKTOP_MIN;
      root.classList.toggle("pf-layout-desktop", isDesktop);
      root.classList.toggle("pf-layout-responsive", !isDesktop);
    }

    apply();
    window.addEventListener("resize", apply, { passive: true });
    return () => window.removeEventListener("resize", apply);
  }, []);

  return null;
}

