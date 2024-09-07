import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useLocation } from "react-router-dom";

export default function ResultsHeader({ totalCount, shownRange }) {
  const location = useLocation();

  // Parse the query string
  const queryParams = new URLSearchParams(location.search);

  // Extract the PageNumber parameter
  const pageNumber = queryParams.get("PageNumber");

  return (
    <Row className="p-4 gap-3 shadow justify-content-md-between align-items-center">
      <Col xs={12} lg={4} className="">
        <h5
          style={{
            width: "fit-content",
          }}
          className="m-auto m-lg-0"
        >
          عدد النتائج الظاهرة <span className="text-primary">{shownRange}</span>{" "}
          من أصل
          <span className="text-primary"> {totalCount}</span>
        </h5>
      </Col>
    </Row>
  );
}
