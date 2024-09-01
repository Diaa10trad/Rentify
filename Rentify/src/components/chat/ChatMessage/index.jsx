import { Row, Col, Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
function ChatMessage({ message }) {
  return (
    <Row
      className={`my-3 ${
        message.isSender ? "justify-content-start" : "justify-content-end"
      }`}
    >
      <Col xs={10} md={8} lg={4}>
        <Card
          className={`${
            message.isSender
              ? "bg-primary text-white text-start"
              : "bg-light text-end"
          }`}
        >
          <Card.Body className="">
            <Row className="">
              <Col xs={12}>
                <Card.Text className="mb-0 text-wrap">
                  {message.message.type === "text" ? (
                    message.message.data
                  ) : message.message.data.bookingId == null ? (
                    message.message.data.itemType === "product" ? (
                      <LinkContainer
                        to={`/product/${message.message.data.itemId}`}
                      >
                        <Button
                          className={
                            message.isSender ? "text-white" : "text-black"
                          }
                          variant="link"
                        >
                          أريد هذا المنتج
                        </Button>
                      </LinkContainer>
                    ) : (
                      <LinkContainer
                        to={`/service/${message.message.data.itemId}`}
                      >
                        <Button
                          className={
                            message.isSender ? "text-white" : "text-black"
                          }
                          variant="link"
                        >
                          أريد هذه الخدمة
                        </Button>
                      </LinkContainer>
                    )
                  ) : (
                    "شاهد"
                  )}
                </Card.Text>
              </Col>
              <Col xs={12} className="">
                <small className="text-muted">{message.sentAt}</small>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default ChatMessage;
