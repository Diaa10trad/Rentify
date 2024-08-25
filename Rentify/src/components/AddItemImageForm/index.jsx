import { Col, Form, Button, Stack } from "react-bootstrap";
import SectionLine from "@/components/SectionLine";
export default function AddItemImageForm() {
  const handleChange = (e) => {
    console.log(e.target.files);
  };
  return (
    <>
      <Col xs={12} sm={10} md={9} lg={8}>
        <Stack className="align-items-center mb-3">
          <h4 className="text-center">صور الإعلان</h4>
          <SectionLine backgroundColor="bg-primary" />
        </Stack>
        <Form className="shadow p-4 rounded-5">
          <Form.Group className="mb-3">
            <Form.Label>الصور</Form.Label>
            <Form.Control
              type="file"
              multiple
              onChange={handleChange}
              className="border border-0 p-2"
              style={{ backgroundColor: "#f4f9f9" }}
            />
          </Form.Group>
          <Button className="text-white" type="submit">
            إضافة
          </Button>
        </Form>
      </Col>
    </>
  );
}
