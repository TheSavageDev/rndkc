import Image from "next/image";

export const About = () => {
  return (
    <>
      <section className="flex flex-col items-center bg-white text-black">
        <section className="flex space-x-2 w-full pl-4 mt-4">
          <Image
            src="/img/SparkPlug.svg"
            alt="spark plug"
            width="30"
            height="30"
          />
          <h2 className="text-2xl uppercase font-semibold font-khand sm:text-4xl md:text-6xl">
            Start Your Engines
          </h2>
        </section>
        <section className="flex flex-col items-center lg:flex-row-reverse">
          <section className="my-4 px-4">
            <Image
              src="/img/AboutImg1.jpg"
              alt="classic car"
              width="1000"
              height="1000"
            />
          </section>
          <section className="p-4 lg:w-2/5">
            <p className="font-normal font-manrope lg:text-2xl">
              Ryan Wager, founder of R&D Garage, had grown up dreaming about one
              day owning a 1958 Corvette. However, after achieving this “dream”
              he quickly realized that he was in way over his head. Between
              having absolutely no idea how to work on it, finding parts that
              would fit being nearly impossible, properly figuring out how to
              install them once acquired, properly storing it, and then
              ultimately getting and keeping the car on the road was proving to
              be nearly impossible.
            </p>
          </section>
        </section>
      </section>
      <section className="flex flex-col items-center bg-white text-black">
        <section className="flex space-x-2 w-full pl-4">
          <Image src="/img/Flags.svg" alt="flags" width="40" height="40" />
          <h2 className="text-2xl uppercase  font-semibold font-khand sm:text-4xl md:text-6xl">
            The Road We're Taking
          </h2>
        </section>
        <section className="flex flex-col items-center lg:flex-row">
          <section className="my-4 px-4">
            <Image
              src="/img/AboutImg2.jpg"
              alt="warehouse with classic cars"
              width="1000"
              height="1000"
            />
          </section>
          <section className="p-4 lg:w-2/5">
            <p className="font-normal font-manrope lg:text-2xl">
              Ryan Wager, founder of R&D Garage, had grown up dreaming about one
              day owning a 1958 Corvette. However, after achieving this “dream”
              he quickly realized that he was in way over his head. Between
              having absolutely no idea how to work on it, finding parts that
              would fit being nearly impossible, properly figuring out how to
              install them once acquired, properly storing it, and then
              ultimately getting and keeping the car on the road was proving to
              be nearly impossible.
            </p>
          </section>
        </section>
      </section>
    </>
  );
};
