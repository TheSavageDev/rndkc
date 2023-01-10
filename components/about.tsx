import Image from "next/image";

const StartYourEnginesImage = () => {
  return (
    <img
      src="/img/about1.png"
      alt="classic car"
      className="about-start_your_engines-img"
    />
  );
};
const TheRoadWereTakingImage = () => {
  return (
    <img
      src="/img/about2.png"
      alt="warehouse with classic cars"
      className="about-the_road_we_are_taking-img"
    />
  );
};

const Paragraph = () => {
  return (
    <p className="about-start_your_engines-paragraph">
      Ryan Wager, founder of R&D Garage, had grown up dreaming about one day
      owning a 1958 Corvette. However, after achieving this “dream” he quickly
      realized that he was in way over his head. Between having absolutely no
      idea how to work on it, finding parts that would fit being nearly
      impossible, properly figuring out how to install them once acquired,
      properly storing it, and then ultimately getting and keeping the car on
      the road was proving to be nearly impossible.
    </p>
  );
};
const SecondParagraph = () => {
  return (
    <p className="about-theRoad-paragraph">
      Whether you dream of driving a classic corvette through downtown KC, or
      wonder what it would be like to drive a Dune Buggy through the plaza, RND
      has you covered. We make classic and exotic vehicles accessible. Rent a
      muscle car for a day, a VW Camper Van for a weekend, or a drive a classic
      Ford Bronco for the week, we are Kansas City’s classic car rental
      resource. Now you can enjoy all the benefits of driving a classic or
      exotic vehicle without all the hassles and headaches of ownership.
    </p>
  );
};

export const About = () => {
  return (
    <section className="about-outer">
      <section className="about-container">
        <article className="about-start_your_engines">
          <Image
            src="/img/SparkPlug.svg"
            alt="spark plug"
            width="25"
            height="25"
          />
          <h2 className="about-start_your_engines-text">Start Your Engines</h2>
        </article>
        <section className="about-start_your_engines-paragraph">
          <article className="about-start_your_engines-paragraph-image px-4 my-2">
            <StartYourEnginesImage />
          </article>
          <article className="about-start_your_engines-paragraph-text px-4 my-2">
            <Paragraph />
          </article>
        </section>
      </section>
      {/* <section className="hidden sm:flex sm:max-h-1/2 bg-white text-black">
        <article className="px-4 my-2 sm:w-1/2">
          <StartYourEnginesHeader />
          <Paragraph />
        </article>
        <article className="px-4 my-2 sm:w-1/2 sm:self-center">
          <StartYourEnginesImage />
        </article>
      </section> */}
      <section className="about-secondContainer">
        <article className="about-theRoad">
          <Image src="/img/Flags.svg" alt="spark plug" width="25" height="25" />
          <h2 className="about-theRoad-text">The Road We're Taking</h2>
        </article>
        <section className="about-theRoad-paragraph">
          <article className="about-theRoad-paragraph-image px-4 my-2">
            <TheRoadWereTakingImage />
          </article>
          <article className="about-theRoad-paragraph-text px-4 my-2">
            <SecondParagraph />
          </article>
        </section>
      </section>
      {/* <section className="hidden sm:flex bg-white text-black">
        <article className="px-4 my-2 sm:w-1/2 sm:self-center">
          <TheRoadWereTakingImage />
        </article>
        <article className="px-4 my-2 sm:w-1/2">
          <TheRoadWereTakingHeader />
          <SecondParagraph />
        </article>
      </section> */}
    </section>
  );
};
