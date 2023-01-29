import Image from "next/image";

export const ImageGridItem = ({
  src,
  alt,
  title,
  dayPrice,
  href,
}: {
  src: string;
  alt: string;
  title: string;
  dayPrice: number;
  href?: string;
}) => {
  return (
    <article className="relative bg-black">
      <a href={href} target="_blank" rel="noopener noreferrer">
        <Image src={src} alt={alt} width="400" height="300" />
        <section className="flex w-full absolute bottom-0 justify-between font-gemunuLibre md:h-auto">
          <section className="bg-blackTransparent text-white flex w-full justify-between hover:bg-black">
            <section className="flex flex-col p-2 items-start">
              <article className="text-xl font-semibold">{title}</article>
            </section>
            <article className="text-xl pr-2 font-bold uppercase bg-accent flex items-center justify-end itemHeaderPrice w-1/3">
              <span>${dayPrice} Day</span>
            </article>
          </section>
        </section>
      </a>
    </article>
  );
};
