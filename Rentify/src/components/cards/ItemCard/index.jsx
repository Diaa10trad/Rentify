import Stack from "react-bootstrap/Stack";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Camera from "@/assets/images/products/Camera.jpg";
import FavoriteButton from "@/components/FavoriteButton";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";
import "./style.css";
export default function ItemCard({ type, details }) {
  function truncateText(text, wordLimit) {
    const words = text.split(" "); // Split the text into an array of words
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "..."; // Join the first 100 words and add '...'
    }
    return text; // If the text is less than or equal to 100 words, return it as is
  }

  return (
    <Card style={{ minHeight: "100%" }} className="shadow border border-0">
      <Card className="position-relative overflow-hidden item-card">
        <Card.Img
          className="zoom-in-effect object-fit-cover"
          variant="top"
          style={{ height: "300px" }}
          src={details[`${type}Images`][0].imageUrl}
        />

        <Card.ImgOverlay className="p-2">
          <Stack className="h-100 justify-content-between">
            <h5>
              <Badge bg="primary">New</Badge>
            </h5>
            <Stack direction="horizontal" className="justify-content-between">
              {/* <div className="text-white">1.0 دينار</div> */}
              <FavoriteButton />
            </Stack>
          </Stack>
        </Card.ImgOverlay>
      </Card>
      <Card.Body>
        <Card.Text className="d-flex align-items-center gap-1">
          <span className="fa fa-star text-primary"></span>
          <span className="fa fa-star text-primary"></span>
          <span className="fa fa-star text-primary"></span>
          <span className="fa fa-star text-primary"></span>
          <span className="fa fa-star"></span>
          <span>4 ({details.reviews.length})</span>
        </Card.Text>
        <Card.Title>{details.title}</Card.Title>

        <Card.Text>
          {truncateText(details.description, 20)}
          <div className="d-grid gap-2">
            <LinkContainer to={`/${type}/${details[`${type}Id`]}`}>
              <Button
                className="fs-5 p-2 mt-3 text-white"
                variant="primary"
                type="submit"
              >
                تفاصيل الإعلان
              </Button>
            </LinkContainer>
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
