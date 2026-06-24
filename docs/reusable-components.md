# Nemnidhi Reusable Components

This document covers the production-facing reusable primitives used by the Nemnidhi website.

## Layout

### `Container`

Path: `components/layout/Container.tsx`

Constrains content width and horizontal page padding. Use `size="sm"`, `size="default"`, or `size="wide"` depending on the section density.

### `Section`

Path: `components/ui/Section.tsx`

Wraps a semantic section, applies consistent vertical spacing, and opts into scroll-triggered reveal animation through `data-reveal`.

## UI

### `Button`

Path: `components/ui/Button.tsx`

Primary action primitive. Supports `solid`, `outline`, and `ghost` variants plus `sm`, `md`, and `lg` sizes. Buttons automatically participate in magnetic hover and custom cursor behavior on pointer devices.

### `CTA`

Path: `components/ui/CTA.tsx`

Convenience wrapper for linked call-to-action buttons with an arrow icon.

### `Card`

Path: `components/ui/Card.tsx`

Reusable surface primitive with `default`, `strong`, and `plain` variants. Cards include lift, glass, and mouse-follow glow effects where supported.

### `Badge`

Path: `components/ui/Badge.tsx`

Compact label for section eyebrows and trust markers. Supports `gold`, `blue`, `neutral`, and `success` tones.

### `Heading`

Path: `components/ui/Heading.tsx`

Typography primitive for hero, section, and card headings. Section/card headings opt into split-text reveal animation.

### `Skeleton`

Path: `components/ui/Skeleton.tsx`

Loading placeholder primitive with accessible hidden shimmer. Use for route-level fallbacks and async UI loading states.

## Motion

### `MotionProvider`

Path: `components/motion/MotionProvider.tsx`

Owns Lenis smooth scrolling, GSAP ScrollTrigger, scroll progress, split text, section reveals, parallax, image scale transitions, timeline reveals, counters, custom cursor, and magnetic targets. Disabled or simplified automatically for `prefers-reduced-motion`.

### `AnimatedNumber`

Path: `components/motion/AnimatedNumber.tsx`

Scroll-triggered numeric counter. Supports prefix, suffix, and decimal precision.

### `AnimatedDivider`

Path: `components/motion/AnimatedDivider.tsx`

Animated horizontal divider for premium section transitions.

### `MotionSection`

Path: `components/motion/MotionSection.tsx`

Small wrapper for reveal-enabled content blocks when a full `Section` is not appropriate.

### `usePrefersReducedMotion`

Path: `components/motion/usePrefersReducedMotion.ts`

Shared hook for respecting user motion preferences in client components.

## Deployment Notes

- Root SEO metadata, Open Graph, Twitter cards, and organization structured data live in `app/layout.tsx`.
- `app/sitemap.ts` and `app/robots.ts` generate crawl configuration.
- `app/error.tsx`, `app/not-found.tsx`, and `app/loading.tsx` provide production fallbacks.
- Keep non-critical client features dynamically loaded where possible, especially chat and heavy interaction surfaces.
