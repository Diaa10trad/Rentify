import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import HeadingSection from "@/components/HeadingSection";
import ResultsHeader from "@/components/Results/ResultsHeader";
import FilterSidebar from "@/components/Results/FilterSideBar";
import ItemCard from "@/components/cards/ItemCard";
import Pager from "@/components/Pager";
import { useLocation } from "react-router-dom";
export default function ResultsPage() {
  const location = useLocation();
  const parameters = new URLSearchParams(location.search);
  const type = parameters.get("type");
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
          <FilterSidebar type={type} />
        </Col>
        <Col xs={12} lg={8} xxl={9} className="">
          <Row className="g-4">
            {Array.from({ length: 24 }, (_, index) => (
              <Col key={index} xs={12} sm={6} xxl={4}>
                <ItemCard />
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
