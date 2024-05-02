import CategoriesCarousel from "@/components/CategoriesCarousel";
import CategoryImage from "@/assets/images/categories/tools.png";
export default function ProductsCategoriesCarouselContainer() {
  const productsCategories = [
    { id: 1, title: "إلكترونيات", icon: CategoryImage },
    { id: 2, title: "أدوات بناء", icon: CategoryImage },
    { id: 3, title: "ملابس", icon: CategoryImage },
    { id: 4, title: "مستلزمات المنزل", icon: CategoryImage },
    { id: 6, title: "وغيره", icon: CategoryImage },
    { id: 7, title: "وغيراته", icon: CategoryImage },
    { id: 8, title: "item #8", icon: CategoryImage },
    { id: 9, title: "item #9", icon: CategoryImage },
  ];
  return <CategoriesCarousel categories={productsCategories} />;
}
