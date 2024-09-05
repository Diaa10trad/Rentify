import React from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Tabs,
  Tab,
  Card,
  Stack,
} from "react-bootstrap";
import ItemCard from "@/components/cards/ItemCard";
import Review from "@/components/ItemDetails/Review";
import Person from "@/assets/images/Person.jpg";
import "./style.css";
function UserPage() {
  const fakeReviews = [
    {
      reviewerName: "John Doe",
      rating: 4,
      image: Person,
      reviewDate: "2024-07-11",
      comment: `Great product, highly recommended!
      Great product, highly recommended!
      Great product, highly recommended!
      Great product, highly recommended!
      Great product, highly recommended!
      Great product, highly recommended!
      Great product, highly recommended!
      Great product, highly recommended!
      Great product, highly recommended!
      Great product, highly recomm
      
      
      
      
      ended!`,
    },
    {
      reviewerName: "Jane Smith",
      image: Person,
      rating: 5,
      reviewDate: "2024-07-10",
      comment: "Excellent service and fast delivery.",
    },
    {
      reviewerName: "Michael Johnson",
      image: Person,
      rating: 3,
      reviewDate: "2024-07-09",
      comment: "Product was okay, could be better.",
    },
    {
      reviewerName: "Emily Brown",
      image: Person,
      rating: 5,
      reviewDate: "2024-07-08",
      comment: "Absolutely love it! Best purchase ever.",
    },
    {
      reviewerName: "Emily Brown",
      image: Person,
      rating: 5,
      reviewDate: "2024-07-08",
      comment: "Absolutely love it! Best purchase ever.",
    },
    {
      reviewerName: "Emily Brown",
      image: Person,
      rating: 5,
      reviewDate: "2024-07-08",
      comment: "Absolutely love it! Best purchase ever.",
    },
    {
      reviewerName: "Emily Brown",
      image: Person,
      rating: 5,
      reviewDate: "2024-07-08",
      comment: "Absolutely love it! Best purchase ever.",
    },
  ];
  return (
    <Container fluid>
      <Row className="mt-4 gap-4">
        <Col xs={12} className="d-flex m-0 p-0 align-items-center">
          <Card as={Col} className="shadow border border-0">
            <Card.Body className="">
              <Stack
                direction="horizontal"
                className="align-items-center flex-wrap flex-md-nowrap "
              >
                <Image
                  height={100}
                  width={100}
                  roundedCircle
                  src={Person}
                  alt={`صورة المالك`}
                  className="me-3 object-fit-cover"
                />
                <span>
                  <Card.Title className="m-0 fs-6">{"اسم المالك"}</Card.Title>
                  <Card.Text className="d-flex align-items-center gap-1 mb-0">
                    <span className="fa fa-star text-primary"></span>
                    <span className="fa fa-star text-primary"></span>
                    <span className="fa fa-star text-primary"></span>
                    <span className="fa fa-star text-primary"></span>
                    <span className="fa fa-star"></span>
                    <span>4.7 (245)</span>
                  </Card.Text>
                </span>
              </Stack>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} className="mb-3">
          <Tabs
            defaultActiveKey="services"
            id="user-tabs"
            className="justify-content-center custom-tabs"
          >
            <Tab eventKey="services" title="الخدمات">
              <Row className="g-4 mt-2">
                {Array.from({ length: 12 }, (_, index) => (
                  <Col key={index} xs={12} sm={6} lg={4}>
                    <ItemCard type={"service"} />
                  </Col>
                ))}
              </Row>
            </Tab>
            <Tab eventKey="products" title="المنتجات">
              <Row className="g-4 mt-2">
                {Array.from({ length: 2 }, (_, index) => (
                  <Col key={index} xs={12} sm={6} lg={4}>
                    <ItemCard type={"product"} />
                  </Col>
                ))}
              </Row>
            </Tab>
            <Tab eventKey="reviews" title="التقييمات">
              <div
                style={{ height: "400px" }}
                className="overflow-y-auto pe-3 my-2"
              >
                {fakeReviews.map((review, index) => (
                  <Review review={review} key={index} />
                ))}
              </div>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
}

export default UserPage;
