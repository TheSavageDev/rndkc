import { ImageGridItem } from "./imageGridItem";

export const ImageGrid = () => {
  return (
    <section className="w-full mx-auto mt-2 hidden lg:grid lg:grid-cols-3 lg:gap-2">
      <ImageGridItem
        src="/img/Img1.jpg"
        alt="1967 Chevy Camaro"
        title="1967 Chevy Camaro"
        dayPrice={350}
      />
      <ImageGridItem
        src="/img/Img2.jpg"
        alt="1967 Mustang Fastback"
        title="1967 Mustang Fastback"
        dayPrice={375}
      />
      <ImageGridItem
        src="/img/Img3.jpg"
        alt="1958 Chevy Corvette"
        title="1958 Chevy Corvette"
        dayPrice={399}
      />
      <ImageGridItem
        src="/img/Img4.jpg"
        alt="1972 Ford Bronco"
        title="1972 Ford Bronco"
        dayPrice={250}
      />
      <ImageGridItem
        src="/img/Img5.jpg"
        alt="1969 Dodge Challenger"
        title="1969 Dodge Challenger"
        dayPrice={325}
      />
      <ImageGridItem
        src="/img/Img6.jpg"
        alt="1954 Mercedes Gullwing"
        title="1954 Mercedes Gullwing"
        dayPrice={325}
      />
      <ImageGridItem
        src="/img/Img7.jpg"
        alt="1974 VW Beetle"
        title="1974 VW Beetle"
        dayPrice={125}
      />
      <ImageGridItem
        src="/img/Img8.jpg"
        alt="1958 Chevy Impala"
        title="1958 Chevy Impala"
        dayPrice={225}
      />
      <ImageGridItem
        src="/img/Img9.jpg"
        alt="1971 VW Camper Van"
        title="1971 VW Camper Van"
        dayPrice={175}
      />
    </section>
  );
};
