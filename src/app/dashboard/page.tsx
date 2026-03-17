import BrowseCategories from "@/app/dashboard/_components/BrowseCategories";
import Link from "next/link";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";

export default function DashboardPage() {
  return (
    <div>
      <div className="m-4 md:m-6 mb-8">
        <Link
          href="/dashboard/search"
          className="flex items-center gap-3 border-[3px] border-foreground rounded-none p-4 bg-primary/10 hover:bg-primary/20 transition-colors shadow-[6px_6px_0px_0px_var(--foreground)] hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[8px_8px_0px_0px_var(--foreground)]"
        >
          <MagnifyingGlass className="h-6 w-6 shrink-0" weight="bold" />
          <div className="flex-1">
            <h3 className="font-bold text-sm">Search Recipes</h3>
            <p className="text-xs text-muted-foreground">
              Find recipes by name, ingredient, or category
            </p>
          </div>
          <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded-none border border-foreground/20 bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Link>
      </div>
      <BrowseCategories />
    </div>
  );
}
