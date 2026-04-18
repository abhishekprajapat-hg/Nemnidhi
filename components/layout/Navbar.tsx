"use client";

import clsx from "clsx";
import {
  ArrowUpRight,
  ChevronDown,
  FolderKanban,
  House,
  MessageCircle,
  Sparkles,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PROJECTS } from "@/lib/projects";
import Container from "./Container";

const links = [
  { href: "/services", label: "Services" },
  { href: "/solutions", label: "Solutions" },
  { href: "/about", label: "About" },
];

const mobileTabs = [
  { href: "/", label: "Home", icon: House },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/services", label: "Services", icon: Wrench },
  { href: "/solutions", label: "Solutions", icon: Sparkles },
  { href: "/contact", label: "Contact", icon: MessageCircle },
];

export function Navbar() {
  const pathname = usePathname();

  const isRouteActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const isProjectsActive = isRouteActive("/projects");

  const desktopLinkClass = (isActive: boolean) => clsx("nav-3d-link", isActive && "is-active");

  return (
    <header className="sticky top-0 z-50 bg-transparent pt-3 md:pt-5">
      <Container>
        <div className="nav-3d-wrap">
          <div className="nav-3d-shell px-4 py-3 md:min-h-[88px] md:px-5 md:py-0">
            <span className="nav-3d-orbit nav-3d-orbit--left" />
            <span className="nav-3d-orbit nav-3d-orbit--right" />

            <Link href="/" className="nav-brand lift-3d">
              <div className="nav-brand-cube" aria-hidden>
                <span>N</span>
              </div>
              <div>
                <p className="text-[1.15rem] font-semibold leading-none tracking-[0.01em] text-[#E7F0FF]">Nemnidhi</p>
                <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.16em] text-[#8095AC]">
                  Digital Systems Studio
                </p>
              </div>
            </Link>

            <nav className="nav-3d-menu ml-5 hidden md:flex">
              <div className="group relative">
                <Link href="/projects" className={desktopLinkClass(isProjectsActive)}>
                  <span>Projects</span>
                  <ChevronDown size={14} className="transition-transform duration-300" />
                </Link>

                <div className="pointer-events-none absolute left-0 top-full z-50 w-[430px] translate-y-1 pt-3 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  <div className="nav-mega-panel p-3">
                    <div className="mb-2 flex items-center justify-between px-1">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8DB4D7]">Project Network</p>
                      <span className="rounded-full border border-[#4A6E91]/54 bg-[#122236]/75 px-2 py-0.5 text-[10px] font-semibold text-[#CFE3FF]">
                        {PROJECTS.length} live
                      </span>
                    </div>

                    <Link
                      href="/projects"
                      className="button-3d flex items-center justify-between rounded-xl border border-[#4F85BA] bg-[linear-gradient(145deg,#33DEC0,#004DC5)] px-3 py-2.5 text-sm font-semibold text-[#EAF2FF] transition"
                    >
                      <span>Explore project ecosystem</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>

                    <div className="my-2 h-px bg-[#3A5675]/45" />

                    <div className="max-h-[320px] space-y-1 overflow-y-auto pr-1">
                      {PROJECTS.map((project) => (
                        <a
                          key={project.id}
                          href={project.href}
                          target="_blank"
                          rel="noreferrer"
                          className="nav-project-link"
                        >
                          <div>
                            <p className="text-sm font-semibold text-[#E7F0FF]">{project.name}</p>
                            <p className="text-xs text-[#8095AC]">{project.domain}</p>
                          </div>
                          <ArrowUpRight className="h-4 w-4 text-[#2AC0A1]" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {links.map((link) => {
                const isActive = isRouteActive(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={desktopLinkClass(isActive)}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="ml-auto hidden items-center md:flex">
              <Link href="/contact" className="button-3d nav-cta inline-flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5" />
                Start Discussion
              </Link>
            </div>
          </div>
        </div>
      </Container>

      <nav className="fixed inset-x-0 bottom-0 z-50 px-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] md:hidden">
        <div className="nav-mobile-shell mx-auto max-w-lg p-1.5">
          <div className="grid grid-cols-5 gap-1">
            {mobileTabs.map((tab) => {
              const isActive = isRouteActive(tab.href);
              const Icon = tab.icon;

              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={clsx("nav-mobile-tab", isActive && "is-active")}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon className={clsx("mb-1 h-4 w-4 transition", isActive ? "text-[#E7F0FF]" : "text-[#2AC0A1]")} />
                  <span>{tab.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </header>
  );
}
