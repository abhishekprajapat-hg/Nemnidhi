import clsx from "clsx";
import { forwardRef, type ReactNode } from "react";
import Container from "@/components/layout/Container";

type SectionProps = {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  size?: "sm" | "default" | "wide";
  id?: string;
};

export const Section = forwardRef<HTMLElement, SectionProps>(function Section({
  children,
  className,
  containerClassName,
  size = "default",
  id,
}, ref) {
  return (
    <section ref={ref} id={id} className={clsx("section-band", className)}>
      <Container size={size} className={clsx("py-12 md:py-16 xl:py-20", containerClassName)} data-reveal>
        {children}
      </Container>
    </section>
  );
});
