import { db } from "@/db"; // Adjust path to your db instance
import { categories, recipes, ingredients, instructions } from "@/db/schema";

async function main() {
  // You will need to change this to be your clerk user id.
  const USER_ID = "user_id";

  console.log("Seed started...");

  // 1. Create Categories
  const [breakfast, dinner] = await db
    .insert(categories)
    .values([
      { name: "Breakfast", userId: USER_ID },
      { name: "Dinner", userId: USER_ID },
      { name: "Desserts", userId: USER_ID },
    ])
    .returning();

  // 2. Create a Recipe (Pancakes)
  const [pancakeRecipe] = await db
    .insert(recipes)
    .values([
      {
        userId: USER_ID,
        title: "Fluffy Pancakes",
        description: "The best Sunday morning breakfast.",
        servings: 4,
        prepTimeMin: 10,
        cookTimeMin: 15,
        categoryId: breakfast.id,
      },
    ])
    .returning();

  // 3. Add Ingredients for Pancakes
  await db.insert(ingredients).values([
    { recipeId: pancakeRecipe.id, name: "Flour", quantity: 1.5, unit: "cups" },
    { recipeId: pancakeRecipe.id, name: "Milk", quantity: 1.25, unit: "cups" },
    { recipeId: pancakeRecipe.id, name: "Egg", quantity: 1, unit: "large" },
  ]);

  // 4. Add Instructions for Pancakes
  await db.insert(instructions).values([
    {
      recipeId: pancakeRecipe.id,
      stepNumber: 1,
      text: "Whisk dry ingredients together.",
    },
    {
      recipeId: pancakeRecipe.id,
      stepNumber: 2,
      text: "Add wet ingredients and mix until just combined.",
    },
    {
      recipeId: pancakeRecipe.id,
      stepNumber: 3,
      text: "Cook on a hot griddle until bubbly.",
    },
  ]);

  console.log("Seed finished successfully!");
}

main().catch((err) => {
  console.error("Seed failed!");
  console.error(err);
  process.exit(1);
});
