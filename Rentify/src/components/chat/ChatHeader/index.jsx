import { Card, Col, Stack, Image, Button } from "react-bootstrap";
import ChatBookingForm from "@/components/chat/ChatBookingForm";
import { getToken, getSenderId } from "@/utils/AuthUtils";
function ChatHeader({ chat, bookingDetails, setBookingDetails, onSend }) {
  const token = getToken();
  const senderId = getSenderId(token);

  const receiver =
    chat.userOne.userId !== senderId ? chat.userOne : chat.userTwo;

  return (
    <Card
      as={Col}
      style={{ maxHeight: "100px" }}
      className="shadow border border-0"
    >
      <Card.Body className="d-flex justify-content-between">
        <Stack
          direction="horizontal"
          className="align-items-center flex-wrap flex-md-nowrap"
        >
          <Image
            height={50}
            width={50}
            roundedCircle
            src={receiver.avatar}
            alt="User"
            className="me-3 object-fit-cover"
          />
          <span>
            <Card.Title className="m-0 fs-5">
              {receiver.firstName} {receiver.lastName}
            </Card.Title>
          </span>
        </Stack>

        {bookingDetails
          ? bookingDetails.ownerId === senderId &&
            bookingDetails.status == "pending" && (
              <ChatBookingForm
                bookingDetails={bookingDetails}
                setBookingDetails={setBookingDetails}
                onSend={onSend}
              />
            )
          : ""}
      </Card.Body>
    </Card>
  );
}

export default ChatHeader;
