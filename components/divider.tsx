type DividerType = {
  light?: boolean;
};

export const Divider = ({ light }: DividerType) => {
  return (
    <section className={`bg-${light ? "lightBg" : "background"} divider`}>
      <section className="divider-box">
        <h2 className="divider-box--header">KC's Classic Car Rentals</h2>
        <h2 className="divider-box--subheader">
          Kansas City’s New Classic Car Rentals, Museum, Garage, AND MORE...
        </h2>
      </section>
      <aside className="w-full h-1 bg-accent"></aside>
    </section>
  );
};
