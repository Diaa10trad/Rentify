import { Card, Image } from "react-bootstrap";
function Review({ review }) {
  const fullStars = Math.floor(review.rating);
  const emptyStars = 5 - fullStars;
  return (
    <Card className="mb-3">
      <Card.Body className="p-0">
        <div className="d-flex text-white align-items-center bg-primary p-3 shadow rounded-bottom mb-3">
          <Image
            height={50}
            width={50}
            roundedCircle
            src={review.reviewer.avatar}
            alt={`${review.reviewer.firstName} ${review.reviewer.lastName}`}
            className="me-3 object-fit-cover"
          />
          <div>
            <Card.Title>
              {review.reviewer.firstName} {review.reviewer.lastName}
            </Card.Title>
            <Card.Subtitle className="text-white-50">
              {new Date(review.createdAt).toLocaleDateString()}
            </Card.Subtitle>
          </div>
        </div>

        <Card.Text className="d-flex align-items-center gap-1 px-3 mb-0">
          {Array(fullStars)
            .fill()
            .map((_, index) => (
              <span
                key={`full-${index}`}
                className="fa fa-star text-primary"
              ></span>
            ))}
          {Array(emptyStars)
            .fill()
            .map((_, index) => (
              <span key={`empty-${index}`} className="fa fa-star"></span>
            ))}
        </Card.Text>

        <Card.Text className="p-3">{review.comment}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Review;
