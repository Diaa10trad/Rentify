import { useState } from "react";
import { Col, Container, Row, Form } from "react-bootstrap";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

export default function AddItemLocationForm() {
  const [selectedCity, setSelectedCity] = useState("");

  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = {
    lat: 41.92793,
    lng: -73.99714,
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };
  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={9} lg={8}>
            <h4 className="text-center mb-3">الموقع</h4>
            <Form className="shadow p-4 rounded-5">
              <Row className="mb-3">
                <Form.Group as={Col} controlId="">
                  <Form.Label>المدينة</Form.Label>
                  <Form.Select
                    onChange={handleCityChange}
                    defaultValue="اختر المدينة"
                  >
                    <option>اختر المدينة</option>
                    <option>عمان</option>
                    <option>اربد</option>
                    <option>العقبة</option>
                  </Form.Select>
                </Form.Group>
                {selectedCity === "عمان" && (
                  <Form.Group as={Col} controlId="">
                    <Form.Label>الحي</Form.Label>
                    <Form.Select defaultValue="اختر الحي">
                      <option>اختر الحي</option>
                      <option>ضاحية الأمير حسن</option>
                      <option>طبربور</option>
                      <option>اللويبدة</option>
                    </Form.Select>
                  </Form.Group>
                )}
                {selectedCity === "اربد" && (
                  <Form.Group as={Col} controlId="">
                    <Form.Label>الحي</Form.Label>
                    <Form.Select defaultValue="اختر الحي">
                      <option>اختر الحي</option>
                      <option>الحي الجنوبي</option>
                      <option>الحي الشرقي</option>
                      <option>شارع الجامعة</option>
                    </Form.Select>
                  </Form.Group>
                )}
              </Row>

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
        </Row>
      </Container>
    </>
  );
}
