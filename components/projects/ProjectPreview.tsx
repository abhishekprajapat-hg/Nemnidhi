"use client";

import { useMemo, useState } from "react";

type ProjectPreviewProps = {
  href: string;
  name: string;
  domain: string;
};

export default function ProjectPreview({ href, name, domain }: ProjectPreviewProps) {
  const [previewFailed, setPreviewFailed] = useState(false);

  const previewSrc = useMemo(() => {
    return `https://image.thum.io/get/width/1400/crop/900/noanimate/${href}`;
  }, [href]);

  return (
    <div className="border-t border-white/10 bg-[#020812] p-3 md:border-l md:border-t-0 [border-color:var(--line)]">
      <div className="mb-2 flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-[11px] text-slate-300 [border-color:var(--line)]">
        <span>Live Preview</span>
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
        {previewFailed ? (
          <div className="flex h-[360px] flex-col items-center justify-center gap-2 bg-[radial-gradient(circle_at_center,rgba(65,214,255,0.12),transparent_58%)] px-6 text-center">
            <p className="text-sm font-medium text-slate-100">Preview unavailable</p>
            <p className="max-w-sm text-xs leading-relaxed text-slate-400">
              {domain} blocked preview capture. Open the project in a new tab.
            </p>
          </div>
        ) : (
          <img
            src={previewSrc}
            alt={`${name} preview`}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="h-[360px] w-full object-cover object-top"
            onError={() => setPreviewFailed(true)}
          />
        )}
      </div>
    </div>
  );
}
