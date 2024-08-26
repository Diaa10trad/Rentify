import { Row, Col, Stack, Card, Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Camera from "@/assets/images/products/Camera.jpg"; // Default image placeholder
import FavoriteButton from "@/components/FavoriteButton";
import "./style.css";

// Reusable text truncation function
function truncateText(text, wordLimit) {
  if (!text) return ""; // Handle undefined or null text
  const words = text.split(" ");
  return words.length > wordLimit
    ? `${words.slice(0, wordLimit).join(" ")}...`
    : text;
}

export default function RentedItemsCard({ type, details }) {
  // Ensure there's at least one image or use a placeholder image
  const imageUrl =
    details[`${type}Images`] && details[`${type}Images`].length > 0
      ? details[`${type}Images`][0].imageUrl
      : Camera;

  return (
    <Card
      className="shadow border-0 overflow-hidden renteditem-card"
      style={{ width: "100%" }}
    >
      <Row className="align-items-center">
        <Col xs={10}>
          <Link
            to=""
            className="d-flex text-decoration-none text-dark zoom-in-effect"
          >
            <Card.Img
              className="object-fit-cover"
              src={imageUrl}
              alt={details.title || "Image"}
              style={{ height: "100px", width: "90px" }}
            />

            <Stack className="justify-content-center m-3">
              <Card.Title style={{ fontSize: "1.2rem" }}>
                {details.title || "No Title Available"}
              </Card.Title>
              <Card.Text style={{ fontSize: "0.8rem" }}>
                حالة الاستئجار: {""}
                <span style={{ color: "green" }}>قيد الاستعمال </span>
              </Card.Text>
            </Stack>
          </Link>
        </Col>
        <Col xs={2}>
          <Link to="" className="text-decoration-none">
            <Card.Text style={{ fontSize: "0.9rem" }}>
              {details.renterType || " المستأجر"}:{" "}
              {details.renterName || "غير متوفر"}
            </Card.Text>
          </Link>
        </Col>
      </Row>
    </Card>
  );
}

// import Stack from "react-bootstrap/Stack";

// import Card from "react-bootstrap/Card";
// import Col from "react-bootstrap/Col";
// import Badge from "react-bootstrap/Badge";
// import Camera from "@/assets/images/products/Camera.jpg";
// import FavoriteButton from "@/components/FavoriteButton";
// import Button from "react-bootstrap/Button";
// import { LinkContainer } from "react-router-bootstrap";
// export default function RentedItemsCard({ type, details }) {
//   function truncateText(text, wordLimit) {
//     const words = text.split(" "); // Split the text into an array of words
//     if (words.length > wordLimit) {
//       return words.slice(0, wordLimit).join(" ") + "..."; // Join the first 100 words and add '...'
//     }
//     return text; // If the text is less than or equal to 100 words, return it as is
//   }

//   return (
//     <Card className="shadow border border-0 overflow-hidden flex-row">
//       <Card.Img
//         className="object-fit-cover"
//         variant="top"
//         style={{ height: "100px", width: "90px" }}
//         src={details[`${type}Images`][0].imageUrl}
//       />
//       <Stack className="flex-row justify-content-between">
//         <Card.Text className="d-flex align-items-center flex-column p-2">
//           <Card.Title>{details.title}</Card.Title>
//           <p className="fw-normal" style={{ fontSize: "15px" }}>
//             حالة الاستئجار:{" "}
//             <span style={{ color: "green" }}>قيد الاستعمال</span>
//           </p>
//         </Card.Text>

//         <Card.Text className="d-flex align-items-center flex-column p-4">
//           اسم المؤجر: ضياء الدين
//         </Card.Text>
//       </Stack>
//     </Card>
//   );
// }
