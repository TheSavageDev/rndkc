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
          alt="1967 Chevy Camaro"
          title="1967 Chevy Camaro"
          dayPrice={350}
        />
        <CarouselItem
          src="/img/Img2.jpg"
          alt="1967 Mustang Fastback"
          title="1967 Mustang Fastback"
          dayPrice={375}
        />
        <CarouselItem
          src="/img/Img3.jpg"
          alt="1958 Chevy Corvette"
          title="1958 Chevy Corvette"
          dayPrice={399}
        />
        <CarouselItem
          src="/img/Img4.jpg"
          alt="1972 Ford Bronco"
          title="1972 Ford Bronco"
          dayPrice={250}
        />
        <CarouselItem
          src="/img/Img5.jpg"
          alt="1969 Dodge Challenger"
          title="1969 Dodge Challenger"
          dayPrice={325}
        />
        <CarouselItem
          src="/img/Img6.jpg"
          alt="1954 Mercedes Gullwing"
          title="1954 Mercedes Gullwing"
          dayPrice={325}
        />
        <CarouselItem
          src="/img/Img7.jpg"
          alt="1974 VW Beetle"
          title="1974 VW Beetle"
          dayPrice={125}
        />
        <CarouselItem
          src="/img/Img8.jpg"
          alt="1958 Chevy Impala"
          title="1958 Chevy Impala"
          dayPrice={225}
        />
        <CarouselItem
          src="/img/Img9.jpg"
          alt="1971 VW Camper Van"
          title="1971 VW Camper Van"
          dayPrice={175}
        />
      </Carousel>
    </section>
  );
};
