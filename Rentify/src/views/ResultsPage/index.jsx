import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import HeadingSection from "@/components/HeadingSection";
import ResultsHeader from "@/components/Results/ResultsHeader";
import FilterSidebar from "@/components/Results/FilterSideBar";
import ItemCard from "@/components/cards/ItemCard";
export default function ResultsPage() {
  return (
    <Container fluid>
      <Row className="mb-3">
        <HeadingSection title={"النتائج"} />
      </Row>

      <Row className="justify-content-between">
        <Col xs={12} className="mb-4">
          <ResultsHeader />
        </Col>
        <Col md={4} className="p-0">
          <FilterSidebar />
        </Col>
        <Col md={8} className="">
          <Row className="g-4">
            <Col xs="auto">
              <ItemCard />
            </Col>
            <Col xs="auto">
              <ItemCard />
            </Col>
            <Col xs="auto">
              <ItemCard />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
