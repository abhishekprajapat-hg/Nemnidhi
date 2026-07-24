"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { usePrefersReducedMotion } from "@/components/motion/usePrefersReducedMotion";

function splitText(element: HTMLElement) {
  if (element.dataset.splitReady === "true") return;
  if (element.querySelector(".split-word-inner")) {
    element.dataset.splitReady = "true";
    return;
  }

  const text = element.textContent?.trim();
  if (!text) return;

  element.dataset.splitReady = "true";
  element.setAttribute("aria-label", text);
  element.textContent = "";

  text.split(/\s+/).forEach((word, index, words) => {
    const wrapper = document.createElement("span");
    const inner = document.createElement("span");

    wrapper.className = "split-word";
    inner.className = "split-word-inner";
    wrapper.setAttribute("aria-hidden", "true");
    inner.textContent = word;
    wrapper.appendChild(inner);
    element.appendChild(wrapper);

    if (index < words.length - 1) {
      element.appendChild(document.createTextNode(" "));
    }
  });
}

function getCounterValue(element: HTMLElement) {
  const raw = element.dataset.counter;
  if (!raw) return null;

  const numeric = Number.parseFloat(raw);
  return Number.isNaN(numeric) ? null : numeric;
}

function settleCounters() {
  document.querySelectorAll<HTMLElement>("[data-counter]").forEach((item) => {
    const value = getCounterValue(item);
    if (value !== null) item.textContent = item.dataset.counterLabel ?? String(value);
  });
}

