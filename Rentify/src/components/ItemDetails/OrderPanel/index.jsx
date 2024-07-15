import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import Col from "react-bootstrap/Col";
import BookingForm from "@/components/ItemDetails/BookingForm";
import { useLocation } from "react-router-dom";
function OrderPanel() {
  const location = useLocation();
  const pathname = location.pathname;
  const isProductPage = pathname.includes("/Product");
  const priceDaily = 12;
  const priceWeekly = 34;
  const priceMonthly = 133;
  return (
    <Container className="" fluid>
      <Row className="gap-4">
        <Col className="">
          <h1 className="text-break">
            Sony FX3 Cinema Line Full-frame Camera - 320GB CF Card
          </h1>
          <h6 className="text-muted">تاريخ النشر: 2024-10-3</h6>
        </Col>
        <Col xs={12}>
          {isProductPage && (
            <Stack
              className="text-primary justify-content-between"
              direction="horizontal"
            >
              <h5>باليوم: {priceDaily}</h5>
              <h5>بالأسبوع: {priceWeekly}</h5>
              <h5>بالشهر: {priceMonthly}</h5>
            </Stack>
          )}

          {!isProductPage && (
            <h5 className="text-primary">السعر بالاتفاق مع المعلن</h5>
          )}
        </Col>
        <Col xs={12}>
          {isProductPage && (
            <BookingForm
              priceDaily={priceDaily}
              priceWeekly={priceWeekly}
              priceMonthly={priceMonthly}
            />
          )}

          {!isProductPage && <BookingForm />}
        </Col>
      </Row>
    </Container>
  );
}

export default OrderPanel;
