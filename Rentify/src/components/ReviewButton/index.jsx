import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

const ReviewButton = ({ status, isRenter, itemType, itemId }) => {
  const [show, setShow] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState("");
  const [reviewId, setReviewId] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const addReview = async () => {
    try {
      const apiUrl = `http://localhost:5079/api/review/${itemType}/${itemId}`;
      const token = localStorage.getItem("token");

      const response = await axios.post(
        apiUrl,
        { rating: rating, comment: comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status == 201) {
        alert("تم التقييم بنجاح!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateReview = async () => {
    try {
      const apiUrl = `http://localhost:5079/api/review/${reviewId}`;
      const token = localStorage.getItem("token");
      const headers = {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json-patch+json",
      };

      const response = await axios.put(
        apiUrl,
        { rating: rating, comment: comment },
        { headers }
      );

      if (response.status == 200) {
        alert("تم تحديث التقييم بنجاح!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = () => {
    if (reviewId) {
      updateReview();
    } else {
      addReview();
    }
    setShow(false);
  };

  if (status !== "completed" || !isRenter) return null;

  useEffect(() => {
    const checkCurrentReview = async () => {
      try {
        const apiUrl = `http://localhost:5079/api/review/${itemType}/${itemId}`;
        const token = localStorage.getItem("token");

        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status == 200) {
          setRating(response.data.rating);
          setComment(response.data.comment);
          setReviewId(response.data.reviewId);
        }
      } catch (error) {
        console.error("Error checking review status:", error);
      }
    };

    checkCurrentReview();
  }, [itemType, itemId]);
  return (
    <>
      <div>
        <Button
          variant="primary"
          onClick={handleShow}
          className="text-white w-100 "
        >
          تقييم {itemType === "product" ? "المنتج" : "الخدمة"}
        </Button>
      </div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-center w-100">
            تقييم {itemType === "product" ? "المنتج" : "الخدمة"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="text-center mb-4">
              <div className="star-rating">
                {[...Array(5)].map((star, index) => {
                  const currentRating = index + 1;

                  return (
                    <label key={index}>
                      <input
                        type="radio"
                        name="rating"
                        value={currentRating}
                        onClick={() => setRating(currentRating)}
                        style={{ display: "none" }}
                      />
                      <span
                        className={`fa fa-star ${
                          currentRating <= (hover || rating)
                            ? "text-primary"
                            : ""
                        }`}
                        onMouseEnter={() => setHover(currentRating)}
                        onMouseLeave={() => setHover(null)}
                      ></span>
                    </label>
                  );
                })}
              </div>
            </Form.Group>
            <Form.Group controlId="formComment">
              <Form.Label>التعليق</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="اكتب تعليقك هنا..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="justify-content-between">
          <Button variant="secondary" onClick={handleClose}>
            إغلاق
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={rating < 1}
          >
            تأكيد
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ReviewButton;
