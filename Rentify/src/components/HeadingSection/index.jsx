import { Container, Row, Stack } from "react-bootstrap";
import Background from "@/assets/images/why-us/why-us-bg.png";
import SectionLine from "@/components/SectionLine";
export default function HeadingSection({ title }) {
  return (
    <>
      <Container
        className=" p-4"
        fluid
        style={{
          backgroundImage: `url(${Background})`,
          borderRadius: "30px",
          backgroundColor: "#4ac0d5",
        }}
      >
        <Row>
          <Stack className="align-items-center my-5">
            <h1 className="text-white text-center display-6">{title}</h1>
            <SectionLine backgroundColor="bg-light" />
            {/* <p className=" text-white text-opacity-75">املأ معلومات الإعلان</p> */}
          </Stack>
        </Row>
      </Container>
    </>
  );
}
