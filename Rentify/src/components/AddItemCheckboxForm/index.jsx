import { Col, Container, Form, Row } from "react-bootstrap";

export default function AddItemCheckboxForm() {
  return (
    <>
      <Col xs={12} sm={10} md={9} lg={8}>
        <h4 className="text-center mb-3">خيارات أخرى</h4>
        <Form className="shadow p-4 rounded-5">
          <Row className="flex-row gy-3 ">
            {Array.from({ length: 10 }, (_, index) => (
              <Col key={index} xs={6} sm={4}>
                <Form.Check
                  type="checkbox"
                  id="default-checkbox"
                  label="خَيار"
                />
              </Col>
            ))}
          </Row>
        </Form>
      </Col>
    </>
  );
}
