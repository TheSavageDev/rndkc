import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const NavBar = () => {
  const [open, setOpen] = useState(false);
  const handleToggleNav = () => {
    setOpen(!open);
  };
  return (
    <nav className="bg-secondary py-3 px-3 flex justify-between items-center">
      {open && (
        <section className="w-screen h-screen bg-blackSemiTransparent absolute top-0 left-0 right-0 bottom-0 z-10">
          <article className="flex flex-col justify-around text-3xl">
            <a href="#home" className="m-2 p-4" onClick={handleToggleNav}>
              Home
            </a>
            <a href="#rentals" className="m-2 p-4" onClick={handleToggleNav}>
              Rentals
            </a>
            <a href="#our-story" className="m-2 p-4" onClick={handleToggleNav}>
              Our Story
            </a>
            <a
              href="#get-in-touch"
              className="m-2 p-4"
              onClick={handleToggleNav}
            >
              Get in Touch
            </a>
          </article>
        </section>
      )}
      <section className="flex space-x-8 items-center">
        <article
          className="block space-y-2 lg:hidden"
          onClick={handleToggleNav}
        >
          <span className="block w-8 h-1 bg-light"></span>
          <span className="block w-8 h-1 bg-light"></span>
          <span className="block w-8 h-1 bg-light"></span>
        </article>
        <Image src="/img/RNDWhite2.svg" alt="RNDKC" width="99" height="40" />
      </section>
      <article className="block lg:hidden">
        <Link href="/">rndkc.com</Link>
      </article>
      <article className="hidden lg:flex lg:justify-around">
        <a href="#home" className="mx-2">
          Home
        </a>
        <span>|</span>
        <a href="#rentals" className="mx-2">
          Rentals
        </a>
        <span>|</span>
        <a href="#our-story" className="mx-2">
          Our Story
        </a>
        <span>|</span>
        <a href="#get-in-touch" className="mx-2">
          Get in Touch
        </a>
      </article>
    </nav>
  );
};
