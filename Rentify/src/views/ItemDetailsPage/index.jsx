import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InfoRowList from "@/components/ItemDetails/InfoRowList";
import ItemDescription from "@/components/ItemDetails/ItemDescription";
import HeadingSection from "@/components/HeadingSection";
import ImagesCarousel from "@/components/ItemDetails/ImagesCarousel";
import OrderPanel from "@/components/ItemDetails/OrderPanel";
import ReviewList from "@/components/ItemDetails/ReviewList";
import OwnerCard from "@/components/ItemDetails/OwnerCard";
import { Link } from "react-router-dom";

function ItemDetailsPage() {
  const detailsInfo = [
    { label: "الفئة", value: "أجهزة الكترونية" },
    { label: "حالة المنتج", value: "بحالة الجديد" },

    { label: "العدد", value: "1" },
  ];
  const deliveryOptions = [
    { label: "الاستلام بمكان عام", value: "" },
    { label: "خدمة التوصيل", value: "" },
  ];

  const cancellationPolicy = [
    { label: "نسبة الاسترجاع", value: "50%" },
    { label: "فترة الإلغاء المسموحة", value: "قبل 24 ساعة من تاريخ الاستلام" },
  ];
  return (
    <Container
      className=""
      // style={{ backgroundColor: "#f0f0f0" }}
      fluid
    >
      <Row className="mb-3">
        <HeadingSection title={"تفاصيل الإعلان"} />
      </Row>
      <Row className="p-3">
        <Col xs={12} md={7} className="">
          <ImagesCarousel />
          <div className="d-block my-4 d-md-none">
            <OrderPanel />
          </div>
          <div className="d-none mt-4 d-md-block">
            <ItemDescription />
          </div>
        </Col>
        <Col xs={12} md={5} className="">
          <div className="d-block mb-4 d-md-none">
            <ItemDescription />
          </div>
          <div className="d-none mb-4 d-md-block">
            <OrderPanel />
          </div>
          <InfoRowList infoData={detailsInfo} />
          <InfoRowList infoData={cancellationPolicy} title={"سياسة الإلغاء"} />
          <InfoRowList infoData={deliveryOptions} title={"طرق الاستلام"} />
          <Link className="text-decoration-none" to={"/User/1"}>
            <OwnerCard />
          </Link>
        </Col>
      </Row>

      <Row className="p-3">
        <Col xs={12}>
          <ReviewList />
        </Col>
      </Row>
    </Container>
  );
}

export default ItemDetailsPage;
