import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function RecipesPage() {
  return (
    <div style={{ padding: 50 }}>
      {/* NAV */}
      <div style={{ display: "flex", gap: 20, marginBottom: 40 }}>
        <Link href="/">Home</Link>
        <Link href="/recipes">Recipes</Link>
      </div>

      <h1 style={{ fontSize: 28, marginBottom: 20 }}>Recipes</h1>

      <div style={{ display: "flex", gap: 10, marginBottom: 30 }}>
        <Button>+ Create Recipe</Button>
        <Button variant="outline">Import Recipe</Button>
      </div>

      {/* MOCK GRID */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
        <Card className="p-4">Garlic Butter Chicken • 25 min</Card>
        <Card className="p-4">Overnight Oats • 8 min</Card>
        <Card className="p-4">Spicy Tuna Bowl • 15 min</Card>
      </div>
    </div>
  );
}