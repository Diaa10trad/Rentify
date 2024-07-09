import Form from "react-bootstrap/Form";

export default function DeliveryOptionsForm({
  deliveryOptions,
  selectedDeliveryOptions,
  setSelectedDeliveryOptions,
}) {
  return (
    <Form.Group>
      {deliveryOptions.map((option, index) => (
        <Form.Check
          key={index}
          type="checkbox"
          label={option}
          id={option}
          checked={selectedDeliveryOptions[`DeliveryOption${index}`] == option}
          onChange={(event) => {
            setSelectedDeliveryOptions({
              ...selectedDeliveryOptions,
              [`DeliveryOption${index}`]: event.target.checked ? option : "",
            });
          }}
        />
      ))}
    </Form.Group>
  );
}
