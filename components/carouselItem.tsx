import Image from "next/image";

export const CarouselItem = ({ src, alt, title, dayPrice }) => {
  return (
    <article className="relative">
      <Image src={src} alt={alt} width="400" height="200" />
      <section className="flex w-full absolute bottom-0 justify-between font-gemunuLibre h-12 sm:h-auto">
        <section className="bg-blackTransparent text-white flex w-full justify-between">
          <section className="flex flex-col pb-2 px-2 items-start">
            <article className="gallery-carousel-footer-text">{title}</article>
          </section>
          <article className="pr-2 uppercase bg-accent flex items-center justify-end itemHeaderPrice w-1/3">
            <span className="gallery-carousel-footer-text--price">
              ${dayPrice} Day
            </span>
          </article>
        </section>
      </section>
    </article>
  );
};
