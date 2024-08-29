import { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HeadingSection from "@/components/HeadingSection";
import AddItemTitleForm from "@/components/AddItemTitleForm";
import AddItemImageForm from "@/components/AddItemImageForm";
import AddItemLocationForm from "@/components/AddItemLocationForm";
export default function AddItemPage() {
  const navigate = useNavigate();
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
  const [images, setImages] = useState([]); // const [longitude, setLongitude] = useState("34.44"); // const [latitude, setLatitude] = useState("54.33");
  const [location, setLocation] = useState({ lat: null, lng: null });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    if (categoryType === "product") {
      console.log(location.lat);
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
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("Item added successfully", response.data);
      navigate(`/${categoryType}/${response.data[idKey]}`);
    } catch (error) {
      console.error("Error adding item", error);
    }
  };

  return (
    <Container fluid className="mb-5" style={{ width: "98%" }}>
      <Row
        className="flex-column align-items-center gap-5"
        as={Form}
        onSubmit={handleSubmit}
      >
        <HeadingSection title={"انشر إعلان جديد"} />
        <AddItemTitleForm
          setTitle={setTitle}
          setDescription={setDescription}
          setCategoryId={setCategoryId}
          setRefund={setRefund}
          setPermittedDuration={setPermittedDuration}
          setProductCondition={setProductCondition}
          setQuantity={setQuantity}
          setPriceMonthly={setPriceMonthly}
          setPriceWeekly={setPriceWeekly}
          setPriceDaily={setPriceDaily}
          setAdditionalInfo={setAdditionalInfo}
          categoryType={categoryType}
          setCategoryType={setCategoryType}
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
