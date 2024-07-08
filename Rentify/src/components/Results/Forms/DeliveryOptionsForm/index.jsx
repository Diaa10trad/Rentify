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
            const newSelectedDeliveryOptions = {
              ...selectedDeliveryOptions,
            };
            if (event.target.checked) {
              newSelectedDeliveryOptions[`DeliveryOption${index}`] = option;
            } else {
              delete newSelectedDeliveryOptions[`DeliveryOption${index}`];
            }
            setSelectedDeliveryOptions(newSelectedDeliveryOptions);
          }}
        />
      ))}
    </Form.Group>
  );
}
