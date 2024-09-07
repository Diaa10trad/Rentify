import CategoriesForm from "@/components/Results/Forms/CategoriesForm";
import axios from "axios";
import { Container, Spinner } from "react-bootstrap";
import {
  memo,
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
} from "react";
import getFromUrlByKeyPrefix from "@/utils/getFromUrlByKeyPrefix.js";
import getOneFromUrl from "@/utils/getOneFromUrl.js";
function CategoriesFormContainer({}, ref) {
  const [loading, setLoading] = useState(true);
  const [productCategories, setProductCategories] = useState([]);
  const [serviceCategories, setServiceCategories] = useState([]);
  const type = getOneFromUrl("type");
  useEffect(() => {
    // Replace with your actual API endpoint
    const apiUrl = `http://localhost:5079/api/category`;

    // Replace with your actual JWT token
    const token = localStorage.getItem("token");
    // Make the GET request with the Authorization header
    axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          categoryType: type, // Set query parameter here
        },
      })
      .then((response) => {
        if (type == "service") setServiceCategories(response.data);
        else if (type == "product") setProductCategories(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
      });
  }, [type]);
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

  console.log(productCategories);
  console.log(serviceCategories);
  const [selectedCategories, setSelectedCategories] = useState(
    getFromUrlByKeyPrefix("Category")
  );
  useImperativeHandle(ref, () => ({
    getData: () => selectedCategories,
  }));
  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center">
        <Spinner animation="border" />
      </Container>
    );
  }
  return (
    <CategoriesForm
      categories={type == "service" ? serviceCategories : productCategories}
      selectedCategories={selectedCategories}
      setSelectedCategories={setSelectedCategories}
    />
  );
}

export default memo(forwardRef(CategoriesFormContainer));
