import CategoriesCarousel from "@/components/CategoriesCarousel";
import { useEffect, useState } from "react";
import importIcons from "@/utils/importIcons.js";

export default function ServicesCategoriesCarouselContainer() {
  const [servicesCategories, setServicesCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await importIcons("service");
        setServicesCategories(categories);
      } catch (error) {
        console.error("Error fetching service categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return <CategoriesCarousel categories={servicesCategories} />;
}
