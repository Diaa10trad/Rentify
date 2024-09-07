import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import Col from "react-bootstrap/Col";
import BookingForm from "@/components/ItemDetails/BookingForm";
import { useLocation, useNavigate } from "react-router-dom";
import { getToken, getSenderId } from "@/utils/AuthUtils";
function OrderPanel({
  priceDaily,
  priceWeekly,
  priceMonthly,
  title,
  createdAt,
  ownerId,
  cancellationPolicy,
  categoryType,
  productId,
  serviceId,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const isProductPage = pathname.includes("/product");
  const foramttedCreatedAt = new Date(createdAt).toLocaleDateString();
  const token = getToken();
  const senderId = getSenderId(token);

  const handleUpdateClick = () => {
    // Redirect to the UpdateItemPage based on the item type
    const itemType = categoryType;
    const itemId = itemType === "product" ? productId : serviceId;
    navigate(`/update/${itemType}/${itemId}`);
  };
  return (
    <Container className="" fluid>
      <Row className="gap-4">
        <Col className="">
          <h1 className="text-break">{title}</h1>
          <h6 className="text-muted">تاريخ النشر: {foramttedCreatedAt}</h6>
          {ownerId == senderId && (
            <button
              onClick={handleUpdateClick}
              className="btn btn-success mt-3 text-white col-12 rounded-pill"
            >
              تحديث الإعلان
            </button>
          )}
        </Col>
        <Col xs={12}>
          {isProductPage && (
            <Stack
              className="text-primary justify-content-between"
              direction="horizontal"
            >
              <h5>باليوم: {priceDaily} د.أ</h5>
              <h5>بالأسبوع: {priceWeekly} د.أ</h5>
              <h5>بالشهر: {priceMonthly} د.أ</h5>
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
