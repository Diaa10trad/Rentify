import { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";

export default function LocationCitiesContainer() {
  const [selectedCity, setSelectedCity] = useState("");
  const cities = [
    { id: 0, city: "اختر المدينة", neighborhoods: ["اختر الحي"] },

    {
      id: 1,
      city: "عمان",
      neighborhoods: ["اختر الحي", "ضاحية الأمير حسن", "طبربور", "اللويبدة"],
    },
    {
      id: 2,
      city: "اربد",
      neighborhoods: [
        "اختر الحي",
        "شارع الجامعة",
        "الحي الشرقي",
        "الحي الجنوبي",
      ],
    },
  ];

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const selectedCityObj = cities.find((city) => city.city === selectedCity);

  return (
    <>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="">
          <Form.Label>المدينة</Form.Label>
          <Form.Select onChange={handleCityChange} defaultValue="اختر المدينة">
            {cities.map((city) => (
              <option key={city.id}>{city.city}</option>
            ))}
          </Form.Select>
        </Form.Group>
        {selectedCityObj && (
          <Form.Group as={Col} controlId="">
            <Form.Label>الحي</Form.Label>
            <Form.Select defaultValue="اختر الحي">
              {selectedCityObj.neighborhoods.map((neighborhood) => (
                <option key={neighborhood}>{neighborhood}</option>
              ))}
            </Form.Select>
          </Form.Group>
        )}
      </Row>
    </>
  );
}
