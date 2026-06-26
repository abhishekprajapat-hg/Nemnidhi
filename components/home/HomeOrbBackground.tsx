"use client";

import Orb from "@/components/effects/Orb";

export default function HomeOrbBackground() {
  return (
    <div className="home-page-orb" aria-hidden="true">
      <Orb
        hue={8}
        hoverIntensity={0.38}
        rotateOnHover={false}
        forceHoverState
        backgroundColor="#080a0c"
      />
    </div>
  );
}
