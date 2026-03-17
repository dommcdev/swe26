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

  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Fetch all recipes for the user
  const userRecipes = await db
    .select()
    .from(recipes)
    .where(eq(recipes.userId, userId));

  // Fetch all categories for the user
  const userCategories = await db
    .select()
    .from(categories)
    .where(eq(categories.userId, userId));

  // Create a map of categoryId to categoryName
  const categoryMap = new Map(userCategories.map((cat) => [cat.id, cat.name]));

  // For each recipe, fetch its ingredients
  const recipesWithDetails: RecipeWithDetails[] = await Promise.all(
    userRecipes.map(async (recipe) => {
      const recipeIngredients = await db
        .select()
        .from(ingredients)
        .where(eq(ingredients.recipeId, recipe.id));

      return {
        id: recipe.id,
        title: recipe.title,
        description: recipe.description,
        servings: recipe.servings,
        prepTimeMin: recipe.prepTimeMin,
        cookTimeMin: recipe.cookTimeMin,
        categoryId: recipe.categoryId,
        categoryName: recipe.categoryId
          ? (categoryMap.get(recipe.categoryId) ?? null)
          : null,
        ingredients: recipeIngredients.map((ing) => ({
          id: ing.id,
          name: ing.name,
          quantity: ing.quantity,
          unit: ing.unit,
        })),
        createdAt: recipe.createdAt,
        updatedAt: recipe.updatedAt,
      };
    }),
  );

  return recipesWithDetails;
}
