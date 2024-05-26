import React from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Image,
  Form,
  Stack,
} from "react-bootstrap";
import HeroImage from "@/assets/images/HeroImage.png";
import SearchBarContainer from "@/containers/SearchBarContainer";

export default function HeroSection() {
  return (
    <Container className="p-4" fluid>
      <Row className="justify-content-center align-items-center">
        <Col xs={12} md={5} xl={6} xxl={5} className="">
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
        <Col md={6} xl={5} className="d-none d-md-block">
          <Image className="" src={HeroImage} alt="HeroImage" fluid />
        </Col>
      </Row>

      <Row className="align-items-center justify-content-center">
        <Col md={8}>
          <SearchBarContainer />
        </Col>
      </Row>
    </Container>
  );
}
