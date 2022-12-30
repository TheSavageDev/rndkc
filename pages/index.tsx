import { NavBar } from "../components/navBar";
import { Hero } from "../components/hero";
import { Gallery } from "../components/gallery";
import { OurStory } from "../components/ourStory";
import { About } from "../components/about";
import { Subscribe } from "../components/subscribe";
import { GetInTouch } from "../components/getInTouch";

export default function Home() {
  return (
    <div className="min-w-screen flex min-h-screen flex-col font-khand font-normal text-gray-200 bg-black bg-cover md:bg-stang md:bg-contain bg-no-repeat md:bg-center md:bg-origin-content">
      <NavBar />
      <main className="flex flex-col items-center w-screen bg-lightBg lg:bg-background">
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
