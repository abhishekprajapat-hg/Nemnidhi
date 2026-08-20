"use client";

import Image from "next/image";

type HeroImageBackdropProps = {
  src: string;
  focus?: string;
  priority?: boolean;
};

export default function HeroImageBackdrop({ src, focus = "center", priority = false }: HeroImageBackdropProps) {
  const clearSrc = src.replace(/\.jpg$/i, "-clear.jpg");

  return (
    <div className="hero-image-backdrop" aria-hidden="true">
      <Image
        className="hero-image-backdrop__image"
        src={clearSrc}
        alt=""
        fill
        priority={priority}
        quality={72}
        sizes="100vw"
        style={{ objectPosition: focus }}
      />
      <div className="hero-image-backdrop__shade" />

      <style jsx global>{`
        .hero-image-backdrop {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          pointer-events: none;
          background: #05080b;
        }

        .hero-image-backdrop__image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 1;
          filter: none;
          transform: none;
        }

        .hero-image-backdrop__shade {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, rgba(5, 8, 11, 0.48) 0%, rgba(5, 8, 11, 0.24) 34%, rgba(5, 8, 11, 0) 68%, rgba(5, 8, 11, 0.04) 100%),
            linear-gradient(180deg, rgba(5, 8, 11, 0) 0%, rgba(5, 8, 11, 0) 48%, rgba(5, 8, 11, 0.18) 100%);
        }

        .hero-content-layer {
          position: relative;
          z-index: 1;
        }

        @media (max-width: 768px) {
          .hero-image-backdrop__image {
            opacity: 1;
            object-position: center;
          }

          .hero-image-backdrop__shade {
            background:
              linear-gradient(90deg, rgba(5, 8, 11, 0.52), rgba(5, 8, 11, 0.12)),
              linear-gradient(180deg, rgba(5, 8, 11, 0), rgba(5, 8, 11, 0.24));
          }
        }
      `}</style>
    </div>
  );
}
