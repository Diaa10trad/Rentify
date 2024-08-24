import CategoriesCarousel from "@/components/CategoriesCarousel";
import importIcons from "@/utils/importIcons.js";
import { useEffect, useState } from "react";

export default function ProductsCategoriesCarouselContainer() {
  const [productsCategories, setProductsCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await importIcons("product");
        setProductsCategories(categories);
      } catch (error) {
        console.error("Error fetching product categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return <CategoriesCarousel categories={productsCategories} />;
}
