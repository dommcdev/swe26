import { DashboardUploadButton } from "@/app/dashboard/_components/dashboard-upload-button";

export default function DashboardPage() {
  return (
    <main className="min-h-screen p-12 flex items-center justify-center bg-black text-white">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-bold">Welcome to the Dashboard</h1>
        <p className="text-zinc-300">
          Your tools and activity will appear here.
        </p>
        <DashboardUploadButton />
      </div>
    </main>
  );
}
