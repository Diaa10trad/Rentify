import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Button,
  Form,
  Image,
  Stack,
  Badge,
  ListGroup,
  Container,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import { getToken, getSenderId } from "@/utils/AuthUtils";
import ErrorPage from "../ErrorPage";
import ReviewButton from "../../components/ReviewButton";
export default function BookingManagementPage() {
  const token = getToken();
  const { itemType, userRole, bookingId } = useParams();

  const [bookingDetails, setBookingDetails] = useState(null);
  const [loadingBookingDetails, setLoadingBookingDetails] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Ensure the user is authenticated before fetching data
    if (!token) {
      setError(true);
      setLoadingBookingDetails(false);
      return;
    }

    // Define the async function inside the effect
    const fetchBookingDetails = async () => {
      try {
        setLoadingBookingDetails(true);
        const response = await axios.get(
          `http://localhost:5079/api/booking-${itemType}/${userRole}/${bookingId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBookingDetails(response.data); // Set the fetched booking details
        console.log("Booking details fetched successfully:", response.data);
      } catch (error) {
        setError(true);
        console.error("Failed to fetch booking details:", error);
      } finally {
        setLoadingBookingDetails(false); // Ensure loading spinner stops
      }
    };

    fetchBookingDetails();
  }, [itemType, userRole, bookingId, token]);

  const [code, setCode] = useState(null);

  const handleCodeSubmit = async () => {
    try {
      let url = "";
      const headers = {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json-patch+json",
      };
      // Determine the URL and body based on type and userRole
      if (itemType === "product") {
        if (userRole === "renter") {
          url = `http://localhost:5079/api/booking-product/${bookingId}/confirm-return`;
        } else if (userRole === "owner") {
          url = `http://localhost:5079/api/booking-product/${bookingId}/confirm-pickup`;
        }
      } else if (itemType === "service") {
        if (userRole === "renter") {
          url = `http://localhost:5079/api/booking-service/${bookingId}/confirm-return`;
        } else if (userRole === "owner") {
          url = `http://localhost:5079/api/booking-service/${bookingId}/confirm-pickup`;
        }
      }
      console.log(url);
      // Send the request using axios
      const response = await axios.put(url, parseInt(code), { headers });

      if (response.status === 200) {
        alert(`تم إرسال الرمز ${code} بنجاح!`);
        window.location.reload();
      } else {
        alert(`حدث خطأ: ${response.data.message || "فشل في إرسال الرمز"}`);
      }
    } catch (error) {
      console.error("Error during code submission:", error);
      alert("حدث خطأ أثناء إرسال الرمز. يرجى المحاولة مرة أخرى.");
    }
  };

  const handleCancelBooking = async () => {
    if (userRole !== "renter") {
      alert("حركة غير مسموحة");
      return;
    }

    const currentDate = new Date();
    const startDate = new Date(bookingDetails.startDate);
    const hoursDifference = (startDate - currentDate) / (1000 * 60 * 60);

    // Check if cancellation is permitted within the allowed duration
    if (hoursDifference < bookingDetails.cancellationPolicy.permittedDuration) {
      alert("الإلغاء غير مسموح في هذا الوقت.");
      return;
    }

    try {
      const url = `http://localhost:5079/api/booking-${itemType}/${bookingId}/cancel`;
      const headers = {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json-patch+json",
      };

      const response = await axios.put(url, {}, { headers });

      if (response.status === 200) {
        alert("تم إلغاء الحجز بنجاح!");
        window.location.reload();
      } else {
        alert(`حدث خطأ: ${response.data.message || "فشل إلغاء الحجز"}`);
      }
    } catch (error) {
      console.error("Error during cancellation:", error);
      alert("حدث خطأ أثناء إلغاء الحجز. يرجى المحاولة لاحقًا.");
    }
  };

  if (loadingBookingDetails) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" />
      </Container>
    );
  }
  if (error && token) {
    return <ErrorPage message={"الحجز غير موجود"} />;
  }
  if (!token) {
    return (
      <ErrorPage
        message={
          "ليس لديك صلاحية الوصول إلى هذه الصفحة. الرجاء تسجيل الدخول أولا."
        }
      />
    );
  }
  return (
    <Card className="p-4 shadow-lg">
      {/* Title and Image Section */}
      <Row className="text-center mb-4">
        <Col md={12}>
          {itemType === "product" ? (
            <>
              <h3 className="mb-3">{bookingDetails.product.title}</h3>
              <Image
                src={bookingDetails.product.productImage.imageUrl}
                alt="Product Image"
                rounded
                fluid
                style={{ width: "300px", height: "auto" }}
              />
            </>
          ) : (
            <>
              <h3 className="mb-3">{bookingDetails.service.title}</h3>
              <Image
                src={bookingDetails.service.serviceImage.imageUrl}
                alt="Service Image"
                rounded
                fluid
                style={{ width: "300px", height: "auto" }}
              />
            </>
          )}
        </Col>
      </Row>

      <Row className="text-center">
        <Col md={6} className="mb-4">
          <Image
            src={bookingDetails.owner.avatar}
            roundedCircle
            style={{ width: "120px", height: "120px" }}
          />
          <h5 className="mt-3">
            {bookingDetails.owner.firstName} {bookingDetails.owner.lastName}
          </h5>
          <Badge bg="info" className="mt-2">
            صاحب الخدمة
          </Badge>
        </Col>
        <Col md={6} className="mb-4">
          <Image
            src={bookingDetails.renter.avatar}
            roundedCircle
            style={{ width: "120px", height: "120px" }}
          />
          <h5 className="mt-3">
            {bookingDetails.renter.firstName} {bookingDetails.renter.lastName}
          </h5>
          <Badge bg="info" className="mt-2">
            المستأجر
          </Badge>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <h5 className="text-center mb-3">تفاصيل الحجز</h5>
          <ListGroup variant="flush">
            {itemType === "product" && (
              <ListGroup.Item>
                <strong>عنوان المنتج:</strong> {bookingDetails.product.title}
              </ListGroup.Item>
            )}
            {itemType === "service" && (
              <ListGroup.Item>
                <strong>عنوان الخدمة:</strong> {bookingDetails.service.title}
              </ListGroup.Item>
            )}
            <ListGroup.Item>
              <strong>تاريخ البداية:</strong>{" "}
              {new Date(bookingDetails.startDate).toLocaleDateString()}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>تاريخ النهاية:</strong>{" "}
              {new Date(bookingDetails.endDate).toLocaleDateString()}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>السعر النهائي:</strong> {bookingDetails.finalPrice} دينار
              أردني
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>معلومات إضافية:</strong>{" "}
              {bookingDetails.additionalInfo || "لا يوجد"}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>الحالة:</strong>{" "}
              {bookingDetails.status == "booked" && (
                <span className="text-primary">تم الحجز</span>
              )}
              {bookingDetails.status == "in-use" && (
                <span className="text-warning">قيد الاستئجار</span>
              )}
              {bookingDetails.status == "cancelled" && (
                <span className="text-danger">ألغي الحجز</span>
              )}
              {bookingDetails.status == "completed" && (
                <span className="text-success">مكتمل</span>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>تاريخ الاستلام:</strong>{" "}
              {bookingDetails.pickUpDate
                ? new Date(bookingDetails.pickUpDate).toLocaleDateString()
                : "لم يتم الاستلام بعد"}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>تاريخ الإرجاع:</strong>{" "}
              {bookingDetails.returnDate
                ? new Date(bookingDetails.returnDate).toLocaleDateString()
                : "لم يتم الإرجاع بعد"}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>تاريخ الإنشاء:</strong>{" "}
              {new Date(bookingDetails.createdAt).toLocaleDateString()}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col md={6}>
          <h6 className="mb-3">سياسة الإلغاء</h6>
          <p>
            <strong>الاسترداد:</strong>{" "}
            {bookingDetails.cancellationPolicy.refund}%
          </p>
          <p>
            <strong>مدة الإلغاء المسموح بها:</strong>{" "}
            {bookingDetails.cancellationPolicy.permittedDuration} ساعات قبل
            تاريخ البداية
          </p>
          {userRole === "renter" && bookingDetails.status == "booked" && (
            <Button variant="danger" onClick={handleCancelBooking}>
              إلغاء الحجز
            </Button>
          )}
        </Col>
        <Col md={6}>
          {/* Check if both pickUpDate and returnDate exist, indicating the process is complete */}
          {!(bookingDetails.pickUpDate && bookingDetails.returnDate) &&
            bookingDetails.status != "cancelled" && (
              <>
                {userRole === "owner" ? (
                  bookingDetails.pickUpDate ? (
                    // Owner: Renter has picked up the item, show return code for confirmation
                    <Stack gap={3} className="align-items-center">
                      <span>
                        <strong>رمز الإرجاع</strong> (يرجى إعطاء هذا الرمز
                        للمستأجر)
                      </span>
                      <span className="fs-5 border border-black rounded p-2">
                        {bookingDetails.returnCode}
                      </span>
                    </Stack>
                  ) : (
                    // Owner: Renter has not picked up yet, show confirm pickup form
                    <Stack gap={3}>
                      <Form.Control
                        className="text-start"
                        type="number"
                        min="1111"
                        max="9999"
                        placeholder="أدخل رمز الاستلام"
                        value={code}
                        onChange={(e) => setCode(parseInt(e.target.value))}
                      />
                      <Button
                        variant="primary"
                        className="text-white"
                        onClick={handleCodeSubmit}
                      >
                        تأكيد الاستلام
                      </Button>
                    </Stack>
                  )
                ) : userRole === "renter" ? (
                  bookingDetails.pickUpDate ? (
                    // Renter: Item has been picked up, show return confirmation form
                    <Stack gap={3}>
                      <Form.Control
                        className="text-start"
                        type="number"
                        min="1111"
                        max="9999"
                        placeholder="أدخل رمز الإرجاع"
                        value={code}
                        onChange={(e) => setCode(parseInt(e.target.value))}
                      />
                      <Button
                        variant="primary"
                        className="text-white"
                        onClick={handleCodeSubmit}
                      >
                        تأكيد الإرجاع
                      </Button>
                    </Stack>
                  ) : (
                    // Renter: Item has not been picked up yet, show pickup code
                    bookingDetails.pickUpCode && (
                      <Stack gap={3} className="align-items-center">
                        <span>
                          <strong>رمز الاستلام</strong> (يرجى إعطاء هذا الرمز
                          لصاحب الخدمة/المنتج)
                        </span>
                        <span className="fs-5 border border-black rounded p-2">
                          {bookingDetails.pickUpCode}
                        </span>
                      </Stack>
                    )
                  )
                ) : null}
              </>
            )}

          <ReviewButton
            isRenter={userRole == "renter"}
            status={bookingDetails.status}
            itemType={itemType}
            itemId={
              itemType === "product"
                ? bookingDetails.product.productId
                : bookingDetails.service.serviceId
            }
          />
        </Col>
      </Row>
    </Card>
  );
}
