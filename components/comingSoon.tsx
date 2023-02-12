import { ComingSoonImageGrid } from "./comingSoonImageGrid";

export const ComingSoon = () => {
  return (
    <section className="rental-ready_container">
      <section className="rental-ready">
        <section className="rental-ready_header">
          <section className="rental-ready_header_title-box">
            <img
              src="/img/slices/coming_soon.svg"
              alt="Wrench and Car Icon"
              className="rental-ready_header_title_icon"
            />
            <article className="rental-ready_header_title">
              <h2>
                <span className="rental-ready_header_title--orange">
                  Coming{" "}
                </span>
                Soon
              </h2>
            </article>
          </section>
          <p className="rental-ready_paragraph">
            These are some of our rentals that are currently being built and
            will be available soon. Inventory is always changing so be sure to
            sign up for notifications and follow us on social media.
          </p>
        </section>
        <ComingSoonImageGrid />
      </section>
    </section>
  );
};
