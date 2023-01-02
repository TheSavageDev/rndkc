import Image from "next/image";
import { ContactForm } from "./contactForm";
import { Social } from "./social";

export const GetInTouch = () => {
  return (
    <section className="p-4 bg-contactBg pb-36 bg-contain bg-no-repeat bg-bottom bg-background w-screen md:bg-cover md:pb-4 lg:bg-fit lg:bg-center">
      <h2
        id="get-in-touch"
        className="text-5xl uppercase font-normal font-akshar md:text-center"
      >
        Get In Touch
      </h2>
      <section className="flex flex-col md:flex-row md:justify-between">
        <article className="flex flex-col md:w-3/4">
          <Image
            src="/img/RNDWhite2.svg"
            alt="RNDKC"
            height="56"
            width="150"
            className="py-4"
          />
          <h3 className="font-khand font-semibold text-2xl">
            We'd Love to Hear From You!
          </h3>
          <article className="hidden md:flex md:mt-10">
            <Social bgColor="white" fgColor="transparent" text="white" />
          </article>
        </article>
        <article className="md:w-3/5">
          <ContactForm />
        </article>
      </section>
    </section>
  );
};
