import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import DateFormContainer from "@/containers/Forms/DateFormContainer";
import PriceFormContainer from "@/containers/Forms/PriceFormContainer";
import DeliveryOptionsFormContainer from "@/containers/Forms/DeliveryOptionsFormContainer";
import CategoriesFormContainer from "@/containers/Forms/CategoriesFormContainer";
import ProductConditionFormContainer from "@/containers/Forms/ProductConditionFormContainer";
import DistanceFormContainer from "@/containers/Forms/DistanceFormContainer";
import QuantityFormContainer from "@/containers/Forms/QuantityFormContainer";
import { useLocation, useNavigate } from "react-router-dom";
import { useRef } from "react";

const getValuesFromUrl = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const UrlValues = {};
  for (const [key, value] of searchParams.entries()) {
    UrlValues[key] = value;
  }
  return UrlValues;
};

export default function FilterSidebar() {
  const navigate = useNavigate();

  const initialValues = getValuesFromUrl();
  const query = initialValues["query"];
  const type = initialValues["type"];
  const childRefs = useRef({});
  console.log(initialValues);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = Object.keys(childRefs.current).map((key) =>
      childRefs.current[key].getData()
    );
    const newParams = Object.assign({}, ...formData);
    newParams["query"] = query;
    newParams["type"] = type;
    const queryString = new URLSearchParams(newParams).toString();

    navigate(`/Results?${queryString}`);
  };
  return (
    <Accordion className="w-100 shadow" defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>تصفية</Accordion.Header>
        <Accordion.Body>
          <Form onSubmit={handleSubmit}>
            <Accordion className="mb-4" defaultActiveKey={["0"]} alwaysOpen>
              <Accordion.Item eventKey="0">
                <Accordion.Header>الفئات</Accordion.Header>
                <Accordion.Body>
                  <CategoriesFormContainer
                    ref={(el) => (childRefs.current["Categories"] = el)}
                  />
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="1">
                <Accordion.Header>السعر</Accordion.Header>
                <Accordion.Body className="">
                  <PriceFormContainer
                    label={"يوميا"}
                    idPrefix={"priceDaily"}
                    ref={(el) => (childRefs.current["priceDaily"] = el)}
                  />
                  <PriceFormContainer
                    label={"أسبوعيا"}
                    idPrefix={"priceWeekly"}
                    ref={(el) => (childRefs.current["priceWeekly"] = el)}
                  />
                  <PriceFormContainer
                    label={"شهريا"}
                    idPrefix={"priceMonthly"}
                    ref={(el) => (childRefs.current["priceMonthly"] = el)}
                  />
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>فترة الإيجار</Accordion.Header>
                <Accordion.Body>
                  <DateFormContainer
                    ref={(el) => (childRefs.current["Date"] = el)}
                  />
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>حالة المنتج</Accordion.Header>
                <Accordion.Body>
                  <ProductConditionFormContainer
                    ref={(el) => (childRefs.current["ProductConditions"] = el)}
                  />
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="4">
                <Accordion.Header>خيارات التوصيل</Accordion.Header>
                <Accordion.Body>
                  <DeliveryOptionsFormContainer
                    ref={(el) => (childRefs.current["DeliveryOptions"] = el)}
                  />
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="5">
                <Accordion.Header>المسافة</Accordion.Header>
                <Accordion.Body>
                  <DistanceFormContainer
                    ref={(el) => (childRefs.current["Distance"] = el)}
                  />
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="6">
                <Accordion.Header>الكمية</Accordion.Header>
                <Accordion.Body>
                  <QuantityFormContainer
                    ref={(el) => (childRefs.current["Quantity"] = el)}
                  />
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Button
              className="w-100 text-white"
              variant="primary"
              type="submit"
            >
              تصفية
            </Button>
          </Form>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
