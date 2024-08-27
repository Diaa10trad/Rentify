import React from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";

const NoContentBox = ({ title, text }) => {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Row>
        <Col>
          <Alert
            variant="info"
            className="text-center p-4 shadow-sm"
            style={{ borderRadius: "10px" }}
          >
            <h4>{title}</h4>
            <p>{text}</p>
          </Alert>
        </Col>
      </Row>
    </Container>
  );
};

export default NoContentBox;
