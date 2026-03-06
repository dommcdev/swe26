"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HomeDashboardButton() {
  return (
    <Button
      nativeButton={false}
      size="lg"
      className="px-6 text-sm"
      render={<Link href="/dashboard" />}
    >
      Dashboard
    </Button>
  );
}
