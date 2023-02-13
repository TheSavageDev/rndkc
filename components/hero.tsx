import { NewsLetterSignUpForm } from "./newsletterSignUpForm";
import "./hero.module.css";

export const Hero = () => {
  return (
    <section className="hero-container">
      <section id="hero" className="hero">
        <article className="hero-header">
          <h1 id="home" className="hero-header--title">
            Don't just dream it,
          </h1>
          <article className="hero-header-sub">
            <h2 className="hero-header--subtitle">drive it.</h2>
          </article>
        </article>
      </section>
    </section>
  );
};
