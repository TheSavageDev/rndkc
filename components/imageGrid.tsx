import { ImageGridItem } from "./imageGridItem";

export const RentalReadyImageGrid = () => {
  return (
    <section className="rental-ready_image-grid">
      <ImageGridItem
        src="/img/65plymouthSat.jpg"
        alt="1965 Plymouth Satellite"
        title="1965 Plymouth Satellite"
        dayPrice={302}
        href="/car/R451158693"
        driveShare="https://driveshare.com/car/1965-plymouth-satellite-9401"
      />
      <ImageGridItem
        src="/img/69FordStang.jpg"
        alt="1969 Mach 1"
        title="1969 Mach 1"
        dayPrice={351}
        href="/car/9F02M126188"
        driveShare="https://driveshare.com/car/1969-ford-mustang-9312"
      />
      <ImageGridItem
        src="/img/67ChevyChevelle.jpg"
        alt="1967 Chevy Chevelle"
        title="1967 Chevy Chevelle"
        dayPrice={383}
        href="/car/1341177132861"
        driveShare="https://driveshare.com/car/1967-chevrolet-chevelle-9319"
      />
    </section>
  );
};
