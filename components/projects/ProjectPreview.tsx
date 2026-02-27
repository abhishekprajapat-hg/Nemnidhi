"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";

type PreviewPage = {
  label: string;
  path: string;
};

type ProjectPreviewProps = {
  href: string;
  name: string;
  domain: string;
  pages: PreviewPage[];
};

export default function ProjectPreview({
  href,
  name,
  domain,
  pages,
}: ProjectPreviewProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedSlides, setFailedSlides] = useState<Record<number, boolean>>({});

  const slides = useMemo(() => {
    return pages.map((page) => {
      const normalizedPath = page.path.startsWith("/") ? page.path : `/${page.path}`;
      const pageUrl = new URL(normalizedPath, href).toString();
      const previewSrc = `https://image.thum.io/get/width/1400/crop/900/noanimate/${pageUrl}`;

      return {
        ...page,
        path: normalizedPath,
        pageUrl,
        previewSrc,
      };
    });
  }, [href, pages]);

  const totalSlides = slides.length;
  const activeSlide = slides[activeIndex];
  const hasSlides = totalSlides > 0;
  const activeFailed = activeSlide ? failedSlides[activeIndex] : false;

  const goPrev = () => {
    if (!hasSlides) return;
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goNext = () => {
    if (!hasSlides) return;
    setActiveIndex((prev) => (prev + 1) % totalSlides);
  };

  return (
    <div className="border-t border-white/10 bg-[#020812] p-3 md:border-l md:border-t-0 [border-color:var(--line)]">
      <div className="mb-2 flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-[11px] text-slate-300 [border-color:var(--line)]">
        <span>
          Live Preview
          {activeSlide ? ` | ${activeSlide.label}` : ""}
        </span>
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="text-cyan-100 transition hover:text-cyan-200"
        >
          Open in new tab
        </a>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black [border-color:var(--line)]">
        {!activeSlide ? (
          <div className="flex h-[360px] flex-col items-center justify-center gap-2 bg-[radial-gradient(circle_at_center,rgba(65,214,255,0.12),transparent_58%)] px-6 text-center">
            <p className="text-sm font-medium text-slate-100">No previews configured</p>
          </div>
        ) : activeFailed ? (
          <div className="flex h-[360px] flex-col items-center justify-center gap-2 bg-[radial-gradient(circle_at_center,rgba(65,214,255,0.12),transparent_58%)] px-6 text-center">
            <p className="text-sm font-medium text-slate-100">Preview unavailable</p>
            <p className="max-w-sm text-xs leading-relaxed text-slate-400">
              {activeSlide?.pageUrl || domain} blocked preview capture. Try another page
              in the slider or open in a new tab.
            </p>
          </div>
        ) : (
          <img
            src={activeSlide.previewSrc}
            alt={`${name} ${activeSlide.label} preview`}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="h-[360px] w-full object-cover object-top"
            onError={() =>
              setFailedSlides((prev) => ({
                ...prev,
                [activeIndex]: true,
              }))
            }
          />
        )}

        {hasSlides && (
          <>
            <button
              type="button"
              aria-label="Previous preview"
              onClick={goPrev}
              className="absolute left-2 top-1/2 inline-flex -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/55 p-2 text-slate-100 transition hover:bg-black/70"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next preview"
              onClick={goNext}
              className="absolute right-2 top-1/2 inline-flex -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/55 p-2 text-slate-100 transition hover:bg-black/70"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            <div className="pointer-events-none absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
              <div className="flex items-center justify-between text-[11px] text-slate-200">
                <span>{activeSlide?.label}</span>
                <span>
                  {activeIndex + 1}/{totalSlides}
                </span>
              </div>
            </div>
          </>
        )}
      </div>

      {hasSlides && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {slides.map((slide, index) => (
            <button
              key={`${slide.label}-${slide.path}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] transition ${
                index === activeIndex
                  ? "border-cyan-200/55 bg-cyan-200/12 text-cyan-100"
                  : "border-white/10 bg-white/[0.03] text-slate-400 hover:text-slate-200"
              }`}
            >
              {slide.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
