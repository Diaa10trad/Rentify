import { useState } from "react";
import { Col, Form, Stack } from "react-bootstrap";
import SectionLine from "@/components/SectionLine";

export default function AddItemTitleForm() {
  const [selectedType, setSelectedType] = useState("منتج");

  const categories = [
    {
      id: 1,
      type: "منتج",
      category: ["اختر فئة...", "الكترونيات", "ملابس", "أدوات بناء", "أخرى"],
    },

    {
      id: 2,
      type: "خدمة",
      category: ["اختر فئة...", "مواسرجي", "نجار", "فني كهرباء", "أخرى"],
    },
  ];

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const selectedTypeObj = categories.find(
    (categories) => categories.type === selectedType
  );
  return (
    <>
      <Col xs={12} sm={10} md={9} lg={8}>
        <Stack className="align-items-center mb-3">
          <h4 className="text-center">المعلومات العامة</h4>
          <SectionLine backgroundColor="bg-primary" />
        </Stack>
        <Form className="shadow p-4 rounded-5">
          <Form.Group className="mb-3" controlId="">
            <Form.Label>عنوان الإعلان</Form.Label>
            <Form.Control
              placeholder="العنوان"
              className="border border-0 p-2"
              style={{ backgroundColor: "#f4f9f9" }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="">
            <Form.Label>نوع الإعلان</Form.Label>
            <Form.Select
              onChange={handleTypeChange}
              className="border border-0 p-2"
              style={{ backgroundColor: "#f4f9f9" }}
              defaultValue="منتج"
            >
              <option>منتج</option>
              <option>خدمة</option>
            </Form.Select>
          </Form.Group>
          {selectedTypeObj && (
            <Form.Group className="mb-3" controlId="">
              <Form.Label>الفئة</Form.Label>
              <Form.Select
                className="border border-0 p-2"
                style={{ backgroundColor: "#f4f9f9" }}
                defaultValue="اختر فئة.."
              >
                {selectedTypeObj.category.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </Form.Select>
            </Form.Group>
          )}

          <Form.Group controlId="">
            <Form.Label>الوصف</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="تفاصيل المنتج.."
              className="border border-0 p-2"
              style={{ backgroundColor: "#f4f9f9" }}
              rows={3}
            />
          </Form.Group>
        </Form>
      </Col>
    </>
  );
}
