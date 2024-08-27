import React, { useState, useEffect } from "react";
import axios from "axios";
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
  Spinner,
} from "react-bootstrap";
import Person from "@/assets/images/Person.jpg";
import ItemCard from "@/components/cards/ItemCard";
import Review from "@/components/ItemDetails/Review";
import SettingsForm from "@/components/Profile/SettingsForm";
import { useAuth } from "@/context/AuthContext"; // Custom hook for auth context
import { getToken, getSenderId } from "@/utils/AuthUtils";
import { useNavigate } from "react-router-dom";
import NoContentBox from "@/components/NoContentBox";
function ProfilePage() {
  const navigate = useNavigate();
  const { auth } = useAuth(); // Get the auth token from the context
  const [user, setUser] = useState({
    fullName: "John Doe",
    avatar: Person,
    rating: 4.5,
    raterCount: 100,
    email: "john.doe@example.com",
    phoneNumber: "123-456-7890",
    idVerification: "",
    paymentMethods: [
      { type: "Visa", details: "**** **** **** 1234" },
      { type: "PayPal", details: "john.doe@example.com" },
    ],
  });

  const [loadingUserData, setloadingUserData] = useState(false);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState([]);
  const [userChats, setUserChats] = useState([]);
  const currentUserToken = getToken();
  const currentUserId = getSenderId(currentUserToken);

  const navigateToChat = (chat) => {
    const data = {
      bookingDetails: null,
      receiverId:
        chat.userOne.userId != currentUserId
          ? chat.userOne.userId
          : chat.userTwo.userId,
    };
    navigate("/chatpage", { state: data });
  };
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
        setUserData(response.data.userData);
        setUserChats(response.data.userChats);
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
                <Nav.Link eventKey="favorites" className="p-3">
                  المفضلة
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="chats" className="p-3">
                  الدردشات
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
                        <Tab.Pane
                          style={{ minHeight: "100vh" }}
                          eventKey="services"
                        >
                          <Row className="g-4 mt-2">
                            {loadingUserData && (
                              <Container
                                className="d-flex justify-content-center align-items-center"
                                style={{ height: "100vh" }}
                              >
                                <Spinner animation="border" />
                              </Container>
                            )}

                            {error && <p>{error}</p>}
                            {userData.services &&
                            userData.services.length > 0 ? (
                              userData.services.map((service, index) => (
                                <Col key={index} xs={12} md={6} xxl={4}>
                                  <ItemCard
                                    type={"service"}
                                    details={service}
                                  />
                                </Col>
                              ))
                            ) : (
                              <Col xs={12}>
                                <NoContentBox
                                  title={"لا توجد إعلانات خدمات"}
                                  text={
                                    "لم تقم بإضافة أي إعلانات لخدماتك حتى الآن."
                                  }
                                />
                              </Col>
                            )}
                          </Row>
                        </Tab.Pane>
                        <Tab.Pane
                          style={{ minHeight: "100vh" }}
                          eventKey="products"
                        >
                          <Row className="g-4 mt-2">
                            {loadingUserData && <p>Loading user data...</p>}

                            {error && <p>{error}</p>}
                            {userData.products &&
                            userData.products.length > 0 ? (
                              userData.products.map((product, index) => (
                                <Col key={index} xs={12} md={6} xxl={4}>
                                  <ItemCard
                                    type={"product"}
                                    details={product}
                                  />
                                </Col>
                              ))
                            ) : (
                              <Col xs={12}>
                                <NoContentBox
                                  title={"لا توجد إعلانات منتجات"}
                                  text={
                                    "لم تقم بإضافة أي إعلانات لمنتجاتك حتى الآن."
                                  }
                                />
                              </Col>
                            )}
                          </Row>
                        </Tab.Pane>
                        <Tab.Pane
                          style={{ minHeight: "100vh" }}
                          eventKey="reviews"
                        >
                          <div
                            style={{ maxHeight: "100vh" }}
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
              <Tab.Pane
                style={{ minHeight: "100vh" }}
                eventKey="settings"
                className=""
              >
                <SettingsForm user={user} setUser={setUser} />
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
              <Tab.Pane style={{ height: "100vh" }} eventKey="favorites">
                {loadingUserData && <p>Loading user data...</p>}
                {error && <p>{error}</p>}
                <Row className="g-4 mt-2">
                  {userData.favorites && userData.favorites.length > 0 ? (
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
                    })
                  ) : (
                    <Col xs={12}>
                      <NoContentBox
                        title={"لا توجد محتويات بعد"}
                        text={
                          "لم تقم بإضافة أي عناصر إلى مفضلتك بعد. أضف بعض العناصر لعرضها هنا."
                        }
                      />
                    </Col>
                  )}
                </Row>
              </Tab.Pane>
              <Tab.Pane style={{ minHeight: "100vh" }} eventKey="chats">
                {loadingUserData && <p>Loading chats...</p>}
                {error && <p>{error}</p>}
                {userChats && userChats.length > 0 ? (
                  <ListGroup>
                    {userChats.map((chat, index) => (
                      <ListGroup.Item
                        key={index}
                        action
                        onClick={() => navigateToChat(chat)}
                        className="d-flex p-3 shadow border-0 align-items-center"
                      >
                        <Image
                          roundedCircle
                          src={
                            chat.userOne.userId != currentUserId
                              ? chat.userOne.avatar
                              : chat.userTwo.avatar
                          }
                          alt={
                            chat.userOne.userId != currentUserId
                              ? `${chat.userOne.firstName} ${chat.userOne.lastName}`
                              : `${chat.userTwo.firstName} ${chat.userTwo.lastName}`
                          }
                          width={50}
                          height={50}
                          className="me-3"
                        />
                        <div>
                          <h5>
                            {chat.userOne.userId != currentUserId
                              ? `${chat.userOne.firstName} ${chat.userOne.lastName}`
                              : `${chat.userTwo.firstName} ${chat.userTwo.lastName}`}
                          </h5>
                          <p className="mb-0 text-truncate">
                            {chat["messages"].at(-1).sender.userId ==
                            currentUserId
                              ? "أنت: "
                              : ""}
                            {chat["messages"].at(-1).message}{" "}
                            {new Date(
                              chat["messages"].at(-1).sentAt
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                ) : (
                  <Col xs={12}>
                    <NoContentBox
                      title={"لا توجد دردشات"}
                      text={"لم تقم بالدردشة مع أي أحد بعد."}
                    />
                  </Col>
                )}
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
}

export default ProfilePage;
