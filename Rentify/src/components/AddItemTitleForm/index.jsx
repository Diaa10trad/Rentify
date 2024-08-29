import { useState, useEffect } from "react";
import { Col, Form, Stack } from "react-bootstrap";
import SectionLine from "@/components/SectionLine";
import axios from "axios";

export default function AddItemTitleForm({
  setTitle,
  setCategoryId,
  categoryType,
  setCategoryType,
  setDescription,
  setAdditionalInfo,
  setRefund,
  setPermittedDuration,
  setProductCondition,
  setQuantity,
  setPriceMonthly,
  setPriceWeekly,
  setPriceDaily,
}) {
  const [categories, setCategories] = useState([]);

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5079/api/category?categoryType=${categoryType}`
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [categoryType]);

  const handleCategoryTypeChange = (e) => {
    const type = e.target.value;
    type == "منتج" ? setCategoryType("product") : setCategoryType("service");
  };

  return (
    <Col xs={12} sm={10} md={9} lg={8}>
      <Stack className="align-items-center mb-3">
        <h4 className="text-center">المعلومات العامة</h4>
        <SectionLine backgroundColor="bg-primary" />
      </Stack>
      <Form className="shadow p-4 rounded-5">
        {/* Title */}
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>عنوان الإعلان</Form.Label>
          <Form.Control
            placeholder="العنوان"
            className="border border-0 p-2"
            style={{ backgroundColor: "#f4f9f9" }}
            onChange={(e) => setTitle(e.target.value)} // Pass title to parent
            required
            maxLength={100}
            minLength={5}
          />
        </Form.Group>

        {/* Type */}
        <Form.Group className="mb-3" controlId="type">
          <Form.Label>نوع الإعلان</Form.Label>
          <Form.Select
            onChange={handleCategoryTypeChange}
            className="border border-0 p-2"
            style={{ backgroundColor: "#f4f9f9" }}
            defaultValue="منتج"
          >
            <option>منتج</option>
            <option>خدمة</option>
          </Form.Select>
        </Form.Group>

        {/* Category */}
        {categories.length > 0 && (
          <Form.Group className="mb-3" controlId="category">
            <Form.Label>الفئة</Form.Label>
            <Form.Select
              className="border border-0 p-2"
              style={{ backgroundColor: "#f4f9f9" }}
              onChange={(e) => setCategoryId(e.target.value)} // Pass categoryId to parent
              required
            >
              <option value="">اختر فئة...</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.categoryName}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        )}
        {/* Description */}
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>الوصف</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="تفاصيل المنتج.."
            className="border border-0 p-2"
            style={{ backgroundColor: "#f4f9f9" }}
            rows={3}
            onChange={(e) => setDescription(e.target.value)} // Pass description to parent
            required
            maxLength={1000}
            minLength={20}
          />
        </Form.Group>

        {/* Additional Information */}
        <Form.Group className="mb-3" controlId="additionalInfo">
          <Form.Label>معلومات إضافية</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="معلومات إضافية..."
            className="border border-0 p-2"
            style={{ backgroundColor: "#f4f9f9" }}
            rows={2}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            maxLength={500}
          />
        </Form.Group>
        <Stack className="flex-row justify-content-between">
          {/* Permitted Duration */}
          <Form.Group
            as={Col}
            xs={6}
            className="mb-3"
            controlId="permittedDuration"
          >
            <Form.Label>فترة الإلغاء المسموحة</Form.Label>
            <Form.Control
              type="number"
              placeholder="بالساعات"
              className="border border-0 p-2"
              style={{ backgroundColor: "#f4f9f9", textAlign: "right" }}
              onChange={(e) => setPermittedDuration(e.target.value)}
              required
              min={0}
            />
          </Form.Group>
          {/* Refund */}
          <Form.Group as={Col} xs={5} className="mb-3" controlId="refund">
            <Form.Label>نسبة المبلغ المسترجع</Form.Label>
            <Form.Control
              type="number"
              placeholder="0 - 100"
              className="border border-0 p-2"
              style={{ backgroundColor: "#f4f9f9", textAlign: "right" }}
              onChange={(e) => setRefund(e.target.value)}
              required
              min={0}
              max={100}
            />
          </Form.Group>
        </Stack>

        {categoryType == "product" ? (
          <>
            {/* Product Condition */}
            <Form.Group className="mb-3" controlId="productCondition">
              <Form.Label>حالة المنتج</Form.Label>
              <Form.Control
                placeholder="حالة المنتج..."
                className="border border-0 p-2"
                style={{ backgroundColor: "#f4f9f9" }}
                onChange={(e) => setProductCondition(e.target.value)}
                required
                maxLength={50}
              />
            </Form.Group>

            {/* Quantity */}
            <Form.Group className="mb-3" controlId="quantity">
              <Form.Label>الكمية</Form.Label>
              <Form.Control
                type="number"
                placeholder="الكمية"
                className="border border-0 p-2"
                style={{ backgroundColor: "#f4f9f9", textAlign: "right" }}
                onChange={(e) => setQuantity(e.target.value)}
                required
                min={1}
              />
            </Form.Group>
            <Stack className="flex-row justify-content-between">
              {/* Prices */}

              <Form.Group
                as={Col}
                xs={4}
                className="mb-3"
                controlId="priceDaily"
              >
                <Form.Label>السعر اليومي</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="بالدينار"
                  className="border border-0 p-2"
                  style={{ backgroundColor: "#f4f9f9", textAlign: "right" }}
                  onChange={(e) => setPriceDaily(e.target.value)}
                  min={0}
                />
              </Form.Group>

              <Form.Group
                as={Col}
                xs={4}
                className="mb-3"
                controlId="priceWeekly"
              >
                <Form.Label>السعر الأسبوعي</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="بالدينار"
                  className="border border-0 p-2"
                  style={{ backgroundColor: "#f4f9f9", textAlign: "right" }}
                  onChange={(e) => setPriceWeekly(e.target.value)}
                  min={0}
                />
              </Form.Group>

              <Form.Group
                as={Col}
                xs={3}
                className="mb-3"
                controlId="priceMonthly"
              >
                <Form.Label>السعر الشهري</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="بالدينار"
                  className="border border-0 p-2"
                  style={{ backgroundColor: "#f4f9f9", textAlign: "right" }}
                  onChange={(e) => setPriceMonthly(e.target.value)}
                  min={0}
                />
              </Form.Group>
            </Stack>
          </>
        ) : null}
      </Form>
    </Col>
  );
}
