import { Card, Image } from "react-bootstrap";
function Review({ review }) {
  return (
    <Card className="mb-3">
      <Card.Body className="p-0">
        <div className="d-flex text-white align-items-center bg-primary p-3 shadow rounded-bottom mb-3">
          <Image
            height={50}
            width={50}
            roundedCircle
            src={review.image}
            alt={`${review.reviewerName}`}
            className="me-3 object-fit-cover"
          />
          <div>
            <Card.Title>{review.reviewerName}</Card.Title>
            <Card.Subtitle className="text-white-50">
              {review.reviewDate}
            </Card.Subtitle>
          </div>
        </div>

        <Card.Text className="d-flex align-items-center gap-1 px-3 mb-0">
          <span className="fa fa-star text-primary"></span>
          <span className="fa fa-star text-primary"></span>
          <span className="fa fa-star text-primary"></span>
          <span className="fa fa-star text-primary"></span>
          <span className="fa fa-star"></span>
        </Card.Text>

        <Card.Text className="p-3">{review.comment}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Review;
