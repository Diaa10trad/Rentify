import DeliveryOptionsForm from "@/components/Results/Forms/DeliveryOptionsForm";
import { forwardRef, memo, useState, useImperativeHandle } from "react";
import getFromUrlByKeyPrefix from "@/utils/getFromUrlByKeyPrefix.js";
function DeliveryOptionsFormContainer({}, ref) {
  const DeliveryOptions = [
    "الاستلام بمكان عام",
    "الاستلام من منزل المالك",
    "خدمة التوصيل",
  ];
  const [selectedDeliveryOptions, setSelectedDeliveryOptions] = useState(
    getFromUrlByKeyPrefix("DeliveryOption")
  );
  useImperativeHandle(ref, () => ({
    getData: () => selectedDeliveryOptions,
  }));
  return (
    <DeliveryOptionsForm
      deliveryOptions={DeliveryOptions}
      selectedDeliveryOptions={selectedDeliveryOptions}
      setSelectedDeliveryOptions={setSelectedDeliveryOptions}
    />
  );
}

export default memo(forwardRef(DeliveryOptionsFormContainer));
