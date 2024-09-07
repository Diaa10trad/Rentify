import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Accordion from "react-bootstrap/Accordion";
import { useAccordionButton } from "react-bootstrap/AccordionButton";

import "./styles.css";
import FAQImage from "@/assets/images/FAQ.jpg";
import SectionLine from "../SectionLine";
const faqData = [
  {
    question: "سؤال 1",
    answer: "جواب 1",
  },
  {
    question: "سؤال 2",
    answer: "جواب 2",
  },
  {
    question: "سؤال 3",
    answer: "جواب 3",
  },
  {
    question: "سؤال 4",
    answer: "جواب 4",
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
    <Container className="p-4" fluid>
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
          <h2 className="text-md-start text-center mb-2 text-dark">
            الأسئلة الأكثر تكرارًا
          </h2>
          <SectionLine backgroundColor={"bg-primary"} />
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
