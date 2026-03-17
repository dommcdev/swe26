import { auth } from "@clerk/nextjs/server";
import { getAllUserRecipes } from "@/data/recipes";
import SearchClient from "./_components/SearchClient";

export default async function SearchPage() {
  const { userId } = await auth();

  if (!userId) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Please sign in</h1>
          <p className="text-muted-foreground">
            You need to be signed in to search recipes.
          </p>
        </div>
      </div>
    );
  }

  const recipes = await getAllUserRecipes();

  return <SearchClient recipes={recipes} />;
}
