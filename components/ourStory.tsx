import Link from "next/link";

export const OurStory = () => {
  return (
    <section className="our-story-container">
      <section className="our-story">
        <h2 id="our-story" className="our-story-title">
          Our Story
        </h2>
      </section>
      <p className="our-story-article--text">
        “I realized you have to be a mechanic to own these cars. You have to
        have the knowledge, the tools, the space, and the money. In that moment
        R&D Garage was born. “
      </p>
      <Link href="/our-story" className="our-story-button">
        Read Our Story
      </Link>
    </section>
  );
};
