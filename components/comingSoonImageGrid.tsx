import { ImageGridItem } from "./imageGridItem";

export const ComingSoonImageGrid = () => {
  return (
    <section className="rental-ready_image-grid">
      <ImageGridItem
        src="https://firebasestorage.googleapis.com/v0/b/rndkc-95667.appspot.com/o/inventory%2F158S100419%2F4.JPG?alt=media&token=b9f87524-35d9-4b43-bf2a-a0fd260839f2"
        alt="1958 Chevy Corvette"
        title="1958 Chevy Corvette"
        go
        dayPrice="Coming Soon"
        href="/car/158S100419"
      />
      <ImageGridItem
        src="https://firebasestorage.googleapis.com/v0/b/rndkc-95667.appspot.com/o/inventory%2FAN5L11026%2F1.jpg?alt=media&token=c9cae438-e198-4265-961a-9438ebd1f5f9"
        alt="1959 Austin Healy"
        title="1959 Austin Healy"
        dayPrice="Coming Soon"
        go
        href="/car/AN5L11026"
      />
      <ImageGridItem
        src="https://firebasestorage.googleapis.com/v0/b/rndkc-95667.appspot.com/o/inventory%2F1FMDU15Y7GLA41918%2F1.JPG?alt=media&token=71be4c83-d325-41fc-81ac-9ae562e666e2"
        alt="1986 Ford Bronco"
        title="1986 Ford Bronco"
        dayPrice="Coming Soon"
        go
        href="/car/1FMDU15Y7GLA41918"
        driveShare="https://driveshare.com/collection/60921"
      />
    </section>
  );
};
