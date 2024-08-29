import { Col, Row, Form, Stack } from "react-bootstrap";
import { useState } from "react";
import LocationCitiesContainer from "@/containers/LocationCitiesContainer";
import LocationPicker from "../LocationPicker";
import SectionLine from "@/components/SectionLine";

export default function AddItemLocationForm({ setLocation }) {
  const [address, setAddress] = useState("");
  return (
    <>
      <Col xs={12} sm={10} md={9} lg={8} xxl={5}>
        <Stack className="align-items-center mb-3">
          <h4 className="text-center">الموقع</h4>
          <SectionLine backgroundColor="bg-primary" />
        </Stack>
        <Form className="shadow p-4 rounded-5">
          <Row>
            <Col md={12}>
              <LocationPicker
                setLocation={setLocation}
                setAddress={setAddress}
              />
            </Col>
          </Row>
        </Form>
      </Col>
    </>
  );
}
