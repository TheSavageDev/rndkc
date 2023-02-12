import { ImageGridItem } from "./imageGridItem";

export const ComingSoonImageGrid = () => {
  return (
    <section className="rental-ready_image-grid">
      <ImageGridItem
        src="/img/65plymouthSat.jpg"
        alt="1965 Plymouth Satellite"
        title="1965 Plymouth Satellite"
        go
        dayPrice={302}
        href="https://driveshare.com/collection/60921"
      />
      <ImageGridItem
        src="/img/69FordStang.jpg"
        alt="1969 Ford Mustang"
        title="1969 Ford Mustang"
        dayPrice={351}
        go
        href="https://driveshare.com/collection/60921"
      />
      <ImageGridItem
        src="/img/67ChevyChevelle.jpg"
        alt="1967 Chevy Chevelle"
        title="1967 Chevy Chevelle"
        dayPrice={383}
        go
        href="https://driveshare.com/collection/60921"
      />
    </section>
  );
};
