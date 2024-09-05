import { Row, Col, Stack, Card, Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./style.css";

// Reusable text truncation function
function truncateText(text, wordLimit) {
  if (!text) return ""; // Handle undefined or null text
  const words = text.split(" ");
  return words.length > wordLimit
    ? `${words.slice(0, wordLimit).join(" ")}...`
    : text;
}

export default function RentedItemsCard({ type, details, oppositeRole }) {
  const imageUrl = details[type][`${type}Image`].imageUrl;
  const userRole = oppositeRole == "renter" ? "owner" : "renter";
  return (
    <Card
      className="shadow border-0 overflow-hidden renteditem-card"
      style={{ width: "100%" }}
    >
      <Row className="align-items-center">
        <Col xs={10}>
          <Link
            to={`/booking-management/${type}/${userRole}/${details.bookingId}`}
            className="d-flex text-decoration-none text-dark zoom-in-effect"
          >
            <Card.Img
              className="object-fit-cover"
              src={imageUrl}
              alt={details[type].title || "Image"}
              style={{ height: "100px", width: "90px" }}
            />

            <Stack className="justify-content-center m-3">
              <Card.Title style={{ fontSize: "1.2rem" }}>
                {truncateText(details[type].title, 10) || "No Title Available"}
              </Card.Title>
              <Card.Text style={{ fontSize: "0.8rem" }}>
                حالة الاستئجار: {""}
                {details.status == "booked" && (
                  <span className="text-primary">تم الحجز</span>
                )}
                {details.status == "in-use" && (
                  <span className="text-warning">قيد الاستئجار</span>
                )}
                {details.status == "cancelled" && (
                  <span className="text-danger">ألغي الحجز</span>
                )}
                {details.status == "completed" && (
                  <span className="text-success">مكتمل</span>
                )}
              </Card.Text>
            </Stack>
          </Link>
        </Col>
        <Col xs={2}>
          <Card.Text style={{ fontSize: "0.9rem" }}>
            {oppositeRole == "renter" &&
              "المستأجر: " +
                details.renter.firstName +
                " " +
                details.renter.lastName}
            {oppositeRole == "owner" &&
              "المالك: " +
                details.owner.firstName +
                " " +
                details.owner.lastName}
          </Card.Text>
        </Col>
      </Row>
    </Card>
  );
}
