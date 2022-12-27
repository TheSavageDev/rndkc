import Image from "next/image";
import { Social } from "../components/social";
import { NewsLetterSignUpForm } from "../components/newsletterSignUpForm";
import { ContactForm } from "../components/contactForm";
import { NavBar } from "../components/navBar";
import { Divider } from "../components/divider";
import { CarCarousel } from "../components/carousel";
import { ImageGrid } from "../components/imageGrid";

export default function Home() {
  return (
    <div className="min-w-screen flex min-h-screen flex-col font-khand font-normal text-gray-200 bg-black bg-cover md:bg-stang md:bg-contain bg-no-repeat md:bg-center md:bg-origin-content">
      <NavBar />
      <main className="flex flex-col items-center w-screen bg-lightBg lg:bg-background">
        <section id="hero" className="pt-8 w-full px-7 bg-background">
          <h1
            id="home"
            className="text-white font-akshar font-light uppercase text-2xl sm:text-4xl md:text-6xl"
          >
            Money can't buy happiness...
          </h1>
          <h2 className="text-white font-akshar uppercase font-semibold text-2xl sm:text-4xl md:text-6xl">
            but you can rent it for <span className="text-accent">$350.</span>
          </h2>
          <NewsLetterSignUpForm />
        </section>
        <section className="relative mb-10 pt-2 bg-background md:mb-32">
          <Image
            src="/img/67Txt.svg"
            priority
            alt="Camaro"
            width="1000"
            height="100"
            className="w-screen lg:hidden"
          />
          <Image
            src="/img/67CamaroTxt.svg"
            priority
            alt="Camaro"
            width="1000"
            height="1000"
            className="hidden lg:block lg:w-screen"
          />
          <Image
            src="/img/CamaroImg.png"
            alt="67"
            width="700"
            height="100"
            className="absolute top-1/2 -translate-y-12 z-10 md:right-0 lg:w-1/2 lg:top-1/3"
          />
          <article className="flex justify-center bg-lightBg w-full absolute bottom-0 h-24 lg:h-36 lg:-bottom-40 lg:justify-start">
            <section className="absolute w-full lg:w-1/3 mt-4">
              <Social color="black" />
            </section>
          </article>
        </section>
        <section className="w-full">
          <Divider light />
        </section>
        <section className="w-full bg-white text-black flex flex-col items-center z-10">
          <section className="flex justify-center mt-2">
            <aside className="self-center mr-4">
              <Image
                src="/img/ShiftIcon.svg"
                alt="shift icon"
                width="40"
                height="40"
                className="block md:hidden"
              />
              <Image
                src="/img/ShiftIcon.svg"
                alt="shift icon"
                width="60"
                height="60"
                className="hidden md:block"
              />
            </aside>
            <article>
              <h2
                id="rentals"
                className="text-2xl uppercase font-akshar font-semibold sm:text-4xl md:text-6xl"
              >
                Drive your dreams
              </h2>
              <h2 className="text-2xl uppercase font-akshar font-thin sm:text-4xl md:text-6xl">
                by the
                <span className="font-semibold"> day </span>
                or
                <span className="font-semibold"> week</span>
              </h2>
            </article>
          </section>
          <CarCarousel />
          <ImageGrid />
          <section className="my-4">
            <Social color="black" />
          </section>
        </section>
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
              “I realized you have to be a mechanic to own these cars. You have
              to have the knowledge, the tools, the space, and the money. In
              that moment R&D Garage was born. “
            </p>
          </section>
        </section>
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
                Ryan Wager, founder of R&D Garage, had grown up dreaming about
                one day owning a 1958 Corvette. However, after achieving this
                “dream” he quickly realized that he was in way over his head.
                Between having absolutely no idea how to work on it, finding
                parts that would fit being nearly impossible, properly figuring
                out how to install them once acquired, properly storing it, and
                then ultimately getting and keeping the car on the road was
                proving to be nearly impossible.
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
                Ryan Wager, founder of R&D Garage, had grown up dreaming about
                one day owning a 1958 Corvette. However, after achieving this
                “dream” he quickly realized that he was in way over his head.
                Between having absolutely no idea how to work on it, finding
                parts that would fit being nearly impossible, properly figuring
                out how to install them once acquired, properly storing it, and
                then ultimately getting and keeping the car on the road was
                proving to be nearly impossible.
              </p>
            </section>
          </section>
        </section>
        <section className="bg-text lg:w-full">
          <section className="flex flex-col items-center bg-secondary text-white m-4 pb-8 rounded-md border border-accent">
            <h2 className="text-2xl uppercase text-center font-normal font-gemunuLibre px-8 pt-8 sm:text-4xl md:text-6xl">
              Subscribe & Follow Us on Social Media
            </h2>
            <section className="my-4 text-center text-text font-normal font-khand text-xl px-2 sm:text-3xl md:text-5xl">
              Stay up to date on our progress, new inventory, and special
              events.
            </section>
            <section className="w-full px-2 mb-4 flex justify-center">
              <NewsLetterSignUpForm />
            </section>
            <Social color="white" />
          </section>
        </section>
        <section className="p-4 bg-contactBg pb-36 bg-contain bg-no-repeat bg-bottom bg-background md:bg-cover lg:w-full">
          <h2
            id="get-in-touch"
            className="text-5xl uppercase font-normal font-akshar sm:text-7xl"
          >
            Get In Touch
          </h2>
          <section className="flex flex-col lg:flex lg:flex-row">
            <article className="lg:flex lg:flex-col">
              <article className="py-8">
                <Image
                  src="/img/RNDWhite2.svg"
                  alt="RNDKC"
                  height="74"
                  width="183"
                />
              </article>
              <h3 className="font-khand font-semibold text-2xl sm:text-4xl">
                We'd Love to Hear From You!
              </h3>
              <p className="font-manrope text-sm lg:px-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nis.
              </p>
            </article>
            <ContactForm />
          </section>
        </section>
      </main>
    </div>
  );
}
