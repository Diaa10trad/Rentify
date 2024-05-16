import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Camera from "@/assets/images/products/Camera.jpg";
import FavoriteButton from "@/components/FavoriteButton";
import "./style.css";
export default function ItemCard() {
  return (
    <Card style={{ maxWidth: "370px" }} className="shadow border border-0">
      <Card>
        <Card.Img className="" variant="top" src={Camera} />

        <Card.ImgOverlay className="p-2">
          <Stack className="h-100 justify-content-between">
            <h5>
              <Badge bg="primary">New</Badge>
            </h5>
            <Stack direction="horizontal" className="justify-content-between">
              <div className="text-white">1.0 دينار</div>
              <FavoriteButton />
            </Stack>
          </Stack>
        </Card.ImgOverlay>
      </Card>
      <Card.Body>
        <Card.Text>
          <span class="fa fa-star text-primary"></span>
          <span class="fa fa-star text-primary"></span>
          <span class="fa fa-star text-primary"></span>
          <span class="fa fa-star text-primary"></span>
          <span class="fa fa-star"></span> 4 (28)
        </Card.Text>
        <Card.Title>كاميرا فخمة مفش منها جدا جدا جدا جدا</Card.Title>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted bg-white">2 days ago</Card.Footer>
    </Card>
  );
}
