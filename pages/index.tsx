import Image from "next/image";
import { Social } from "../components/social";
import { NewsLetterSignUpForm } from "../components/newsletterSignUpForm";
import { ContactForm } from "../components/contactForm";
import { NavBar } from "../components/navBar";
import { Divider } from "../components/divider";
import { CarCarousel } from "../components/carousel";

export default function Home() {
  return (
    <div className="min-w-screen flex min-h-screen flex-col font-khand font-normal text-gray-200 bg-black bg-cover md:bg-stang md:bg-contain bg-no-repeat md:bg-center md:bg-origin-content">
      <NavBar />
      <main className="flex flex-col items-center w-screen bg-lightBg">
        <section id="hero" className="pt-8 w-full px-7 bg-background">
          <h1 className="text-white font-akshar font-light uppercase text-2xl">
            Money can't buy happiness...
          </h1>
          <h2 className="text-white font-akshar uppercase font-semibold text-2xl">
            but you can rent it for <span className="text-accent">$350.</span>
          </h2>
          <NewsLetterSignUpForm />
        </section>
        <section className="relative mb-10 pt-2 bg-background">
          <Image src="/img/67Txt.svg" alt="Camaro" width="1000" height="100" />
          <Image
            src="/img/CamaroImg.png"
            alt="67"
            width="1000"
            height="100"
            className="absolute top-1/2 -translate-y-12 z-10"
          />
          <article className="bg-lightBg w-full absolute -bottom-10 h-48">
            <section className="absolute bottom-0 w-full pb-3 mt-4">
              <Social color="black" />
            </section>
          </article>
        </section>
        <Divider light />
        <section className="w-full bg-white text-black flex flex-col items-center">
          <section className="flex justify-center mt-2">
            <aside className="self-center mr-4">
              <Image
                src="/img/ShiftIcon.svg"
                alt="shift icon"
                width="40"
                height="40"
              />
            </aside>
            <article>
              <h2 className="text-2xl uppercase font-akshar font-semibold">
                Drive your dreams
              </h2>
              <h2 className="text-2xl uppercase font-akshar font-thin">
                by the
                <span className="font-semibold"> day </span>
                or
                <span className="font-semibold"> week</span>
              </h2>
            </article>
          </section>
          <section className="w-full px-3 mt-2">
            <CarCarousel />
          </section>
          <section className="my-4">
            <Social color="black" />
          </section>
        </section>
        <section className="w-full pl-4 pt-2 pb-1 bg-background">
          <h2 className="font-akshar font-normal text-4xl uppercase">
            Our Story
          </h2>
        </section>
        <Divider />
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
            <h2 className="text-2xl uppercase font-semibold font-khand">
              Start Your Engines
            </h2>
          </section>
          <section className="my-4 px-4">
            <Image
              src="/img/AboutImg1.jpg"
              alt="classic car"
              width="1000"
              height="1000"
            />
          </section>
          <section className="p-4">
            <p className="font-normal font-manrope">
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
        <section className="flex flex-col items-center bg-white text-black">
          <section className="flex space-x-2 w-full pl-4">
            <Image src="/img/Flags.svg" alt="flags" width="40" height="40" />
            <h2 className="text-2xl uppercase  font-semibold font-khand">
              The Road We're Taking
            </h2>
          </section>
          <section className="my-4 px-4">
            <Image
              src="/img/AboutImg2.jpg"
              alt="warehouse with classic cars"
              width="1000"
              height="1000"
            />
          </section>
          <section className="p-4">
            <p className="font-normal font-manrope">
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
        <section className="bg-text">
          <section className="flex flex-col items-center bg-secondary text-white m-4 pb-8 rounded-md border border-accent">
            <h2 className="text-2xl uppercase text-center font-normal font-gemunuLibre px-8 pt-8">
              Subscribe & Follow Us on Social Media
            </h2>
            <section className="my-4 text-center text-text font-normal font-khand text-xl px-2">
              Stay up to date on our progress, new inventory, and special
              events.
            </section>
            <section className="w-full px-2 mb-4">
              <NewsLetterSignUpForm />
            </section>
            <Social color="white" />
          </section>
        </section>
        <section className="p-4 bg-contactBg pb-36 bg-contain bg-no-repeat bg-bottom bg-background">
          <h2 className="text-5xl uppercase font-normal font-akshar">
            Get In Touch
          </h2>
          <article className="py-8">
            <Image
              src="/img/RNDWhite2.svg"
              alt="RNDKC"
              height="74"
              width="183"
            />
          </article>
          <h3 className="font-khand font-semibold text-2xl">
            We'd Love to Hear From You!
          </h3>
          <p className="font-manrope text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nis.
          </p>
          <ContactForm />
        </section>
      </main>
    </div>
  );
}
