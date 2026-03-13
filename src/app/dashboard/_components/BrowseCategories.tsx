import CategoryCard from "./CategoryCard";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { categories } from "@/db/schema";
import { eq } from "drizzle-orm";

const { userId } = await auth();
const allCategories = await db
  .select()
  .from(categories)
  .where(eq(categories.userId, userId));

export default async function BrowseCategories() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between items-center">
        <h2>Browse Categories</h2>
        <Link href="/dashboard/categories">View all categories</Link>
      </div>
      <div className="flex flex-row gap-4">
        {allCategories.map((category) => (
          <CategoryCard key={category.id} label={category.name} />
        ))}
      </div>
    </div>
  );
}
