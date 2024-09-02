import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import HeadingSection from "@/components/HeadingSection";
import AddItemTitleForm from "@/components/AddItemTitleForm";
import UpdateItemImageForm from "@/components/UpdateItemImageForm";
import AddItemLocationForm from "@/components/AddItemLocationForm";

export default function UpdateItemPage() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the item ID from the URL parameters
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

  // Load item data on component mount
  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const response = await axios.get(
          categoryType === "product"
            ? `http://localhost:5079/api/product/${id}`
            : `http://localhost:5079/api/service/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = response.data;
        console.log(data);
        // Prepopulate form fields
        setTitle(data.title);
        setDescription(data.description);
        setCategoryId(data.categoryId);
        setRefund(data.cancellationPolicy.refund);
        setPermittedDuration(data.cancellationPolicy.permittedDuration);
        setProductCondition(data.productCondition || "");
        setQuantity(data.quantity || 1);
        setPriceMonthly(data.priceMonthly || 0);
        setPriceWeekly(data.priceWeekly || 0);
        setPriceDaily(data.priceDaily || 0);
        setAdditionalInfo(data.additionalInfo || "");
        setLocation({ lat: data.latitude, lng: data.longitude });
        const imageUrls =
          categoryType === "product"
            ? data.productImages || []
            : data.serviceImages || [];
        setImages(imageUrls);
      } catch (error) {
        console.error("Error fetching item data", error);
      }
    };

    fetchItemData();
  }, [id, categoryType]);

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

      // Add only the new images (File objects) to the form data
      images.forEach((image) => {
        if (image instanceof File) {
          formData.append("Images", image);
        }
      });

      // Optionally add existing image URLs for reference
      images.forEach((image) => {
        if (typeof image === "string") {
          // This is the URL of an existing image
          formData.append("ExistingImageUrls", image);
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

      images.forEach((image) => {
        if (image instanceof File) {
          formData.append("Images", image);
        }
      });

      images.forEach((image) => {
        if (typeof image === "string") {
          formData.append("ExistingImageUrls", image);
        }
      });
    }

    const apiEndpoint =
      categoryType === "product"
        ? `http://localhost:5079/api/product/${id}`
        : `http://localhost:5079/api/service/${id}`;

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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const formErrors = validateForm();
  //   if (Object.keys(formErrors).length > 0) {
  //     setErrors(formErrors);
  //     return;
  //   }

  //   let formData = new FormData();
  //   if (categoryType === "product") {
  //     formData.append("Title", title);
  //     formData.append("Description", description);
  //     formData.append("CategoryId", categoryId);
  //     formData.append("Refund", refund);
  //     formData.append("PermittedDuration", permittedDuration);
  //     formData.append("ProductCondition", productCondition);
  //     formData.append("Quantity", quantity);
  //     formData.append("PriceMonthly", priceMonthly);
  //     formData.append("PriceWeekly", priceWeekly);
  //     formData.append("PriceDaily", priceDaily);
  //     formData.append("AdditionalInfo", additionalInfo);
  //     formData.append("Longitude", location.lng);
  //     formData.append("Latitude", location.lat);
  //     images.forEach((image) => formData.append("Images", image));
  //   } else if (categoryType === "service") {
  //     formData.append("Title", title);
  //     formData.append("Description", description);
  //     formData.append("CategoryId", categoryId);
  //     formData.append("Refund", refund);
  //     formData.append("PermittedDuration", permittedDuration);
  //     formData.append("AdditionalInfo", additionalInfo);
  //     formData.append("Latitude", location.lat);
  //     formData.append("Longitude", location.lng);
  //     images.forEach((image) => formData.append("Images", image));
  //   }

  //   const apiEndpoint =
  //     categoryType === "product"
  //       ? `http://localhost:5079/api/product/${id}`
  //       : `http://localhost:5079/api/service/${id}`;

  //   try {
  //     const response = await axios.put(apiEndpoint, formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     });
  //     console.log("Item updated successfully", response.data);
  //     navigate(`/${categoryType}/${response.data.productId}`); // Redirect to the updated item page
  //   } catch (error) {
  //     console.error("Error updating item", error);
  //   }
  // };

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
          setCategoryType={setCategoryType}
          errors={errors}
        />
        <UpdateItemImageForm setImages={setImages} images={images} />
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

/*ver1*/
// import { useState, useEffect } from "react";
// import { Col, Form, Button, Stack, Image, CloseButton } from "react-bootstrap";
// import SectionLine from "@/components/SectionLine";

// export default function UpdateItemImageForm({ images, setImages }) {
//   const [localImages, setLocalImages] = useState([]);

//   useEffect(() => {
//     if (images && images.length > 0) {
//       setLocalImages(images);
//     }
//   }, [images]);

//   const handleChange = (e) => {
//     const files = Array.from(e.target.files);
//     setLocalImages((prevImages) => [...prevImages, ...files]);
//     setImages((prevImages) => [...prevImages, ...files]);
//   };

//   const handleDelete = (index) => {
//     const updatedLocalImages = [...localImages];
//     updatedLocalImages.splice(index, 1);
//     setLocalImages(updatedLocalImages);
//     setImages(updatedLocalImages);
//   };

//   return (
//     <>
//       <Col xs={12} sm={10} md={9} lg={8} xxl={5}>
//         <Stack className="align-items-center mb-3">
//           <h4 className="text-center">صور الإعلان</h4>
//           <SectionLine backgroundColor="bg-primary" />
//         </Stack>
//         <Form className="shadow p-4 rounded-5">
//           <Form.Group className="mb-3">
//             <Form.Label>الصور</Form.Label>
//             <Form.Control
//               type="file"
//               id="itemImagesInput"
//               multiple
//               onChange={handleChange}
//               className="border border-0 p-2"
//               style={{ backgroundColor: "#f4f9f9", display: "none" }}
//             />
//           </Form.Group>

//           {/* Image preview with delete option */}
//           <Stack
//             direction="horizontal"
//             gap={2}
//             className="flex-wrap justify-content-start"
//           >
//             {localImages.map((image, index) => (
//               <div
//                 key={index}
//                 className="border border-2 p-1 position-relative"
//                 style={{
//                   width: "100px",
//                   height: "100px",
//                 }}
//               >
//                 <Image
//                   src={
//                     typeof image === "string"
//                       ? image
//                       : URL.createObjectURL(image)
//                   }
//                   alt="Uploaded preview"
//                   fluid
//                   style={{
//                     objectFit: "cover",
//                     width: "100%",
//                     height: "100%",
//                   }}
//                 />
//                 <CloseButton
//                   onClick={() => handleDelete(index)}
//                   className="position-absolute top-0 end-0 m-1"
//                   style={{
//                     backgroundColor: "white",
//                     borderRadius: "50%",
//                   }}
//                 />
//               </div>
//             ))}
//             {/* Empty squares */}
//             {localImages.length < 6 &&
//               [...Array(6 - localImages.length)].map((_, index) => (
//                 <div
//                   key={`empty-${index}`}
//                   className="border border-2 p-1 rounded fw-normal d-flex align-items-center justify-content-center"
//                   style={{
//                     width: "100px",
//                     height: "100px",
//                     backgroundColor: "#f4f9f9",
//                     color: "gray",
//                   }}
//                 >
//                   صورة
//                 </div>
//               ))}
//           </Stack>

//           <Button
//             className="text-white mt-3"
//             onClick={() => document.getElementById("itemImagesInput").click()}
//           >
//             إضافة صور
//           </Button>
//         </Form>
//       </Col>
//     </>
//   );
// }
