import Image from "next/image";

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
    <div className="border-t border-[#3A5675]/34 bg-[linear-gradient(180deg,rgba(18,29,43,0.88)_0%,rgba(13,22,34,0.9)_55%,rgba(20,16,15,0.82)_100%)] p-3 md:border-l md:border-t-0">
      <div className="surface-3d-soft mb-2 flex items-center justify-between rounded-lg border border-[#3A5675]/36 px-3 py-2 text-xs text-[#AABFD4]">
        <span>Live Preview</span>
        <a href={href} target="_blank" rel="noreferrer" className="text-[#76B5FF] transition hover:text-[#66AAFF]">
          Open in new tab
        </a>
      </div>

      <div className="surface-3d relative overflow-hidden rounded-lg border border-[#3A5675]/36 bg-[#111a28]">
        {staticPreviewSrc ? (
          <div className="relative h-[360px] w-full">
            <Image
              src={staticPreviewSrc}
              alt={staticPreviewAlt || "Project preview"}
              fill
              sizes="(min-width: 768px) 52vw, 100vw"
              className="object-cover object-top"
            />
          </div>
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
