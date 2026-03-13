import Link from "next/link";

interface CategoryCardProps {
  label: string;
}

export default function CategoryCard({ label }: CategoryCardProps) {
  return (
    <Link href={`/dashboard/categories/${label}`}>
      <div className="category-card border-2 border-foreground rounded-none p-4">
        <h3>{label}</h3>
      </div>
    </Link>
  );
}
