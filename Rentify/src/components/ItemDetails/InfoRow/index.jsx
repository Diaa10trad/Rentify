import React from "react";
import { Row, Col } from "react-bootstrap";

function InfoRow({ label, value }) {
  return (
    <Row className="p-3 align-items-center">
      <Col>
        <h6 className="m-0">{label}</h6>
      </Col>
      <Col className="text-secondary">{value}</Col>
    </Row>
  );
}

export default InfoRow;
