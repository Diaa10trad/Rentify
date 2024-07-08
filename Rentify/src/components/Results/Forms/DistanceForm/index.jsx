import Form from "react-bootstrap/Form";
export default function DistanceForm({ distance, setDistance }) {
  return (
    <Form.Group>
      <Form.Control
        className="text-start"
        type="number"
        min={0.0}
        step={0.5}
        value={distance || ""}
        onChange={(e) => {
          setDistance(e.target.value);
        }}
        placeholder="المسافة بالكيلومترات"
      />
    </Form.Group>
  );
}
