import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import ProductsCategoriesCarouselContainer from "@/containers/ProductsCategoriesCarouselContainer";
import ServicesCategoriesCarouselContainer from "@/containers/ServicesCategoriesCarouselContainer";
import WhyUsBackground from "@/assets/images/why-us/why-us-bg.png";
import SectionLine from "@/components/SectionLine";
import "./styles.css";
export default function ExploreCategoriesSection() {
  return (
    <Tab.Container defaultActiveKey="products">
      <Container
        className="text-white py-5 px-sm-5 bg-primary"
        fluid
        style={{
          backgroundImage: `url(${WhyUsBackground})`,
          borderRadius: "30px",
          backgroundColor: "#4ac0d5",
        }}
      >
        <Row className="gy-3">
          <Col
            md={4}
            className="d-flex flex-column justify-content-md-between justify-content-center align-items-center "
          >
            <div className="d-flex flex-column align-items-center align-items-md-stretch">
              <h2 className="mb-2 text-nowrap ">استكشف الفئات</h2>
              <SectionLine backgroundColor="bg-light" />
              <p className="fw-normal">
                ابحث عن الفئة التي تناسب احتياجاتك بسهولة <br />
                من بين مجموعة واسعة من المنتجات والخدمات.
              </p>
            </div>

            <Nav justify className="col-12 gap-1" variant="pills">
              <Nav.Item>
                <Nav.Link eventKey="products">منتجات</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="services">خدمات</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>

          <Col>
            <Tab.Content style={{ minHeight: "350px" }}>
              <Tab.Pane eventKey="products">
                <ProductsCategoriesCarouselContainer />
              </Tab.Pane>
              <Tab.Pane eventKey="services">
                <ServicesCategoriesCarouselContainer />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Container>
    </Tab.Container>
  );
}
