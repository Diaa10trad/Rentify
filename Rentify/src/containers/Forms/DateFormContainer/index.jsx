import DateForm from "@/components/Results/Forms/DateForm";
import { memo, useState, forwardRef, useImperativeHandle } from "react";
import getFromUrlByKeyPrefix from "@/utils/getFromUrlByKeyPrefix.js";
function DateFormContainer({}, ref) {
  const [selectedDates, setSelectedDates] = useState(
    getFromUrlByKeyPrefix("Date")
  );
  console.log(selectedDates);
  const handleChange = (key, value) => {
    const newSelectedDates = { ...selectedDates, [key]: value };

    if (key === "fromDate" && value > selectedDates["toDate"]) {
      newSelectedDates["toDate"] = value;
    } else if (key === "toDate" && value < selectedDates["fromDate"]) {
      newSelectedDates["fromDate"] = value;
    }

    setSelectedDates(newSelectedDates);
  };
  useImperativeHandle(ref, () => ({
    getData: () => selectedDates,
  }));
  return <DateForm selectedDates={selectedDates} onChange={handleChange} />;
}

export default memo(forwardRef(DateFormContainer));
