import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function BookingForm() {
  const today = new Date().toISOString().split("T")[0];
  return (
    <Form className="">
      <Form.Group as={Row} className="align-items-center">
        <Col>
          <Form.Label className="">من</Form.Label>
          <Form.Control className="" id="fromDate" type="date" min={today} />
        </Col>

        <Col>
          <Form.Label className="">إلى</Form.Label>
          <Form.Control className="" id="toDate" type="date" min={today} />
        </Col>
      </Form.Group>

      {/* <Form.Group as={Row} className="gap-3 mt-3 align-items-center">
        <Col>
          <Form.Label className="">العدد</Form.Label>
          <Form.Control
            className="text-start"
            id="quantity"
            type="number"
            min={1}
          />
        </Col>
      </Form.Group> */}

      <div className="d-grid gap-2">
        <Button
          className="fs-5 p-2 mt-3 text-white"
          variant="primary"
          type="submit"
        >
          اطلب الآن
        </Button>
      </div>
    </Form>
  );
}

export default BookingForm;
