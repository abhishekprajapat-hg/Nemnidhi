"use client";

import { useEffect, useState } from "react";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";

// Animation Variants
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const fadeInUp: any = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 50, damping: 20 },
  },
};

const floatAnimation: any = {
  animate: {
    y: [0, -15, 0],
    rotate: [0, 1, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function Hero({ hero }: any) {
  const content = hero || {
    badgeText: "Digital Systems",
    headingMain: "We engineer",
    headingSuffix: "for brands built to scale.",
    subheading:
      "Senior-level strategy, full-stack MERN execution and aesthetic precision — turning digital presence into profit-driving systems.",
    primaryCtaLabel: "Book a private strategy call",
    primaryCtaHref: "/contact",
    secondaryCtaLabel: "View case studies",
    secondaryCtaHref: "/case-studies",
  };

  // Smooth fading words
  const words = [
    "High-conversion digital products and services",
    "Premium brand-scaling ecosystems",
    "Growth-focused automated systems",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden border-b border-zinc-800 bg-[#050509]">
      {/* --- Dynamic Background Ambiance --- */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden ">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, 50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] left-[10%] h-[500px] w-[500px] rounded-full bg-amber-500/20 blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.3, 0.1],
            x: [0, -50, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute top-[30%] -right-[10%] h-[400px] w-[400px] rounded-full bg-yellow-600/15 blur-[100px]"
        />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
      </div>

      <Container className="relative z-10 flex flex-col items-center gap-16 py-24 md:flex-row md:py-32">
        {/* --- LEFT CONTENT --- */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="flex-1 space-y-8 text-left"
        >
          {/* Badge */}
          <motion.div
            variants={fadeInUp}
            className="flex justify-start"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-950/20 px-4 py-1.5 text-[11px] uppercase tracking-wider text-amber-200 backdrop-blur-md transition-colors hover:border-amber-400/50">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              {content.badgeText}
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeInUp}
            className="max-w-3xl text-balance text-5xl font-bold leading-tight text-zinc-50 md:text-7xl"
          >
            {content.headingMain}{" "}
            <span className="relative inline-block">
              <AnimatePresence mode="wait">
                <motion.span
                  key={words[index]}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="relative bg-gradient-to-r from-amber-200 via-amber-300 to-amber-500 bg-clip-text text-transparent inline-block"
                >
                  {words[index]}
                  <span className="animate-pulse">|</span>
                </motion.span>
              </AnimatePresence>
            </span>{" "}
            {content.headingSuffix}
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={fadeInUp}
            className="mx-auto max-w-xl text-base text-zinc-400 md:mx-0 md:text-lg leading-relaxed"
          >
            {content.subheading}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col items-start gap-4 pt-4 sm:flex-row"
          >
            <Button
              asChild
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-amber-300 to-amber-400 px-8 py-6 text-[14px] font-bold text-zinc-950 shadow-[0_4px_30px_rgba(251,191,36,0.4)] transition-all hover:shadow-[0_8px_40px_rgba(251,191,36,0.6)] hover:scale-[1.02]"
            >
              <a href={content.primaryCtaHref}>
                <span className="relative z-10">{content.primaryCtaLabel}</span>
              </a>
            </Button>

            <Button
              asChild
              variant="ghost"
              className="rounded-full border border-zinc-700 px-8 py-6 text-[14px] font-medium text-zinc-200 transition-all hover:border-amber-300/50 hover:bg-zinc-900/50 hover:text-amber-200"
            >
              <a href={content.secondaryCtaHref}>{content.secondaryCtaLabel}</a>
            </Button>
          </motion.div>
        </motion.div>

        {/* --- RIGHT CONTENT (Glass Card) --- */}
        <motion.div
          initial={{ opacity: 0, x: 80, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
          className="w-full max-w-md flex-1 relative perspective-1000"
        >
          <motion.div variants={floatAnimation} animate="animate">
            <div className="absolute inset-0 translate-y-8 scale-[0.85] rounded-[2.5rem] bg-gradient-to-tr from-amber-600/30 via-amber-400/10 to-zinc-900 blur-3xl z-0"></div>

            <div className="relative z-10 rounded-[2.5rem] border border-white/10 bg-zinc-900/60 p-8 backdrop-blur-2xl shadow-[0_30px_70px_-15px_rgba(0,0,0,0.9)] overflow-hidden group transition-all duration-300 hover:border-amber-500/30">
              <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-white/5 to-transparent skew-x-12 -translate-x-full transition-transform duration-1000 group-hover:translate-x-[200%]"></div>

              <div className="space-y-6 relative z-20">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-xs font-medium uppercase tracking-wider text-zinc-500 mb-1">
                      Performance Snapshot
                    </div>
                    <div className="text-sm text-zinc-300 font-semibold">
                      Nemnidhi Client System
                    </div>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-amber-300 to-yellow-600 flex items-center justify-center shadow-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4 text-zinc-950"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>

                <div className="space-y-2 py-4 border-y border-zinc-800">
                  <div className="flex items-end justify-between">
                    <motion.span
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.2, type: "spring" }}
                      className="text-5xl font-bold text-amber-200 tracking-tight"
                    >
                      +32.8%
                    </motion.span>
                    <span className="mb-1 text-[11px] font-medium uppercase text-zinc-500">
                      vs last month
                    </span>
                  </div>

                  <div className="h-2 rounded-full bg-zinc-800/80 overflow-hidden">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: "72%" }}
                      transition={{
                        delay: 1.4,
                        duration: 1.5,
                        ease: "easeOut",
                      }}
                      className="h-full rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-300 relative"
                    >
                      <div className="absolute top-0 right-0 h-full w-5 bg-white/40 blur-[4px]"></div>
                    </motion.div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="rounded-2xl bg-zinc-950/50 p-4 border border-zinc-800/50">
                    <div className="text-[10px] text-zinc-500 uppercase">
                      Conversion Rate
                    </div>
                    <div className="text-xl font-semibold text-zinc-200">
                      4.8% <span className="text-emerald-500 text-sm">↑</span>
                    </div>
                  </div>
                  <div className="rounded-2xl bg-zinc-950/50 p-4 border border-zinc-800/50">
                    <div className="text-[10px] text-zinc-500 uppercase">
                      Avg. Session
                    </div>
                    <div className="text-xl font-semibold text-zinc-200">
                      3m 45s
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
