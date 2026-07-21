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
    <div className="ticker-strip">
      <div className="ticker-track">
        {doubled.map((item, i) => (
          <span key={i} className="ticker-item">
            <span className="ticker-dot" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
