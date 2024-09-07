import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import { Link } from "react-router-dom";
import LogoImage from "@/assets/images/RentifyLogo.png";
export default function Footer() {
  return (
    <footer>
      <Container className="text-white bg-secondary " fluid>
        <Row className="p-4 gap-3 justify-content-center">
          <Col md={2} xs={12} className="mt-2">
            <div>
              <Image
                className="mb-4"
                fluid
                style={{ minWidth: "200px", width: "150px" }}
                src={LogoImage}
                alt="Rentify Logo"
              />
            </div>
          </Col>
        </Row>
        <Row className="bg-primary p-4">
          <Col>
            <p className=" m-0 text-center">جميع الحقوق محفوظة - 2024</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
