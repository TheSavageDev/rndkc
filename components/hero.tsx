import Image from "next/image";
import { Divider } from "./divider";
import { NewsLetterSignUpForm } from "./newsletterSignUpForm";
import { Social } from "./social";
import "./hero.module.css";

export const Hero = () => {
  return (
    <section className="hero-container">
      <section id="hero" className="hero">
        <article className="hero-header">
          <h1 id="home" className="hero-header--title">
            Owning a classic car is hard,
          </h1>
          <article className="hero-header-sub">
            <h2 className="hero-header--subtitle">renting one is easy as</h2>
            <img src="./img/RNDBlack2.svg" className="hero-header--logo" />
          </article>
        </article>
      </section>
      <article className="hero-newsletter">
        <h2 className="hero-newsletter_heading">
          Sign up now for discounts and special offers
        </h2>
        <NewsLetterSignUpForm justify="start" text="Sign Up" />
      </article>
      <Divider light />
    </section>
  );
};
