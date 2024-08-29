import { useState } from "react";
import { Col, Form, Button, Stack, Image } from "react-bootstrap";
import SectionLine from "@/components/SectionLine";

export default function AddItemImageForm({ setImages }) {
  const [images, setLocalImages] = useState([]);

  const handleChange = (e) => {
    const files = Array.from(e.target.files);
    setLocalImages((prevImages) => [...prevImages, ...files]);
    setImages((prevImages) => [...prevImages, ...files]);
  };
  return (
    <>
      <Col xs={12} sm={10} md={9} lg={8} xxl={5}>
        <Stack className="align-items-center mb-3">
          <h4 className="text-center">صور الإعلان</h4>
          <SectionLine backgroundColor="bg-primary" />
        </Stack>
        <Form className="shadow p-4 rounded-5">
          <Form.Group className="mb-3">
            <Form.Label>الصور</Form.Label>
            <Form.Control
              type="file"
              id="itemImagesInput"
              multiple
              onChange={handleChange}
              className="border border-0 p-2"
              style={{ backgroundColor: "#f4f9f9", display: "none" }}
            />
          </Form.Group>

          {/* Image preview */}
          <Stack
            direction="horizontal"
            gap={2}
            className="flex-wrap justify-content-start"
          >
            {images.map((image, index) => (
              <div
                key={index}
                className="border border-2 p-1"
                style={{
                  width: "100px",
                  height: "100px",
                  position: "relative",
                }}
              >
                <Image
                  src={URL.createObjectURL(image)}
                  alt="Uploaded preview"
                  fluid
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </div>
            ))}
            {/* Empty squares */}
            {images.length < 6 &&
              [...Array(6 - images.length)].map((_, index) => (
                <div
                  key={`empty-${index}`}
                  className="border border-2 p-1 rounded fw-normal d-flex align-items-center justify-content-center"
                  style={{
                    width: "100px",
                    height: "100px",
                    backgroundColor: "#f4f9f9",
                    color: "gray",
                  }}
                >
                  صورة
                </div>
              ))}
          </Stack>

          <Button
            className="text-white mt-3"
            onClick={() => document.getElementById("itemImagesInput").click()}
          >
            إضافة صور
          </Button>
        </Form>
      </Col>
    </>
  );
}
