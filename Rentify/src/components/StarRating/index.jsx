import { Card } from "react-bootstrap";
import "./style.css";
const StarRating = ({ averageRating, totalReviews }) => {
  // Calculate the number of filled stars and remaining empty stars
  const fullStars = Math.floor(averageRating);
  const hasHalfStar = averageRating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <Card.Text className="d-flex align-items-center gap-1">
      {/* Render filled stars */}
      {Array(fullStars)
        .fill()
        .map((_, index) => (
          <span
            key={`full-${index}`}
            className="fa fa-star text-primary"
          ></span>
        ))}

      {/* Render half star if necessary */}
      {hasHalfStar && (
        <span className="fa fa-star-half-full text-primary flip-horizontal"></span>
      )}

      {/* Render empty stars */}
      {Array(emptyStars)
        .fill()
        .map((_, index) => (
          <span key={`empty-${index}`} className="fa fa-star"></span>
        ))}

      {/* Display the rating and review count */}
      <span>
        {averageRating.toFixed(1)} ({totalReviews})
      </span>
    </Card.Text>
  );
};

export default StarRating;
