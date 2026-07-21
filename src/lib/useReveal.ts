import { useEffect, useRef } from 'react';

/**
 * useReveal — attaches an IntersectionObserver to a container element.
 * When the element enters the viewport, adds class 'is-visible'.
 * Works with .reveal and .reveal-stagger CSS classes.
 */
export function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          observer.disconnect(); // Fire once — no continuous observation
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
