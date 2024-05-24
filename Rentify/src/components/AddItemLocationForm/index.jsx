import { Col, Row, Form } from "react-bootstrap";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import LocationCitiesContainer from "@/containers/LocationCitiesContainer";

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
        <h4 className="text-center mb-3">الموقع</h4>
        <Form className="shadow p-4 rounded-5">
          <LocationCitiesContainer />

          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>العنوان</Form.Label>
            <Form.Control placeholder="أدخل العنوان..." />
          </Form.Group>

          <Row>
            <Col md={12}>
              <LoadScript googleMapsApiKey="AIzaSyCBzbNOF_qefJWGRebbZRpJq3iu4gvpumQ">
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={center}
                  zoom={14}
                >
                  <Marker position={center} />
                </GoogleMap>
              </LoadScript>
            </Col>
          </Row>
        </Form>
      </Col>
    </>
  );
}
