import { Container, Form, Button } from "react-bootstrap";

export default function AddListingImageForm() {
  return (
    <>
      <Container
        fluid
        className="d-flex flex-column justify-content-center align-items-center"
      >
        <h4>صور الإعلان</h4>
        <Form
          className="shadow p-4 col-8 "
          style={{
            borderRadius: "30px",
            backgroundColor: "#f7fbfc",
          }}
        >
          <Form.Group>
            <Form.Label>الصور</Form.Label>
            <Form.Control type="file" multiple />
          </Form.Group>
          <Button className="text-white" variant="primary" type="submit">
            إضافة
          </Button>
        </Form>
      </Container>
    </>
  );
}
