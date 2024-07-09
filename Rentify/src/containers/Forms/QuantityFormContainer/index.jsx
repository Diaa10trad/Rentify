import QuantityForm from "@/components/Results/Forms/QuantityForm";
import { forwardRef, memo, useState, useImperativeHandle } from "react";
import getOneFromUrl from "@/utils/getOneFromUrl.js";
function QuantityFormContainer({}, ref) {
  const [quantity, setQuantity] = useState(getOneFromUrl("Quantity"));
  useImperativeHandle(ref, () => ({
    getData: () => ({ ["Quantity"]: quantity }),
  }));
  return <QuantityForm quantity={quantity} setQuantity={setQuantity} />;
}
export default memo(forwardRef(QuantityFormContainer));
