import Image from "next/image";
import { CarCarousel } from "./carousel";
import { ImageGrid } from "./imageGrid";
import { Social } from "./social";

export const Gallery = () => {
  return (
    <section className="gallery-container">
      <section className="gallery">
        <section className="gallery-header">
          <article className="gallery-header--title">
            <Image
              src="/img/ShiftIcon.svg"
              alt="shift icon"
              width="30"
              height="30"
              className="mr-4"
            />
            <article className="gallery-header-text">
              <h2>
                <span className="font-normal">Drive your dreams</span>
              </h2>
              <h2 id="rentals" className="">
                by the
                <span className="font-normal"> day </span>
                or
                <span className="font-normal"> week</span>
              </h2>
            </article>
          </article>
          <p className="gallery-paragraph">
            KC Classic Cars offers Kansas City some of the most iconic classic
            cars available to rent. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nis
          </p>
        </section>
        <CarCarousel />
        <ImageGrid />
        <section className="gallery-social">
          <Social
            bgColor="black"
            fgColor="white"
            text="black"
            justify="center"
          />
        </section>
      </section>
    </section>
  );
};
