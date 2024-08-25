import { Col, Row, Form, Stack } from "react-bootstrap";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import LocationCitiesContainer from "@/containers/LocationCitiesContainer";
import LocationPicker from "../LocationPicker";
import SectionLine from "@/components/SectionLine";

export default function AddItemLocationForm() {
  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = {
    lat: 41.92793,
    lng: -73.99714,
  };

  return (
    <>
      <Col xs={12} sm={10} md={9} lg={8}>
        <Stack className="align-items-center mb-3">
          <h4 className="text-center">الموقع</h4>
          <SectionLine backgroundColor="bg-primary" />
        </Stack>
        <Form className="shadow p-4 rounded-5">
          <LocationCitiesContainer />

          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>العنوان</Form.Label>
            <Form.Control
              placeholder="أدخل العنوان..."
              className="border border-0 p-2"
              style={{ backgroundColor: "#f4f9f9" }}
            />
          </Form.Group>

          <Row>
            <Col md={12}>
              <LocationPicker />
            </Col>
          </Row>
        </Form>
      </Col>
    </>
  );
}
