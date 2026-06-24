import { ArrowLeft, Home } from "lucide-react";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function NotFound() {
  return (
    <Container size="wide" className="grid min-h-[72vh] place-items-center py-20">
      <Card variant="strong" className="max-w-2xl p-8 text-center md:p-10">
        <p className="section-eyebrow">404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#F8FBFF] md:text-6xl">
          This page is outside the operating map.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-[#AFC0D6]">
          The page may have moved, or the link may be incorrect. Return to the homepage or contact Nemnidhi for help.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/">
            <Home className="h-4 w-4" aria-hidden />
            Back home
          </Button>
          <Button href="/contact" variant="outline">
            Contact team
            <ArrowLeft className="h-4 w-4 rotate-180" aria-hidden />
          </Button>
        </div>
      </Card>
    </Container>
  );
}
