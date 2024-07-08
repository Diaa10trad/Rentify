import Form from "react-bootstrap/Form";
export default function QuantityForm({ quantity, setQuantity }) {
  return (
    <Form.Group>
      <Form.Control
        className="text-start"
        type="number"
        min={1}
        step={1}
        value={quantity || ""}
        onChange={(e) => {
          setQuantity(e.target.value);
        }}
        placeholder="الكمية"
      />
    </Form.Group>
  );
}
