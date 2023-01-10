import { NavBar } from "../components/navBar";
import { Hero } from "../components/hero";
import { Gallery } from "../components/gallery";
import { OurStory } from "../components/ourStory";
import { About } from "../components/about";
import { Subscribe } from "../components/subscribe";
import { GetInTouch } from "../components/getInTouch";

export default function Home() {
  return (
    <div className="main">
      <NavBar />
      <main className="container">
        <Hero />
        <Gallery />
        <OurStory />
        <About />
        <Subscribe />
        <GetInTouch />
      </main>
    </div>
  );
}
