import React, { useState } from "react";
import { Button, Modal, Form, Container } from "react-bootstrap";
import { getToken, getSenderId } from "@/utils/AuthUtils";
function ChatBookingForm({ bookingDetails, setBookingDetails, onSend }) {
  const token = getToken();
  const senderId = getSenderId(token);

  const [show, setShow] = useState(false);

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

    onSend(bookingDetails, "booking");

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
          <Form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            <Form.Group controlId="startDate">
              <Form.Label>تاريخ البدء</Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                disabled={bookingDetails.ownerId !== senderId}
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
                disabled={bookingDetails.ownerId !== senderId}
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
                disabled={bookingDetails.ownerId !== senderId}
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
                disabled={bookingDetails.ownerId !== senderId}
                value={bookingDetails.additionalInfo}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="refund">
              <Form.Label>نسبة الاسترداد (%)</Form.Label>
              <Form.Control
                type="number"
                name="refund"
                disabled={bookingDetails.ownerId !== senderId}
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
                disabled={bookingDetails.ownerId !== senderId}
                value={bookingDetails.permittedDuration}
                onChange={handleChange}
                required
                min="0"
              />
            </Form.Group>
            {bookingDetails.ownerId === senderId && (
              <Button
                variant="primary"
                type="submit"
                className="mt-3 text-white"
              >
                حفظ وإرسال الحجز
              </Button>
            )}

            {bookingDetails.renterId === senderId && (
              <Button variant="primary" className="mt-3 text-white">
                الموافقة على الحجز
              </Button>
            )}
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ChatBookingForm;
