import { GoCars } from "./goCars";
import { RND } from "./rnd";
import { ShowCars } from "./showCars";

export const RentalStatus = ({}) => {
  return (
    <section className="rental-status_container">
      <section className="rental-status_header-container">
        <img src="/img/slices/RND_LogoWhite.svg" />
        <h2 className="rental-status_header">Rental Type & Status</h2>
        <h3 className="rental-status_subheader">
          Each RND rental vehicle falls into one of the following types and
          status:
        </h3>
      </section>
      <section className="rental-status_go-show_container">
        <GoCars />
        <ShowCars />
      </section>
      <section className="rental-status_divider"></section>
      <header className="rental-status_card-container_header">
        <h2 className="rental-status_card-container_header-text">
          Rental Status
        </h2>
      </header>
      <RND />
    </section>
  );
};
