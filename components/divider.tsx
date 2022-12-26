type DividerType = {
  light?: boolean;
};

export const Divider = ({ light }: DividerType) => {
  return (
    <section className={`bg-${light ? "lightBg" : "background"} w-full`}>
      <section className="bg-accent text-white flex header">
        <h2 className="uppercase text-xl pt-1 pl-3 font-normal font-akshar">
          KC's Classic Car Rentals
        </h2>
      </section>
      <aside className="w-full h-1 bg-accent"></aside>
    </section>
  );
};
