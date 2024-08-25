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
export default function ResultsPage() {
  const type = getOneFromUrl("type");
  const [items, setItems] = useState(null);
  const [error, setError] = useState(null);

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
      })
      .then((response) => {
        setItems(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []); // Empty dependency array means this effect runs once on mount

  if (error) {
    return <div>Error: {error.message}</div>;
  }
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
        {items ? (
          <Col xs={12} lg={8} xxl={9} className="">
            <Row className="g-4">
              {items.map((item, index) => (
                <Col key={index} xs={12} sm={6} xxl={4}>
                  <ItemCard type={type} details={item} />
                </Col>
              ))}
            </Row>
            <Row className="justify-content-center my-4 align-items-center">
              <Pager />
            </Row>
          </Col>
        ) : (
          <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
          >
            <Spinner animation="border" />
          </Container>
        )}
      </Row>
    </Container>
  );
}
