import { useState } from "react";
import { Container, Row, Col, Button, Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HeadingSection from "@/components/HeadingSection";
import AddItemTitleForm from "@/components/AddItemTitleForm";
import AddItemImageForm from "@/components/AddItemImageForm";
import AddItemLocationForm from "@/components/AddItemLocationForm";
import { getToken } from "@/utils/AuthUtils";
import ErrorPage from "@/views/ErrorPage";
export default function AddItemPage() {
  const navigate = useNavigate();
  const currentUserToken = getToken();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [refund, setRefund] = useState(0);
  const [permittedDuration, setPermittedDuration] = useState(0);
  const [productCondition, setProductCondition] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [priceMonthly, setPriceMonthly] = useState(0);
  const [priceWeekly, setPriceWeekly] = useState(0);
  const [priceDaily, setPriceDaily] = useState(0);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [categoryType, setCategoryType] = useState("product");
  const [images, setImages] = useState([]);
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const clearError = (field) => {
    setErrors((prevErrors) => ({ ...prevErrors, [field]: undefined }));
  };

  const validateForm = () => {
    let formErrors = {};

    if (!title || title.length < 5) {
      formErrors.title = "العنوان يجب أن يكون 5 أحرف على الأقل.";
    }

    if (!description || description.length < 20) {
      formErrors.description = "الوصف يجب أن يكون 20 حرفًا على الأقل.";
    }

    if (!categoryId) {
      formErrors.categoryId = "يرجى اختيار فئة.";
    }

    if (categoryType === "product") {
      if (!productCondition) {
        formErrors.productCondition = "يجب ملء حالة المنتج.";
      }

      if (quantity < 1) {
        formErrors.quantity = "الكمية يجب أن تكون 1 على الأقل.";
      }
    }

    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    let formData = new FormData();
    if (categoryType === "product") {
      formData.append("Title", title);
      formData.append("Description", description);
      formData.append("CategoryId", categoryId);
      formData.append("Refund", refund);
      formData.append("PermittedDuration", permittedDuration);
      formData.append("ProductCondition", productCondition);
      formData.append("Quantity", quantity);
      formData.append("PriceMonthly", priceMonthly);
      formData.append("PriceWeekly", priceWeekly);
      formData.append("PriceDaily", priceDaily);
      formData.append("AdditionalInfo", additionalInfo);
      formData.append("Longitude", location.lng);
      formData.append("Latitude", location.lat);
      images.forEach((image) => formData.append("Images", image));
    } else if (categoryType === "service") {
      formData.append("Title", title);
      formData.append("Description", description);
      formData.append("CategoryId", categoryId);
      formData.append("Refund", refund);
      formData.append("PermittedDuration", permittedDuration);
      formData.append("AdditionalInfo", additionalInfo);
      images.forEach((image) => formData.append("Images", image));
      formData.append("Latitude", location.lat);
      formData.append("Longitude", location.lng);
    }

    // Determine the API endpoint and ID key based on the categoryType
    const idKey = categoryType === "product" ? "productId" : "serviceId";
    const apiEndpoint =
      categoryType === "product"
        ? "http://localhost:5079/api/product"
        : "http://localhost:5079/api/service";
    try {
      const response = await axios.post(apiEndpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${currentUserToken}`,
        },
      });
      console.log("Item added successfully", response.data);
      setLoading(true);
      navigate(`/${categoryType}/${response.data[idKey]}`);
    } catch (error) {
      setLoading(false);
      console.error("Error adding item", error);
    }
  };
  if (!currentUserToken) {
    return (
      <ErrorPage
        message={
          "ليس لديك صلاحية الوصول إلى هذه الصفحة. قم بتسجيل الدخول أولا."
        }
      />
    );
  }

  if (loading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" />
      </Container>
    );
  }
  return (
    <Container fluid className="mb-5" style={{ width: "98%" }}>
      <Row
        className="flex-column align-items-center gap-5"
        as={Form}
        onSubmit={handleSubmit}
      >
        <HeadingSection title={"انشر إعلان جديد"} />
        <AddItemTitleForm
          setTitle={(value) => {
            setTitle(value);
            clearError("title");
          }}
          setDescription={(value) => {
            setDescription(value);
            clearError("description");
          }}
          setCategoryId={(value) => {
            setCategoryId(value);
            clearError("categoryId");
          }}
          setRefund={setRefund}
          setPermittedDuration={setPermittedDuration}
          setProductCondition={(value) => {
            setProductCondition(value);
            clearError("productCondition");
          }}
          setQuantity={(value) => {
            setQuantity(value);
            clearError("quantity");
          }}
          setPriceMonthly={setPriceMonthly}
          setPriceWeekly={setPriceWeekly}
          setPriceDaily={setPriceDaily}
          setAdditionalInfo={setAdditionalInfo}
          categoryType={categoryType}
          setCategoryType={setCategoryType}
          errors={errors}
        />
        <AddItemImageForm setImages={setImages} />
        <AddItemLocationForm setLocation={setLocation} />

        <Col xs={6} sm={4} md={3}>
          <Button
            className="text-white w-100 rounded-5"
            variant="primary"
            type="submit"
          >
            نشر
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
