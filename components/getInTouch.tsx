import Image from "next/image";
import { ContactForm } from "./contactForm";

export const GetInTouch = () => {
  return (
    <section className="p-4 bg-contactBg pb-36 bg-contain bg-no-repeat bg-bottom bg-background md:bg-cover lg:w-full">
      <h2
        id="get-in-touch"
        className="text-5xl uppercase font-normal font-akshar sm:text-7xl"
      >
        Get In Touch
      </h2>
      <section className="flex flex-col lg:flex lg:flex-row">
        <article className="lg:flex lg:flex-col">
          <article className="py-8">
            <Image
              src="/img/RNDWhite2.svg"
              alt="RNDKC"
              height="74"
              width="183"
            />
          </article>
          <h3 className="font-khand font-semibold text-2xl sm:text-4xl">
            We'd Love to Hear From You!
          </h3>
          <p className="font-manrope text-sm lg:px-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nis.
          </p>
        </article>
        <ContactForm />
      </section>
    </section>
  );
};
