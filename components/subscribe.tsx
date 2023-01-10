import { NewsLetterSignUpForm } from "./newsletterSignUpForm";
import { Social } from "./social";

export const Subscribe = () => {
  return (
    <section className="subscribe-container">
      <section className="subscribe-card">
        <h2 className="subscribe-card-title">
          Subscribe & Follow Us on Social Media
        </h2>
        <section className="subscribe-card-subtitle">
          Stay up to date on our progress, new inventory, and special events.
        </section>
        <section className="subscribe-card-form">
          <NewsLetterSignUpForm justify="center" />
        </section>
        <section className="subscribe-card-social">
          <Social
            bgColor="white"
            fgColor="black"
            text="text"
            justify="center"
          />
        </section>
      </section>
    </section>
  );
};
