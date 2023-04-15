import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Footer } from "../components/footer";
import { NavBar } from "../components/navBar";
import { NavSubheader } from "../components/navSubheader";
import { Subscribe } from "../components/subscribe";
import { usePageTracking } from "../hooks/usePageTracking";

export default function OurStory() {
  const router = useRouter();
  usePageTracking(router);
  return (
    <>
      <Head>
        <title>RND - Our Story</title>
      </Head>
      <NavBar />
      <section className="main">
        <NavSubheader title="Our Story" />
        <section className="our-story-page_container">
          <section className="our-story-page_hero">
            <h2 className="our-story-page_hero_text">
              “I realized you have to be a mechanic to own these cars. You have
              to have the knowledge, the tools, the space, and the money. In
              that moment{" "}
              <span className="our-story-page_hero_text--orange">
                R&D Garage
              </span>{" "}
              was born. “
            </h2>
          </section>
          <section className="our-story-page_content">
            <section className="our-story_owning">
              <section className="our-story-page_content_header">
                <h2 className="our-story-page_content_header-text">
                  Owning a classic car is hard,
                </h2>
                <h2 className="our-story-page_content_header-text--bold">
                  renting one is easy as RND
                </h2>
              </section>
              <article className="our-story-page_content_rnd">
                <p className="our-story-page_content_paragraph">
                  RND makes classic cars available to everyone. Whether you
                  dream of driving a classic Corvette through downtown KC, or a
                  Dune Buggy through the Plaza, RND has you covered. Rent a
                  muscle car for a day, a VW Camper Van for a weekend, or a
                  classic Ford Bronco for a week, RND is Kansas City’s classic
                  car rental source. Now you can enjoy all the benefits of
                  driving classic and exotic vehicles without all the hassles
                  and headaches of ownership.
                </p>
                <p className="our-story-page_content_paragraph-extra">
                  RND is a Kansas City company that provides classic and exotic
                  car rentals, restoration, and repairs. Our 130,000 square foot
                  facility houses over 25 classic cars, 4 lifts, a bodyshop,
                  tire stations, and everything needed to keep these cars
                  running at top performance so you can just enjoy the drive.
                </p>
                <p className="our-story-page_content_paragraph-contact">
                  If you have questions visit our{" "}
                  <a
                    href="/faq"
                    className="booking_questions_header-text--bold"
                  >
                    FAQ Page
                  </a>{" "}
                  or call us at{" "}
                  <a
                    href="tel:8162001163"
                    className="booking_questions_header-text--bold"
                  >
                    816-200-1163
                  </a>
                </p>
              </article>
            </section>
            <section className="our-story_home-grown">
              <section className="our-story-page_content_ryan">
                <section className="our-story-home-grown_header_container">
                  {/* <img
                    src="/img/slices/img_kcsilhouette.png"
                    className="our-story-page_content_kc--big"
                  /> */}
                  <header className="our-story-page_content_ryan_header">
                    <img
                      src="/img/slices/img_kcsilhouette.png"
                      className="our-story-page_content_kc"
                    />
                    <h2 className="our-story-page_content_ryan_header-text">
                      Home Grown in Kansas City
                    </h2>
                  </header>
                </section>
                <article className="our-story-page_content_ryan_content">
                  <p className="our-story-page_content_ryan_content-text--first">
                    Ryan Wager, founder of R&D Garage, had grown up dreaming
                    about one day owning a 1958 Corvette. However, after
                    achieving this “dream” he quickly realized that he was in
                    way over his head. Between having absolutely no idea how to
                    work on it, finding the right parts, figuring out how to
                    install them, storing the vehicle, ultimately keeping the
                    car on the road was proving to be nearly impossible. He
                    found that the challenging and costly realities of ownership
                    and the joy of driving these vehicles were two completely
                    separate things. Ryan wanted to make the enjoyment of
                    driving classic cars accessible to everyone but eliminate
                    the hassles of ownership. RND was created to solve this
                    problem.
                  </p>
                  <p className="our-story-page_content_ryan_content-text">
                    Our 130,000sq ft facility houses over 25 classic cars, 4
                    lifts, a bodyshop, tire stations, and everything needed to
                    keep these cars running at top performance so you can just
                    enjoy the drive.
                  </p>
                  <p className="our-story-page_content_ryan_content-text">
                    If you have questions visit our{" "}
                    <Link
                      href="/faq"
                      className="our-story-page_content_ryan_content-link"
                    >
                      FAQ page
                    </Link>{" "}
                    or call us at{" "}
                    <a
                      href="tel:8162001163"
                      className="our-story-page_content_ryan_content-link"
                    >
                      816-200-1163
                    </a>
                  </p>
                </article>
              </section>
            </section>
          </section>
          <section className="our-story-subscribe">
            <Subscribe />
          </section>
          <Footer />
        </section>
      </section>
    </>
  );
}
