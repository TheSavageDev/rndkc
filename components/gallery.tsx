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
                <span className="gallery-header--title--bold">
                  Drive your dreams
                </span>
              </h2>
              <h2 id="rentals" className="gallery-header--title--light">
                by the
                <span className="gallery-header--title--bold"> day </span>
                or
                <span className="gallery-header--title--bold"> week</span>
              </h2>
            </article>
          </article>
          <p className="gallery-paragraph">
            Owning a classic car is hard, renting one is easy. RND offers Kansas
            City some of the most iconic and classic cars available to rent. Now
            you can enjoy classic and exotic vehicles without the cost and
            hassle of owning one. Sign up for notifications and follow us on
            social media to stay up to date on new inventory and special events
            at RND.
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
