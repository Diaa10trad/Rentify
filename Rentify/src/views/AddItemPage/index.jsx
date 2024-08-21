import { Container, Row, Col, Button } from "react-bootstrap";
import HeadingSection from "@/components/HeadingSection";
import AddItemTitleForm from "@/components/AddItemTitleForm";
import AddItemImageForm from "@/components/AddItemImageForm";
import AddItemCheckboxForm from "@/components/AddItemCheckboxForm";
import AddItemLocationForm from "@/components/AddItemLocationForm";

export default function AddItemPage() {
  //setFormState عشان تخزين الداتا
  return (
    <>
      <Container fluid className="mb-5" style={{ width: "98%" }}>
        <Row className="flex-column align-items-center gap-5">
          <HeadingSection title={"انشر إعلان جديد"} />
          <AddItemTitleForm />
          <AddItemImageForm />
          <AddItemCheckboxForm />
          <AddItemLocationForm />
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
    </>
  );
}
