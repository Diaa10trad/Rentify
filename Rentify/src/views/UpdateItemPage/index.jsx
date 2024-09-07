import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import HeadingSection from "@/components/HeadingSection";
import AddItemTitleForm from "@/components/AddItemTitleForm";
import UpdateItemImageForm from "@/components/UpdateItemImageForm";
import AddItemLocationForm from "@/components/AddItemLocationForm";
import { useAuth } from "@/context/AuthContext";
import ErrorPage from "../ErrorPage";

export default function UpdateItemPage() {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { itemType, id } = useParams();
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
  const [categoryType, setCategoryType] = useState(itemType);
  const [images, setImages] = useState([]);
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [errors, setErrors] = useState({});
  const [isOwner, setIsOwner] = useState(null);
  const [localImages, setLocalImages] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);
  if (!auth.token) {
    return (
      <ErrorPage message="ليس لديك صلاحية الوصول إلى هذه الصفحة. الرجاء تسجيل الدخول أولا." />
    );
  }

  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5079/api/${categoryType}/${id}`,

          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );

        const data = response.data;
        console.log(data);
        setIsOwner(data.ownerId === auth.id.replace(/"/g, ""));

        // Prepopulate form fields
        if (categoryType == "product") {
          setTitle(data.title);
          setDescription(data.description);
          setCategoryId(data.category.id);
          setRefund(data.cancellationPolicy.refund);
          setPermittedDuration(data.cancellationPolicy.permittedDuration);
          setProductCondition(data.productCondition || "");
          setQuantity(data.quantity || 1);
          setPriceMonthly(data.priceMonthly || 0);
          setPriceWeekly(data.priceWeekly || 0);
          setPriceDaily(data.priceDaily || 0);
          setAdditionalInfo(data.additionalInfo || "");
          setLocation({
            lat: data.location.latitude,
            lng: data.location.longitude,
          });
          const imageUrls = data.productImages || [];

          setImages(imageUrls);
        }
        if (categoryType == "service") {
          setTitle(data.title);
          setDescription(data.description);
          setCategoryId(data.category.id);
          setRefund(data.cancellationPolicy.refund);
          setPermittedDuration(data.cancellationPolicy.permittedDuration);
          setAdditionalInfo(data.additionalInfo || "");
          setLocation({
            lat: data.location.latitude,
            lng: data.location.longitude,
          });
          const imageUrls = data.serviceImages || [];

          setImages(imageUrls);
        }
      } catch (error) {
        console.error("Error fetching item data", error);
      }
    };

    fetchItemData();
  }, [id, auth.token, categoryType, auth.id]);

  if (isOwner === false) {
    return (
      <ErrorPage message="ليس لديك صلاحية الوصول إلى هذه الصفحة. لا يمكنك تعديل إعلان لا ينتمي إليك" />
    );
  }

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

      // deleted images
      if (deletedImages.length > 0) {
        deletedImages.forEach(({ publicId }) =>
          formData.append("DeletedImages", publicId)
        );
      }

      // new images
      localImages.forEach((image) => {
        if (typeof image !== "string") {
          formData.append("NewImages", image);
        }
      });
    } else if (categoryType === "service") {
      formData.append("Title", title);
      formData.append("Description", description);
      formData.append("CategoryId", categoryId);
      formData.append("Refund", refund);
      formData.append("PermittedDuration", permittedDuration);
      formData.append("AdditionalInfo", additionalInfo);
      formData.append("Latitude", location.lat);
      formData.append("Longitude", location.lng);

      // Handle the deleted images
      if (deletedImages.length > 0) {
        deletedImages.forEach(({ publicId }) =>
          formData.append("DeletedImages", publicId)
        );
      }

      // Append new images
      localImages.forEach((image) => {
        if (typeof image !== "string") {
          formData.append("Images", image);
        }
      });
    }

    const apiEndpoint = `http://localhost:5079/api/${categoryType}/${id}`;

    try {
      const response = await axios.put(apiEndpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("Item updated successfully", response.data);
      navigate(`/${categoryType}/${response.data.productId}`);
    } catch (error) {
      console.error("Error updating item", error);
    }
  };

  return (
    <Container fluid className="mb-5" style={{ width: "98%" }}>
      <Row
        className="flex-column align-items-center gap-5"
        as={Form}
        onSubmit={handleSubmit}
      >
        <HeadingSection title={"تحديث الإعلان"} />
        <AddItemTitleForm
          title={title}
          description={description}
          categoryId={categoryId}
          refund={refund}
          permittedDuration={permittedDuration}
          productCondition={productCondition}
          quantity={quantity}
          priceMonthly={priceMonthly}
          priceWeekly={priceWeekly}
          priceDaily={priceDaily}
          additionalInfo={additionalInfo}
          categoryType={categoryType}
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
          setCategoryType={setCategoryType}
          errors={errors}
          isReadOnly={true}
        />
        <UpdateItemImageForm
          setImages={setImages}
          images={images}
          setLocalImages={setLocalImages}
          localImages={localImages}
          deletedImages={deletedImages}
          setDeletedImages={setDeletedImages}
        />
        <AddItemLocationForm setLocation={setLocation} location={location} />
        <Col xs={6} sm={4} md={3}>
          <Button
            className="text-white w-100 rounded-5"
            variant="primary"
            type="submit"
          >
            تحديث
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
