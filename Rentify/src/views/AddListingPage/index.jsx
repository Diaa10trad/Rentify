import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import AddListingTitle from "@/components/AddListingTitle";
import { Container, Row } from "react-bootstrap";
export default function AddListingPage() {
  return (
    <>
      <NavigationBar />
      <Container fluid style={{ width: "98%" }}>
        <Row className="gap-5">
          <AddListingTitle />
        </Row>
      </Container>
      {/* <Footer /> */}
    </>
  );
}
