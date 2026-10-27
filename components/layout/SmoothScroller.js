"use client";

import { ReactLenis } from 'lenis/react';
import { MotionConfig } from 'framer-motion';

// Lenis smooth scrolling plus framer-motion respecting the OS
// "reduce motion" setting for every animation on the site.
export default function SmoothScroller({ children }) {
  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.5, smoothTouch: false }}>
      <MotionConfig reducedMotion="user">
        {children}
      </MotionConfig>
    </ReactLenis>
  );
}
