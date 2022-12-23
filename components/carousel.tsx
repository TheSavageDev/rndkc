import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export const CarCarousel = () => {
  return (
    <Carousel>
      <Image src="/img/Img1.jpg" width="400" height="200" alt="Car" />
      <Image src="/img/Img2.jpg" width="400" height="200" alt="Car" />
      <Image src="/img/Img3.jpg" width="400" height="200" alt="Car" />
      <Image src="/img/Img4.jpg" width="400" height="200" alt="Car" />
      <Image src="/img/Img5.jpg" width="400" height="200" alt="Car" />
      <Image src="/img/Img6.jpg" width="400" height="200" alt="Car" />
      <Image src="/img/Img7.jpg" width="400" height="200" alt="Car" />
      <Image src="/img/Img8.jpg" width="400" height="200" alt="Car" />
      <Image src="/img/Img9.jpg" width="400" height="200" alt="Car" />
    </Carousel>
  );
};
