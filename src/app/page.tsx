import { HomeDashboardButton } from "@/app/_components/home-dashboard-button";

export default function HomePage() {
  return (
    <main className="flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center gap-8 px-6 text-center">
      <h1 className="text-6xl font-bold tracking-tight sm:text-8xl">
        ChopChop
      </h1>
      <HomeDashboardButton />
    </main>
  );
}
