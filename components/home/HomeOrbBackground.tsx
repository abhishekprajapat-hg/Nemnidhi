"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Orb = dynamic(() => import("@/components/effects/Orb"), {
  ssr: false,
  loading: () => <div style={{ width: "100%", height: "100%", opacity: 0 }} />,
});

export default function HomeOrbBackground() {
  const [bgColor, setBgColor] = useState("#080a0c");
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const update = () => {
      const theme = document.documentElement.getAttribute("data-theme");
      const light = theme === "light";
      setIsLight(light);
      // In light mode use the exact ivory bg so the shader's bgLuminance path activates correctly
      setBgColor(light ? "#F7F5F0" : "#080a0c");
    };
    update();
    // Re-run when theme attribute changes
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-page-orb" aria-hidden="true">
      <Orb
        hue={8}
        hoverIntensity={isLight ? 0.22 : 0.38}
        rotateOnHover={false}
        forceHoverState
        backgroundColor={bgColor}
      />
    </div>
  );
}
