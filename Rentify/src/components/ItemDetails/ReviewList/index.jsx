import { Card, Image, ListGroup, Stack } from "react-bootstrap";
import Person from "@/assets/images/Person.jpg";

function ReviewList() {
  const fakeReviews = [
    {
      reviewerName: "John Doe",
      rating: 4,
      reviewDate: "2024-07-11",
      comment: `Great product, highly recommended!
      Great product, highly recommended!
      Great product, highly recommended!
      Great product, highly recommended!
      Great product, highly recommended!
      Great product, highly recommended!
      Great product, highly recommended!
      Great product, highly recommended!
      Great product, highly recommended!
      Great product, highly recomm
      
      
      
      
      ended!`,
    },
    {
      reviewerName: "Jane Smith",
      rating: 5,
      reviewDate: "2024-07-10",
      comment: "Excellent service and fast delivery.",
    },
    {
      reviewerName: "Michael Johnson",
      rating: 3,
      reviewDate: "2024-07-09",
      comment: "Product was okay, could be better.",
    },
    {
      reviewerName: "Emily Brown",
      rating: 5,
      reviewDate: "2024-07-08",
      comment: "Absolutely love it! Best purchase ever.",
    },
    {
      reviewerName: "Emily Brown",
      rating: 5,
      reviewDate: "2024-07-08",
      comment: "Absolutely love it! Best purchase ever.",
    },
    {
      reviewerName: "Emily Brown",
      rating: 5,
      reviewDate: "2024-07-08",
      comment: "Absolutely love it! Best purchase ever.",
    },
    {
      reviewerName: "Emily Brown",
      rating: 5,
      reviewDate: "2024-07-08",
      comment: "Absolutely love it! Best purchase ever.",
    },
  ];

  return (
    <>
      <h3 className="mb-3">المراجعات والتقييمات ({fakeReviews.length})</h3>
      <div style={{ height: "400px" }} className="overflow-y-auto pe-3 mb-4">
        {fakeReviews.map((review, index) => (
          <Card key={index} className="mb-3">
            <Card.Body className="p-0">
              <div className="d-flex text-white align-items-center bg-primary p-3 shadow rounded-bottom mb-3">
                <Image
                  height={50}
                  width={50}
                  roundedCircle
                  src={Person}
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
        ))}
      </div>
    </>
  );
}

export default ReviewList;
