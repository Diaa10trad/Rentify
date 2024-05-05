import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
export default function CategoryCard({ category }) {
  return (
    <Container fluid>
      <Stack className="p-5 my-5 bg-white text-black rounded shadow gap-3 align-items-center">
        <img
          draggable={false}
          style={{ width: "100px", borderRadius: "30px" }}
          src={category.icon}
          alt="Category"
        />
        <h5 className="text-nowrap">{category.title}</h5>
      </Stack>
    </Container>
  );
}
