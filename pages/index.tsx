import { NavBar } from "../components/navBar";
import { Hero } from "../components/hero";
import { Gallery } from "../components/gallery";
import { OurStory } from "../components/ourStory";
import { About } from "../components/about";
import { Subscribe } from "../components/subscribe";
import { GetInTouch } from "../components/getInTouch";
import { NewsLetterSignUpForm } from "../components/newsletterSignUpForm";
import { Footer } from "../components/footer";
import { RentalStatus } from "../components/rentalStatus";
import { GoCars } from "../components/goCars";
import { Vote } from "../components/vote";
import { ComingSoon } from "../components/comingSoon";

export default function Home() {
  return (
    <div className="main">
      <NavBar />
      <main className="container">
        <Hero />
        <article className="hero-newsletter">
          <h2 className="hero-newsletter_heading">
            Kansas City Classic Car Rentals
          </h2>
          <h3 className="hero-newsletter_subheading">
            Sign up now for discounts and special offers
          </h3>
          <NewsLetterSignUpForm justify="start" text="Sign Up" />
        </article>
        <Gallery />
        <ComingSoon />
        <Vote />
        <RentalStatus />
        <OurStory />
        <Subscribe />
        <Footer />
      </main>
    </div>
  );
}
