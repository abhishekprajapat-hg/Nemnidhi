"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SPOTLIGHT_RADIUS = 320;
const PARTICLE_COUNT = 10;
const CARD_SELECTOR = [
  ".magic-bento-card",
  "main .theme-card",
  "main .theme-card-strong",
  "main .surface",
  "main .surface-strong",
  "main .surface-3d",
  "main .surface-3d-soft",
  "main .service-card-hover",
  "main .service-page-card",
  "main .project-item-hover",
  "main .project-showcase-card",
  "main .blog-card",
  "main .stat-card",
  "main .scroll-story-panel",
  "main details",
].join(", ");

function supportsMagicBento() {
  return (
    window.matchMedia("(min-width: 768px) and (hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function setCardGlow(card: HTMLElement, mouseX: number, mouseY: number, intensity: number) {
  const rect = card.getBoundingClientRect();
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;

  card.style.setProperty("--magic-glow-x", `${relativeX}%`);
  card.style.setProperty("--magic-glow-y", `${relativeY}%`);
  card.style.setProperty("--magic-glow-intensity", intensity.toString());
}

function createParticle(x: number, y: number) {
  const particle = document.createElement("span");
  particle.className = "magic-bento-particle";
  particle.style.left = `${x}px`;
  particle.style.top = `${y}px`;
  return particle;
}

function getMagicBentoCards() {
  const candidates = Array.from(document.querySelectorAll<HTMLElement>(CARD_SELECTOR));
  const uniqueCards = Array.from(new Set(candidates));

  return uniqueCards.filter((card) => {
    const rect = card.getBoundingClientRect();
    return rect.width >= 80 && rect.height >= 56;
  });
}

export default function MagicBentoLayer() {
  const pathname = usePathname();

  useEffect(() => {
    if (!supportsMagicBento()) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    const setup = async () => {
      const { gsap } = await import("gsap");
      if (disposed || !supportsMagicBento()) return;

      const cards = getMagicBentoCards();
      if (!cards.length) return;

      const touchedCards = cards.filter((card) => !card.classList.contains("magic-bento-card"));
      cards.forEach((card) => card.classList.add("magic-bento-card"));

      const spotlight = document.createElement("div");
      spotlight.className = "magic-bento-spotlight";
      document.body.appendChild(spotlight);
      document.documentElement.classList.add("has-magic-bento");

      const cleanupFns: Array<() => void> = [];

      const handleDocumentMove = (event: MouseEvent) => {
        let minDistance = Number.POSITIVE_INFINITY;

        cards.forEach((card) => {
          const rect = card.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const edgeDistance =
            Math.hypot(event.clientX - centerX, event.clientY - centerY) -
            Math.max(rect.width, rect.height) / 2;
          const distance = Math.max(0, edgeDistance);
          minDistance = Math.min(minDistance, distance);

          const proximity = SPOTLIGHT_RADIUS * 0.5;
          const fadeDistance = SPOTLIGHT_RADIUS * 0.85;
          const intensity =
            distance <= proximity
              ? 1
              : distance <= fadeDistance
                ? (fadeDistance - distance) / (fadeDistance - proximity)
                : 0;

          setCardGlow(card, event.clientX, event.clientY, intensity);
        });

        gsap.to(spotlight, {
          left: event.clientX,
          top: event.clientY,
          opacity: minDistance < SPOTLIGHT_RADIUS ? 0.72 : 0,
          duration: 0.18,
          ease: "power2.out",
        });
      };

      document.addEventListener("mousemove", handleDocumentMove, { passive: true });
      cleanupFns.push(() => document.removeEventListener("mousemove", handleDocumentMove));

      cards.forEach((card) => {
        const activeParticles: HTMLElement[] = [];
        const timeouts: number[] = [];

        const clearParticles = () => {
          timeouts.forEach(window.clearTimeout);
          timeouts.length = 0;

          activeParticles.splice(0).forEach((particle) => {
            gsap.to(particle, {
              scale: 0,
              opacity: 0,
              duration: 0.24,
              ease: "power2.in",
              onComplete: () => particle.remove(),
            });
          });
        };

      const handleEnter = () => {
        const rect = card.getBoundingClientRect();

        for (let index = 0; index < PARTICLE_COUNT; index += 1) {
          const timeout = window.setTimeout(() => {
            const particle = createParticle(Math.random() * rect.width, Math.random() * rect.height);
            card.appendChild(particle);
            activeParticles.push(particle);

            gsap.fromTo(
              particle,
              { scale: 0, opacity: 0 },
              { scale: 1, opacity: 0.96, duration: 0.28, ease: "back.out(1.7)" },
            );
            gsap.to(particle, {
              x: (Math.random() - 0.5) * 90,
              y: (Math.random() - 0.5) * 90,
              rotation: Math.random() * 360,
              duration: 1.8 + Math.random() * 1.4,
              ease: "none",
              repeat: -1,
              yoyo: true,
            });
          }, index * 70);

          timeouts.push(timeout);
        }
      };

      const handleMove = (event: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -7;
        const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 7;
        const magnetX = (x - rect.width / 2) * 0.025;
        const magnetY = (y - rect.height / 2) * 0.025;

        gsap.to(card, {
          x: magnetX,
          y: magnetY,
          rotateX,
          rotateY,
          transformPerspective: 1000,
          duration: 0.18,
          ease: "power2.out",
        });
      };

      const handleLeave = () => {
        clearParticles();
        gsap.to(card, {
          x: 0,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          duration: 0.32,
          ease: "power2.out",
        });
        card.style.setProperty("--magic-glow-intensity", "0");
      };

      const handleClick = (event: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const maxDistance = Math.max(
          Math.hypot(x, y),
          Math.hypot(x - rect.width, y),
          Math.hypot(x, y - rect.height),
          Math.hypot(x - rect.width, y - rect.height),
        );
        const ripple = document.createElement("span");
        ripple.className = "magic-bento-ripple";
        ripple.style.width = `${maxDistance * 2}px`;
        ripple.style.height = `${maxDistance * 2}px`;
        ripple.style.left = `${x - maxDistance}px`;
        ripple.style.top = `${y - maxDistance}px`;
        card.appendChild(ripple);

        gsap.fromTo(
          ripple,
          { scale: 0, opacity: 0.85 },
          {
            scale: 1,
            opacity: 0,
            duration: 0.72,
            ease: "power2.out",
            onComplete: () => ripple.remove(),
          },
        );
      };

        card.addEventListener("mouseenter", handleEnter);
        card.addEventListener("mousemove", handleMove);
        card.addEventListener("mouseleave", handleLeave);
        card.addEventListener("click", handleClick);

        cleanupFns.push(() => {
          card.removeEventListener("mouseenter", handleEnter);
          card.removeEventListener("mousemove", handleMove);
          card.removeEventListener("mouseleave", handleLeave);
          card.removeEventListener("click", handleClick);
          clearParticles();
          gsap.killTweensOf(card);
          gsap.set(card, { clearProps: "x,y,rotateX,rotateY,transformPerspective" });
        });
      });

      cleanup = () => {
        cleanupFns.forEach((runCleanup) => runCleanup());
        touchedCards.forEach((card) => card.classList.remove("magic-bento-card"));
        spotlight.remove();
        document.documentElement.classList.remove("has-magic-bento");
      };
    };

    const start = () => {
      void setup();
    };
    const idleId =
      "requestIdleCallback" in window
        ? window.requestIdleCallback(start, { timeout: 1800 })
        : globalThis.setTimeout(start, 700);

    return () => {
      disposed = true;
      if ("cancelIdleCallback" in window && typeof idleId === "number") {
        window.cancelIdleCallback(idleId);
      } else {
        globalThis.clearTimeout(idleId as number);
      }
      cleanup?.();
    };
  }, [pathname]);

  return null;
}
