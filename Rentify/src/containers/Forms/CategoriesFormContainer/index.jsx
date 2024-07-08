import CategoriesForm from "@/components/Results/Forms/CategoriesForm";
import { memo, useState, useImperativeHandle, forwardRef } from "react";
import getFromUrlByKeyPrefix from "@/utils/getFromUrlByKeyPrefix.js";
function CategoriesFormContainer({}, ref) {
  const Categories = [
    "أدوات ومعدات",
    "سيارات ومركبات",
    "الإلكترونيات",
    "أجهزة إلكترونية",
    "المطبخ والمنزل",
    "معدات البستنة",
    "أدوات رياضية",
    "أدوات الحيوانات الأليفة",
    "الفنون والحرف",
    "السفر والأمتعة",
    "الكرفانات",
    "الآلات الموسيقية",
    "الحفلات والمناسبات",
    "الملابس والبدلات",
    "المعدات الطبية",
    "ألعاب الطاولة والألغاز",
    "مستلزمات التعلم",
    "الألعاب الإلكترونية",
    "المركبات المائية",
    "أثاث المنزل",
    "مستلزمات المكتب",
    "معدات البناء",
    "معدات الصيد",
    "مستلزمات التخييم",
    "مستلزمات الخياطة",
  ];
  const [selectedCategories, setSelectedCategories] = useState(
    getFromUrlByKeyPrefix("Category")
  );
  useImperativeHandle(ref, () => ({
    getData: () => selectedCategories,
  }));
  return (
    <CategoriesForm
      categories={Categories}
      selectedCategories={selectedCategories}
      setSelectedCategories={setSelectedCategories}
    />
  );
}

export default memo(forwardRef(CategoriesFormContainer));
