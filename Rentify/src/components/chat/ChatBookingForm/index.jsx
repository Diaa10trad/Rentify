import React, { useState } from "react";
import { Button, Modal, Form, Container } from "react-bootstrap";

function ChatBookingForm() {
  const [show, setShow] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    ownerId: "",
    renterId: "",
    productId: 0,
    startDate: "",
    endDate: "",
    finalPrice: "",
    additionalInfo: "",
    refund: "",
    permittedDuration: "",
  });

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    setBookingDetails({
      ...bookingDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the submission logic here (e.g., sending the booking details to the API)
    console.log(bookingDetails);
    handleClose();
  };

  return (
    <>
      <Button variant="primary" className="text-white" onClick={handleShow}>
        إنشاء الحجز
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>تفاصيل الحجز</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            as={Container}
            onSubmit={handleSubmit}
            className="d-flex flex-column gap-3"
          >
            <Form.Group controlId="startDate">
              <Form.Label>تاريخ البدء</Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                value={bookingDetails.startDate}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="endDate">
              <Form.Label>تاريخ الانتهاء</Form.Label>
              <Form.Control
                type="date"
                name="endDate"
                value={bookingDetails.endDate}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="finalPrice">
              <Form.Label>السعر الكلي</Form.Label>
              <Form.Control
                type="number"
                name="finalPrice"
                value={bookingDetails.finalPrice}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
              />
            </Form.Group>

            <Form.Group controlId="additionalInfo">
              <Form.Label>معلومات إضافية</Form.Label>
              <Form.Control
                as="textarea"
                name="additionalInfo"
                value={bookingDetails.additionalInfo}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="refund">
              <Form.Label>نسبة الاسترداد (%)</Form.Label>
              <Form.Control
                type="number"
                name="refund"
                value={bookingDetails.refund}
                onChange={handleChange}
                required
                min="0"
                max="100"
              />
            </Form.Group>

            <Form.Group controlId="permittedDuration">
              <Form.Label>فترة الإلغاء المسموح بها</Form.Label>
              <Form.Control
                type="number"
                name="permittedDuration"
                value={bookingDetails.permittedDuration}
                onChange={handleChange}
                required
                min="0"
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3 text-white">
              حفظ الحجز
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ChatBookingForm;
