import React from "react";
import InfoRow from "@/components/ItemDetails/InfoRow";

function InfoRowList() {
  const infoData = [
    { label: "الفئة", value: "أجهزة الكترونية" },
    { label: "حالة المنتج", value: "بحالة الجديد" },
    {
      label: "سياسة إلغاء الحجز",
      value: "استرجاع 50% من المبلغ خلال أول 24 ساعة",
    },
    { label: "العدد", value: "1" },
  ];

  return (
    <>
      {infoData.map((info, index) => (
        <InfoRow key={index} label={info.label} value={info.value} />
      ))}
    </>
  );
}

export default InfoRowList;
