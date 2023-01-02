import Image from "next/image";

const StartYourEnginesHeader = () => {
  return (
    <article className="flex space-x-2">
      <Image src="/img/SparkPlug.svg" alt="spark plug" width="30" height="30" />
      <h2 className="text-2xl uppercase font-semibold font-khand sm:text-3xl">
        Start Your Engines
      </h2>
    </article>
  );
};

const StartYourEnginesImage = () => {
  return (
    <Image
      src="/img/AboutImg1.jpg"
      alt="classic car"
      width="1000"
      height="100"
    />
  );
};
const TheRoadWereTakingImage = () => {
  return (
    <Image
      src="/img/AboutImg2.jpg"
      alt="warehouse with classic cars"
      width="1000"
      height="100"
    />
  );
};

const TheRoadWereTakingHeader = () => {
  return (
    <article className="flex space-x-2">
      <Image src="/img/Flags.svg" alt="flags" width="40" height="40" />
      <h2 className="text-2xl uppercase font-semibold font-khand sm:text-3xl">
        The Road We're Taking
      </h2>
    </article>
  );
};

const Paragraph = () => {
  return (
    <p className="font-normal font-manrope lg:text-xl">
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

export const About = () => {
  return (
    <>
      <section className="flex flex-col bg-white text-black sm:hidden">
        <article className="pl-4 my-2">
          <StartYourEnginesHeader />
        </article>
        <article className="px-4 my-2">
          <StartYourEnginesImage />
        </article>
        <article className="px-4 my-2">
          <Paragraph />
        </article>
      </section>
      <section className="hidden sm:flex bg-white text-black">
        <article className="px-4 my-2 sm:w-1/2">
          <StartYourEnginesHeader />
          <Paragraph />
        </article>
        <article className="px-4 my-2 sm:w-1/2 sm:self-center">
          <StartYourEnginesImage />
        </article>
      </section>
      <section className="flex flex-col bg-white text-black sm:hidden">
        <article className="pl-4 my-2">
          <TheRoadWereTakingHeader />
        </article>
        <article className="px-4 my-2">
          <TheRoadWereTakingImage />
        </article>
        <article className="px-4 my-2">
          <Paragraph />
        </article>
      </section>
      <section className="hidden sm:flex bg-white text-black">
        <article className="px-4 my-2 sm:w-1/2 sm:self-center">
          <TheRoadWereTakingImage />
        </article>
        <article className="px-4 my-2 sm:w-1/2">
          <TheRoadWereTakingHeader />
          <Paragraph />
        </article>
      </section>
    </>
  );
};
