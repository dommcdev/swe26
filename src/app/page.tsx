"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center gap-8 px-6 text-center">
      <h1 className="text-6xl font-bold tracking-tight sm:text-8xl">
        ChopChop
      </h1>
      <Button
        size="lg"
        onClick={() => router.push("/dashboard")}
        className="px-6 text-sm"
      >
        Dashboard
      </Button>
    </main>
  );
}
