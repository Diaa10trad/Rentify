import { Col, Row, Nav, Tab } from "react-bootstrap";
import AddItemListing from "@/components/AddItemListing";
export default function AddListingTabs() {
  return (
    <>
      <Tab.Container defaultActiveKey="item">
        <Row className="d-flex flex-column">
          <Col className="d-flex justify-content-center mb-5">
            <Nav justify className="gap-2 col-5" variant="pills">
              <Nav.Item>
                <Nav.Link eventKey="item">منتج</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="service">خدمة</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>

          <Col>
            <Tab.Content style={{ minHeight: "350px" }}>
              <Tab.Pane eventKey="item">
                <AddItemListing />
              </Tab.Pane>
              <Tab.Pane eventKey="service">
                <AddItemListing />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </>
  );
}
