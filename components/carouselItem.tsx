import Image from "next/image";

export const CarouselItem = ({ src, alt, title, stats, dayPrice }) => {
  return (
    <article className="relative">
      <Image src={src} alt={alt} width="400" height="200" />
      <section className="flex w-full absolute bottom-0 justify-between font-gemunuLibre h-12 sm:h-16">
        <section className="bg-blackTransparent text-white flex w-full justify-between">
          <section className="flex flex-col pb-2 px-2 items-start">
            <article className="text-md sm:text-xl font-semibold">
              {title}
            </article>
            <article className="font-light text-sm sm:text-xl">{stats}</article>
          </section>
          <article className="text-md sm:text-xl pr-2 font-bold uppercase bg-accent flex items-center justify-end itemHeaderPrice w-1/3">
            <span>${dayPrice} Day</span>
          </article>
        </section>
      </section>
    </article>
  );
};
