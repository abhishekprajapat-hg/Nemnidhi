import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-[#030712] p-5 text-[#F8FBFF]">
      <div className="premium-loader surface-strong w-full max-w-lg rounded-[var(--radius-xl)] p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="section-eyebrow">Nemnidhi</p>
            <p className="mt-2 text-sm font-semibold text-[#D9E2EF]">Preparing secure interface</p>
          </div>
          <div className="grid h-12 w-12 place-items-center rounded-[var(--radius-md)] border border-[rgba(214,190,124,0.28)] bg-[rgba(214,190,124,0.12)] text-sm font-black text-[#F0D991]">
            N
          </div>
        </div>
        <div className="mt-6 h-1 overflow-hidden rounded-full bg-white/10">
          <div className="loader-progress h-full w-2/3 rounded-full bg-[#D6BE7C]" />
        </div>
        <div className="mt-6 grid gap-3">
          <Skeleton className="h-4 w-11/12 rounded-full" />
          <Skeleton className="h-4 w-8/12 rounded-full" />
          <div className="mt-2 grid gap-3 sm:grid-cols-3">
            <Skeleton className="h-20 rounded-[var(--radius-md)]" />
            <Skeleton className="h-20 rounded-[var(--radius-md)]" />
            <Skeleton className="h-20 rounded-[var(--radius-md)]" />
          </div>
        </div>
      </div>
    </div>
  );
}
