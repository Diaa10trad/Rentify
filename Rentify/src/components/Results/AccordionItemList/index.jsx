import AccordionItem from "@/components/Results/AccordionItem";
import DateFormContainer from "@/containers/Forms/DateFormContainer";
import PriceFormContainer from "@/containers/Forms/PriceFormContainer";
import DeliveryOptionsFormContainer from "@/containers/Forms/DeliveryOptionsFormContainer";
import CategoriesFormContainer from "@/containers/Forms/CategoriesFormContainer";
import ProductConditionFormContainer from "@/containers/Forms/ProductConditionFormContainer";
import DistanceFormContainer from "@/containers/Forms/DistanceFormContainer";
import QuantityFormContainer from "@/containers/Forms/QuantityFormContainer";
import getOneFromUrl from "@/utils/getOneFromUrl.js";
import { forwardRef } from "react";

function AccordionItemList({}, ref) {
  const type = getOneFromUrl("type");
  const productFormConfig = [
    {
      header: "الفئات",
      component: CategoriesFormContainer,
      refKey: "Categories",
    },
    {
      header: "السعر",
      component: () => (
        <>
          <PriceFormContainer
            label="يوميا"
            idPrefix="priceDaily"
            ref={(el) => (ref.current["priceDaily"] = el)}
          />
          <PriceFormContainer
            label="أسبوعيا"
            idPrefix="priceWeekly"
            ref={(el) => (ref.current["priceWeekly"] = el)}
          />
          <PriceFormContainer
            label="شهريا"
            idPrefix="priceMonthly"
            ref={(el) => (ref.current["priceMonthly"] = el)}
          />
        </>
      ),
      refKey: null,
    },
    {
      header: "فترة الإيجار",
      component: DateFormContainer,
      refKey: "Date",
    },
    {
      header: "حالة المنتج",
      component: ProductConditionFormContainer,
      refKey: "ProductConditions",
    },
    {
      header: "خيارات التوصيل",
      component: DeliveryOptionsFormContainer,
      refKey: "DeliveryOptions",
    },
    {
      header: "المسافة",
      component: DistanceFormContainer,
      refKey: "Distance",
    },
    {
      header: "الكمية",
      component: QuantityFormContainer,
      refKey: "Quantity",
    },
  ];
  const serviceFormConfig = [
    {
      header: "الفئات",
      component: CategoriesFormContainer,
      refKey: "Categories",
    },
    {
      header: "السعر",
      component: () => (
        <>
          <PriceFormContainer
            label="يوميا"
            idPrefix="priceDaily"
            ref={(el) => (ref.current["priceDaily"] = el)}
          />
          <PriceFormContainer
            label="أسبوعيا"
            idPrefix="priceWeekly"
            ref={(el) => (ref.current["priceWeekly"] = el)}
          />
          <PriceFormContainer
            label="شهريا"
            idPrefix="priceMonthly"
            ref={(el) => (ref.current["priceMonthly"] = el)}
          />
        </>
      ),
      refKey: null,
    },
    {
      header: "فترة الخدمة",
      component: DateFormContainer,
      refKey: "Date",
    },

    {
      header: "المسافة",
      component: DistanceFormContainer,
      refKey: "Distance",
    },
  ];
  const formConfig = type === "Product" ? productFormConfig : serviceFormConfig;
  return formConfig.map(({ header, component: Component, refKey }, index) => (
    <AccordionItem eventKey={index} key={index} header={header}>
      {refKey ? (
        <Component ref={(el) => (ref.current[refKey] = el)} />
      ) : (
        <Component />
      )}
    </AccordionItem>
  ));
}

export default forwardRef(AccordionItemList);
