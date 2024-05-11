import {
  Container,
  Row,
  Col,
  Form,
  ButtonGroup,
  ToggleButton,
  Button,
} from "react-bootstrap";
import { useState } from "react";
export default function SearchBar() {
  const [radioValue, setRadioValue] = useState("1");
  const radios = [
    { name: "منتج", value: "1" },
    { name: "خدمة", value: "2" },
  ];

  return (
    <Container>
      <Row>
        <Form className="d-flex align-items-center w-100 gap-3 p-2 rounded-pill shadow">
          <Form.Control
            className="rounded-pill border border-0 p-3"
            type="text"
            placeholder="عن ماذا تبحث؟"
          />
          <Form.Group className="border border-dark flex-grow-1">
            <ButtonGroup>
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
          <Button
            type="submit"
            style={{ width: 60, height: 60 }}
            className="rounded-circle text-white"
          >
            ابحث
          </Button>
        </Form>
      </Row>
    </Container>
  );
}
