import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import ProductsCategoriesCarouselContainer from "@/containers/ProductsCategoriesCarouselContainer";
import ServicesCategoriesCarouselContainer from "@/containers/ServicesCategoriesCarouselContainer";
import SectionLine from "@/components/SectionLine";

export default function ExploreCategoriesSection() {
  return (
    <Tab.Container className="mb-4 " defaultActiveKey="products">
      <Container className=" p-4" fluid>
        <Row className="gy-3">
          <Col
            sm={4}
            className="d-flex flex-column justify-content-sm-between justify-content-center align-items-center "
          >
            <div className="d-flex flex-column align-items-center align-items-sm-stretch">
              <h2 className="mb-2 text-nowrap ">استكشف الفئات</h2>
              <SectionLine />
              <p className="">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Nostrum, sapiente.
              </p>
            </div>

            <Nav justify className="col-12 gap-1" variant="pills">
              <Nav.Item>
                <Nav.Link className="border border-primary" eventKey="products">
                  منتجات
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className="border border-primary" eventKey="services">
                  خدمات
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>

          <Col className="">
            <Tab.Content style={{ minHeight: "250px" }}>
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
