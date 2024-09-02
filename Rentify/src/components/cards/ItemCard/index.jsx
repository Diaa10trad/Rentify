import Stack from "react-bootstrap/Stack";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import FavoriteButton from "@/components/FavoriteButton";
import StarRating from "@/components/StarRating";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";
import "./style.css";
export default function ItemCard({ type, details }) {
  function truncateText(text, wordLimit) {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
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
        <StarRating
          totalReviews={details.totalReviews}
          averageRating={details.averageRating}
        />
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
