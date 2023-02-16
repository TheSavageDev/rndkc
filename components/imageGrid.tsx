import { ImageGridItem } from "./imageGridItem";

export const RentalReadyImageGrid = () => {
  return (
    <section className="rental-ready_image-grid">
      <ImageGridItem
        src="https://firebasestorage.googleapis.com/v0/b/rndkc-95667.appspot.com/o/inventory%2FR451158693%2F1.jpg?alt=media&token=ed7fbce8-401c-4d03-a4d1-50ec816ae4e4"
        alt="1965 Plymouth Satellite"
        title="1965 Plymouth Satellite"
        dayPrice={302}
        href="/car/R451158693"
        driveShare="https://driveshare.com/car/1965-plymouth-satellite-9401"
      />
      <ImageGridItem
        src="https://firebasestorage.googleapis.com/v0/b/rndkc-95667.appspot.com/o/inventory%2F9F02M126188%2F8.jpg?alt=media&token=c90fc0e0-4d7b-4583-b75f-6be8b010b929"
        alt="1969 Mach 1"
        title="1969 Mach 1"
        dayPrice={351}
        href="/car/9F02M126188"
        driveShare="https://driveshare.com/car/1969-ford-mustang-9312"
      />
      <ImageGridItem
        src="https://firebasestorage.googleapis.com/v0/b/rndkc-95667.appspot.com/o/inventory%2F1341177132861%2F1.jpg?alt=media&token=95b68b73-64d6-46d6-93ad-1beb5756f3d3"
        alt="1967 Chevy Chevelle"
        title="1967 Chevy Chevelle"
        dayPrice={383}
        href="/car/1341177132861"
        driveShare="https://driveshare.com/car/1967-chevrolet-chevelle-9319"
      />
    </section>
  );
};
