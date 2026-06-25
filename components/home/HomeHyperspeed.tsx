"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Hyperspeed = dynamic(() => import("@/components/home/Hyperspeed"), {
  ssr: false,
  loading: () => null,
});

const HYPERSPEED_OPTIONS = {
  onSpeedUp: () => {},
  onSlowDown: () => {},
  distortion: "turbulentDistortion",
  length: 420,
  roadWidth: 10,
  islandWidth: 2,
  lanesPerRoad: 4,
  fov: 92,
  fovSpeedUp: 145,
  speedUp: 2.2,
  carLightsFade: 0.36,
  totalSideLightSticks: 24,
  lightPairsPerRoadWay: 42,
  shoulderLinesWidthPercentage: 0.045,
  brokenLinesWidthPercentage: 0.09,
  brokenLinesLengthPercentage: 0.52,
  lightStickWidth: [0.12, 0.52],
  lightStickHeight: [1.35, 1.9],
  movingAwaySpeed: [58, 82],
  movingCloserSpeed: [-124, -168],
  carLightsLength: [14, 84],
  carLightsRadius: [0.05, 0.14],
  carWidthPercentage: [0.28, 0.48],
  carShiftX: [-0.82, 0.82],
  carFloorSeparation: [0, 5],
  colors: {
    roadColor: 0x05080b,
    islandColor: 0x071013,
    background: 0x080a0c,
    shoulderLines: 0x67e8f9,
    brokenLines: 0xf0f4f8,
    leftCars: [0x67e8f9, 0x22d3ee, 0xa5f3fc],
    rightCars: [0x8b5cf6, 0x38bdf8, 0x14b8a6],
    sticks: 0x67e8f9,
  },
};

export default function HomeHyperspeed() {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const canRender =
      window.matchMedia("(min-width: 1024px) and (hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!canRender) return;

    const show = () => setShouldRender(true);
    const idleId =
      "requestIdleCallback" in window
        ? window.requestIdleCallback(show, { timeout: 2500 })
        : globalThis.setTimeout(show, 1200);

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
    <div className="home-page-hyperspeed" aria-hidden="true">
      <Hyperspeed effectOptions={HYPERSPEED_OPTIONS} />

      <style jsx global>{`
        .home-page-hyperspeed {
          position: fixed;
          inset: -8% -4% -4%;
          z-index: 3;
          opacity: 0.28;
          pointer-events: none;
          mix-blend-mode: screen;
          filter: saturate(1.12) contrast(1.04);
          -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 15%, #000 82%, transparent 100%);
          mask-image: linear-gradient(90deg, transparent 0%, #000 15%, #000 82%, transparent 100%);
        }

        .home-page-content {
          position: relative;
          z-index: 2;
        }

        @media (max-width: 768px) {
          .home-page-hyperspeed {
            inset: -6% -62% -4% -34%;
            opacity: 0.22;
          }
        }
      `}</style>
    </div>
  );
}
