import Link from "next/link";
import Container from "./Container";

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/nemnidhi-official/posts/?feedView=all",
    hoverColor: "#0a66c2",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/nemnidhi.official/",
    hoverColor: "#e1306c",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/nemnidhiofficial/",
    hoverColor: "#1877f2",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    label: "X (Twitter)",
    href: "https://x.com/hey_nemnidhi",
    hoverColor: "#e7e9ea",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.256 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
      </svg>
    ),
  },
];

const footerLinkColumns = [
  {
    heading: "Services",
    links: [
      { label: "All Services", href: "/services" },
      { label: "Web Engineering", href: "/services/web-engineering" },
      { label: "Mobile Development", href: "/services/mobile-development" },
      { label: "Cloud & DevOps", href: "/services/cloud-devops" },
      { label: "AI Integration", href: "/services/ai-integration" },
      { label: "Product Strategy", href: "/services/product-strategy" },
      { label: "UI/UX Design", href: "/services/ui-ux-design" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Work", href: "/projects" },
      { label: "Blogs", href: "/blogs" },
      { label: "Contact", href: "/contact" },
      { label: "Indore Office", href: "/locations/indore" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        position: "relative",
        zIndex: 10,
        borderTop: "1px solid var(--footer-border)",
        background: "var(--footer-bg)",
        paddingTop: "2rem",
      }}
      className="site-footer"
    >
      <Container size="wide">
        <div className="footer-layout">
          {/* Left: Brand & Copyright */}
          <div className="footer-brand-group">
            <p
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "0.95rem",
                fontWeight: 800,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--footer-text, #000)",
              }}
            >
              NEMNIDHI.
            </p>
            <Link
              href="/locations/indore"
              style={{
                display: "inline-block",
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "0.62rem",
                letterSpacing: "0.06em",
                marginTop: "0.25rem",
                color: "var(--footer-muted, #555)",
                textDecoration: "none",
              }}
            >
              Software Development Studio — Indore, India
            </Link>
            <p className="footer-copyright">
              © {year} Nemnidhi
            </p>
          </div>

          {/* Middle: Link Columns */}
          <div className="footer-links-group">
            {footerLinkColumns.map((col) => (
              <div key={col.heading} className="footer-links-column">
                <p className="footer-links-heading">{col.heading}</p>
                {col.links.map((link) => (
                  <Link key={link.href} href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>

          {/* Right: Social Icons */}
          <div className="footer-social-group">
            {socials.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "2.4rem",
                  height: "2.4rem",
                  borderRadius: "10px",
                  border: "1px solid rgba(255,255,255,0.15)",
                  background: "rgba(255,255,255,0.10)",
                  color: "#cbd5e1",
                  textDecoration: "none",
                  transition: "color 0.2s, background 0.2s, border-color 0.2s, transform 0.15s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.color = s.hoverColor;
                  el.style.background = `${s.hoverColor}22`;
                  el.style.borderColor = `${s.hoverColor}66`;
                  el.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.color = "#cbd5e1";
                  el.style.background = "rgba(255,255,255,0.10)";
                  el.style.borderColor = "rgba(255,255,255,0.15)";
                  el.style.transform = "translateY(0)";
                }}
              >
                {s.icon}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
