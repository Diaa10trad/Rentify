import Carousel from "react-elastic-carousel";
import Image from "react-bootstrap/Image";
import Camera from "@/assets/images/products/Camera.jpg";
import FAQImage from "@/assets/images/FAQ.jpg";
import EarnMoney from "@/assets/images/earnMoney.jpg";
import "./style.css";
function ImagesCarousel({ images }) {
  return (
    <Carousel
      pagination={true}
      className="images-carousel"
      itemPadding={[0, 5]}
      showArrows={false}
      isRTL={true}
    >
      {images.map((image) => (
        <Image
          key={image.publicId}
          draggable={false}
          src={image.imageUrl}
          fluid
          className="carousel-image"
        />
      ))}
    </Carousel>
  );
}

export default ImagesCarousel;
