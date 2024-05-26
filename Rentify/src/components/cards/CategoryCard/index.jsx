import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
export default function CategoryCard({ category }) {
  return (
    <Container fluid>
      <Stack className="p-5 my-5 bg-white text-black rounded shadow gap-4 align-items-center">
        <img draggable={false} src={category.icon} alt="Category" />
        <h6 className="text-nowrap">{category.title}</h6>
      </Stack>
    </Container>
  );
}
