import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function FilterSidebar() {
  return (
    <Accordion className="w-100 shadow" defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>تصفية</Accordion.Header>
        <Accordion.Body>
          <Form>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>خيارات التسليم</Accordion.Header>
                <Accordion.Body>
                  <div className="mb-3">
                    <Form.Check // prettier-ignore
                      type="checkbox"
                      id="خدمة التوصيل"
                      label="خدمة التوصيل"
                    />

                    <Form.Check
                      type="checkbox"
                      label="الاستلام بمكان عام"
                      id="الاستلام بمكان عام"
                    />
                    <Form.Check
                      type="checkbox"
                      label="التسليم من منزل المالك"
                      id="التسليم من منزل المالك"
                    />
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Button variant="primary" type="submit">
              تصفية
            </Button>
          </Form>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
