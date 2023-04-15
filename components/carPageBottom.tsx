import { ContactForm } from "./contactForm";

export const CarPageBottom = () => {
  return (
    <section className="car-page_bottom-container">
      <article className="ugh">
        <article className="car-page_delivery">
          <h2 className="car-page_bottom_header">
            We Offer Delivery <img src="/img/tow-truck-icon.svg" />
          </h2>
          <article className="car-page_tow-truck-img">
            <img src="/img/tow-truck.png" />
          </article>
          <p className="car-page_tow-truck_blurb">
            Imagine your friends and neighbors reaction when a 1956 Cabover
            pulls up to deliver your ride!
          </p>
        </article>
        <article className="car-page_tow-truck-img-wide">
          <img src="/img/tow-truck.png" />
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
