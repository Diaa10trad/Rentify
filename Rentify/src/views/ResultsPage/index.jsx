import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import HeadingSection from "@/components/HeadingSection";
import ResultsHeader from "@/components/Results/ResultsHeader";
import FilterSidebar from "@/components/Results/FilterSideBar";
import ItemCard from "@/components/cards/ItemCard";
import Pager from "@/components/Pager";
import getOneFromUrl from "@/utils/getOneFromUrl.js";
export default function ResultsPage() {
  const type = getOneFromUrl("type");
  return (
    <Container fluid>
      <Row className="mb-3">
        <HeadingSection title={"النتائج"} />
      </Row>

      <Row className="justify-content-between gap-4 gap-lg-0">
        <Col xs={12} className="mb-lg-4">
          <ResultsHeader />
        </Col>
        <Col xs={12} lg={4} xxl={3} className="p-0">
          <FilterSidebar />
        </Col>
        <Col xs={12} lg={8} xxl={9} className="">
          <Row className="g-4">
            {Array.from({ length: 24 }, (_, index) => (
              <Col key={index} xs={12} sm={6} xxl={4}>
                <ItemCard type={type} />
              </Col>
            ))}
          </Row>
          <Row className="justify-content-center my-4 align-items-center">
            <Pager />
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
