import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";

export function CTA({
  href,
  children,
  variant = "solid",
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "ghost";
}) {
  return (
    <Button asChild variant={variant}>
      <Link href={href}>
        {children}
        <ArrowUpRight className="h-4 w-4" aria-hidden />
      </Link>
    </Button>
  );
}
