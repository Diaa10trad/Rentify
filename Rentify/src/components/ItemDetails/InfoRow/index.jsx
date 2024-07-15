import React from "react";
import { Row, Col } from "react-bootstrap";

function InfoRow({ label, value }) {
  return (
    <Row className="py-3 justify-content-between align-items-center">
      <Col xs={5}>
        <h6 className="m-0">{label}</h6>
      </Col>
      <Col xs={5} className="text-secondary">
        {value}
      </Col>
    </Row>
  );
}

export default InfoRow;
