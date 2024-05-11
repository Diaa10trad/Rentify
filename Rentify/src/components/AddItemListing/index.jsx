import AddListingImageForm from "@/components/AddListingImageForm";
import AddListingTitleForm from "@/components/AddListingTitleForm";
import { Container, Row } from "react-bootstrap";

export default function AddItemListing() {
  return (
    <>
      <Container fluid>
        <Row className="gap-5">
          <AddListingTitleForm />
          <AddListingImageForm />
        </Row>
      </Container>
    </>
  );
}
