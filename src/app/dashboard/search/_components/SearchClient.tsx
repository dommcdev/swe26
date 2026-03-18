"use client";

import { useState, useMemo, useEffect } from "react";
import { Command } from "cmdk";
import Fuse from "fuse.js";
import { MagnifyingGlass, Hash, At } from "@phosphor-icons/react";
import { RecipeWithDetails } from "@/data/recipes";
import { useRouter } from "next/navigation";

interface SearchClientProps {
  recipes: RecipeWithDetails[];
}

export default function SearchClient({ recipes }: SearchClientProps) {
  const [search, setSearch] = useState("");
  const router = useRouter();

  // Prepare data for Fuse.js with flattened structure
  const searchableRecipes = useMemo(() => {
    return recipes.map((recipe) => ({
      id: recipe.id,
      title: recipe.title,
      description: recipe.description || "",
      categoryName: recipe.categoryName || "",
      ingredients: recipe.ingredients.map((ing) => ing.name).join(" "),
      ingredientsList: recipe.ingredients.map((ing) => ing.name),
    }));
  }, [recipes]);

  // Determine search mode based on prefix
  const searchMode = useMemo(() => {
    if (search.startsWith("@")) return "ingredient";
    if (search.startsWith("#")) return "category";
    return "all";
  }, [search]);

  // Get the actual search query (remove prefix if present)
  const searchQuery = useMemo(() => {
    if (search.startsWith("@") || search.startsWith("#")) {
      return search.slice(1);
    }
    return search;
  }, [search]);

  // Configure Fuse.js based on search mode
  const fuse = useMemo(() => {
    let keys: string[] = [];

    switch (searchMode) {
      case "ingredient":
        keys = ["ingredientsList"];
        break;
      case "category":
        keys = ["categoryName"];
        break;
      default:
        keys = ["title", "description", "categoryName", "ingredientsList"];
    }

    return new Fuse(searchableRecipes, {
      keys,
      threshold: 0.3,
      ignoreLocation: true,
      minMatchCharLength: 1,
    });
  }, [searchableRecipes, searchMode]);

  // Get filtered results
  const filteredRecipes = useMemo(() => {
    if (!searchQuery.trim()) {
      return recipes;
    }

    const fuseResults = fuse.search(searchQuery);
    return fuseResults.map((result) => {
      return recipes.find((r) => r.id === result.item.id)!;
    });
  }, [searchQuery, fuse, recipes]);

  const handleSelect = (recipeId: string) => {
    router.push(`/dashboard/recipes/${recipeId}`);
  };

  // Handle keyboard shortcut for opening search (cmd+k or ctrl+k)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        // Focus on the input
        document.querySelector<HTMLInputElement>("[cmdk-input]")?.focus();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div className="mx-auto max-w-3xl p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-black tracking-tighter">Search Recipes</h1>
        <p className="text-sm text-muted-foreground mt-2">
          Search by name, or use{" "}
          <code className="bg-muted px-1 py-0.5 rounded-none border border-foreground/20">
            @ingredient
          </code>{" "}
          or{" "}
          <code className="bg-muted px-1 py-0.5 rounded-none border border-foreground/20">
            #category
          </code>
        </p>
      </div>

      <Command
        className="border-[3px] border-foreground rounded-none shadow-[8px_8px_0px_0px_var(--foreground)] bg-background overflow-hidden"
        shouldFilter={false}
      >
        <div className="flex items-center border-b-[3px] border-foreground px-4 py-3">
          {searchMode === "ingredient" && (
            <At className="mr-2 h-5 w-5 shrink-0 text-primary" weight="bold" />
          )}
          {searchMode === "category" && (
            <Hash
              className="mr-2 h-5 w-5 shrink-0 text-primary"
              weight="bold"
            />
          )}
          {searchMode === "all" && (
            <MagnifyingGlass
              className="mr-2 h-5 w-5 shrink-0 text-muted-foreground"
              weight="bold"
            />
          )}
          <Command.Input
            value={search}
            onValueChange={setSearch}
            placeholder="Search recipes..."
            className="flex-1 bg-transparent outline-none text-sm font-medium placeholder:text-muted-foreground"
          />
          <kbd className="pointer-events-none hidden sm:inline-flex h-5 select-none items-center gap-1 rounded-none border border-foreground/20 bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            <span className="text-xs">⌘</span>K
          </kbd>
        </div>

        <Command.List className="max-h-[400px] overflow-y-auto p-2">
          {filteredRecipes.length === 0 && searchQuery && (
            <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
              No recipes found.
            </Command.Empty>
          )}

          {filteredRecipes.length === 0 && !searchQuery && (
            <div className="py-6 text-center text-sm text-muted-foreground">
              {recipes.length === 0
                ? "No recipes yet. Upload some recipes to get started!"
                : "Start typing to search..."}
            </div>
          )}

          {filteredRecipes.map((recipe) => (
            <Command.Item
              key={recipe.id}
              value={recipe.id}
              onSelect={() => handleSelect(recipe.id)}
              className="cursor-pointer rounded-none border-[2px] border-transparent hover:border-foreground hover:bg-muted/50 p-3 mb-2 transition-colors data-[selected=true]:border-primary data-[selected=true]:bg-primary/10"
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm">{recipe.title}</h3>
                  {recipe.categoryName && (
                    <span className="text-xs border border-foreground/20 px-1.5 py-0.5 rounded-none bg-muted">
                      {recipe.categoryName}
                    </span>
                  )}
                </div>
                {recipe.description && (
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {recipe.description}
                  </p>
                )}
                {recipe.ingredients.length > 0 && (
                  <p className="text-xs text-muted-foreground">
                    {recipe.ingredients.length} ingredient
                    {recipe.ingredients.length !== 1 ? "s" : ""}
                  </p>
                )}
              </div>
            </Command.Item>
          ))}
        </Command.List>
      </Command>

      {filteredRecipes.length > 0 && searchQuery && (
        <div className="mt-4 text-sm text-muted-foreground">
          Found {filteredRecipes.length} recipe
          {filteredRecipes.length !== 1 ? "s" : ""}
          {searchMode === "ingredient" && " with this ingredient"}
          {searchMode === "category" && " in this category"}
        </div>
      )}
    </div>
  );
}
