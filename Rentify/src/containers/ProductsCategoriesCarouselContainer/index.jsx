import CategoriesCarousel from "@/components/CategoriesCarousel";
import importIcons from "@/utils/importIcons.js";
import { useEffect, useState } from "react";
export default function ProductsCategoriesCarouselContainer() {
  const [productsCategories, setproductsCategories] = useState([]);

  useEffect(() => {
    const fetchIcons = async () => {
      const importedIcons = await importIcons();
      setproductsCategories(importedIcons);
    };

    fetchIcons();
  }, []);
  return <CategoriesCarousel categories={productsCategories} />;
}
