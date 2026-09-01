import { useEffect, useRef, useState } from "react";
import { m, useReducedMotion } from "motion/react";
import { EASE_OUT } from "./motion";

/** Grid is considered "at rest" within this many pixels of the top. */
const GRID_START_MAX_Y = 16;

function ScrollChevron() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className="hero-scroll-hint-chevron"
    >
      <path
        d="M10 4v10M10 14l-4-4M10 14l4-4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Scroll cue at the top of the hero mosaic. Shown whenever the page is back at
 * the grid start — first visit or after scrolling up — and hides on scroll.
 */
export function HeroScrollHint() {
  const reduced = useReducedMotion();
  const everScrolled = useRef(window.scrollY > GRID_START_MAX_Y);
  const [atGridStart, setAtGridStart] = useState(
    () => window.scrollY <= GRID_START_MAX_Y,
  );
  const [delayedIn, setDelayedIn] = useState(everScrolled.current);
  const [coarse, setCoarse] = useState(
    () => window.matchMedia("(pointer: coarse)").matches,
  );

  useEffect(() => {
    const onScroll = () => {
      const atStart = window.scrollY <= GRID_START_MAX_Y;
      if (!atStart) everScrolled.current = true;
      setAtGridStart(atStart);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!atGridStart || everScrolled.current) {
      setDelayedIn(true);
      return;
    }

    const timer = window.setTimeout(() => setDelayedIn(true), 750);
    return () => window.clearTimeout(timer);
  }, [atGridStart]);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const sync = () => setCoarse(mq.matches);
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const show = !reduced && atGridStart && delayedIn;

  return (
    <m.div
      className="pointer-events-none fixed inset-x-0 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-20 flex justify-center"
      initial={false}
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : 10 }}
      transition={{ duration: show ? 0.55 : 0.3, ease: EASE_OUT }}
      aria-hidden={!show}
    >
      <div className="flex flex-col items-center gap-2.5 rounded-full bg-paper/88 px-5 py-3 shadow-[0_8px_32px_rgba(45,12,5,0.12)] backdrop-blur-sm">
        <span className="text-[11px] font-medium tracking-[0.2em] text-field/85 uppercase">
          {coarse ? "Swipe up" : "Scroll"}
        </span>
        <ScrollChevron />
      </div>
    </m.div>
  );
}
