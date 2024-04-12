import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Accordion from "react-bootstrap/Accordion";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import Card from "react-bootstrap/Card";
import "./styles.css";
import FAQImage from "../../assets/images/FAQ.jpg";

const faqData = [
  {
    question: "Question 1",
    answer: "Answer 1",
  },
  {
    question: "Question 2",
    answer: "Answer 2",
  },
  {
    question: "Question 3",
    answer: "Answer 3",
  },
  {
    question: "Question 4",
    answer: "Answer 4",
  },
];
function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey, () =>
    console.log("totally custom!")
  );

  return (
    <button type="button" onClick={decoratedOnClick}>
      {children}
    </button>
  );
}

export default function FAQSection() {
  return (
    <Container className="border p-4 bg-primary" fluid>
      <Row>
        <Col md={4} className="d-none d-md-block">
          <Image
            className="object-fit-contain h-100 w-100"
            src={FAQImage}
            alt="FAQ"
            fluid
          />
        </Col>
        <Col md={8}>
          <h2 className="text-md-start text-center mb-4 text-dark">
            الأسئلة الأكثر تكرارًا
          </h2>
          <Accordion>
            {faqData.map((faq, index) => (
              <Accordion.Item
                className="border-1 border-dark mb-3 p-2"
                eventKey={index}
                style={{ borderTop: "1px solid #dee2e6" }}
                key={index}
              >
                <Accordion.Header>
                  {index + 1}. {faq.question}
                </Accordion.Header>
                <Accordion.Body className="text-secondary">
                  {faq.answer}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
}
