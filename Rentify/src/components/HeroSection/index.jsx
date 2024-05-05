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
  Stack,
} from "react-bootstrap";
import "./styles.css";
import HeroImage from "../../assets/images/HeroImage.png";

export default function HeroSection() {
  return (
    <Container className="p-4" fluid>
      <Row className="justify-content-center align-items-center">
        <Col md={5} xl={6} xxl={5} className="hero-text-col">
          <Stack
            style={{ width: "fit-content" }}
            className="display-4 m-auto 
            text-nowrap "
          >
            <div>استأجر أي شيء،</div>
            <div> من أي شخص، </div>
            <div> في أي وقت. </div>
            <p className="lead pt-4">لوريم ايبسوم الخ...</p>
          </Stack>
        </Col>
        <Col md={6} xl={6} xxl={5} className="d-none d-md-flex">
          <Image className="" src={HeroImage} alt="HeroImage" fluid />
        </Col>
      </Row>

      <Row className="mt-5 justify-content-center">
        <Col md={8} className="search-form-col d-flex justify-content-center ">
          <Form className="d-flex w-100 gap-3 p-4 rounded-pill shadow">
            <Form.Control
              type="text"
              placeholder="عن ماذا تبحث؟"
              className="search-input d-flex "
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
                      منتج
                    </ListGroup.Item>
                    <ListGroup.Item
                      action
                      href="#link2"
                      className="search-choice-item d-flex justify-content-center
                        align-items-center"
                    >
                      خدمة
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            </Tab.Container>
            <Button
              type="submit"
              style={{ width: 60, height: 60 }}
              className="rounded-circle text-white"
            >
              ابحث
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
