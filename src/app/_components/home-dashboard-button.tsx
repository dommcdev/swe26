"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HomeDashboardButton() {
  return (
    <Button
      nativeButton={false}
      size="lg"
      className="px-6 text-sm font-black uppercase tracking-widest hover:-translate-y-[2px] hover:-translate-x-[2px] transition-all duration-300 rounded-none bg-primary text-primary-foreground"
      render={<Link href="/dashboard" />}
    >
      Dashboard
    </Button>
  );
}
