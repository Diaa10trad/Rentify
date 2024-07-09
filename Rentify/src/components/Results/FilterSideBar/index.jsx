import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import AccordionItemList from "@/components/Results/AccordionItemList";
import { useSearchParams } from "react-router-dom";
import { useRef } from "react";

export default function FilterSidebar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const childRefs = useRef({});

  const buildUrl = (Data) => {
    const newParams = Object.assign({}, ...Data);
    const updatedParams = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([key, value]) => {
      if (value != null && value !== "" && value !== undefined) {
        updatedParams.set(key, value);
      } else {
        updatedParams.delete(key);
      }
    });

    return updatedParams;
  };
  const collectFormData = () => {
    return Object.keys(childRefs.current).map((key) =>
      childRefs.current[key].getData()
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = collectFormData();
    const queryString = buildUrl(formData);
    setSearchParams(queryString);
  };
  return (
    <Accordion className="w-100 shadow" defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>تصفية</Accordion.Header>
        <Accordion.Body>
          <Form onSubmit={handleSubmit}>
            <Accordion className="mb-4" defaultActiveKey={["0"]} alwaysOpen>
              <AccordionItemList ref={childRefs} />
            </Accordion>
            <Button
              className="w-100 text-white"
              variant="primary"
              type="submit"
            >
              تصفية
            </Button>
          </Form>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
