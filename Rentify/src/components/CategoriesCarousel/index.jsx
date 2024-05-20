import Carousel from "react-elastic-carousel";
import CategoryCard from "@/components/cards/CategoryCard";
import "./styles.css";
export default function CategoriesCarousel({ categories }) {
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 387, itemsToShow: 2 },
    { width: 600, itemsToShow: 3 },
    { width: 850, itemsToShow: 4 },
    { width: 1150, itemsToShow: 4 },
    { width: 1450, itemsToShow: 4 },
  ];
  return (
    <Carousel pagination={false} breakPoints={breakPoints} isRTL={true}>
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </Carousel>
  );
}
