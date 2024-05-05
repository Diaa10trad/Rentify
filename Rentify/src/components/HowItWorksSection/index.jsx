import { Container, Row, Col, Stack } from "react-bootstrap";
import HowItWorksStepsContainer from "@/containers/HowItWorksStepsContainer";
import SectionLine from "../SectionLine";

export default function HowItWorksSection() {
  return (
    <Container
      className="p-4 mb-5"
      id="how-it-works"
      fluid
      style={{ marginTop: "130px", width: "80%" }}
    >
      <Row className="mb-4">
        <Stack>
          <Col className="d-flex justify-content-center">
            <h1>كيف يعمل الموقع؟</h1>
          </Col>
          <Col className="mb-3 position-relative d-flex justify-content-center">
            <SectionLine />
          </Col>
          <Col
            className="d-flex justify-content-center align-items-center"
            style={{ color: "#8a909a" }}
          >
            <p>اتّبع الخطوات التالية للاستئجار</p>
          </Col>
        </Stack>
      </Row>
      <Row className="gap-4">
        <HowItWorksStepsContainer />
      </Row>
    </Container>
  );
}
