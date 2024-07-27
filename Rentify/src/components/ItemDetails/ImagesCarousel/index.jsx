import Carousel from "react-elastic-carousel";
import Image from "react-bootstrap/Image";
import Camera from "@/assets/images/products/Camera.jpg";
import FAQImage from "@/assets/images/FAQ.jpg";
import EarnMoney from "@/assets/images/earnMoney.jpg";
import "./style.css";
function ImagesCarousel() {
  return (
    <Carousel
      pagination={true}
      className="images-carousel"
      itemPadding={[0, 5]}
      showArrows={false}
      isRTL={true}
    >
      <Image
        draggable={false}
        src={Camera}
        alt="blabla"
        fluid
        className="carousel-image"
      />
      <Image
        draggable={false}
        src={EarnMoney}
        alt="blabla"
        fluid
        className=" carousel-image"
      />
      <Image
        draggable={false}
        src={FAQImage}
        className=" carousel-image"
        alt="blabla"
        fluid
      />

      <Image
        draggable={false}
        src={Camera}
        alt="blabla"
        fluid
        className="carousel-image"
      />
    </Carousel>
  );
}

export default ImagesCarousel;
