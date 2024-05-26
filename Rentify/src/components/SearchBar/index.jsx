import {
  Row,
  Col,
  Form,
  ButtonGroup,
  ToggleButton,
  Button,
} from "react-bootstrap";
import "./style.css";

export default function SearchBar({
  onSubmit,
  query,
  selectedType,
  onTypeChange,
}) {
  return (
    <Form onSubmit={onSubmit} className="p-2 shadow rounded-md-pill">
      <Row className="gap-2 align-items-center justify-content-between">
        <Col className="order-md-first">
          <Form.Control
            className="rounded-pill border  p-3"
            type="text"
            onChange={(e) => (query.current = e.target.value)}
            placeholder="عن ماذا تبحث؟"
          />
        </Col>
        <Col xs={12} md="auto" className="order-first">
          <Form.Group>
            <ButtonGroup className="w-100">
              <ToggleButton
                id="منتج"
                type="radio"
                variant="outline-secondary"
                name="منتج"
                value="منتج"
                checked={selectedType === "منتج"}
                onChange={onTypeChange}
              >
                منتج
              </ToggleButton>
              <ToggleButton
                id="خدمة"
                type="radio"
                variant="outline-secondary"
                name="خدمة"
                value="خدمة"
                checked={selectedType === "خدمة"}
                onChange={onTypeChange}
              >
                خدمة
              </ToggleButton>
            </ButtonGroup>
          </Form.Group>
        </Col>
        <Col xs="auto" className="">
          <Button
            type="submit"
            style={{ width: 60, height: 60 }}
            className="rounded-circle text-white "
          >
            ابحث
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
