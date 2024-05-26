// src/utils/importIcons.js

const categoryMapping = {
  icon_1: "أدوات ومعدات",
  icon_2: "السيارات",
  icon_3: "الإلكترونيات",
  icon_4: "أجهزة إلكترونية",
  icon_5: "المطبخ والمنزل",
  icon_6: "معدات البستنة",
  icon_7: "أدوات رياضية",
  icon_8: "أدوات الحيوانات الأليفة",
  icon_9: "الفنون والحرف",
  icon_10: "السفر والأمتعة",
  icon_11: "الكرفانات",
  icon_12: "الآلات الموسيقية",
  icon_13: "الحفلات والمناسبات",
  icon_14: "الملابس والبدلات",
  icon_15: "المعدات الطبية",
  icon_16: "ألعاب الطاولة والألغاز",
  icon_17: "مستلزمات التعلم",
  icon_18: "الألعاب الإلكترونية",
  icon_19: "المركبات المائية",
  icon_20: "أثاث المنزل",
  icon_21: "مستلزمات المكتب",
  icon_22: "معدات البناء",
  icon_23: "معدات الصيد",
  icon_24: "مستلزمات التخييم",
  icon_25: "مستلزمات الخياطة",
};

const importIcons = async () => {
  // Vite's import.meta.glob to dynamically import all .png files
  const modules = import.meta.glob(
    "../assets/images/ProductsCategoriesIcons/*.png"
  );

  const importPromises = Object.keys(modules).map(async (path, index) => {
    const mod = await modules[path]();
    const fileName = path.split("/").pop().replace(".png", "");
    const title = categoryMapping[fileName];

    return {
      id: index + 1,
      title: title || fileName, // Use fileName if no mapping is found
      icon: mod.default,
    };
  });

  // Resolve all the promises to get the final icons array
  const iconsArray = await Promise.all(importPromises);
  return iconsArray;
};

export default importIcons;
