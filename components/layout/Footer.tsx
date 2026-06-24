import Link from "next/link";
import Container from "./Container";

const socials = [
  { label: "LINKEDIN", href: "https://www.linkedin.com/company/nemnidhi-official/posts/?feedView=all" },
  { label: "INSTAGRAM", href: "https://www.instagram.com/nemnidhi.official/" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: "1px solid rgba(255,255,255,0.07)",
        background: "#080a0c",
        paddingTop: "2rem",
        paddingBottom: "2rem",
      }}
    >
      <Container size="wide">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          {/* Left: Brand */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "0.95rem",
                fontWeight: 800,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#f0f4f8",
              }}
            >
              NEMNIDHI.
            </p>
            <p
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "0.62rem",
                letterSpacing: "0.06em",
                color: "#475569",
                marginTop: "0.25rem",
              }}
            >
              Software Development Studio — Indore, India
            </p>
          </div>

          {/* Center: Social Links */}
          <div
            style={{
              display: "flex",
              gap: "1.75rem",
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "0.62rem",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {socials.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#f0f4f8",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLAnchorElement).style.color = "#f0f4f8")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLAnchorElement).style.color = "#f0f4f8")
                }
              >
                {s.label}
              </Link>
            ))}
          </div>

          {/* Right: Copyright */}
          <p
            style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "0.62rem",
              color: "#475569",
              letterSpacing: "0.04em",
            }}
          >
            © {year} Nemnidhi Technologies Pvt. Ltd.
          </p>
        </div>
      </Container>
    </footer>
  );
}
