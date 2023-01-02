import Image from "next/image";
import { Divider } from "./divider";
import { NewsLetterSignUpForm } from "./newsletterSignUpForm";
import { Social } from "./social";

export const Hero = () => {
  return (
    <>
      <section
        id="hero"
        className="pt-8 w-full px-7 bg-background lg:pb-4 lg:overflow-x-hidden"
      >
        <h1
          id="home"
          className="text-white font-akshar font-light uppercase text-xl sm:text-4xl md:text-5xl lg:text-6xl"
        >
          Money can't buy happiness...
        </h1>
        <h2 className="text-white font-akshar uppercase font-semibold text-xl sm:text-4xl md:text-5xl lg:text-6xl">
          but you can rent it for <span className="text-accent">$350</span>
        </h2>
        <NewsLetterSignUpForm justify="start" />
      </section>
      <section className="pt-2 bg-background">
        <section className="w-screen h-52 sm:h-72 md:h-96 lg:h-48 2xl:h-72 3xl:h-96">
          <Image
            src="/img/67Txt.svg"
            priority
            alt="Camaro"
            width="100"
            height="100"
            className="w-11/12 mx-auto lg:hidden"
          />
          <Image
            src="/img/67CamaroTxt.svg"
            priority
            alt="Camaro"
            width="1000"
            height="1000"
            className="hidden lg:block lg:w-100 lg:mx-auto xl:w-full xl:px-3"
          />
        </section>
        <article className="relative flex flex-col justify-center items-center bg-lightBg w-full h-40 sm:h-64 md:h-72 lg:flex-row lg:h-48 2xl:h-64 3xl:h-72">
          <section className="absolute flex flex-col justify-center -translate-y-8 z-10 w-full mb-4 sm:-translate-y-16 md:-translate-y-20 lg:flex-row-reverse lg:-translate-y-20 xl:-translate-y-24 3xl:-translate-y-32">
            <Image
              src="/img/CamaroImg.png"
              alt="67"
              width="1900"
              height="100"
              className="lg:w-3/5 lg:translate-x-6 xl:translate-x-20"
            />
            <section className="lg:self-end 2xl:pb-4">
              <Social bgColor="black" fgColor="white" text="black" />
            </section>
          </section>
        </article>
      </section>
      <section className="w-full">
        <Divider light />
      </section>
    </>
  );
};
