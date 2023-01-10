import Image from "next/image";
import { Divider } from "./divider";

export const OurStory = () => {
  return (
    <section className="our-story-outer">
      <section className="our-story-container">
        <section className="our-story">
          <h2 id="our-story" className="our-story-title">
            Our Story
          </h2>
          <section className="w-full z-10 relative">
            <Image
              src="/img/KCoutline.svg"
              alt="KC Skyline"
              width="400"
              height="200"
              className="our-story-kc"
            />
          </section>
        </section>
        <section className="our-story-divider">
          <Divider />
        </section>
        <section className="our-story-article">
          <Image
            src="/img/PanoramaPlaceholder.jpg"
            alt="panorama"
            width="1000"
            height="1000"
            style={{
              objectFit: "contain",
            }}
          />
          <section className="our-story-article-text_container">
            <p className="our-story-article--text">
              “I realized you have to be a mechanic to own these cars. You have
              to have the knowledge, the tools, the space, and the money. In
              that moment R&D Garage was born. “
            </p>
          </section>
        </section>
      </section>
    </section>
  );
};
