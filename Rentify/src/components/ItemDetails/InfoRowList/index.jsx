import React from "react";
import InfoRow from "@/components/ItemDetails/InfoRow";

function InfoRowList({ infoData, title }) {
  const classNames = title ? "" : "shadow p-4 ";
  const titleComponent = title ? (
    <h5 className="bg-primary p-4 shadow text-white rounded-top-4 mt-3">
      {title}
    </h5>
  ) : (
    <></>
  );
  return (
    <div className={classNames}>
      {titleComponent}
      {infoData.map((info, index) => (
        <InfoRow key={index} label={info.label} value={info.value} />
      ))}
    </div>
  );
}

export default InfoRowList;
