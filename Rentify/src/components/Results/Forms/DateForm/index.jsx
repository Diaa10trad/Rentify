import Form from "react-bootstrap/Form";

export default function DateForm({ selectedDates, onChange }) {
  const today = new Date().toISOString().split("T")[0];
  return (
    <Form.Group>
      <Form.Label>من</Form.Label>
      <Form.Control
        id="fromDate"
        type="date"
        min={today}
        value={selectedDates["fromDate"] || ""}
        onChange={(e) => {
          onChange("fromDate", e.target.value);
        }}
      />

      <Form.Label>إلى</Form.Label>
      <Form.Control
        id="toDate"
        type="date"
        min={today}
        value={selectedDates["toDate"] || ""}
        onChange={(e) => {
          onChange("toDate", e.target.value);
        }}
      />
    </Form.Group>
  );
}
