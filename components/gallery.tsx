import Image from "next/image";
import { CarCarousel } from "./carousel";
import { ImageGrid } from "./imageGrid";
import { Social } from "./social";

export const Gallery = () => {
  return (
    <section className="w-full bg-white text-black flex flex-col items-center z-10">
      <section className="flex justify-center mt-2">
        <aside className="self-center mr-4">
          <Image
            src="/img/ShiftIcon.svg"
            alt="shift icon"
            width="40"
            height="40"
            className="block md:hidden"
          />
          <Image
            src="/img/ShiftIcon.svg"
            alt="shift icon"
            width="60"
            height="60"
            className="hidden md:block"
          />
        </aside>
        <article>
          <h2
            id="rentals"
            className="text-2xl uppercase font-akshar font-semibold sm:text-4xl md:text-6xl"
          >
            Drive your dreams
          </h2>
          <h2 className="text-2xl uppercase font-akshar font-thin sm:text-4xl md:text-6xl">
            by the
            <span className="font-semibold"> day </span>
            or
            <span className="font-semibold"> week</span>
          </h2>
        </article>
      </section>
      <CarCarousel />
      <ImageGrid />
      <section className="my-4">
        <Social color="black" />
      </section>
    </section>
  );
};
