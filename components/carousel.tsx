import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { CarouselItem } from "./carouselItem";

export const CarCarousel = () => {
  return (
    <section className="w-full px-3 mt-2 flex justify-center lg:hidden">
      <Carousel
        statusFormatter={() => ""}
        showIndicators={false}
        showThumbs={false}
      >
        <CarouselItem
          src="/img/Img1.jpg"
          alt="1968 DODGE CHARGER"
          title="1968 DODGE CHARGER"
          stats="400 HP, 350 CI, 4 SPEED MANUAL"
          dayPrice={350}
        />
        <CarouselItem
          src="/img/Img2.jpg"
          alt="Car"
          title="Car"
          stats="400 HP, 350 CI, 4 SPEED MANUAL"
          dayPrice={350}
        />
        <CarouselItem
          src="/img/Img3.jpg"
          alt="Car"
          title="Car"
          stats="400 HP, 350 CI, 4 SPEED MANUAL"
          dayPrice={350}
        />
        <CarouselItem
          src="/img/Img4.jpg"
          alt="Car"
          title="Car"
          stats="400 HP, 350 CI, 4 SPEED MANUAL"
          dayPrice={350}
        />
        <CarouselItem
          src="/img/Img5.jpg"
          alt="Car"
          title="Car"
          stats="400 HP, 350 CI, 4 SPEED MANUAL"
          dayPrice={350}
        />
        <CarouselItem
          src="/img/Img6.jpg"
          alt="Car"
          title="Car"
          stats="400 HP, 350 CI, 4 SPEED MANUAL"
          dayPrice={350}
        />
        <CarouselItem
          src="/img/Img7.jpg"
          alt="Car"
          title="Car"
          stats="400 HP, 350 CI, 4 SPEED MANUAL"
          dayPrice={350}
        />
        <CarouselItem
          src="/img/Img8.jpg"
          alt="Car"
          title="Car"
          stats="400 HP, 350 CI, 4 SPEED MANUAL"
          dayPrice={350}
        />
        <CarouselItem
          src="/img/Img9.jpg"
          alt="Car"
          title="Car"
          stats="400 HP, 350 CI, 4 SPEED MANUAL"
          dayPrice={350}
        />
      </Carousel>
    </section>
  );
};
