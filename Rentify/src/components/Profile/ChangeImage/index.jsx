import React, { useState, useRef } from "react";
import { Form, Button, Image, Modal } from "react-bootstrap";
import Webcam from "react-webcam";
function ChangeImage({ userAvatar, setUserAvatar }) {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const webcamRef = useRef(null);
  const [isRetaking, setIsRetaking] = useState(false);
  const handleRetake = () => {
    setIsRetaking(true);
  };
  const handleCapture = () => {
    const screenshot = webcamRef.current.getScreenshot();
    setUserAvatar(screenshot);

    setIsRetaking(false);
  };
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserAvatar(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  return (
    <Form.Group className="d-flex flex-column align-items-center">
      <Form.Label>
        <Image
          thumbnail
          height={150}
          width={150}
          src={userAvatar}
          alt={`صورة المالك`}
          className="object-fit-cover"
        />
      </Form.Label>

      <Button
        variant="none"
        size="sm"
        style={{ width: "fit-content" }}
        className="text-primary border"
        onClick={() => document.getElementById("avatarInput").click()}
      >
        تغيير الصورة
      </Button>
      <Form.Control
        type="file"
        id="avatarInput"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <Button
        variant="none"
        size="sm"
        style={{ width: "fit-content", marginTop: "10px" }}
        className="text-primary border"
        onClick={() => setIsCameraOpen(true)}
      >
        فتح الكاميرا
      </Button>

      <Modal show={isCameraOpen} onHide={() => setIsCameraOpen(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>التقط صورة</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column align-items-center">
          {isRetaking ? (
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={300}
              height={300}
            />
          ) : (
            <Image
              thumbnail
              height={300}
              width={300}
              src={userAvatar}
              alt="Preview"
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          {isRetaking ? (
            <Button variant="primary" onClick={handleCapture}>
              التقط صورة
            </Button>
          ) : (
            <Button variant="primary" onClick={handleRetake}>
              لقطة جديدة
            </Button>
          )}
          <Button variant="secondary" onClick={() => setIsCameraOpen(false)}>
            أغلق الكاميرا
          </Button>
        </Modal.Footer>
      </Modal>
    </Form.Group>
  );
}

export default ChangeImage;
