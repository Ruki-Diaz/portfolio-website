"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { LayoutGroup, MotionConfig, motion, useReducedMotion } from "framer-motion";
import { useLenis } from "lenis/react";
import { BriefcaseBusiness, FolderKanban, House, Layers, Mail, UserRound } from "lucide-react";

const SECTIONS = [
  { id: "hero", label: "Home", icon: House },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "experience", label: "Experience", icon: BriefcaseBusiness },
  { id: "skills", label: "Skills", icon: Layers },
  { id: "about", label: "About", icon: UserRound },
  { id: "contact", label: "Contact", icon: Mail },
];

const EDITABLE =
  'input:not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="checkbox"]):not([type="radio"]):not([type="range"]):not([type="file"]), textarea, select, [contenteditable="true"]';

const isEditable = (el) => el instanceof Element && el.matches(EDITABLE);

// Document offset that ignores CSS transforms, so sections still mid reveal-animation land correctly.
function layoutTop(el) {
  let top = 0;
  for (let node = el; node; node = node.offsetParent) top += node.offsetTop;
  return top;
}

const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export default function MobileSectionNav() {
  const lenis = useLenis();
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(SECTIONS[0].id);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const visibleRef = useRef(new Map());
  const lockRef = useRef(false);
  const unlockTimer = useRef(null);

  const syncActive = useCallback(() => {
    if (lockRef.current) return;
    const current = SECTIONS.findLast(({ id }) => visibleRef.current.get(id));
    if (current) setActive(current.id);
  }, []);

  // Scroll-spy: a section is current once it crosses a thin band just above the middle of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) visibleRef.current.set(entry.target.id, entry.isIntersecting);
        syncActive();
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    for (const { id } of SECTIONS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [syncActive]);

  // Hide while the on-screen keyboard is likely open, so the bar never sits over the contact form.
  useEffect(() => {
    let focused = isEditable(document.activeElement);
    let shrunk = false;
    const update = () => setKeyboardOpen(focused || shrunk);

    const onFocusIn = (e) => {
      focused = isEditable(e.target);
      update();
    };
    const onFocusOut = (e) => {
      focused = isEditable(e.relatedTarget);
      update();
    };
    const vv = window.visualViewport;
    const onResize = () => {
      shrunk = vv.height < window.innerHeight - 150;
      update();
    };

    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);
    vv?.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
      vv?.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => () => clearTimeout(unlockTimer.current), []);

  const handleClick = (e, id) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();

    const margin = Number.parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
    const target = Math.max(0, layoutTop(el) - margin);

    // Hold the indicator on the chosen item instead of flickering through every section on the way.
    setActive(id);
    lockRef.current = true;
    clearTimeout(unlockTimer.current);
    const unlock = () => {
      clearTimeout(unlockTimer.current);
      lockRef.current = false;
      syncActive();
    };
    unlockTimer.current = setTimeout(unlock, reduceMotion ? 100 : 1600);

    if (lenis) {
      lenis.scrollTo(target, {
        immediate: reduceMotion,
        duration: 1.2,
        easing: easeInOutCubic,
        onComplete: unlock,
      });
    } else {
      window.scrollTo({ top: target, behavior: reduceMotion ? "auto" : "smooth" });
    }

    // Move the reading position for keyboard and screen reader users, as a native anchor jump would.
    if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
    el.focus({ preventScroll: true });
  };

  return (
    <MotionConfig reducedMotion="user">
      <motion.nav
        aria-label="Section navigation"
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        inert={keyboardOpen}
        className="md:hidden fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pointer-events-none"
      >
        <div
          className={`relative mx-auto max-w-md sm:max-w-xl transition-[translate,opacity] duration-300 ease-out motion-reduce:transition-none ${
            keyboardOpen ? "translate-y-[calc(100%+2rem)] opacity-0" : "pointer-events-auto"
          }`}
        >
          {/* Top edge highlight */}
          <div aria-hidden="true" className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <LayoutGroup>
            <ul className="flex items-center rounded-full border border-white/10 bg-neutral-950/75 p-1.5 backdrop-blur-xl backdrop-saturate-150 shadow-[0_10px_40px_-8px_rgba(0,0,0,0.7),0_0_24px_-6px_rgba(59,130,246,0.25)]">
              {SECTIONS.map(({ id, label, icon: Icon }) => {
                const isActive = active === id;
                return (
                  <motion.li
                    key={id}
                    layout
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                    className={`flex min-w-11 sm:flex-1 ${isActive ? "flex-none" : "flex-1"}`}
                  >
                    <a
                      href={`#${id}`}
                      onClick={(e) => handleClick(e, id)}
                      aria-label={label}
                      aria-current={isActive ? "location" : undefined}
                      className={`relative flex h-11 w-full items-center justify-center gap-1.5 rounded-full px-2.5 outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 active:scale-95 motion-reduce:active:scale-100 ${
                        isActive ? "text-white" : "text-neutral-400 hover:text-neutral-100"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="section-nav-indicator"
                          aria-hidden="true"
                          transition={{ type: "spring", stiffness: 420, damping: 36 }}
                          className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 ring-1 ring-inset ring-blue-400/40 shadow-[0_0_18px_-2px_rgba(99,102,241,0.45)]"
                        />
                      )}
                      <motion.span layout="position" className="relative z-10 flex">
                        <Icon size={18} strokeWidth={isActive ? 2.25 : 2} aria-hidden="true" />
                      </motion.span>
                      <motion.span
                        layout="position"
                        aria-hidden="true"
                        className={`relative z-10 text-xs tracking-tight whitespace-nowrap ${
                          isActive ? "font-semibold" : "hidden sm:inline font-medium"
                        }`}
                      >
                        {label}
                      </motion.span>
                    </a>
                  </motion.li>
                );
              })}
            </ul>
          </LayoutGroup>
        </div>
      </motion.nav>
    </MotionConfig>
  );
}
