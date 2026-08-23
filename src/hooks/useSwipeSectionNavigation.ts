import { useEffect } from "react";

const MIN_SWIPE_DISTANCE = 56;
const MAX_VERTICAL_DRIFT = 80;

export function useSwipeSectionNavigation() {
  useEffect(() => {
    let startX = 0;
    let startY = 0;

    const sections = () =>
      Array.from(document.querySelectorAll<HTMLElement>("main section[id]"));

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
      if (Math.abs(deltaX) < MIN_SWIPE_DISTANCE || Math.abs(deltaY) > MAX_VERTICAL_DRIFT) return;

      const items = sections();
      if (!items.length) return;

      const currentIndex = Math.max(
        0,
        items.findIndex((section) => {
          const rect = section.getBoundingClientRect();
          return rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.45;
        }),
      );

      const nextIndex = deltaX < 0
        ? Math.min(items.length - 1, currentIndex + 1)
        : Math.max(0, currentIndex - 1);

      if (nextIndex !== currentIndex) {
        items[nextIndex]?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    document.addEventListener("touchstart", onTouchStart, { passive: true });
    document.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchend", onTouchEnd);
    };
  }, []);
}
