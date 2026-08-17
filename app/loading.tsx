export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "var(--color-bg, #080a0c)",
        color: "var(--color-heading, #ffffff)",
        fontFamily: "var(--font-mono, monospace)",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
        {/* Simple spinning CSS loader */}
        <div
          className="nemnidhi-loader"
          style={{
            width: "48px",
            height: "48px",
            border: "2px solid rgba(103, 232, 249, 0.1)", // branding cyan faint
            borderTopColor: "#67e8f9", // branding cyan
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />
        <p
          style={{
            fontSize: "0.75rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--color-text-muted, #8b9bb4)",
            opacity: 0.8,
            animation: "pulse 2s ease-in-out infinite",
          }}
        >
          Loading Nemnidhi...
        </p>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
