import { Container, Row } from "react-bootstrap";
import NavigationBar from "@/components/NavigationBar";
import AddListingHeadingSection from "@/components/AddListingHeadingSection";
import AddListingTabs from "@/components/AddListingTabs";
import AddListingTitleForm from "../../components/AddListingTitleForm";
import Footer from "@/components/Footer";

export default function AddListingPage() {
  return (
    <>
      <NavigationBar />
      <Container fluid style={{ width: "98%" }}>
        <Row className="d-flex gap-5">
          <AddListingHeadingSection />
          <AddListingTabs />
        </Row>
      </Container>
      {/* <Footer /> */}
    </>
  );
}
