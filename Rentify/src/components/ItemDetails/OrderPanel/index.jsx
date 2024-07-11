import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import Col from "react-bootstrap/Col";

import BookingForm from "@/components/ItemDetails/BookingForm";
function OrderPanel() {
  return (
    <Container className="" fluid>
      <Row className="gap-4">
        <Col className="">
          <h1 className="text-break">
            Sony FX3 Cinema Line Full-frame Camera - 320GB CF Card
          </h1>
        </Col>
        <Col xs={12}>
          <Stack
            className="text-primary justify-content-between"
            direction="horizontal"
          >
            <h4>باليوم: 12</h4>
            <h4>بالأسبوع: 12</h4>
            <h4>بالشهر: 12</h4>
          </Stack>
        </Col>
        <Col xs={12}>
          <BookingForm />
        </Col>
      </Row>
    </Container>
  );
}

export default OrderPanel;