export default function MotionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const progressRef = useRef<HTMLDivElement | null>(null);

  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const supportsDesktopMotion = window.matchMedia(
      "(min-width: 768px) and (hover: hover) and (pointer: fine)",
    ).matches;

    if (prefersReducedMotion || !supportsDesktopMotion) {
      document.documentElement.classList.add("reduce-motion");
      settleCounters();
      return () => document.documentElement.classList.remove("reduce-motion");
    }

    document.documentElement.classList.remove("reduce-motion");

    let disposed = false;
    let cleanup: (() => void) | undefined;

    const setupMotion = async () => {
      const [{ gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("lenis"),
      ]);

      if (disposed) return;

      gsap.registerPlugin(ScrollTrigger);

      const cleanupFns: Array<() => void> = [];
      const lenis = new Lenis({
        anchors: true,
        duration: 1.12,
        easing: (time) => Math.min(1, 1.001 - Math.pow(2, -10 * time)),
        smoothWheel: true,
        syncTouch: false,
        touchMultiplier: 1,
        wheelMultiplier: 0.78,
      });

      // Fix: Ensure page starts at top on route change
      window.scrollTo(0, 0);
      lenis.scrollTo(0, { immediate: true });

      lenis.on("scroll", ScrollTrigger.update);

      const ticker = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);

      const context = gsap.context(() => {
        // Track mouse position for CSS variable-based effects (e.g. orb glow)
        const onPointerMove = (event: PointerEvent) => {
          document.documentElement.style.setProperty("--mouse-x", `${event.clientX}px`);
          document.documentElement.style.setProperty("--mouse-y", `${event.clientY}px`);
        };

        window.addEventListener("pointermove", onPointerMove, { passive: true });

        cleanupFns.push(() => {
          window.removeEventListener("pointermove", onPointerMove);
        });

        document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((item) => {
          const moveX = gsap.quickTo(item, "x", { duration: 0.34, ease: "power3.out" });
          const moveY = gsap.quickTo(item, "y", { duration: 0.34, ease: "power3.out" });

          const onMove = (event: PointerEvent) => {
            const rect = item.getBoundingClientRect();
            moveX((event.clientX - rect.left - rect.width / 2) * 0.16);
            moveY((event.clientY - rect.top - rect.height / 2) * 0.2);
          };

          const onLeave = () => {
            moveX(0);
            moveY(0);
          };

          item.addEventListener("pointermove", onMove);
          item.addEventListener("pointerleave", onLeave);

          cleanupFns.push(() => {
            item.removeEventListener("pointermove", onMove);
            item.removeEventListener("pointerleave", onLeave);
          });
        });

        document.querySelectorAll<HTMLElement>("[data-split]").forEach(splitText);

        gsap.set("[data-reveal]", { autoAlpha: 0, y: 34, filter: "blur(8px)" });
        ScrollTrigger.batch("[data-reveal]", {
          start: "top 84%",
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.86,
              ease: "power3.out",
              stagger: 0.08,
              force3D: true,
            });
          },
        });

        gsap.set("[data-card-reveal]", { autoAlpha: 0, y: 46, rotateX: 5, scale: 0.985 });
        ScrollTrigger.batch("[data-card-reveal]", {
          start: "top 86%",
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              rotateX: 0,
              scale: 1,
              duration: 0.78,
              ease: "power3.out",
              stagger: 0.1,
              force3D: true,
            });
          },
        });

        gsap.set("[data-clip-reveal]", {
          autoAlpha: 0,
          y: 24,
          clipPath: "inset(0 0 100% 0)",
        });
        ScrollTrigger.batch("[data-clip-reveal]", {
          start: "top 84%",
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              clipPath: "inset(0 0 0% 0)",
              duration: 0.92,
              ease: "power3.out",
              stagger: 0.06,
              force3D: true,
            });
          },
        });

        gsap.set(".split-word-inner", { yPercent: 112, autoAlpha: 0 });
        ScrollTrigger.batch("[data-split]", {
          start: "top 84%",
          once: true,
          onEnter: (batch) => {
            batch.forEach((item) => {
              gsap.to(item.querySelectorAll(".split-word-inner"), {
                yPercent: 0,
                autoAlpha: 1,
                duration: 0.74,
                ease: "power3.out",
                stagger: 0.035,
                force3D: true,
              });
            });
          },
        });

        document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((item) => {
          const distance = Number.parseFloat(item.dataset.parallax || "80");

          gsap.to(item, {
            y: -distance,
            ease: "none",
            force3D: true,
            scrollTrigger: {
              trigger: item,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.7,
            },
          });
        });

        document.querySelectorAll<HTMLElement>("[data-image-scale]").forEach((item) => {
          gsap.fromTo(
            item,
            { scale: 1.08 },
            {
              scale: 1,
              ease: "none",
              force3D: true,
              scrollTrigger: {
                trigger: item,
                start: "top bottom",
                end: "bottom center",
                scrub: 0.65,
              },
            },
          );
        });

        document.querySelectorAll<HTMLElement>("[data-divider]").forEach((item) => {
          gsap.fromTo(
            item,
            { scaleX: 0, transformOrigin: "left center" },
            {
              scaleX: 1,
              duration: 0.9,
              ease: "power3.out",
              force3D: true,
              scrollTrigger: {
                trigger: item,
                start: "top 86%",
                once: true,
              },
            },
          );
        });

        document.querySelectorAll<HTMLElement>("[data-counter]").forEach((item) => {
          const target = getCounterValue(item);
          if (target === null) return;

          const decimals = Number.parseInt(item.dataset.counterDecimals || "0", 10);
          const suffix = item.dataset.counterSuffix || "";
          const prefix = item.dataset.counterPrefix || "";
          const state = { value: 0 };

          ScrollTrigger.create({
            trigger: item,
            start: "top 88%",
            once: true,
            onEnter: () => {
              gsap.to(state, {
                value: target,
                duration: 1.24,
                ease: "power3.out",
                onUpdate: () => {
                  item.textContent = `${prefix}${state.value.toFixed(decimals)}${suffix}`;
                },
              });
            },
          });
        });

        document.querySelectorAll<HTMLElement>("[data-timeline]").forEach((item) => {
          const rows = item.querySelectorAll<HTMLElement>("[data-timeline-item]");

          gsap
            .timeline({
              scrollTrigger: {
                trigger: item,
                start: "top 72%",
                end: "bottom 45%",
                scrub: 0.7,
              },
            })
            .fromTo(
              rows,
              { x: -24, autoAlpha: 0 },
              { x: 0, autoAlpha: 1, stagger: 0.18, ease: "power2.out", force3D: true },
            );
        });

        document.querySelectorAll<HTMLElement>("[data-panel-stack]").forEach((stack) => {
          const panels = stack.querySelectorAll<HTMLElement>("[data-panel-card]");
          if (!panels.length) return;

          gsap.set(panels, {
            autoAlpha: 0,
            y: 110,
            rotateX: 8,
            transformPerspective: 900,
            transformOrigin: "50% 100%",
          });

          gsap.to(panels, {
            autoAlpha: 1,
            y: 0,
            rotateX: 0,
            stagger: 0.18,
            duration: 0.86,
            ease: "power3.out",
            force3D: true,
            scrollTrigger: {
              trigger: stack,
              start: "top 76%",
              once: true,
            },
          });

          panels.forEach((panel) => {
            gsap.to(panel, {
              yPercent: -10,
              scale: 0.96,
              ease: "none",
              force3D: true,
              scrollTrigger: {
                trigger: panel,
                start: "top 62%",
                end: "bottom 20%",
                scrub: 0.9,
              },
            });
          });
        });

        document.querySelectorAll<HTMLElement>("[data-kinetic-text]").forEach((item) => {
          gsap.fromTo(
            item,
            { xPercent: 8 },
            {
              xPercent: -18,
              ease: "none",
              force3D: true,
              scrollTrigger: {
                trigger: item,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            },
          );
        });

        document.querySelectorAll<HTMLElement>("[data-scroll-chapter]").forEach((section) => {
          gsap.fromTo(
            section,
            { "--chapter-glow": 0 },
            {
              "--chapter-glow": 1,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top 68%",
                end: "bottom 34%",
                scrub: true,
              },
            },
          );
        });

        if (progressRef.current) {
          gsap.fromTo(
            progressRef.current,
            { scaleX: 0, transformOrigin: "left center" },
            {
              scaleX: 1,
              ease: "none",
              scrollTrigger: {
                trigger: document.documentElement,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.18,
              },
            },
          );
        }
      });

      const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 140);

      cleanup = () => {
        window.clearTimeout(refreshTimer);
        cleanupFns.forEach((fn) => fn());
        context.revert();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        gsap.ticker.remove(ticker);
        lenis.destroy();
        document.documentElement.classList.remove("has-custom-cursor");
      };
    };

    void setupMotion();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, [pathname, prefersReducedMotion]);

  return (
    <>
      <div className="scroll-progress" aria-hidden>
        <div ref={progressRef} />
      </div>

      {children}
    </>
  );
}
