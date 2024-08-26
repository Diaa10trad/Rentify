import { Container, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./style.css";
export default function CategoryCard({ category }) {
  return (
    <Container fluid className="category-card ">
      <Link to="/results" className="text-decoration-none">
        <Stack className="p-5 my-5 bg-white text-black rounded shadow gap-4 align-items-center">
          <img
            draggable={false}
            src={category.icon}
            alt="Category"
            className="zoom-in-effect"
          />
          <h6 className="text-nowrap zoom-in-effect">
            {category.categoryName}
          </h6>
        </Stack>
      </Link>
    </Container>
  );
}
