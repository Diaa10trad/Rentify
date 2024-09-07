import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SortingOptions from "@/components/SortingOptions";
export default function ResultsHeader() {
  return (
    <Row className="p-4 gap-3 shadow justify-content-md-between align-items-center">
      <Col xs={12} lg={4} className="">
        <h5
          style={{
            width: "fit-content",
          }}
          className="m-auto m-lg-0"
        >
          عدد النتائج الظاهرة <span className="text-primary">01</span> من
          <span className="text-primary"> 01</span>
        </h5>
      </Col>
      <Col xs={12} lg={3} xxl={2} className=" ">
        {/* <SortingOptions /> */}
      </Col>
    </Row>
  );
}
