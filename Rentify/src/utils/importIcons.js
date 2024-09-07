// src/utils/importIcons.js

import axios from "axios";

const importIcons = async (categoryType) => {
  // Vite's import.meta.glob to dynamically import all .png files
  const modules = import.meta.glob(
    "../assets/images/ProductsCategoriesIcons/*.png"
  );

  // Fetch categories from the backend depending on the categoryType (product/service)
  const response = await axios.get(
    `http://localhost:5079/api/category?categoryType=${categoryType}`
  );
  const categoriesData = response.data;

  const importPromises = categoriesData.map(async (category) => {
    // Construct the icon file path based on the category ID
    const iconPath = `../assets/images/ProductsCategoriesIcons/icon_${category.id}.png`;

    // Dynamically import the icon if it exists
    if (modules[iconPath]) {
      const mod = await modules[iconPath]();
      return {
        id: category.id,
        categoryName: category.categoryName,
        icon: mod.default || "Category",
        categoryType: categoryType,
      };
    }
  });

  // Resolve all the promises to get the final icons array
  const iconsArray = await Promise.all(importPromises);

  return iconsArray;
};

export default importIcons;
