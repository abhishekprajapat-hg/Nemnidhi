"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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

  return (
    <header className="sticky top-0 z-50 border-b border-[#E7DEC9] bg-[#FDFCFA]/95 md:backdrop-blur-md">
      <Container className="py-4 md:min-h-[92px] md:py-0">
        <div className="flex items-center gap-4">
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-lg border border-[#D8BE8A]/80 bg-[linear-gradient(155deg,#082D54_0%,#0A3A69_55%,#12508D_100%)] text-lg font-bold text-[#F8EACB] shadow-[0_10px_24px_rgba(10,35,62,0.28)]">
              N
              <span className="absolute inset-0 rounded-lg border border-white/20" />
            </div>
            <div>
              <p className="text-[1.17rem] font-semibold leading-none tracking-[0.02em] text-[#0A2D4E]">Nemnidhi</p>
              <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.15em] text-[#8D7443]">
                Digital Systems Studio
              </p>
            </div>
          </Link>

          <nav className="ml-8 hidden items-center rounded-full border border-[#E7DEC9] bg-white/90 p-1 shadow-[0_12px_30px_rgba(10,31,56,0.08)] md:flex">
            <div className="group relative">
              <Link
                href="/projects"
                className={clsx(
                  "inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-semibold tracking-[0.03em] transition",
                  isProjectsActive
                    ? "bg-[#F7F1E6] text-[#0A2D4E]"
                    : "text-[#3C4A58] hover:bg-[#F7F1E6] hover:text-[#0A2D4E]"
                )}
              >
                <span>Projects</span>
                <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />
              </Link>

              <div className="pointer-events-none absolute left-0 top-full z-50 w-[390px] translate-y-1 pt-3 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
                <div className="rounded-2xl border border-[#E7DEC9] bg-[#FFFEFC] p-3 shadow-[0_24px_48px_rgba(10,31,56,0.16)]">
                  <Link
                    href="/projects"
                    className="flex items-center justify-between rounded-xl border border-[#E6D7BC] bg-[linear-gradient(145deg,#0A3056,#0E477D)] px-3 py-2.5 text-sm font-semibold text-[#F8EACB] transition hover:opacity-95"
                  >
                    <span>All Projects</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>

                  <div className="my-2 h-px bg-[#EDE4D2]" />

                  <div className="max-h-[320px] space-y-1 overflow-y-auto pr-1">
                    {PROJECTS.map((project) => (
                      <a
                        key={project.id}
                        href={project.href}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between rounded-xl px-3 py-2.5 transition hover:bg-[#F8F4EC]"
                      >
                        <div>
                          <p className="text-sm font-semibold text-[#0A2D4E]">{project.name}</p>
                          <p className="text-xs text-[#6A7683]">{project.domain}</p>
                        </div>
                        <ArrowUpRight className="h-4 w-4 text-[#9C7B44]" />
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
                  className={clsx(
                    "inline-flex items-center rounded-full px-4 py-2.5 text-[13px] font-semibold tracking-[0.03em] transition",
                    isActive
                      ? "bg-[#F7F1E6] text-[#0A2D4E]"
                      : "text-[#3C4A58] hover:bg-[#F7F1E6] hover:text-[#0A2D4E]"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto hidden md:block">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-[#D2B177] bg-[linear-gradient(145deg,#0A3056,#0E477D)] px-5 py-2.5 text-sm font-semibold text-[#F8EACB] shadow-[0_14px_30px_rgba(10,35,62,0.2)] transition hover:-translate-y-0.5"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Start Discussion
            </Link>
          </div>
        </div>

      </Container>

      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-[#E7DEC9] bg-[#FFFEFC]/98 backdrop-blur-md md:hidden">
        <div className="mx-auto grid max-w-lg grid-cols-5 gap-1 px-2 py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
          {mobileTabs.map((tab) => {
            const isActive = isRouteActive(tab.href);
            const Icon = tab.icon;

            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={clsx(
                  "flex flex-col items-center justify-center rounded-xl px-1 py-2 text-[10px] font-semibold tracking-[0.04em] transition",
                  isActive ? "bg-[#F7F1E6] text-[#0A2D4E]" : "text-[#4A5A69]"
                )}
              >
                <Icon className={clsx("mb-1 h-4 w-4", isActive ? "text-[#0A2D4E]" : "text-[#8D7443]")} />
                <span>{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
