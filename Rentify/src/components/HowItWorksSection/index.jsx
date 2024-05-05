import { Container, Row, Stack } from "react-bootstrap";
import HowItWorksStepsContainer from "@/containers/HowItWorksStepsContainer";
import SectionLine from "../SectionLine";

export default function HowItWorksSection() {
  return (
    <Container
      className="p-4 "
      id="how-it-works"
      fluid
      style={{ width: "80%" }}
    >
      <Row className="mb-4">
        <Stack className="align-items-center">
          <h1 className="mb-2">كيف يعمل الموقع؟</h1>
          <SectionLine backgroundColor="bg-primary" />
          <p className="mt- text-secondary text-opacity-75">
            اتّبع الخطوات التالية للاستئجار
          </p>
        </Stack>
      </Row>
      <Row className="gap-4">
        <HowItWorksStepsContainer />
      </Row>
    </Container>
  );
}
