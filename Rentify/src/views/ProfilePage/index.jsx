import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Tab,
  Nav,
  Form,
  Button,
  Card,
  Image,
} from "react-bootstrap";
import Person from "@/assets/images/Person.jpg";
import ItemCard from "@/components/cards/ItemCard";
import RentedItemsCard from "@/components/cards/RentedItemsCard";
import Review from "@/components/ItemDetails/Review";
import SettingsForm from "@/components/Profile/SettingsForm";
import { useAuth } from "@/context/AuthContext"; // Custom hook for auth context

function ProfilePage() {
  const { auth } = useAuth(); // Get the auth token from the context
  const [loadingUserData, setloadingUserData] = useState(false);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!auth.isAuthenticated) return; // Ensure the user is authenticated
      setloadingUserData(true);
      try {
        const response = await axios.get(
          "http://localhost:5079/api/account/data",
          {
            headers: {
              Authorization: `Bearer ${auth.token}`, // Use the token from AuthContext
            },
          }
        );
        setUserData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setError("Failed to load user data.");
      } finally {
        setloadingUserData(false);
      }
    };

    fetchUserData();
  }, [auth]);

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
            <Nav variant="pills" className="flex-column gap-2 mt-3 mb-5">
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
              {/* <Nav.Item>
                <Nav.Link eventKey="payment-methods" className="p-3">
                  طرق الدفع
                </Nav.Link>
              </Nav.Item> */}
              <Nav.Item>
                <Nav.Link eventKey="favorites" className="p-3 ">
                  المفضلة
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="rented-items" className="p-3">
                  السلع والخدمات المستأجرة
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="rented-out-items" className="p-3">
                  السلع والخدمات المؤجّرة
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
                        src={userData.avatar}
                        alt={`صورة المالك`}
                        className="object-fit-cover mb-3"
                      />
                      <h4>
                        {userData.firstName} {userData.lastName}
                      </h4>
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
                            {loadingUserData && <p>جارِ التحميل...</p>}
                            {error && <p>{error}</p>}
                            {userData.services &&
                              userData.services.map((service, index) => (
                                <Col key={index} xs={12} md={6} xxl={4}>
                                  <ItemCard
                                    type={"service"}
                                    details={service}
                                  />
                                </Col>
                              ))}
                          </Row>
                        </Tab.Pane>
                        <Tab.Pane eventKey="products">
                          <Row className="g-4 mt-2">
                            {loadingUserData && <p>جارِ التحميل...</p>}
                            {error && <p>{error}</p>}
                            {userData.products &&
                              userData.products.map((product, index) => (
                                <Col key={index} xs={12} md={6} xxl={4}>
                                  <ItemCard
                                    type={"product"}
                                    details={product}
                                  />
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
                <SettingsForm user={userData} setUser={setUserData} />
              </Tab.Pane>

              {/* <Tab.Pane eventKey="payment-methods">
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
              </Tab.Pane> */}

              <Tab.Pane eventKey="favorites">
                {loadingUserData && <p>Loading user data...</p>}
                {error && <p>{error}</p>}
                <Row className="g-4 mt-1 mb-5 w-100 ">
                  {userData.favorites &&
                    userData.favorites.map((item, index) => {
                      return (
                        <Col key={index} xs={12} md={6} xxl={4}>
                          <ItemCard
                            type={item.itemType}
                            details={
                              item.itemType === "product"
                                ? item.product
                                : item.service
                            }
                          />
                        </Col>
                      );
                    })}
                </Row>
              </Tab.Pane>

              <Tab.Pane eventKey="rented-items" className="mb-5">
                <Tab.Container defaultActiveKey="rented-products">
                  <Nav
                    variant="pills"
                    className="justify-content-center gap-3 mt-3"
                  >
                    <Nav.Item className="w-25 text-center">
                      <Nav.Link
                        eventKey="rented-products"
                        className="rounded-pill"
                      >
                        منتجات
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="w-25 text-center">
                      <Nav.Link
                        eventKey="rented-services"
                        className="rounded-pill"
                      >
                        خدمات
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Tab.Content className="mt-3">
                    <Tab.Pane eventKey="rented-products">
                      <Row className="g-4 mt-2">
                        {loadingUserData && <p>جارِ التحميل...</p>}
                        {error && <p>{error}</p>}
                        {userData.products &&
                          userData.products.map((product, index) => (
                            <Col key={index} xs={12}>
                              <RentedItemsCard
                                type={"product"}
                                details={product}
                              />
                            </Col>
                          ))}
                        {/* {loadingUserData && <p>Loading user data...</p>}
                        {error && <p>{error}</p>}
                        {userData.rentedItems.products &&
                          userData.rentedItems.products.map(
                            (rentedProduct, index) => (
                              <Col key={index} xs={12} md={6} xxl={4}>
                                <ItemCard
                                  type={"product"}
                                  details={rentedProduct.product}
                                />
                              </Col>
                            )
                          )} */}
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="rented-services">
                      <Row className="g-4 mt-2">
                        {loadingUserData && <p>جارِ التحميل...</p>}
                        {error && <p>{error}</p>}
                        {userData.services &&
                          userData.services.map((service, index) => (
                            <Col key={index} xs={12}>
                              <RentedItemsCard
                                type={"service"}
                                details={service}
                              />
                            </Col>
                          ))}
                        {/* {loadingUserData && <p>Loading user data...</p>}
                        {error && <p>{error}</p>}
                        {userData.rentedItems.services &&
                          userData.rentedItems.services.map(
                            (rentedService, index) => (
                              <Col key={index} xs={12} md={6} xxl={4}>
                                <ItemCard
                                  type={"service"}
                                  details={rentedService.service}
                                />
                              </Col>
                            )
                          )} */}
                      </Row>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </Tab.Pane>

              <Tab.Pane eventKey="rented-out-items" className="mb-5">
                <Tab.Container defaultActiveKey="rented-out-products">
                  <Nav
                    variant="pills"
                    className="justify-content-center gap-3 mt-3"
                  >
                    <Nav.Item className="w-25 text-center">
                      <Nav.Link
                        eventKey="rented-out-products"
                        className="rounded-pill"
                      >
                        منتجات
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="w-25 text-center">
                      <Nav.Link
                        eventKey="rented-out-services"
                        className="rounded-pill"
                      >
                        خدمات
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>

                  <Tab.Content className="mt-3">
                    <Tab.Pane eventKey="rented-out-products">
                      <Row className="g-4 mt-2">
                        {loadingUserData && <p>جارِ التحميل...</p>}
                        {error && <p>{error}</p>}
                        {userData.products &&
                          userData.products.map((product, index) => (
                            <Col key={index} xs={12}>
                              <RentedItemsCard
                                type={"product"}
                                details={product}
                              />
                            </Col>
                          ))}
                        {/* {loadingUserData && <p>Loading user data...</p>}
                      {error && <p>{error}</p>}
                      {userData.rentedOutItems.products &&
                        userData.rentedOutItems.products.map(
                          (rentedOutProduct, index) => (
                            <Col key={index} xs={12} md={6} xxl={4}>
                              <ItemCard
                                type={"product"}
                                details={rentedOutProduct.product}
                              />
                            </Col>
                          )
                        )} */}
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="rented-out-services">
                      <Row className="g-4 mt-2">
                        {loadingUserData && <p>جارِ التحميل...</p>}
                        {error && <p>{error}</p>}
                        {userData.services &&
                          userData.services.map((service, index) => (
                            <Col key={index} xs={12}>
                              <RentedItemsCard
                                type={"service"}
                                details={service}
                              />
                            </Col>
                          ))}
                        {/* {loadingUserData && <p>Loading user data...</p>}
                      {error && <p>{error}</p>}
                      {userData.rentedOutItems.services &&
                        userData.rentedOutItems.services.map(
                          (rentedOutService, index) => (
                            <Col key={index} xs={12} md={6} xxl={4}>
                              <ItemCard
                                type={"service"}
                                details={rentedOutService.service}
                              />
                            </Col>
                          )
                        )} */}
                      </Row>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
}

export default ProfilePage;
