import { useEffect } from "react";

/** Keeps --app-h in sync with the visual viewport (Android keyboard, fold, browser chrome). */
export function ViewportFit() {
  useEffect(() => {
    const root = document.documentElement;
    const apply = () => {
      const vv = window.visualViewport;
      const height = vv?.height ?? window.innerHeight;
      root.style.setProperty("--app-h", `${Math.round(height)}px`);
      root.style.setProperty("--vv-top", `${Math.round(vv?.offsetTop ?? 0)}px`);
    };
    apply();
    const vv = window.visualViewport;
    vv?.addEventListener("resize", apply);
    vv?.addEventListener("scroll", apply);
    window.addEventListener("orientationchange", apply);
    window.addEventListener("resize", apply);
    return () => {
      vv?.removeEventListener("resize", apply);
      vv?.removeEventListener("scroll", apply);
      window.removeEventListener("orientationchange", apply);
      window.removeEventListener("resize", apply);
    };
  }, []);
  return null;
}
