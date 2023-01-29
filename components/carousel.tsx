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
          src="/img/65plymouthSat.jpg"
          alt="1965 Plymouth Satellite"
          title="1965 Plymouth Satellite"
          dayPrice={302}
          href="https://driveshare.com/car/1965-plymouth-satellite-9401"
        />
        <CarouselItem
          src="/img/69FordStang.jpg"
          alt="1969 Ford Mustang"
          title="1969 Ford Mustang"
          dayPrice={351}
          href="https://driveshare.com/car/1969-ford-mustang-9312"
        />
        <CarouselItem
          src="/img/67ChevyChevelle.jpg"
          alt="1967 Chevy Chevelle"
          title="1967 Chevy Chevelle"
          dayPrice={383}
          href="https://driveshare.com/car/1967-chevrolet-chevelle-9319"
        />
        <CarouselItem
          src="/img/Img4.jpg"
          alt="1972 Ford Bronco"
          title="1972 Ford Bronco"
          dayPrice={250}
          href="https://driveshare.com/collection/60921"
        />
        <CarouselItem
          src="/img/Img5.jpg"
          alt="1968 Dodge Charger"
          title="1968 Dodge Charger"
          dayPrice={325}
          href="https://driveshare.com/collection/60921"
        />
        <CarouselItem
          src="/img/Img6.jpg"
          alt="1954 Mercedes Gullwing"
          title="1954 Mercedes Gullwing"
          dayPrice={325}
          href="https://driveshare.com/collection/60921"
        />
        <CarouselItem
          src="/img/Img7.jpg"
          alt="1974 VW Beetle"
          title="1974 VW Beetle"
          dayPrice={125}
          href="https://driveshare.com/collection/60921"
        />
        <CarouselItem
          src="/img/Img8.jpg"
          alt="1958 Chevy Impala"
          title="1958 Chevy Impala"
          dayPrice={225}
          href="https://driveshare.com/collection/60921"
        />
        <CarouselItem
          src="/img/Img9.jpg"
          alt="1971 VW Camper Van"
          title="1971 VW Camper Van"
          dayPrice={175}
          href="https://driveshare.com/collection/60921"
        />
      </Carousel>
    </section>
  );
};
