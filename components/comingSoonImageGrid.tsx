import { ImageGridItem } from "./imageGridItem";

export const ComingSoonImageGrid = () => {
  return (
    <section className="rental-ready_image-grid">
      <ImageGridItem
        src="https://firebasestorage.googleapis.com/v0/b/rndkc-95667.appspot.com/o/inventory%2F158S100419%2F4.JPG?alt=media&token=b9f87524-35d9-4b43-bf2a-a0fd260839f2"
        alt="1958 Chevy Corvette"
        title="1958 Chevy Corvette"
        go
        dayPrice={350}
        href="/car/158S100419"
      />
      <ImageGridItem
        src="https://firebasestorage.googleapis.com/v0/b/rndkc-95667.appspot.com/o/inventory%2FAN5L11026%2F1.jpg?alt=media&token=c9cae438-e198-4265-961a-9438ebd1f5f9"
        alt="1959 Austin Healy"
        title="1959 Austin Healy"
        dayPrice={195}
        go
        href="/car/AN5L11026"
      />
      <ImageGridItem
        src="https://firebasestorage.googleapis.com/v0/b/rndkc-95667.appspot.com/o/inventory%2F1G1YY23P2P5108593%2F1.jpg?alt=media&token=d52e8b1a-1fb4-4642-ad3e-6fdf3742465e"
        alt="1993 Chevrolet Corvette"
        title="1993 Chevrolet Corvette"
        dayPrice={125}
        go
        href="/car/1G1YY23P2P5108593"
      />
    </section>
  );
};
