import { Row, Col, Card, Image } from "react-bootstrap";

function ChatMessage({ message }) {
  const { text, sender, isSender, sentAt } = message;

  return (
    <Row
      className={`my-3 ${
        isSender ? "justify-content-start" : "justify-content-end"
      }`}
    >
      <Col xs={10} md={8} lg={4}>
        <Card
          className={`${
            isSender ? "bg-primary text-white text-start" : "bg-light text-end"
          }`}
        >
          <Card.Body className="">
            <Row className="">
              <Col xs={12}>
                <Card.Text className="mb-0 text-wrap">{text}</Card.Text>
              </Col>
              <Col xs={12} className="">
                <small className="text-muted">{sentAt}</small>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default ChatMessage;
