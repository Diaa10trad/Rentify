import { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function DateFormGroup({ onDateChange }) {
  const today = new Date().toISOString().split("T")[0];
  const [selectedDates, setSelectedDates] = useState({
    fromDate: "-",
    toDate: "-",
  });
  const handleChange = (key, value) => {
    const newSelectedDates = { ...selectedDates, [key]: value };

    if (key === "fromDate" && value > newSelectedDates["toDate"] && value) {
      newSelectedDates["toDate"] = value;
    }
    if (key === "toDate" && value < newSelectedDates["fromDate"] && value) {
      newSelectedDates["fromDate"] = value;
    }

    setSelectedDates(newSelectedDates);
    onDateChange(newSelectedDates.fromDate, newSelectedDates.toDate);
  };
  return (
    <Form.Group as={Row} className="align-items-center">
      <Col>
        <Form.Label className="">من</Form.Label>
        <Form.Control
          className=""
          id="fromDate"
          type="date"
          min={today}
          required
          value={selectedDates["fromDate"]}
          isInvalid={!selectedDates["fromDate"]}
          onChange={(e) => handleChange("fromDate", e.target.value)}
        />
        <Form.Control.Feedback type="invalid">
          تاريخ البدء غير صالح
        </Form.Control.Feedback>
      </Col>

      <Col>
        <Form.Label className="">إلى</Form.Label>
        <Form.Control
          className=""
          id="toDate"
          type="date"
          min={today}
          required
          isInvalid={!selectedDates["toDate"]}
          value={selectedDates["toDate"]}
          onChange={(e) => handleChange("toDate", e.target.value)}
        />
        <Form.Control.Feedback type="invalid">
          تاريخ النهاية غير صالح
        </Form.Control.Feedback>
      </Col>
    </Form.Group>
  );
}

export default DateFormGroup;
