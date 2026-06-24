"use client";

import { useEffect } from "react";
import { RefreshCcw } from "lucide-react";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container size="wide" className="grid min-h-[72vh] place-items-center py-20">
      <Card variant="strong" className="max-w-2xl p-8 text-center md:p-10">
        <p className="section-eyebrow">System recovery</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#F8FBFF] md:text-5xl">
          Something did not load cleanly.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-[#AFC0D6]">
          The interface is safe to retry. If this keeps happening, contact the Nemnidhi team.
        </p>
        <div className="mt-8 flex justify-center">
          <Button type="button" onClick={reset}>
            <RefreshCcw className="h-4 w-4" aria-hidden />
            Try again
          </Button>
        </div>
      </Card>
    </Container>
  );
}
