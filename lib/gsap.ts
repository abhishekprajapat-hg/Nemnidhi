// ─── GSAP Core Registration ────────────────────────────────────────────────
// Central registration point for GSAP plugins.
// Import this module once in a client-side provider to register ScrollTrigger.

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugins (idempotent — safe to call multiple times)
gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
