type DividerType = {
  light?: boolean;
};

export const Divider = ({ light }: DividerType) => {
  return (
    <section
      className={`bg-${light ? "lightBg" : "background"} w-full md:z-10`}
    >
      <section className="bg-accent text-white flex header">
        <h2 className="block uppercase text-xl pt-1 pl-3 font-normal font-akshar md:hidden">
          KC's Classic Car Rentals
        </h2>
        <h2 className="hidden uppercase text-xl pt-1 pl-3 font-normal font-akshar md:block">
          Kansas City’s New Classic Car Rentals, Museum, Garage, AND MORE...
        </h2>
      </section>
      <aside className="w-full h-1 bg-accent"></aside>
    </section>
  );
};
