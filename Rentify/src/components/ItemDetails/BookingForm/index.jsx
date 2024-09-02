import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import DateFormGroup from "@/components/ItemDetails/DateFormGroup";
import BookingBreakdown from "@/components/ItemDetails/BookingBreakdown";
import { useCallback, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getToken, getSenderId } from "@/utils/AuthUtils";
function BookingForm({
  priceDaily,
  priceWeekly,
  priceMonthly,
  ownerId,
  cancellationPolicy,
}) {
  const location = useLocation();
  const pathname = location.pathname;
  const { id } = useParams();
  const navigate = useNavigate();
  const token = getToken();
  const currentUserId = getSenderId(token);
  const isProductPage = pathname.includes("/product");

  const [bookingDetails, setBookingDetails] = useState({
    bookingId: null,
    ownerId: ownerId,
    renterId: currentUserId,
    itemId: parseInt(id),
    startDate: "",
    endDate: "",
    finalPrice: Number(0.0),
    additionalInfo: "",
    status: "pending",
    refund: cancellationPolicy.refund,
    permittedDuration: cancellationPolicy.permittedDuration,
    itemType: isProductPage ? "product" : "service",
  });
  const handleDateChange = useCallback((fromDate, toDate) => {
    setBookingDetails((prevDetails) => ({
      ...prevDetails,
      startDate: fromDate,
      endDate: toDate,
    }));
  }, []);

  const handleFinalPriceChange = useCallback((finalPrice) => {
    setBookingDetails((prevDetails) => ({
      ...prevDetails,
      finalPrice: Number(finalPrice),
    }));
  }, []);

  const goToChat = () => {
    if (token) {
      const data = {
        bookingDetails: bookingDetails,
        receiverId: ownerId,
      };
      navigate("/chatpage", { state: data });
    } else {
      navigate("/Login");
    }
  };

  return (
    <Form className="" onSubmit={goToChat}>
      {isProductPage && <DateFormGroup onDateChange={handleDateChange} />}
      {bookingDetails.startDate && bookingDetails.endDate && (
        <BookingBreakdown
          selectedDates={{
            fromDate: bookingDetails.startDate,
            toDate: bookingDetails.endDate,
          }}
          priceDaily={priceDaily}
          priceWeekly={priceWeekly}
          priceMonthly={priceMonthly}
          onFinalPriceChange={handleFinalPriceChange}
        />
      )}
      <div className="d-grid gap-2">
        <Button
          className="fs-5 p-2 mt-3 text-white"
          variant="primary"
          type="submit"
        >
          تواصل مع المعلن
        </Button>
      </div>
    </Form>
  );
}

export default BookingForm;
