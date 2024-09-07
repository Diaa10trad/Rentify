import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import AccordionItemList from "@/components/Results/AccordionItemList";
import { useSearchParams } from "react-router-dom";
import { useRef, useState } from "react";

export default function FilterSidebar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const childRefs = useRef({});

  const buildUrl = (Data) => {
    const newParams = Object.assign({}, ...Data);
    const updatedParams = new URLSearchParams(searchParams);
    if (latitude !== null && longitude !== null) {
      updatedParams.set("latitude", latitude);
      updatedParams.set("longitude", longitude);
    }
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
  navigator.geolocation.getCurrentPosition((position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  });

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
