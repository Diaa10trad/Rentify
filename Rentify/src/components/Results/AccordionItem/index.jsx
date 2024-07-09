import React from "react";
import Accordion from "react-bootstrap/Accordion";

export default function AccordionItem({ eventKey, header, children }) {
  return (
    <Accordion.Item eventKey={eventKey.toString()}>
      <Accordion.Header>{header}</Accordion.Header>
      <Accordion.Body>{children}</Accordion.Body>
    </Accordion.Item>
  );
}
