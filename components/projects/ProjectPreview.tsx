type ProjectPreviewProps = {
  href: string;
  staticPreviewSrc?: string;
  staticPreviewAlt?: string;
};

export default function ProjectPreview({
  href,
  staticPreviewSrc,
  staticPreviewAlt,
}: ProjectPreviewProps) {
  return (
    <div className="border-t border-[#E9E9E9] bg-[#F9F9F9] p-3 md:border-l md:border-t-0">
      <div className="mb-2 flex items-center justify-between rounded-lg border border-[#E9E9E9] bg-white px-3 py-2 text-xs text-[#333333]">
        <span>Live Preview</span>
        <a href={href} target="_blank" rel="noreferrer" className="text-[#0D8AFD] transition hover:text-[#003464]">
          Open in new tab
        </a>
      </div>

      <div className="relative overflow-hidden rounded-lg border border-[#E9E9E9] bg-white">
        {staticPreviewSrc ? (
          <img
            src={staticPreviewSrc}
            alt={staticPreviewAlt || "Project preview"}
            loading="lazy"
            className="h-[360px] w-full object-cover object-top"
          />
        ) : (
          <iframe
            src={href}
            title="Project preview"
            loading="lazy"
            className="h-[360px] w-full"
            referrerPolicy="no-referrer"
          />
        )}
      </div>
    </div>
  );
}
