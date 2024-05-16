import {
  Container,
  Row,
  Col,
  Form,
  ButtonGroup,
  ToggleButton,
  Button,
} from "react-bootstrap";
import "./style.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function SearchBar() {
  const [radioValue, setRadioValue] = useState("1");
  const navigate = useNavigate();
  const radios = [
    { name: "منتج", value: "1" },
    { name: "خدمة", value: "2" },
  ];

  return (
    <Form className="p-2 shadow rounded-md-pill">
      <Row className="gap-2 align-items-center justify-content-between">
        <Col className="order-md-first">
          <Form.Control
            className="rounded-pill border  p-3"
            type="text"
            placeholder="عن ماذا تبحث؟"
          />
        </Col>
        <Col xs={12} md="auto" className="order-first">
          <Form.Group>
            <ButtonGroup className="w-100">
              {radios.map((radio, idx) => (
                <ToggleButton
                  key={idx}
                  id={`radio-${idx}`}
                  type="radio"
                  variant="outline-secondary"
                  name="radio"
                  value={radio.value}
                  checked={radioValue === radio.value}
                  onChange={(e) => setRadioValue(e.currentTarget.value)}
                >
                  {radio.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
          </Form.Group>
        </Col>
        <Col xs="auto" className="">
          <Button
            type="submit"
            style={{ width: 60, height: 60 }}
            className="rounded-circle text-white "
            onClick={() => navigate("/Results")}
          >
            ابحث
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
