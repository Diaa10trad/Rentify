import { Container, Row, Col, Stack } from "react-bootstrap";
import WhyUsBackground from "@/assets/images/why-us/why-us-bg.png";
import Guarantee from "@/assets/images/why-us/guarantee.png";
import Money from "@/assets/images/why-us/money.png";
import Environment from "@/assets/images/why-us/environment.png";
export default function WhyChooseUsSection() {
  const WhyUs = [
    {
      id: 1,
      title: "أجّر بأمان",
      description: "لوريم ايبسوم دولور سيت اميت",
      icon: Guarantee,
    },
    {
      id: 2,
      title: "وفّر أموالك",
      description: "لوريم ايبسوم دولور سيت اميت",
      icon: Money,
    },
    {
      id: 3,
      title: "حافظ على البيئة",
      description: "لوريم ايبسوم دولور سيت اميت",
      icon: Environment,
    },
  ];

  return (
    <>
      <Container
        className="p-5 mt-3 mb-5 d-flex flex-column align-items-center"
        fluid
        style={{
          backgroundImage: `url(${WhyUsBackground})`,
          borderRadius: "30px",
          width: "95%",
          backgroundColor: "#4ac0d5",
        }}
      >
        <Row>
          <Stack>
            <Col className="d-flex justify-content-center">
              <h1 className="text-white"> لماذا Rentify؟</h1>
            </Col>
            <Col className="mb-3 position-relative d-flex justify-content-center">
              <Stack
                className="align-self-center align-self-sm-stretch"
                gap={2}
                direction="horizontal"
              >
                <span
                  style={{ width: "25px", height: "6px" }}
                  className="bg-white rounded-pill mt-2"
                ></span>
                <span
                  style={{ width: "50px", height: "6px" }}
                  className="bg-white rounded-pill mt-2"
                ></span>
              </Stack>
            </Col>
            <Col
              className="d-flex justify-content-center align-items-center"
              style={{ color: "#8a909a" }}
            >
              <p className="text-light text-opacity-75">
                ما الذي يميّز Rentify عن غيره؟
              </p>
            </Col>
          </Stack>
        </Row>
        <Row className="gap-4 w-75 mt-4 ">
          {WhyUs.map((step) => (
            <Col key={step.id}>
              <Stack
                style={{ borderRadius: "15px" }}
                className=" align-items-center"
              >
                <span
                  className="d-flex bg-white align-items-center justify-content-center"
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

                <h4 className="text-nowrap fw-normal text-white mt-3">
                  {step.title}
                </h4>

                <p className="text-light fw-normal text-opacity-75">
                  لوريم ايبسوم دولور سيت اميت
                </p>
              </Stack>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
