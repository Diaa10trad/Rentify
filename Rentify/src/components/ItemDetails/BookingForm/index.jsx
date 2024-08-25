import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import DateFormGroup from "@/components/ItemDetails/DateFormGroup";
import BookingBreakdown from "@/components/ItemDetails/BookingBreakdown";
import { useCallback, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function BookingForm({ priceDaily, priceWeekly, priceMonthly, ownerId }) {
  const location = useLocation();
  const pathname = location.pathname;
  const { itemId } = useParams();
  const navigate = useNavigate();

  const goToChat = () => {
    const data = {
      itemId: itemId,
      receiverId: ownerId,
    };
    navigate("/chatpage", { state: data });
  };

  const isProductPage = pathname.includes("/product");

  const [selectedDates, setSelectedDates] = useState({
    fromDate: "",
    toDate: "",
  });
  const handleDateChange = useCallback((fromDate, toDate) => {
    setSelectedDates({ fromDate, toDate });
  }, []);
  return (
    <Form className="" onSubmit={goToChat}>
      {isProductPage && <DateFormGroup onDateChange={handleDateChange} />}
      {selectedDates.fromDate && selectedDates.toDate && (
        <BookingBreakdown
          selectedDates={selectedDates}
          priceDaily={priceDaily}
          priceWeekly={priceWeekly}
          priceMonthly={priceMonthly}
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
