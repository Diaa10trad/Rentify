import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import Col from "react-bootstrap/Col";
import BookingForm from "@/components/ItemDetails/BookingForm";
import { useLocation } from "react-router-dom";
import { getToken, getSenderId } from "@/utils/AuthUtils";
function OrderPanel({
  priceDaily,
  priceWeekly,
  priceMonthly,
  title,
  createdAt,
  ownerId,
  cancellationPolicy,
}) {
  const location = useLocation();
  const pathname = location.pathname;
  const isProductPage = pathname.includes("/product");
  const foramttedCreatedAt = new Date(createdAt).toLocaleDateString();
  const token = getToken();
  const senderId = getSenderId(token);
  return (
    <Container className="" fluid>
      <Row className="gap-4">
        <Col className="">
          <h1 className="text-break">{title}</h1>
          <h6 className="text-muted">تاريخ النشر: {foramttedCreatedAt}</h6>
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
        {ownerId != senderId ? (
          <Col xs={12}>
            {isProductPage && (
              <BookingForm
                priceDaily={priceDaily}
                priceWeekly={priceWeekly}
                priceMonthly={priceMonthly}
                ownerId={ownerId}
                cancellationPolicy={cancellationPolicy}
              />
            )}

            {!isProductPage && (
              <BookingForm
                ownerId={ownerId}
                cancellationPolicy={cancellationPolicy}
              />
            )}
          </Col>
        ) : (
          ""
        )}
      </Row>
    </Container>
  );
}

export default OrderPanel;
