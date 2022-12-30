import { NewsLetterSignUpForm } from "./newsletterSignUpForm";
import { Social } from "./social";

export const Subscribe = () => {
  return (
    <section className="bg-text lg:w-full">
      <section className="flex flex-col items-center bg-secondary text-white m-4 pb-8 rounded-md border border-accent">
        <h2 className="text-2xl uppercase text-center font-normal font-gemunuLibre px-8 pt-8 sm:text-4xl md:text-6xl">
          Subscribe & Follow Us on Social Media
        </h2>
        <section className="my-4 text-center text-text font-normal font-khand text-xl px-2 sm:text-3xl md:text-5xl">
          Stay up to date on our progress, new inventory, and special events.
        </section>
        <section className="w-full px-2 mb-4 flex justify-center">
          <NewsLetterSignUpForm />
        </section>
        <section className="w-full px-2 mb-4 flex justify-center text-center">
          <Social color="white" />
        </section>
      </section>
    </section>
  );
};
