import Image from "next/image";
import { CarCarousel } from "./carousel";
import { RentalReadyImageGrid } from "./imageGrid";
import { Social } from "./social";

export const Gallery = () => {
  return (
    <section className="rental-ready_container">
      <section className="rental-ready">
        <section className="rental-ready_header">
          <section className="rental-ready_header_title-box">
            <img
              src="/img/slices/tread.svg"
              alt="tread icon"
              className="rental-ready_header_title_icon"
            />
            <article className="rental-ready_header_title">
              <h2>
                <span className="rental-ready_header_title--orange">
                  Rental{" "}
                </span>
                Ready
              </h2>
            </article>
          </section>
          <section className="rental-ready_header_divider"></section>
          <p className="rental-ready_paragraph">
            These rentals are currently available and ready to roll! Crank the
            windows down, drop the top, and enjoy the ride cruising Kansas City
            in a classic muscle car!
          </p>
        </section>
        <RentalReadyImageGrid />
      </section>
    </section>
  );
};
