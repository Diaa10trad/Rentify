import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  ListGroupItem,
  Spinner,
  Alert,
  Button,
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { getToken } from "@/utils/AuthUtils";
import axios from "axios";
import ErrorPage from "@/views/ErrorPage"; // Import the error page

function CompleteBookingPage() {
  const { itemType, bookingId } = useParams();
  const navigate = useNavigate();

  const token = getToken();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [unauthorized, setUnauthorized] = useState(false);

  // Fetch booking details from API
  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5079/api/booking-${itemType}/renter/${bookingId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.status !== "pending") {
          setUnauthorized(true);
        } else {
          setBooking(response.data);
        }
      } catch (err) {
        console.error(err);
        setError("تعذر الحصول على تفاصيل الحجز. يرجى المحاولة مرة أخرى.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [itemType, bookingId, token]);
  const handleBooking = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      // API call to book the item
      await axios.put(
        `http://localhost:5079/api/booking-${itemType}/${bookingId}/book`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess("تم الحجز بنجاح!");
    } catch (err) {
      console.error(err);
      setError("فشل إتمام الحجز. يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  if (unauthorized) {
    return (
      <ErrorPage message="لا يمكنك الوصول إلى هذه الصفحة لأن الحجز قد تم بالفعل." />
    );
  }

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="shadow">
            <Card.Header as="h4" className="text-center bg-primary text-white">
              تفاصيل الحجز
            </Card.Header>
            <Card.Body>
              {/* Booking Information */}
              <ListGroup className="mb-4">
                <ListGroupItem>
                  <strong>رقم الحجز:</strong> {booking.bookingId}
                </ListGroupItem>
                <ListGroupItem>
                  <strong>اسم المستأجر:</strong> {booking.renter.firstName}{" "}
                  {booking.renter.lastName}
                </ListGroupItem>
                <ListGroupItem>
                  <strong>اسم المالك:</strong> {booking.owner.firstName}{" "}
                  {booking.owner.lastName}
                </ListGroupItem>
                <ListGroupItem>
                  <strong>المنتج:</strong> {booking.product.title}
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>
                      <strong>بداية الاستئجار:</strong>{" "}
                      {new Date(booking.startDate).toLocaleDateString()}
                    </Col>
                    <Col>
                      <strong>نهاية الاستئجار:</strong>{" "}
                      {new Date(booking.endDate).toLocaleDateString()}
                    </Col>
                  </Row>
                </ListGroupItem>
              </ListGroup>

              {/* Price Breakdown */}
              <Card className="mb-4">
                <Card.Header as="h5">السعر التفصيلي</Card.Header>
                <ListGroup variant="flush">
                  <ListGroupItem>
                    المجموع الفرعي: {booking.finalPrice} دينار أردني
                  </ListGroupItem>
                  <ListGroupItem>
                    رسوم الخدمة (5%): {booking.finalPrice * 0.05} دينار أردني
                  </ListGroupItem>

                  <ListGroupItem>
                    <strong>المجموع الكلي:</strong>
                    {booking.finalPrice + booking.finalPrice * 0.05} دينار أردني
                  </ListGroupItem>
                </ListGroup>
              </Card>

              {/* Additional Information */}
              {booking.additionalInfo && (
                <Card className="mb-4">
                  <Card.Header as="h5">معلومات إضافية</Card.Header>
                  <Card.Body>
                    <p>{booking.additionalInfo}</p>
                  </Card.Body>
                </Card>
              )}

              {/* Cancellation Policy */}
              <Card className="mb-4">
                <Card.Header as="h5">سياسة الإلغاء</Card.Header>
                <ListGroup variant="flush">
                  <ListGroupItem>
                    <strong>نسبة المبلغ المسترجع:</strong>{" "}
                    {booking.cancellationPolicy.refund}%
                  </ListGroupItem>
                  <ListGroupItem>
                    <strong>فترة الإلغاء المسموحة:</strong> الإلغاء مسموح به قبل{" "}
                    {booking.cancellationPolicy.permittedDuration} ساعة من موعد
                    البدء.
                  </ListGroupItem>
                </ListGroup>
              </Card>

              {/* Payment Method */}
              <Card>
                <Card.Header as="h5">طريقة الدفع</Card.Header>
                <Card.Body>
                  <p>نقدًا</p>
                </Card.Body>
              </Card>
            </Card.Body>
          </Card>

          {/* Button to book */}
          <div className="text-center mt-4">
            <Button
              variant="primary"
              className="text-white"
              onClick={handleBooking}
            >
              احجز الآن
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default CompleteBookingPage;
