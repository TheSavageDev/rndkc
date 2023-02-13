import { ImageGridItem } from "./imageGridItem";

export const ComingSoonImageGrid = () => {
  return (
    <section className="rental-ready_image-grid">
      <ImageGridItem
        src="/img/car.svg"
        alt="1958 Chevy Corvette"
        title="1958 Chevy Corvette"
        go
        dayPrice="Coming Soon"
        href="https://driveshare.com/collection/60921"
      />
      <ImageGridItem
        src="/img/inventory/59 Austin Healy/ah4.jpg"
        alt="1959 Austin Healy"
        title="1959 Austin Healy"
        dayPrice="Coming Soon"
        go
        href="https://driveshare.com/collection/60921"
      />
      <ImageGridItem
        src="/img/car.svg"
        alt="1986 Ford Bronco"
        title="1986 Ford Bronco"
        dayPrice="Coming Soon"
        go
        href="https://driveshare.com/collection/60921"
      />
    </section>
  );
};
