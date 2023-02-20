import { NewsLetterSignUpForm } from "./newsletterSignUpForm";

export const Subscribe = () => {
  return (
    <section className="subscribe-container">
      <section className="subscribe-card">
        <h2 className="subscribe-card-title">
          Stay up to date on New Inventory, Discounts, and Special Events
        </h2>
        <section className="subscribe-card-subtitle">
          Our inventory is always changing. If we don’t have your dream car
          today we might just have it tomorrow. Sign up for our newsletter to
          stay updated on what’s happening at RND.
        </section>
        <section className="subscribe-card-form">
          <NewsLetterSignUpForm justify="center" />
        </section>
      </section>
    </section>
  );
};
