import React, { useState, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Tab,
  Nav,
  ListGroup,
  Form,
  Button,
  Card,
  Image,
} from "react-bootstrap";
import ChangeImage from "@/components/Profile/ChangeImage";
import Person from "@/assets/images/Person.jpg";
import ItemCard from "@/components/cards/ItemCard";
import Review from "@/components/ItemDetails/Review";

function ProfilePage() {
  const [user, setUser] = useState({
    fullName: "John Doe",
    avatar: Person,
    rating: 4.5,
    raterCount: 100,
    email: "john.doe@example.com",
    phoneNumber: "123-456-7890",
    password: "",
    idVerification: "",
    paymentMethods: [
      { type: "Visa", details: "**** **** **** 1234" },
      { type: "PayPal", details: "john.doe@example.com" },
    ],
    favourites: ["Item 1", "Item 2", "Item 3"],
  });
  const handleAvatarChange = (newAvatar) => {
    setUser((prevUser) => ({
      ...prevUser,
      avatar: newAvatar,
    }));
  };
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
      <Tab.Container defaultActiveKey="view-info">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="view-info" className="p-3">
                  عرض الملف الشخصي
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="settings" className="p-3">
                  الإعدادات
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="payment-methods" className="p-3">
                  طرق الدفع
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="favourites" className="p-3">
                  المفضلة
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="view-info">
                <Card>
                  <Card.Body>
                    <div className="text-center">
                      <Image
                        thumbnail
                        height={200}
                        width={200}
                        src={user.avatar}
                        alt={`صورة المالك`}
                        className="object-fit-cover mb-3"
                      />
                      <h4>{user.fullName}</h4>
                      <p>
                        <Card.Text className="d-flex justify-content-center align-items-center gap-1 mb-0">
                          <span className="fa fa-star text-primary"></span>
                          <span className="fa fa-star text-primary"></span>
                          <span className="fa fa-star text-primary"></span>
                          <span className="fa fa-star text-primary"></span>
                          <span className="fa fa-star"></span>
                          <span>4.7 (245)</span>
                        </Card.Text>
                      </p>
                    </div>
                    <Tab.Container defaultActiveKey="services">
                      <Nav variant="tabs" className="justify-content-center">
                        <Nav.Item>
                          <Nav.Link eventKey="services">الخدمات</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="products">المنتجات</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="reviews">التقييمات</Nav.Link>
                        </Nav.Item>
                      </Nav>
                      <Tab.Content>
                        <Tab.Pane eventKey="services">
                          <Row className="g-4 mt-2">
                            {Array.from({ length: 12 }, (_, index) => (
                              <Col key={index} xs={12} md={6} xxl={4}>
                                <ItemCard type={"Service"} />
                              </Col>
                            ))}
                          </Row>
                        </Tab.Pane>
                        <Tab.Pane eventKey="products">
                          <Row className="g-4 mt-2">
                            {Array.from({ length: 3 }, (_, index) => (
                              <Col key={index} xs={12} md={6} xxl={4}>
                                <ItemCard type={"Product"} />
                              </Col>
                            ))}
                          </Row>
                        </Tab.Pane>
                        <Tab.Pane eventKey="reviews">
                          <div
                            style={{ height: "400px" }}
                            className="overflow-y-auto pe-3 my-2"
                          >
                            {fakeReviews.map((review, index) => (
                              <Review review={review} key={index} />
                            ))}
                          </div>
                        </Tab.Pane>
                      </Tab.Content>
                    </Tab.Container>
                  </Card.Body>
                </Card>
              </Tab.Pane>
              <Tab.Pane eventKey="settings" className="">
                <Form>
                  <ChangeImage
                    userAvatar={user.avatar}
                    setUserAvatar={handleAvatarChange}
                  />
                  <Form.Group className="m-4">
                    <Form.Label>البريد الإلكتروني</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={user.email}
                    />
                  </Form.Group>
                  <Form.Group className="m-4">
                    <Form.Label>رقم الهاتف</Form.Label>
                    <Form.Control
                      type="text"
                      name="phoneNumber"
                      value={user.phoneNumber}
                    />
                  </Form.Group>
                  <Form.Group className="m-4">
                    <Form.Label>كلمة السر</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={user.password}
                    />
                  </Form.Group>
                  <Form.Group className="d-flex flex-column m-4">
                    <Form.Label>
                      <p>
                        التحقق من الهوية
                        <span className="fs-6 text-danger"> (غير محقق)</span>
                      </p>
                    </Form.Label>
                    <Button
                      variant="none"
                      size="sm"
                      style={{ width: "fit-content" }}
                      className="text-primary border"
                      onClick={() => document.getElementById("IDInput").click()}
                    >
                      اضف وثيقة
                    </Button>
                    <Form.Control
                      type="file"
                      id="IDInput"
                      style={{ display: "none" }}
                    />
                  </Form.Group>
                  <Button
                    className="m-4 text-white"
                    variant="primary"
                    type="submit"
                  >
                    حفظ التغييرات
                  </Button>
                </Form>
              </Tab.Pane>
              <Tab.Pane eventKey="payment-methods">
                {user.paymentMethods.map((method, index) => (
                  <div key={index} className="mb-3">
                    <Form.Group>
                      <Form.Label>{method.type}</Form.Label>
                      <Form.Control type="text" value={method.details} />
                    </Form.Group>
                    <Button variant="danger">Remove</Button>
                  </div>
                ))}
                <Button variant="success">Add Payment Method</Button>
              </Tab.Pane>
              <Tab.Pane eventKey="favourites">
                <ListGroup>
                  {user.favourites.map((favourite, index) => (
                    <ListGroup.Item key={index}>{favourite}</ListGroup.Item>
                  ))}
                </ListGroup>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
}

export default ProfilePage;
