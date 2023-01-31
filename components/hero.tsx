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
            Money can't buy happiness...
          </h1>
          <h2 className="hero-header--subtitle">
            but you can rent it for <span className="text-accent">$350.</span>
          </h2>
          <NewsLetterSignUpForm justify="start" />
        </article>
        <article className="hero-images">
          <Image
            src="/img/67Txt.svg"
            priority
            alt="Camaro"
            width="1900"
            height="100"
            className="hero-images--text"
          />
          <Image
            src="/img/67CamaroTxt.svg"
            priority
            alt="Camaro"
            width="1900"
            height="100"
            className="hero-images--text-full"
          />
          <article className="hero-images--camaro-box">
            <img
              src="/img/CamaroImg.png"
              alt="67"
              className="hero-images--camaro"
            />
            <article className="hero-social">
              <Social
                bgColor="black"
                fgColor="white"
                text="black"
                justify="center"
              />
            </article>
          </article>
        </article>
      </section>
      <Divider light />
    </section>
  );
};
