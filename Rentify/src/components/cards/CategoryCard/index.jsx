import { Container, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function CategoryCard({ category }) {
  return (
    <Container fluid>
      <Link to="/results" className="text-decoration-none">
        <Stack className="p-5 my-5 bg-white text-black rounded shadow gap-4 align-items-center">
          <img draggable={false} src={category.icon} alt="Category" />
          <h6 className="text-nowrap">{category.categoryName}</h6>
        </Stack>
      </Link>
    </Container>
  );
}
