import React from "react";
import { Row, Col } from "react-bootstrap";

function InfoRow({ label, value }) {
  return (
    <Row className="p-2">
      <Col>
        <h6>{label}</h6>
      </Col>
      <Col className="text-secondary">{value}</Col>
      <hr />
    </Row>
  );
}

export default InfoRow;
