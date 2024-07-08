import Form from "react-bootstrap/Form";

export default function CategoriesForm({
  categories,
  selectedCategories,
  setSelectedCategories,
}) {
  return (
    <Form.Group>
      {categories.map((category, index) => (
        <Form.Check
          key={index}
          type="checkbox"
          label={category}
          id={category}
          checked={selectedCategories[`Category${index}`] == category}
          onChange={(event) => {
            const newSelectedCategories = { ...selectedCategories };
            if (event.target.checked) {
              newSelectedCategories[`Category${index}`] = category;
            } else {
              delete newSelectedCategories[`Category${index}`];
            }
            setSelectedCategories(newSelectedCategories);
          }}
        />
      ))}
    </Form.Group>
  );
}
