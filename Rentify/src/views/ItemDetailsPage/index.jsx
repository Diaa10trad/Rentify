import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InfoRowList from "@/components/ItemDetails/InfoRowList";
import ItemDescription from "@/components/ItemDetails/ItemDescription";
import HeadingSection from "@/components/HeadingSection";
import ImagesCarousel from "@/components/ItemDetails/ImagesCarousel";
import OrderPanel from "@/components/ItemDetails/OrderPanel";
import ReviewList from "@/components/ItemDetails/ReviewList";

function ItemDetailsPage() {
  return (
    <Container
      className="rounded-top-5"
      style={{ backgroundColor: "#f0f0f0" }}
      fluid
    >
      <Row className="mb-3">
        <HeadingSection title={"تفاصيل الإعلان"} />
      </Row>
      <Row className="p-3">
        <Col xs={7} className="">
          <ImagesCarousel />
        </Col>
        <Col xs={5} className="">
          <OrderPanel />
        </Col>
      </Row>
      <Row className="p-3">
        <Col>
          <ItemDescription />
        </Col>
        <Col xs={5} className="">
          <InfoRowList />
        </Col>
      </Row>
      <Row className="p-3">
        <Col>
          <ReviewList />
        </Col>
      </Row>
    </Container>
  );
}

export default ItemDetailsPage;
