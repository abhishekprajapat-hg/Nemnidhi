"use client";

import { type RefObject, useEffect } from "react";

type SectionRef = RefObject<HTMLElement | null>;

type GsapBundle = {
  gsap: typeof import("gsap").gsap;
  ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger;
};

let gsapBundlePromise: Promise<GsapBundle> | null = null;

function loadGsap() {
  gsapBundlePromise ??= Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
    ([{ gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger);
      return { gsap, ScrollTrigger };
    },
  );

  return gsapBundlePromise;
}

function shouldReduceMotion() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function revealImmediately(scope: HTMLElement) {
  scope
    .querySelectorAll<HTMLElement>(
      "[data-hero-headline], [data-hero-anim], [data-reveal], [data-timeline-step], [data-scale-reveal], [data-cta-copy]",
    )
    .forEach((element) => {
      element.style.removeProperty("transform");
      element.style.removeProperty("opacity");
      element.style.removeProperty("will-change");
    });

  scope.querySelectorAll<HTMLElement>("[data-timeline-line]").forEach((element) => {
    element.style.transform = "scaleY(1)";
    element.style.transformOrigin = "top center";
  });
}

function scheduleIdle(callback: () => void) {
  if (typeof window === "undefined") return () => {};

  if ("requestIdleCallback" in window) {
    const idleId = window.requestIdleCallback(callback, { timeout: 900 });
    return () => window.cancelIdleCallback(idleId);
  }

  const timeoutId = globalThis.setTimeout(callback, 220);
  return () => globalThis.clearTimeout(timeoutId);
}

