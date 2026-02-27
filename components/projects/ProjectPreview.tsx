type ProjectPreviewProps = {
  href: string;
};

export default function ProjectPreview({ href }: ProjectPreviewProps) {
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
        <iframe
          src={href}
          title="Project preview"
          loading="lazy"
          className="h-[360px] w-full"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
}
