import calculateDuration from "@/utils/calculateDuration";
import InfoRow from "@/components/ItemDetails/InfoRow";
import { useEffect } from "react";
function BookingBreakdown({
  selectedDates,
  priceDaily,
  priceWeekly,
  priceMonthly,
  onFinalPriceChange,
}) {
  const duration = calculateDuration(
    selectedDates.fromDate,
    selectedDates.toDate
  );
  const ConstructSubTotalString = () => {
    let subTotalString = "";
    if (duration.months) {
      subTotalString += `(${duration.months} شهر) x (${priceMonthly} دينار)\n`;
    }
    if (duration.weeks) {
      if (subTotalString) subTotalString += " + ";
      subTotalString += `(${duration.weeks} أسبوع) x (${priceWeekly} دينار)\n`;
    }
    if (duration.days) {
      if (subTotalString) subTotalString += " + ";
      subTotalString += `(${duration.days} يوم) x (${priceDaily} دينار)\n`;
    }

    return subTotalString;
  };
  const detailedSubTotal = ConstructSubTotalString();
  const subTotal =
    duration.months * priceMonthly +
    duration.weeks * priceWeekly +
    duration.days * priceDaily;

  const serviceFee = Number((subTotal * 0.05).toFixed(2));

  useEffect(() => {
    onFinalPriceChange(subTotal);
  }, [subTotal]);
  return (
    <div className="mt-4">
      <h6>تفاصيل الطلب</h6>
      <hr />
      <InfoRow label={detailedSubTotal} value={`${subTotal} دينار`} />
      <InfoRow label={"بدء الإيجار"} value={selectedDates.fromDate} />
      <InfoRow label={"انتهاء الإيجار"} value={selectedDates.toDate} />
      <InfoRow label={"المجموع الفرعي"} value={`${subTotal} دينار`} />
      <InfoRow label={"رسوم الخدمة (5%)"} value={`${serviceFee} دينار`} />
      <InfoRow
        label={"المجموع الكلي"}
        value={`${serviceFee + subTotal} دينار`}
      />
    </div>
  );
}

export default BookingBreakdown;
