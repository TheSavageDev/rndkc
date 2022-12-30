import Image from "next/image";
import { Divider } from "./divider";

export const OurStory = () => {
  return (
    <>
      <section id="our-story" className="w-full pl-4 pt-2 pb-1 bg-background">
        <h2 className="font-akshar font-normal text-4xl uppercase sm:text-5xl md:text-7xl">
          Our Story
        </h2>
      </section>
      <section className="w-full z-10 relative">
        <Image
          src="/img/KCoutline.svg"
          alt="KC Skyline"
          width="400"
          height="200"
          className="hidden absolute right-0 z-50 bottom-0 lg:block lg:w-1/4 xl:right-10 xl:w-1/5"
        />
        <Divider />
      </section>
      <section className="flex flex-col items-center bg-background">
        <section className="pt-6">
          <Image
            src="/img/PanoramaPlaceholder.jpg"
            alt="panorama"
            width="1000"
            height="1000"
            style={{
              objectFit: "contain",
            }}
          />
        </section>
        <section className="p-4">
          <p className="font-semibold text-center text-lg font-khand">
            “I realized you have to be a mechanic to own these cars. You have to
            have the knowledge, the tools, the space, and the money. In that
            moment R&D Garage was born. “
          </p>
        </section>
      </section>
    </>
  );
};
