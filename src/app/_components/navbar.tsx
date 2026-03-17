import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { Show, UserButton } from "@clerk/nextjs";
import { HomeDashboardButton } from "@/app/_components/home-dashboard-button";
import { ThemeToggleButton } from "@/app/_components/theme-toggle-button";

export function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b-[3px] border-foreground bg-background px-4 py-3 sm:px-6 lg:px-8 relative z-50">
      <Link href="/" className="flex items-center gap-3 group">
        <Image
          src="/logo.svg"
          alt="ChopChop Logo"
          width={40}
          height={40}
          priority
          className="h-10 w-25 bg-background"
        />
        <span className="text-2xl font-black uppercase tracking-tighter text-foreground drop-shadow-[2px_2px_0px_var(--primary)] hidden sm:block mt-1"></span>
      </Link>
      <div className="flex items-center gap-4 sm:gap-6">
        <ThemeToggleButton />
        <HomeDashboardButton />
        <Suspense>
          <Show when="signed-in">
            <div className="border-[3px] border-foreground rounded-full h-8 w-8 flex items-center justify-center bg-card">
              <UserButton />
            </div>
          </Show>
        </Suspense>
      </div>
    </nav>
  );
}
