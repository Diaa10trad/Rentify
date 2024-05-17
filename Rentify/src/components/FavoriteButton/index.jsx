import { useState } from "react";
import Button from "react-bootstrap/Button";

export default function FavoriteButton() {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleClick = () => {
    setIsFavorite(!isFavorite);
  };
  const BacgroundedFavorite = isFavorite ? "bg-primary" : " ";
  return (
    <Button
      className={
        "text-white border border-white text-center " + BacgroundedFavorite
      }
      as="div"
      variant="outline-primary"
      onClick={handleClick}
    >
      {isFavorite ? (
        <span className="fa fa-heart text-white"></span>
      ) : (
        <span className="fa fa-heart text-white"></span>
      )}
    </Button>
  );
}
