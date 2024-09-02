import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getToken, getSenderId } from "@/utils/AuthUtils";
function ChatShowBookingDetails({ bookingDetails }) {
  const token = getToken();
  const senderId = getSenderId(token);
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const path = `/CompleteBookingPage/${bookingDetails.itemType}/${bookingDetails.bookingId}`;

    navigate(path);

    handleClose();
  };

  return (
    <>
      <Button
        className={
          bookingDetails.renterId == senderId ? "text-black" : "text-white"
        }
        variant="link"
        onClick={handleShow}
      >
        عرض تفاصيل الحجز
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
                disabled
                value={bookingDetails.startDate}
                required
              />
            </Form.Group>
            <Form.Group controlId="endDate">
              <Form.Label>تاريخ الانتهاء</Form.Label>
              <Form.Control
                type="date"
                name="endDate"
                disabled
                value={bookingDetails.endDate}
                required
              />
            </Form.Group>
            <Form.Group controlId="finalPrice">
              <Form.Label>السعر الكلي</Form.Label>
              <Form.Control
                type="number"
                name="finalPrice"
                disabled
                value={bookingDetails.finalPrice}
                required
                min="0"
                step="0.05"
              />
            </Form.Group>
            <Form.Group controlId="additionalInfo">
              <Form.Label>معلومات إضافية</Form.Label>
              <Form.Control
                as="textarea"
                name="additionalInfo"
                disabled
                value={bookingDetails.additionalInfo}
              />
            </Form.Group>
            <Form.Group controlId="refund">
              <Form.Label>نسبة الاسترداد (%)</Form.Label>
              <Form.Control
                type="number"
                name="refund"
                disabled
                value={bookingDetails.refund}
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
                disabled
                value={bookingDetails.permittedDuration}
                required
                min="0"
              />
            </Form.Group>

            {bookingDetails.renterId === senderId && (
              <Button
                variant="primary"
                type="submit"
                className="mt-3 text-white"
              >
                الموافقة على الحجز
              </Button>
            )}
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ChatShowBookingDetails;
