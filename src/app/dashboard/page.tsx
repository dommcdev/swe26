"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen p-12 flex items-center justify-center bg-black text-white">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-bold">Welcome to the Dashboard</h1>
        <p className="text-zinc-300">
          Your tools and activity will appear here.
        </p>
        <Button
          size="lg"
          onClick={() => router.push("/dashboard/upload")}
          className="px-6 text-sm"
        >
          Go to upload page
        </Button>
      </div>
    </main>
  );
}
