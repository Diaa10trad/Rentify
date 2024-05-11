import { Container, Row, Stack } from "react-bootstrap";
import AddListTitleBackground from "@/assets/images/why-us/why-us-bg.png";
import SectionLine from "@/components/SectionLine";
export default function AddListingTitle() {
  return (
    <>
      <Container
        className="mt-3 p-4"
        fluid
        style={{
          backgroundImage: `url(${AddListTitleBackground})`,
          borderRadius: "30px",
          backgroundColor: "#4ac0d5",
        }}
      >
        <Row>
          <Stack className="align-items-center my-5">
            <h1 className="text-white text-center display-6">
              انشر إعلان جديد
            </h1>
            <SectionLine backgroundColor="bg-light" />
            <p className=" text-white text-opacity-75">
              لوريم ايبسوم دولور سيت اميت
            </p>
          </Stack>
        </Row>
      </Container>
    </>
  );
}
