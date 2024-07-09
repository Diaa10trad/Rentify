import Form from "react-bootstrap/Form";

export default function ProductConditionForm({
  productConditions,
  selectedProductConditions,
  setSelectedProductConditions,
}) {
  return (
    <Form.Group>
      {productConditions.map((condition, index) => (
        <Form.Check
          key={index}
          type="checkbox"
          label={condition}
          id={condition}
          checked={
            selectedProductConditions[`ProductCondition${index}`] == condition
          }
          onChange={(event) => {
            setSelectedProductConditions({
              ...selectedProductConditions,
              [`ProductCondition${index}`]: event.target.checked
                ? condition
                : "",
            });
          }}
        />
      ))}
    </Form.Group>
  );
}
