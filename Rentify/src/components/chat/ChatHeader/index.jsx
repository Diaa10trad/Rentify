import { Card, Col, Stack, Image, Button } from "react-bootstrap";
import ChatBookingForm from "@/components/chat/ChatBookingForm";

const ChatHeader = ({ chat, receiverId }) => {
  const receiver =
    chat.userOne.userId === receiverId ? chat.userOne : chat.userTwo;
  return (
    <Card as={Col} className="shadow border border-0">
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
            <Card.Title className="m-0 fs-6">
              {receiver.firstName} {receiver.lastName}
            </Card.Title>
          </span>
        </Stack>

        {<ChatBookingForm />}
      </Card.Body>
    </Card>
  );
};

export default ChatHeader;