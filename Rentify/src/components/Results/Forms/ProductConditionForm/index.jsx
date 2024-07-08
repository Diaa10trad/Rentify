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
            const newSelectedProductConditions = {
              ...selectedProductConditions,
            };
            if (event.target.checked) {
              newSelectedProductConditions[`ProductCondition${index}`] =
                condition;
            } else {
              delete newSelectedProductConditions[`ProductCondition${index}`];
            }
            setSelectedProductConditions(newSelectedProductConditions);
          }}
        />
      ))}
    </Form.Group>
  );
}
