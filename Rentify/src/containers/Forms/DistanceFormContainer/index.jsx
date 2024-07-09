import DistanceForm from "@/components/Results/Forms/DistanceForm";
import { forwardRef, memo, useState, useImperativeHandle } from "react";
import getOneFromUrl from "@/utils/getOneFromUrl.js";
function DistanceFormContainer({}, ref) {
  const [distance, setDistance] = useState(getOneFromUrl("Distance"));

  useImperativeHandle(ref, () => ({
    getData: () => ({ ["Distance"]: distance }),
  }));
  return <DistanceForm distance={distance} setDistance={setDistance} />;
}
export default memo(forwardRef(DistanceFormContainer));
