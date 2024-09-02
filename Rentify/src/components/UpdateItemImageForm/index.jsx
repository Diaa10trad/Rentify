import { useState, useEffect } from "react";
import { Col, Form, Button, Stack, Image, CloseButton } from "react-bootstrap";
import SectionLine from "@/components/SectionLine";

export default function UpdateItemImageForm({ images, setImages }) {
  const [localImages, setLocalImages] = useState([]);

  useEffect(() => {
    if (images && images.length > 0) {
      setLocalImages(images);
    }
  }, [images]);

  const handleChange = (e) => {
    const files = Array.from(e.target.files);
    setLocalImages((prevImages) => [...prevImages, ...files]);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleDelete = (index) => {
    const updatedLocalImages = [...localImages];
    updatedLocalImages.splice(index, 1);
    setLocalImages(updatedLocalImages);
    setImages(updatedLocalImages);
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

          {/* Image preview with delete option */}
          <Stack
            direction="horizontal"
            gap={2}
            className="flex-wrap justify-content-start"
          >
            {localImages.map((image, index) => {
              // Use the imageUrl directly if it exists, otherwise create an object URL
              const src = image.imageUrl || URL.createObjectURL(image);

              return (
                <div
                  key={index}
                  className="border border-2 p-1 position-relative"
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                >
                  <Image
                    src={src}
                    alt="Uploaded preview"
                    fluid
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                  <CloseButton
                    onClick={() => handleDelete(index)}
                    className="position-absolute top-0 end-0 m-1"
                    style={{
                      backgroundColor: "white",
                      borderRadius: "50%",
                    }}
                  />
                </div>
              );
            })}
            {/* Empty squares */}
            {localImages.length < 6 &&
              [...Array(6 - localImages.length)].map((_, index) => (
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
