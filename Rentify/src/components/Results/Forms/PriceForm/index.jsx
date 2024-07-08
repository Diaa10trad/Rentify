import Form from "react-bootstrap/Form";

export default function PriceForm({
  label,
  idPrefix,
  price,
  onPriceChange,
  onPriceBlur,
}) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type="number"
        placeholder="من"
        className="text-start"
        min={0}
        step={0.05}
        value={price[`${idPrefix}From`] || ""}
        onBlur={(e) => {
          onPriceBlur(`${idPrefix}From`, e.target.value);
        }}
        onChange={(e) => {
          onPriceChange(`${idPrefix}From`, e.target.value);
        }}
      />
      <Form.Control
        type="number"
        placeholder="إلى"
        className="text-start"
        min={0}
        step={0.05}
        value={price[`${idPrefix}To`] || ""}
        onBlur={(e) => {
          onPriceBlur(`${idPrefix}To`, e.target.value);
        }}
        onChange={(e) => {
          onPriceChange(`${idPrefix}To`, e.target.value);
        }}
      />
    </Form.Group>
  );
}
