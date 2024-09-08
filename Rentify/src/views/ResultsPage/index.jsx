import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import HeadingSection from "@/components/HeadingSection";
import ResultsHeader from "@/components/Results/ResultsHeader";
import FilterSidebar from "@/components/Results/FilterSideBar";
import ItemCard from "@/components/cards/ItemCard";
import Pager from "@/components/Pager";
import axios from "axios";
import getOneFromUrl from "@/utils/getOneFromUrl.js";
import { useEffect, useState } from "react";
import NoContentBox from "@/components/NoContentBox";
import { useLocation } from "react-router-dom";
export default function ResultsPage() {
  const type = getOneFromUrl("type");
  const pageSize = 24;
  const [items, setItems] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pageNumber = parseInt(queryParams.get("PageNumber"));

  useEffect(() => {
    // Replace with your actual API endpoint
    const apiUrl = `http://localhost:5079/api/${type}`;

    // Replace with your actual JWT token
    const token = localStorage.getItem("token");
    // Make the GET request with the Authorization header
    axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: queryParams,
      })
      .then((response) => {
        setItems(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
      });
  }, [location.search]); // Empty dependency array means this effect runs once on

  const getShownRange = (currentPage, pageSize, totalCount) => {
    const start = (currentPage - 1) * pageSize + 1;
    const end = Math.min(start + pageSize - 1, totalCount);
    return `${start} - ${end}`;
  };
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (loading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" />
      </Container>
    );
  }
  return (
    <Container fluid>
      <Row className="mb-3">
        <HeadingSection title={"النتائج"} />
      </Row>

      <Row className="justify-content-between gap-4 gap-lg-0">
        <Col xs={12} className="mb-lg-4">
          <ResultsHeader
            totalCount={items.totalCount}
            shownRange={getShownRange(pageNumber, pageSize, items.totalCount)}
          />
        </Col>
        <Col xs={12} lg={4} xxl={3} className="p-0">
          <FilterSidebar />
        </Col>
        {items && items[`${type}s`].length > 0 ? (
          <Col xs={12} lg={8} xxl={9}>
            <Row className="g-4">
              {items[`${type}s`].map((item, index) => (
                <Col key={index} xs={12} sm={6} xxl={4}>
                  <ItemCard type={type} details={item} />
                </Col>
              ))}
            </Row>
            <Row className="justify-content-center my-4 align-items-center">
              <Pager pageSize={pageSize} totalItems={items.totalCount} />
            </Row>
          </Col>
        ) : (
          <Col style={{ minHeight: "100vh" }} xs={12} lg={8} xxl={9}>
            <NoContentBox
              title={"لا توجد محتويات بعد"}
              text={"لا يوجد أي شيء لعرضه في الوقت الحالي. يرجى العودة لاحقًا!"}
            />
          </Col>
        )}
      </Row>
    </Container>
  );
}
