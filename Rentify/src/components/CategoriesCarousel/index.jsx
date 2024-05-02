import Carousel from "react-elastic-carousel";
import CategoryCard from "@/components/CategoryCard";
import "./styles.css";
export default function CategoriesCarousel({ categories }) {
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 3 },
    { width: 850, itemsToShow: 3 },
    { width: 1150, itemsToShow: 3 },
    { width: 1450, itemsToShow: 4 },
    { width: 1750, itemsToShow: 5 },
  ];
  return (
    <Carousel pagination={false} breakPoints={breakPoints} isRTL={true}>
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </Carousel>
  );
}
