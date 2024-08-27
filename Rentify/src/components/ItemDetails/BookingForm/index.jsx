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
    ownerId: ownerId,
    renterId: currentUserId,
    itemId: id,
    fromDate: "",
    toDate: "",
    finalPrice: "",
    additionalInfo: "",
    refund: cancellationPolicy.refund,
    permittedDuration: cancellationPolicy.permittedDuration,
    itemType: isProductPage ? "product" : "service",
  });
  const handleDateChange = useCallback((fromDate, toDate) => {
    setBookingDetails((prevDetails) => ({
      ...prevDetails,
      fromDate: fromDate,
      toDate: toDate,
    }));
  }, []);

  const handleFinalPriceChange = useCallback((finalPrice) => {
    setBookingDetails((prevDetails) => ({
      ...prevDetails,
      finalPrice: finalPrice,
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
  useEffect(() => {
    console.log(bookingDetails);
  }, [bookingDetails]);
  return (
    <Form className="" onSubmit={goToChat}>
      {isProductPage && <DateFormGroup onDateChange={handleDateChange} />}
      {bookingDetails.fromDate && bookingDetails.toDate && (
        <BookingBreakdown
          selectedDates={{
            fromDate: bookingDetails.fromDate,
            toDate: bookingDetails.toDate,
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
