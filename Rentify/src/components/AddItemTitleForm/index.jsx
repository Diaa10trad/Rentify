import { useState } from "react";
import { Col, Form } from "react-bootstrap";

export default function AddItemTitleForm() {
  const [selectedType, setSelectedType] = useState("منتج");

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };
  return (
    <>
      <Col xs={12} sm={10} md={9} lg={8}>
        <h4 className="text-center mb-3">المعلومات العامة</h4>
        <Form className="shadow p-4 rounded-5 bg-white">
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
          {selectedType === "منتج" && (
            <Form.Group className="mb-3" controlId="">
              <Form.Label>الفئة</Form.Label>
              <Form.Select
                className="border border-0 p-2"
                style={{ backgroundColor: "#f4f9f9" }}
                defaultValue="اختر فئة.."
              >
                <option>اختر فئة..</option>
                <option>الكترونيات</option>
                <option>ملابس</option>
                <option>أخرى</option>
              </Form.Select>
            </Form.Group>
          )}

          {selectedType === "خدمة" && (
            <Form.Group className="mb-3" controlId="">
              <Form.Label>الفئة</Form.Label>
              <Form.Select
                className="border border-0 p-2"
                style={{ backgroundColor: "#f4f9f9" }}
                defaultValue="اختر فئة.."
              >
                <option>اختر فئة..</option>
                <option>مواسرجي</option>
                <option>كهربجي</option>
                <option>نجار</option>
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
