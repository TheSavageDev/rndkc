import { NavBar } from "../components/navBar";
import { Hero } from "../components/hero";
import { Gallery } from "../components/gallery";
import { OurStory } from "../components/ourStory";
import { Subscribe } from "../components/subscribe";
import { NewsLetterSignUpForm } from "../components/newsletterSignUpForm";
import { Footer } from "../components/footer";
import { RentalStatus } from "../components/rentalStatus";
import { Vote } from "../components/vote";
import { ComingSoon } from "../components/comingSoon";
import { AvailableRentals } from "../components/availableRentals";
import { usePageTracking } from "../hooks/usePageTracking";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  usePageTracking(router);
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
        <AvailableRentals />
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
