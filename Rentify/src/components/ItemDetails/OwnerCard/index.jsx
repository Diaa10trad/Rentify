import { Card, Image, Stack } from "react-bootstrap";
import StarRating from "@/components/StarRating";
function OwnerCard({ person }) {
  console.log(person);
  return (
    <Card className="shadow border border-0 mt-3">
      <Card.Body className="">
        <Stack
          direction="horizontal"
          className="align-items-center flex-wrap flex-md-nowrap justify-content-center justify-content-sm-between"
        >
          <span className="d-flex align-items-center">
            <Image
              height={50}
              width={50}
              roundedCircle
              src={person.avatar}
              alt={`صورة المالك`}
              className="me-3 object-fit-cover"
            />
            <Card.Title className="m-0 fs-6">
              {person.firstName + " " + person.lastName}
            </Card.Title>
          </span>
          <Card.Text className="d-flex align-items-center gap-1 px-3 mb-0">
            <StarRating
              totalReviews={person.totalReviews}
              averageRating={person.averageRating}
            />
          </Card.Text>
        </Stack>
      </Card.Body>
    </Card>
  );
}

export default OwnerCard;
