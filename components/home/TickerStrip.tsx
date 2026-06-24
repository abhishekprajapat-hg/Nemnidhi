"use client";

const ITEMS = [
  "CLOUD ARCHITECTURE",
  "AI INTEGRATION",
  "MOBILE DEVELOPMENT",
  "DEVOPS & CI/CD",
  "API DESIGN",
  "PERFORMANCE OPTIMIZATION",
  "PRODUCT DELIVERY",
  "SOFTWARE ENGINEERING",
];

export default function TickerStrip() {
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div
      style={{
        borderTop: "1px solid rgba(255,255,255,0.07)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        padding: "0.8rem 0",
        overflow: "hidden",
        background: "rgba(255,255,255,0.015)",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "max-content",
          animation: "ticker 35s linear infinite",
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "1.25rem",
              padding: "0 1.25rem",
              whiteSpace: "nowrap",
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "0.65rem",
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase" as const,
              color: "#f0f4f8",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: "#67e8f9",
                flexShrink: 0,
              }}
            />
            {item}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="animation: ticker"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
