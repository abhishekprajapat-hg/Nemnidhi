// Shared inline-style tokens for the /portal pages - same CSS-custom-property convention
// business-audit/page.tsx uses (S constants object) rather than Tailwind, so the portal
// picks up the site's existing dark/light theme automatically.

export const S = {
  bg: "var(--color-bg)",
  bgCard: "var(--color-bg-elevated)",
  line: "var(--color-line)",
  accent: "var(--color-accent)",
  white: "var(--color-heading)",
  muted: "var(--color-text-muted)",
  faint: "var(--color-text-faint)",
  mono: "var(--font-mono, monospace)",
  heading: "var(--font-display, var(--font-heading, sans-serif))",
  danger: "#e05252",
  success: "#3fa66b",
};

export const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.85rem 1rem",
  background: "transparent",
  border: `1px solid ${S.line}`,
  color: S.white,
  fontSize: "0.875rem",
  outline: "none",
  fontFamily: "inherit",
};

export const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: S.mono,
  fontSize: "0.6rem",
  fontWeight: 600,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: S.muted,
  marginBottom: "0.5rem",
};

export const buttonStyle: React.CSSProperties = {
  padding: "0.85rem 1.5rem",
  background: S.accent,
  border: "none",
  color: "#fff",
  fontSize: "0.875rem",
  fontWeight: 600,
  cursor: "pointer",
  fontFamily: "inherit",
};

export const secondaryButtonStyle: React.CSSProperties = {
  ...buttonStyle,
  background: "transparent",
  border: `1px solid ${S.line}`,
  color: S.white,
};

export const cardStyle: React.CSSProperties = {
  background: S.bgCard,
  border: `1px solid ${S.line}`,
  padding: "1.5rem",
};

export function formatInr(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}
