import { Container, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
export default function CategoryCard({ category }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(
      `/Results/?type=${category.categoryType}&Category${category.id}=${category.categoryName}&PageNumber=1`
    );
  };

  console.log(category);
  return (
    <Container
      onClick={handleClick}
      fluid
      className="category-card "
      style={{ cursor: "pointer" }}
    >
      <Stack className="p-5 my-5 bg-white text-black rounded shadow gap-4 align-items-center">
        <img
          draggable={false}
          src={category.icon}
          alt="Category"
          className="zoom-in-effect"
        />
        <h6 className="text-nowrap zoom-in-effect">{category.categoryName}</h6>
      </Stack>
    </Container>
  );
}
