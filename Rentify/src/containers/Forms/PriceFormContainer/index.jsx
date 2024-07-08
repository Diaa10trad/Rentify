import PriceForm from "@/components/Results/Forms/PriceForm";
import { forwardRef, memo, useState, useImperativeHandle } from "react";
import getFromUrlByKeyPrefix from "@/utils/getFromUrlByKeyPrefix.js";
function PriceFormContainer({ label, idPrefix }, ref) {
  const [price, setPrice] = useState(getFromUrlByKeyPrefix(idPrefix));

  const handleState = (key, value) => {
    setPrice({ ...price, [key]: value });
  };

  const handleBlur = (key, value) => {
    setPrice((prevPrice) => {
      const newPrice = { ...prevPrice, [key]: value };

      if (key === `${idPrefix}From` && value > newPrice[`${idPrefix}To`]) {
        newPrice[`${idPrefix}To`] = value;
      } else if (
        key === `${idPrefix}To` &&
        value < newPrice[`${idPrefix}From`]
      ) {
        newPrice[`${idPrefix}From`] = value;
      }

      return newPrice;
    });
  };
  useImperativeHandle(ref, () => ({
    getData: () => price,
  }));
  return (
    <PriceForm
      label={label}
      idPrefix={idPrefix}
      price={price}
      onPriceChange={handleState}
      onPriceBlur={handleBlur}
    />
  );
}
export default memo(forwardRef(PriceFormContainer));
