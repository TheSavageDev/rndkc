import { ContactForm } from "./contactForm";

export const CarPageBottom = ({ tab }) => {
  return (
    <section className="car-page_bottom-container">
      <article className="ugh">
        <article className="car-page_delivery">
          <h2 className="car-page_bottom_header">
            {["self", "commercial"].includes(tab) ? (
              <>
                We Offer Delivery <img src="/img/tow-truck-icon.svg" />
              </>
            ) : (
              <>
                Make your event even more special <img src="/img/rings.svg" />
              </>
            )}
          </h2>
          <article className="car-page_tow-truck-img">
            <img
              src={
                ["self", "commercial"].includes(tab)
                  ? "/img/tow-truck.png"
                  : "/img/chaff-bottom.png"
              }
            />
            {tab === "chauffeured" && (
              <small className="image-credit">
                photography by lbensonphotography.com
              </small>
            )}
          </article>
          <p className="car-page_tow-truck_blurb">
            {["self", "commercial"].includes(tab) ? (
              <>
                Imagine your friends and neighbors reaction when a 1956 Cabover
                pulls up to deliver your ride!
              </>
            ) : (
              <>
                Weddings, anniversaries, date nights, or birthdays. You just
                relax and enjoy your special day, we’ll do all the driving.
              </>
            )}
          </p>
        </article>
        <article className="car-page_tow-truck-img-wide">
          <img
            src={
              ["self", "commercial"].includes(tab)
                ? "/img/tow-truck.png"
                : "/img/chaff-bottom.png"
            }
          />
        </article>
      </article>
      <article className="car-page_tow-truck_divider"></article>
      <h3 className="car-page_questions_header">Have Questions?</h3>
      <article className="car-page_questions-container">
        <p className="car-page_questions_header-text">
          At RND we strive to make your classic car rental experience as simple
          and enjoyable as possible. We offer delivery to your home or work. We
          can also pick you up from the airport if you are in town visiting. If
          you have questions visit our{" "}
          <a
            href="/faq"
            className="car-page_questions_header-text--bold--underlined"
          >
            FAQ Page
          </a>
          , use the contact form below, or call us at{" "}
          <a
            href="tel:8162001163"
            className="car-page_questions_header-text--bold"
          >
            816-200-1163
          </a>
        </p>
        <article className="car-page_contact-form">
          <ContactForm />
        </article>
      </article>
    </section>
  );
};