function useScheduledGsap(ref: SectionRef, setup: (scope: HTMLElement, bundle: GsapBundle) => () => void, deps: unknown[]) {
  useEffect(() => {
    const scope = ref.current;
    if (!scope) return;

    if (shouldReduceMotion()) {
      revealImmediately(scope);
      return;
    }

    let disposed = false;
    let cleanup: (() => void) | undefined;

    const cancelIdle = scheduleIdle(() => {
      void loadGsap().then((bundle) => {
        if (disposed) return;
        cleanup = setup(scope, bundle);
      });
    });

    return () => {
      disposed = true;
      cancelIdle();
      cleanup?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export function useHeroEntrance(ref: SectionRef) {
  useScheduledGsap(
    ref,
    (scope, { gsap }) => {
      const ctx = gsap.context(() => {
        const headline = scope.querySelectorAll("[data-hero-headline]");
        const support = scope.querySelectorAll("[data-hero-anim]");

        gsap.set(headline, { y: 80, opacity: 0, willChange: "transform,opacity" });
        gsap.set(support, { y: 28, opacity: 0, willChange: "transform,opacity" });

        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .to(headline, {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.08,
            clearProps: "willChange",
          })
          .to(
            support,
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.1,
              clearProps: "willChange",
            },
            "-=0.75",
          );
      }, scope);

      return () => ctx.revert();
    },
    [ref],
  );
}

export function useHeroParallax(ref: SectionRef) {
  useScheduledGsap(
    ref,
    (scope, { gsap }) => {
      const ctx = gsap.context(() => {
        const grid = scope.querySelector("[data-hero-grid]");
        if (!grid) return;

        gsap.to(grid, {
          y: 120,
          ease: "none",
          scrollTrigger: {
            trigger: scope,
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      }, scope);

      return () => ctx.revert();
    },
    [ref],
  );
}

export function useScrollReveal(
  ref: SectionRef,
  { stagger = 0.15, startY = 80 }: { stagger?: number; startY?: number } = {},
) {
  useScheduledGsap(
    ref,
    (scope, { gsap }) => {
      const ctx = gsap.context(() => {
        const targets = gsap.utils.toArray<HTMLElement>("[data-reveal]");
        if (!targets.length) return;

        gsap.set(targets, { y: startY, opacity: 0, willChange: "transform,opacity" });
        gsap.to(targets, {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger,
          clearProps: "willChange",
          scrollTrigger: {
            trigger: scope,
            start: "top 78%",
            once: true,
          },
        });
      }, scope);

      return () => ctx.revert();
    },
    [ref, stagger, startY],
  );
}

export function useTimelineGrow(ref: SectionRef) {
  useScheduledGsap(
    ref,
    (scope, { gsap }) => {
      const ctx = gsap.context(() => {
        const line = scope.querySelector("[data-timeline-line]");
        const steps = gsap.utils.toArray<HTMLElement>("[data-timeline-step]");
        if (!line) return;

        gsap.set(line, {
          scaleY: 0,
          transformOrigin: "top center",
          willChange: "transform",
        });
        gsap.set(steps, { y: 48, opacity: 0, willChange: "transform,opacity" });

        gsap.to(line, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: scope,
            start: "top 68%",
            end: "bottom 58%",
            scrub: 0.8,
          },
        });

        steps.forEach((step) => {
          gsap.to(step, {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: "power3.out",
            clearProps: "willChange",
            scrollTrigger: {
              trigger: step,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          });
        });
      }, scope);

      return () => ctx.revert();
    },
    [ref],
  );
}

export function useHorizontalScroll(ref: SectionRef) {
  useScheduledGsap(
    ref,
    (scope, { gsap, ScrollTrigger }) => {
      const ctx = gsap.context(() => {
        const track = scope.querySelector<HTMLElement>("[data-hscroll-track]");
        if (!track) return;

        ScrollTrigger.matchMedia({
          "(min-width: 768px)": () => {
            const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth);
            const tween = gsap.to(track, {
              x: () => -getDistance(),
              ease: "none",
              scrollTrigger: {
                trigger: scope,
                start: "top 6rem",
                end: () => `+=${getDistance()}`,
                scrub: 1,
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            });

            return () => {
              tween.scrollTrigger?.kill();
              tween.kill();
            };
          },
        });
      }, scope);

      return () => ctx.revert();
    },
    [ref],
  );
}

export function useCountUp(ref: SectionRef) {
  useScheduledGsap(
    ref,
    (scope, { gsap }) => {
      const ctx = gsap.context(() => {
        const counters = gsap.utils.toArray<HTMLElement>("[data-count-target]");

        counters.forEach((counter) => {
          const target = Number(counter.dataset.countTarget ?? 0);
          const suffix = counter.dataset.countSuffix ?? "";
          const state = { value: 0 };

          gsap.to(state, {
            value: target,
            duration: 1.8,
            ease: "power1.out",
            onUpdate: () => {
              counter.textContent = `${Math.round(state.value)}${suffix}`;
            },
            scrollTrigger: {
              trigger: counter,
              start: "top 86%",
              once: true,
            },
          });
        });
      }, scope);

      return () => ctx.revert();
    },
    [ref],
  );
}

export function useStaggerScale(ref: SectionRef, { stagger = 0.08 }: { stagger?: number } = {}) {
  useScheduledGsap(
    ref,
    (scope, { gsap }) => {
      const ctx = gsap.context(() => {
        const targets = gsap.utils.toArray<HTMLElement>("[data-scale-reveal]");
        if (!targets.length) return;

        gsap.set(targets, {
          scale: 0.8,
          opacity: 0,
          willChange: "transform,opacity",
        });

        gsap.to(targets, {
          scale: 1,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger,
          clearProps: "willChange",
          scrollTrigger: {
            trigger: scope,
            start: "top 80%",
            once: true,
          },
        });
      }, scope);

      return () => ctx.revert();
    },
    [ref, stagger],
  );
}

export function useSectionLabel(ref: SectionRef) {
  useScheduledGsap(
    ref,
    (scope, { gsap }) => {
      const ctx = gsap.context(() => {
        const labels = gsap.utils.toArray<HTMLElement>("[data-section-label]");
        if (!labels.length) return;

        gsap.set(labels, { y: 24, opacity: 0, willChange: "transform,opacity" });
        gsap.to(labels, {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.08,
          clearProps: "willChange",
          scrollTrigger: {
            trigger: scope,
            start: "top 84%",
            once: true,
          },
        });
      }, scope);

      return () => ctx.revert();
    },
    [ref],
  );
}

export function useFinalCtaAnimation(ref: SectionRef) {
  useScheduledGsap(
    ref,
    (scope, { gsap }) => {
      const ctx = gsap.context(() => {
        const gradient = scope.querySelector("[data-cta-gradient]");
        const copy = scope.querySelectorAll("[data-cta-copy]");

        gsap.set(copy, { y: 54, opacity: 0, willChange: "transform,opacity" });

        if (gradient) {
          gsap.fromTo(
            gradient,
            { xPercent: -10 },
            {
              xPercent: 10,
              ease: "none",
              scrollTrigger: {
                trigger: scope,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            },
          );
        }

        gsap.to(copy, {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          clearProps: "willChange",
          scrollTrigger: {
            trigger: scope,
            start: "top 76%",
            once: true,
          },
        });
      }, scope);

      return () => ctx.revert();
    },
    [ref],
  );
}
