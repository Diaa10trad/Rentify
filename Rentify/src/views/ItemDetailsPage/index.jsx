import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import InfoRowList from "@/components/ItemDetails/InfoRowList";
import TextSection from "@/components/ItemDetails/TextSection";
import HeadingSection from "@/components/HeadingSection";
import ImagesCarousel from "@/components/ItemDetails/ImagesCarousel";
import OrderPanel from "@/components/ItemDetails/OrderPanel";
import ReviewList from "@/components/ItemDetails/ReviewList";
import OwnerCard from "@/components/ItemDetails/OwnerCard";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getToken } from "@/utils/AuthUtils";
import axios from "axios";

function ItemDetailsPage() {
  const location = useLocation();
  const pathname = location.pathname;
  const [cancellationPolicy, setCancellationPolicy] = useState(null);
  const [detailsInfo, setDetailsInfo] = useState(null);
  const [details, setDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `http://localhost:5079/api${pathname}`;
    const token = getToken();

    axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setDetails(response.data);

        setCancellationPolicy([
          {
            label: "نسبة المبلغ المسترجع",
            value: response.data.cancellationPolicy.refund + "%",
          },
          {
            label: "فترة الإلغاء المسموحة",
            value: `الإلغاء مسموح به قبل ${response.data.cancellationPolicy.permittedDuration} ساعة من موعد البدء.`,
          },
        ]);

        response.data.category.categoryType == "product"
          ? setDetailsInfo([
              { label: "الفئة", value: response.data.category.categoryName },

              { label: "حالة المنتج", value: response.data.productCondition },

              { label: "العدد", value: response.data.quantity },
            ])
          : setDetailsInfo([
              { label: "الفئة", value: response.data.category.categoryName },
            ]);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  }, []); // Empty dependency array means this effect runs once on mount

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const generateEmbedMapUrl = (lat, lng) => {
    return `https://www.google.com/maps/embed/v1/place?key=AIzaSyB9viUWIB-aGvtEaM_rb2jGh7rm_2AtPQg&q=${lat},${lng}`;
  };

  return (
    <Container fluid className="mb-5">
      {details ? (
        <Container fluid>
          <Row className="mb-3">
            <HeadingSection title={"تفاصيل الإعلان"} />
          </Row>
          <Row className="p-3">
            <Col xs={12} md={7}>
              <ImagesCarousel
                images={details[`${details.category.categoryType}Images`]}
              />
              <div className="d-block my-4 d-md-none">
                <OrderPanel
                  priceDaily={details.priceDaily}
                  priceWeekly={details.priceWeekly}
                  priceMonthly={details.priceMonthly}
                  title={details.title}
                  createdAt={details.createdAt}
                  ownerId={details.ownerId}
                  cancellationPolicy={details.cancellationPolicy}
                />
              </div>
              <div className="d-none mt-4 d-md-block">
                <TextSection title={"الوصف"} text={details.description} />
              </div>
              <div className="d-none mt-4 d-md-block">
                <TextSection
                  title={"معلومات إضافية"}
                  text={details.additionalInfo}
                />
              </div>
            </Col>
            <Col xs={12} md={5}>
              <div className="d-block mb-4 d-md-none">
                <TextSection title={"الوصف"} text={details.description} />
                <TextSection
                  title={"معلومات إضافية"}
                  text={details.additionalInfo}
                />
              </div>
              <div className="d-none mb-4 d-md-block">
                <OrderPanel
                  priceDaily={details.priceDaily}
                  priceWeekly={details.priceWeekly}
                  priceMonthly={details.priceMonthly}
                  title={details.title}
                  createdAt={details.createdAt}
                  ownerId={details.ownerId}
                  cancellationPolicy={details.cancellationPolicy}
                />
              </div>
              <InfoRowList infoData={detailsInfo} />
              <InfoRowList
                infoData={cancellationPolicy}
                title={"سياسة الإلغاء"}
              />

              <OwnerCard person={details.owner} />
            </Col>
          </Row>

          {/* Embedded Map */}
          <Row className="p-3 gap-3">
            {details.location.latitude && details.location.longitude && (
              <Col xs={12} md={12} lg={6} xl={4}>
                <h4>الموقع</h4>
                <iframe
                  width="600"
                  height="450"
                  style={{ border: 0 }}
                  src={generateEmbedMapUrl(
                    details.location.latitude,
                    details.location.longitude
                  )}
                  allowFullScreen=""
                  aria-hidden="false"
                  tabIndex="0"
                ></iframe>
              </Col>
            )}
            <Col xs={12}>
              <ReviewList
                reviews={details.reviews}
                totalReviews={details.totalReviews}
                averageRating={details.averageRating}
              />
            </Col>
          </Row>
        </Container>
      ) : (
        <Container
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <Spinner animation="border" />
        </Container>
      )}
    </Container>
  );
}

export default ItemDetailsPage;
