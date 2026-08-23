import { useEffect } from "react";

const SECTION_SELECTOR = "main section[id]";
const SWIPE_THRESHOLD = 56;

export function useSwipeSectionNavigation() {
  useEffect(() => {
    let startX = 0;
    let startY = 0;

    const onTouchStart = (event: TouchEvent) => {
      const touch = event.changedTouches[0];
      if (!touch) return;
      startX = touch.clientX;
      startY = touch.clientY;
    };

    const onTouchEnd = (event: TouchEvent) => {
      const touch = event.changedTouches[0];
      if (!touch) return;

      const deltaX = touch.clientX - startX;
      const deltaY = touch.clientY - startY;
      if (Math.abs(deltaX) < SWIPE_THRESHOLD || Math.abs(deltaX) <= Math.abs(deltaY)) return;

      const target = event.target instanceof Element ? event.target.closest("section[id]") : null;
      const current = target instanceof HTMLElement ? target : document.elementFromPoint(touch.clientX, touch.clientY)?.closest(SECTION_SELECTOR);
      if (!(current instanceof HTMLElement)) return;

      const sections = Array.from(document.querySelectorAll<HTMLElement>(SECTION_SELECTOR));
      const index = sections.indexOf(current);
      if (index < 0) return;

      const nextIndex = deltaX < 0 ? index + 1 : index - 1;
      const next = sections[nextIndex];
      if (!next) return;

      next.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    document.addEventListener("touchstart", onTouchStart, { passive: true });
    document.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchend", onTouchEnd);
    };
  }, []);
}
