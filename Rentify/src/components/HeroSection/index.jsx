import React from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Image,
  Form,
  ListGroup,
  Tab,
} from "react-bootstrap";
import "./styles.css";
import HeroImage from "../../assets/images/HeroImage.png";

export default function HeroSection() {
  return (
    <Container fluid>
      <Row className="align-items-center justify-content-evenly">
        <Col md={6} className="hero-text-col w-25 ">
          <h1 className="hero-h1 display-3">
            استأجر أي شيء،
            <br /> من أي شخص،
            <br /> في أي وقت.
          </h1>
          <p className="hero-p lead pt-4">لوريم ايبسوم الخ...</p>
        </Col>
        <Col md={6} className="hero-image-col">
          <Image src={HeroImage} alt="HeroImage" fluid />
        </Col>
      </Row>

      <Row className="mt-5 justify-content-center">
        <Col md={8} lg={8} className="d-flex justify-content-center">
          <div className="search-form-container d-flex">
            <Form className="search-form d-flex">
              <Form.Control
                type="text"
                placeholder="عن ماذا تبحث؟"
                className="search-input d-flex mr-sm-2"
              />
              <Tab.Container
                id="list-group-tabs-example"
                defaultActiveKey="#link1"
              >
                <Row>
                  <Col sm={4} className="d-flex">
                    <ListGroup className="search-choice-container">
                      <ListGroup.Item
                        action
                        href="#link1"
                        className="search-choice-item d-flex justify-content-center
                        align-items-center"
                      >
                        استئجار
                      </ListGroup.Item>
                      <ListGroup.Item
                        action
                        href="#link2"
                        className="search-choice-item d-flex justify-content-center
                        align-items-center"
                      >
                        خدمات
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>
                </Row>
              </Tab.Container>
              <Button type="submit" className="search-btn">
                ابحث
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
