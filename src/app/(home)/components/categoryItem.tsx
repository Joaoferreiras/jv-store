import { Badge } from "@/components/ui/badge";
import { CATEGORY_ICON } from "@/constants/categoryIcons";
import { Category } from "@prisma/client";
interface CategoryItemProps {
  category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <Badge
      variant="outline"
      className="flex items-center justify-center py-3 gap-2 rounded-lg"
    >
      {CATEGORY_ICON[category.slug as keyof typeof CATEGORY_ICON]}
      <span className="text-xs font-bold">{category.name}</span>
    </Badge>
  );
};
export default CategoryItem;
