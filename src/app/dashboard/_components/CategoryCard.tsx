import Link from "next/link";

interface CategoryCardProps {
  label: string; //name of category from db
  id: number; //id of category from db
}

export default function CategoryCard({ id, label }: CategoryCardProps) {
  return (
    <Link href={`/dashboard/categories/${id}`}>
      <div className="category-card border-2 border-foreground rounded-none p-4">
        <h3>{label}</h3>
      </div>
    </Link>
  );
}

//Right now we're using the category id in the url. We could alternatively do id-slug
