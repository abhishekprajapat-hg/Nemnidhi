"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Lightfall = dynamic(() => import("@/components/services/Lightfall"), {
  ssr: false,
  loading: () => null,
});

export default function HeroLightfall() {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const canRender = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canRender) return;

    const show = () => setShouldRender(true);
    const idleId =
      "requestIdleCallback" in window
        ? window.requestIdleCallback(show, { timeout: 1600 })
        : globalThis.setTimeout(show, 500);

    return () => {
      if ("cancelIdleCallback" in window && typeof idleId === "number") {
        window.cancelIdleCallback(idleId);
      } else {
        globalThis.clearTimeout(idleId as number);
      }
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div className="hero-lightfall" aria-hidden="true">
      <Lightfall
        colors={["#67e8f9", "#38bdf8", "#8b5cf6", "#f0f4f8"]}
        backgroundColor="#05080b"
        speed={0.68}
        streakCount={7}
        streakWidth={0.9}
        streakLength={1.15}
        glow={0.86}
        density={0.72}
        twinkle={0.68}
        zoom={2.75}
        backgroundGlow={0.34}
        opacity={0.78}
        mouseInteraction={false}
        dpr={1.25}
        mixBlendMode="screen"
      />

      <style jsx global>{`
        .hero-lightfall {
          position: absolute;
          inset: -18% -12% -22%;
          z-index: 0;
          opacity: 0.68;
          pointer-events: none;
          -webkit-mask-image: radial-gradient(circle at 70% 36%, #000 0 34%, rgba(0, 0, 0, 0.64) 54%, transparent 84%);
          mask-image: radial-gradient(circle at 70% 36%, #000 0 34%, rgba(0, 0, 0, 0.64) 54%, transparent 84%);
        }

        .hero-content-layer {
          position: relative;
          z-index: 1;
        }

        @media (max-width: 768px) {
          .hero-lightfall {
            inset: -12% -72% -18% -24%;
            opacity: 0.45;
            -webkit-mask-image: radial-gradient(circle at 58% 30%, #000 0 38%, rgba(0, 0, 0, 0.56) 58%, transparent 86%);
            mask-image: radial-gradient(circle at 58% 30%, #000 0 38%, rgba(0, 0, 0, 0.56) 58%, transparent 86%);
          }
        }
      `}</style>
    </div>
  );
}
