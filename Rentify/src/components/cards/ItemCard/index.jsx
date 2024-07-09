import Stack from "react-bootstrap/Stack";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Camera from "@/assets/images/products/Camera.jpg";
import FavoriteButton from "@/components/FavoriteButton";
import "./style.css";
export default function ItemCard() {
  return (
    <Card style={{ minHeight: "100%" }} className=" shadow border border-0">
      <Card className="position-relative overflow-hidden item-card">
        <Card.Img className="zoom-in-effect" variant="top" src={Camera} />

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
          <span>4 (28)</span>
        </Card.Text>
        <Card.Title>كاميرا فخمة مفش منها جدا جدا جدا جدا</Card.Title>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
          With supporting text below as a natural lead-in to additional content.
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted bg-white">2 days ago</Card.Footer>
    </Card>
  );
}
