import Image from "next/image";
import { useState } from "react";
export const ImageGridItem = ({ src, alt, title, stats, dayPrice }) => {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(!show);
  };
  return (
    <article className="relative md:mt-2" onClick={handleClick}>
      <Image src={src} alt={alt} width="400" height="300" />
      {show && (
        <section className="flex w-full absolute bottom-0 justify-between font-gemunuLibre md:h-16">
          <section className="bg-blackTransparent text-white flex w-full justify-between">
            <section className="flex flex-col p-2 items-start">
              <article className="text-xl font-semibold">{title}</article>
              <article className="font-light">{stats}</article>
            </section>
            <article className="text-xl pr-2 font-bold uppercase bg-accent flex items-center justify-end itemHeaderPrice w-1/3">
              <span>${dayPrice} Day</span>
            </article>
          </section>
        </section>
      )}
    </article>
  );
};
