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
          key={category.id}
          type="checkbox"
          label={category.categoryName}
          id={category.categoryName}
          checked={
            selectedCategories[`Category${category.id}`] ==
            category.categoryName
          }
          onChange={(event) => {
            setSelectedCategories({
              ...selectedCategories,
              [`Category${category.id}`]: event.target.checked
                ? category.categoryName
                : "",
            });
          }}
        />
      ))}
    </Form.Group>
  );
}
