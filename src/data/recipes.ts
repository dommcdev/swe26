"use server";

import { db } from "@/db";
import { recipes, ingredients, categories } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

export type RecipeWithDetails = {
  id: string;
  title: string;
  description: string | null;
  servings: number;
  prepTimeMin: number | null;
  cookTimeMin: number | null;
  categoryId: number | null;
  categoryName: string | null;
  ingredients: Array<{
    id: number;
    name: string;
    quantity: number | null;
    unit: string | null;
  }>;
  createdAt: string;
  updatedAt: string;
};

export async function getAllUserRecipes(): Promise<RecipeWithDetails[]> {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const results = await db.query.recipes.findMany({
    where: eq(recipes.userId, userId),
    with: {
      category: true,
      ingredients: true,
    },
  });

  return results.map((recipe) => ({
    ...recipe,
    categoryName: recipe.category?.name ?? null,
  }));
}
