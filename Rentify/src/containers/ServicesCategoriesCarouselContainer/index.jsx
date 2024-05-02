import CategoriesCarousel from "@/components/CategoriesCarousel";
import CategoryImage from "@/assets/images/categories/tools.png";
export default function ServicesCategoriesCarouselContainer() {
  const servicesCategories = [
    { id: 1, title: "مواسرجي", icon: CategoryImage },
    { id: 2, title: "عامل بناء", icon: CategoryImage },
    { id: 3, title: "كهربجي", icon: CategoryImage },
    { id: 4, title: "أستاذ", icon: CategoryImage },
    { id: 6, title: "وغيره", icon: CategoryImage },
    { id: 7, title: "وغيراته", icon: CategoryImage },
    { id: 8, title: "item #8", icon: CategoryImage },
    { id: 9, title: "item #9", icon: CategoryImage },
  ];
  return <CategoriesCarousel categories={servicesCategories} />;
}
