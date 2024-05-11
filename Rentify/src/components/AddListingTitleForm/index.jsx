import { Container, Row, Form } from "react-bootstrap";

export default function AddListingTitleForm() {
  return (
    <>
      <Container
        fluid
        className="d-flex flex-column justify-content-center align-items-center"
      >
        <h4>المعلومات العامة</h4>
        <Form
          className="shadow p-4 col-8 "
          style={{
            borderRadius: "30px",
            backgroundColor: "#f7fbfc",
          }}
        >
          <Row className="mb-3">
            <Form.Group controlId="">
              <Form.Label>عنوان الإعلان</Form.Label>
              <Form.Control placeholder="العنوان.." />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="">
            <Form.Label>الفئة</Form.Label>
            <Form.Select defaultValue="اختر فئة..">
              <option>اختر فئة..</option>
              <option>الكترونيات</option>
              <option>ملابس</option>
              <option>أخرى</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Label>الوصف</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="تفاصيل المنتج.."
              rows={3}
            />
          </Form.Group>
        </Form>
      </Container>
    </>
  );
}
