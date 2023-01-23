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
    <p className="about-theRoad-paragraph">
      Whether you dream of driving a classic Corvette through downtown KC, or a
      Dune Buggy through the Plaza, RND has you covered. We make classic and
      exotic vehicles accessible to everyone. Rent a muscle car for a day, a VW
      Camper Van for a weekend, or a classic Ford Bronco for a week, we are
      Kansas City&apos;s classic car rental source. Now you can enjoy all the
      benefits of driving a classic or exotic vehicle without all the hassles
      and headaches of ownership.
    </p>
  );
};
const SecondParagraph = () => {
  return (
    <>
      <p className="about-start_your_engines-paragraph">
        Ryan Wager, founder of R&D Garage, had grown up dreaming about one day
        owning a 1958 Corvette. However, after achieving this “dream” he quickly
        realized that he was in way over his head. Between having absolutely no
        idea how to work on it, finding the right parts, figuring out how to
        install them, storing the vehicle, ultimately keeping the car on the
        road was proving to be nearly impossible. He realized the challenging
        and costly realities of ownership and the joy of driving these vehicles
        were two completely separate things. Ryan wanted to make the enjoyment
        of driving classic cars accessible to everyone but eliminate the hassles
        of ownership. RND was created to solve this problem.
      </p>
      <p className="about-start_your_engines-paragraph">
        RND is a Kansas City company that provides classic and exotic car
        rentals, restoration, and repairs. Our 130,000sq ft warehouse houses
        over 25 classic cars, 4 lifts, a bodyshop, tire stations, and everything
        needed to keep these cars running at top performance so you can just
        enjoy the drive.
      </p>
    </>
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
