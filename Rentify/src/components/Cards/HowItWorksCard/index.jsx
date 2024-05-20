import { Col, Stack, Image } from "react-bootstrap";

export default function HowItWorksCard({ step }) {
  return (
    <Col className="col-sm-8 col-lg-3 col-md-auto">
      <Stack className="p-5 shadow gap-3 rounded-4 align-items-center">
        <Image
          roundedCircle
          className="bg-primary p-3"
          draggable={false}
          style={{ width: "86px" }}
          src={step.icon}
          alt="Step"
        />

        <h5 className="text-nowrap  ">{step.title}</h5>

        <p className="fw-normal" style={{ color: "#8a909a" }}>
          لوريم ايبسوم دولور سيت اميت
        </p>
      </Stack>
    </Col>
  );
}
