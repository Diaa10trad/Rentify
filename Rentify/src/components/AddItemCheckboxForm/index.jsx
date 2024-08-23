import { Col, Form, Row, Stack } from "react-bootstrap";
import SectionLine from "@/components/SectionLine";
export default function AddItemCheckboxForm() {
  return (
    <>
      <Col xs={12} sm={10} md={9} lg={8}>
        <Stack className="align-items-center mb-3">
          <h4 className="text-center">خيارات أخرى</h4>
          <SectionLine backgroundColor="bg-primary" />
        </Stack>

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
