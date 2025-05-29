import { cn } from "~/lib/utils";

interface CategoryBadgeProps {
  category: string;
  className?: string;
}

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Жестко":
        return "bg-red-500 text-white";
      case "Невероятно":
        return "bg-gradient-to-r from-red-600 to-black text-white";
      case "Не думая":
        return "bg-purple-500 text-white";
      case "Слабо":
        return "bg-green-500 text-white";
      case "Среднее":
        return "bg-orange-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <span
      className={cn(
        `
          inline-flex items-center rounded-full px-2.5 py-0.5 text-xs
          font-medium
        `,
        getCategoryColor(category),
        className
      )}
    >
      {category}
    </span>
  );
}
