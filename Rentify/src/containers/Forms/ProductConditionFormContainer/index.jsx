import ProductConditionForm from "@/components/Results/Forms/ProductConditionForm";
import { forwardRef, memo, useState, useImperativeHandle } from "react";
import getFromUrlByKeyPrefix from "@/utils/getFromUrlByKeyPrefix.js";
function ProductConditionFormContainer({}, ref) {
  const ProductConditions = ["بحالة الجديد", "جيد جدا", "جيد", "متوسط"];
  const [selectedProductConditions, setSelectedProductConditions] = useState(
    getFromUrlByKeyPrefix("ProductCondition")
  );
  useImperativeHandle(ref, () => ({
    getData: () => selectedProductConditions,
  }));
  return (
    <ProductConditionForm
      productConditions={ProductConditions}
      selectedProductConditions={selectedProductConditions}
      setSelectedProductConditions={setSelectedProductConditions}
    />
  );
}

export default memo(forwardRef(ProductConditionFormContainer));
