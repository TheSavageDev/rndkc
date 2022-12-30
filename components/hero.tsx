import Image from "next/image";
import { Divider } from "./divider";
import { NewsLetterSignUpForm } from "./newsletterSignUpForm";
import { Social } from "./social";

export const Hero = () => {
  return (
    <>
      <section id="hero" className="pt-8 w-full px-7 bg-background">
        <h1
          id="home"
          className="text-white font-akshar font-light uppercase text-2xl sm:text-4xl md:text-6xl"
        >
          Money can't buy happiness...
        </h1>
        <h2 className="text-white font-akshar uppercase font-semibold text-2xl sm:text-4xl md:text-6xl">
          but you can rent it for <span className="text-accent">$350.</span>
        </h2>
        <NewsLetterSignUpForm />
      </section>
      <section className="relative mb-10 pt-2 bg-background md:mb-32">
        <Image
          src="/img/67Txt.svg"
          priority
          alt="Camaro"
          width="1000"
          height="100"
          className="w-screen lg:hidden"
        />
        <Image
          src="/img/67CamaroTxt.svg"
          priority
          alt="Camaro"
          width="1000"
          height="1000"
          className="hidden lg:block lg:w-screen"
        />
        <Image
          src="/img/CamaroImg.png"
          alt="67"
          width="700"
          height="100"
          className="absolute top-1/2 -translate-y-20 z-10 md:right-0 lg:w-1/2 lg:top-1/3"
        />
        <article className="flex justify-center bg-lightBg w-full absolute bottom-0 h-24 lg:h-36 lg:-bottom-40 lg:justify-start">
          <section className="absolute w-full lg:w-1/3 mt-4">
            <Social color="black" />
          </section>
        </article>
      </section>
      <section className="w-full">
        <Divider light />
      </section>
    </>
  );
};
