import React from "react";

type BrowserFrameMockupProps = {
  projectName?: string;
  className?: string;
};

export default function BrowserFrameMockup({
  projectName = "Project",
  className = "",
}: BrowserFrameMockupProps) {
  return (
    <div
      className={`browser-frame-mockup flex flex-col overflow-hidden rounded-md border border-[var(--color-line)] bg-[var(--color-bg-elevated)] ${className}`}
      style={{
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      }}
    >
      {/* Browser Header */}
      <div className="flex items-center gap-2 border-b border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-2">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
        </div>
        <div className="mx-auto flex h-4 w-32 items-center justify-center rounded bg-[var(--color-bg)] px-2">
          <span className="font-mono text-[10px] text-[var(--color-text-faint)]">
            {projectName.toLowerCase().replace(/\s+/g, "")}.com
          </span>
        </div>
      </div>

      {/* Abstract UI Pattern */}
      <div className="relative flex-1 bg-[var(--color-bg)] p-4">
        {/* // PLACEHOLDER — replace with real screenshot of {projectName} */}
        <div className="flex h-full flex-col gap-3 opacity-30">
          {/* Nav Mockup */}
          <div className="flex items-center justify-between">
            <div className="h-3 w-16 rounded-sm bg-[var(--color-text-muted)]" />
            <div className="flex gap-2">
              <div className="h-2 w-8 rounded-sm bg-[var(--color-line-strong)]" />
              <div className="h-2 w-8 rounded-sm bg-[var(--color-line-strong)]" />
            </div>
          </div>
          
          {/* Hero Mockup */}
          <div className="mt-4 space-y-2">
            <div className="h-6 w-3/4 rounded bg-[var(--color-text)]" />
            <div className="h-6 w-1/2 rounded bg-[var(--color-text)]" />
            <div className="mt-2 h-2 w-full rounded-sm bg-[var(--color-text-faint)]" />
            <div className="h-2 w-5/6 rounded-sm bg-[var(--color-text-faint)]" />
          </div>

          {/* Grid Mockup */}
          <div className="mt-auto grid grid-cols-3 gap-2">
            <div className="h-12 rounded bg-[var(--color-line-strong)]" />
            <div className="h-12 rounded bg-[var(--color-line-strong)]" />
            <div className="h-12 rounded bg-[var(--color-line-strong)]" />
          </div>
        </div>
      </div>
    </div>
  );
}
