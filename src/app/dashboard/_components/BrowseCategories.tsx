import CategoryCard from "./CategoryCard";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { categories } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function BrowseCategories() {
  const { userId } = await auth();

  if (!userId) {
    return <div>Please sign in to view categories.</div>;
  }

  const allCategories = await db
    .select()
    .from(categories)
    .where(eq(categories.userId, userId));

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-xl font-bold">Browse Categories</h2>
        <Link
          href="/dashboard/categories"
          className="text-blue-500 hover:underline"
        >
          View all categories
        </Link>
      </div>

      <div className="flex flex-row flex-wrap gap-4">
        {allCategories.length > 0 ? (
          allCategories.map((category) => (
            <CategoryCard
              key={category.id}
              label={category.name}
              id={category.id}
            />
          ))
        ) : (
          <p>No categories found. Create one to get started!</p>
        )}
      </div>
    </div>
  );
}
