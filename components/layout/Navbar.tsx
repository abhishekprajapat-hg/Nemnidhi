"use client";

import clsx from "clsx";
import { Home, Briefcase, FolderOpen, Info, MessageCircle, BookOpen } from "lucide-react";
import { motion, useReducedMotion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Container from "./Container";

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
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <motion.header
      className={clsx("sticky top-0 z-50", scrolled && "nav-scrolled")}
      initial={shouldReduceMotion ? false : { y: -18, opacity: 0 }}
      animate={shouldReduceMotion ? { opacity: 1 } : { y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <Container size="wide">
        <div className="nav-shell flex min-h-[4.5rem] items-center justify-between px-0 py-3">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.95rem",
              fontWeight: 800,
              letterSpacing: "0.15em",
              textTransform: "uppercase" as const,
              color: "var(--color-heading)",
            }}
          >
            NEMNIDHI.
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden items-center gap-0 md:flex" aria-label="Primary navigation">
            {links.map((link) => {
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

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link href="/contact" className="btn-cta-nav">
              LET&apos;S TALK
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </Container>

      {/* Mobile Bottom Nav */}
      <nav className="fixed inset-x-0 bottom-0 z-50 px-3 pb-[calc(0.65rem+env(safe-area-inset-bottom))] md:hidden" aria-label="Mobile navigation">
        <div className="mobile-nav mx-auto grid max-w-lg grid-cols-6 gap-1 rounded-lg p-1.5">
          {mobileTabs.map((tab) => {
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
    </motion.header>
  );
}
