import { Col, Stack } from "react-bootstrap";

export default function HowItWorksCard({ step }) {
  return (
    <Col>
      <Stack
        style={{ borderRadius: "15px" }}
        className="p-5 shadow gap-3 align-items-center"
      >
        <span
          className="d-flex bg-primary align-items-center justify-content-center"
          style={{
            width: "86px",
            height: "86px",
            borderRadius: "50%",
          }}
        >
          <img
            draggable={false}
            style={{ width: "50px" }}
            src={step.icon}
            alt="Step"
          />
        </span>

        <h4 className="text-nowrap fw-normal">{step.title}</h4>

        <p style={{ color: "#8a909a" }}>لوريم ايبسوم دولور سيت اميت</p>
      </Stack>
    </Col>
  );
}
