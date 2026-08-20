"use client";

import clsx from "clsx";
import { Home, Briefcase, FolderOpen, Info, MessageCircle, BookOpen, UserCircle2, Sun, Moon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Container from "./Container";
import { useTheme } from "./ThemeProvider";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/blogs", label: "Blogs" },
  { href: "/contact", label: "Contact" },
];

const mobileTabs = [
  { href: "/", label: "Home", icon: Home },
  { href: "/services", label: "Services", icon: Briefcase },
  { href: "/projects", label: "Work", icon: FolderOpen },
  { href: "/about", label: "About", icon: Info },
  { href: "/blogs", label: "Blogs", icon: BookOpen },
  { href: "/contact", label: "Contact", icon: MessageCircle },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [portalAuthenticated, setPortalAuthenticated] = useState(false);
  const { theme, toggle } = useTheme();

  const authLink = portalAuthenticated
    ? { href: "/portal", label: "Account", icon: UserCircle2 }
    : { href: "/login", label: "Login", icon: UserCircle2 };
  const navLinks = [...links, { href: authLink.href, label: authLink.label }];
  const navTabs = [...mobileTabs, authLink];

  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      setScrolled(window.scrollY > 50);
    };
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let active = true;
    let cancelSessionCheck: (() => void) | undefined;

    const checkSession = () => {
      fetch("/api/portal/auth/session", {
        credentials: "same-origin",
        cache: "no-store",
      })
        .then((response) => (response.ok ? response.json() : null))
        .then((data: { authenticated?: boolean } | null) => {
          if (active) setPortalAuthenticated(Boolean(data?.authenticated));
        })
        .catch(() => {
          if (active) setPortalAuthenticated(false);
        });
    };

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(checkSession, { timeout: 1800 });
      cancelSessionCheck = () => window.cancelIdleCallback(idleId);
    } else {
      const timeoutId = globalThis.setTimeout(checkSession, 900);
      cancelSessionCheck = () => globalThis.clearTimeout(timeoutId);
    }

    return () => {
      active = false;
      cancelSessionCheck?.();
    };
  }, [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={clsx("sticky top-0 z-50", scrolled && "nav-scrolled")}
      style={{
        background: "transparent",
        transition: "background 0.3s ease",
      }}
    >
      <Container size="wide">
        <div className="nav-shell flex min-h-[4.5rem] items-center justify-between px-0 py-3">
          <Link
            href="/"
            className="flex items-center gap-3"
            aria-label="Nemnidhi home"
          >
            <Image
              src="/images/logo.png"
              alt="Nemnidhi"
              width={1368}
              height={1288}
              priority
              className="h-11 w-auto object-contain"
            />
            <span
              className="text-lg font-extrabold uppercase leading-none text-[#67e8f9] sm:text-xl"
              style={{
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.12em",
              }}
            >
              Nemnidhi
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden items-center gap-0 md:flex" aria-label="Primary navigation">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={clsx("nav-link", active && "is-active")}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Theme Toggle */}
          <div className="flex md:hidden items-center">
            <button
              id="theme-toggle-mobile"
              onClick={toggle}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="theme-toggle-btn"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" aria-hidden />
              ) : (
                <Moon className="h-5 w-5" aria-hidden />
              )}
            </button>
          </div>

          {/* Theme Toggle + CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <button
              id="theme-toggle-desktop"
              onClick={toggle}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="theme-toggle-btn"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" aria-hidden />
              ) : (
                <Moon className="h-4 w-4" aria-hidden />
              )}
            </button>
            <Link href="/contact" className="btn-cta-nav">
              LET&apos;S TALK
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </Container>

      {/* Mobile Bottom Nav */}
      <nav className="fixed inset-x-0 bottom-0 z-[80] px-3 pb-[calc(0.65rem+env(safe-area-inset-bottom))] md:hidden" aria-label="Mobile navigation">
        <div className="mobile-nav mx-auto grid max-w-lg grid-cols-7 gap-1 rounded-lg p-1.5">
          {navTabs.map((tab) => {
            const active = isActive(tab.href);
            const Icon = tab.icon;
            return (
              <Link
                key={tab.label}
                href={tab.href}
                className={clsx("mobile-nav-link", active && "is-active")}
                aria-current={active ? "page" : undefined}
              >
                <Icon className="h-4 w-4" aria-hidden />
                <span>{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
