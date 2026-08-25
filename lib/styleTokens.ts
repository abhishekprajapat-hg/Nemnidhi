// Shared inline-style token shorthand for pages that style via `style={{}}` against
// the CSS custom properties defined in app/globals.css, rather than Tailwind classes.
// This was previously copy-pasted verbatim into 12 separate files — keep it here and
// import it instead of redefining it locally.
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
} as const;
