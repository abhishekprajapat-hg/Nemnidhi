export default function SectionDivider() {
  return (
    <div className="flex w-full justify-center opacity-20 -my-3 relative z-10" aria-hidden="true">
      <svg
        width="120"
        height="24"
        viewBox="0 0 120 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-[var(--color-accent)]"
      >
        <path
          d="M0 12C15 12 15 2 30 2C45 2 45 22 60 22C75 22 75 2 90 2C105 2 105 12 120 12"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="4 6"
        />
      </svg>
    </div>
  );
}
