import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const NavBar = () => {
  const [open, setOpen] = useState(false);
  const handleToggleNav = () => {
    setOpen(!open);
  };
  return (
    <nav className="navBar">
      {open && (
        <section className="navBar-mobile-pane">
          <article className="">
            <a href="#home" className="" onClick={handleToggleNav}>
              Home
            </a>
            <a href="#rentals" className="" onClick={handleToggleNav}>
              Rentals
            </a>
            <a href="#our-story" className="" onClick={handleToggleNav}>
              Our Story
            </a>
            <a href="#get-in-touch" className="" onClick={handleToggleNav}>
              Get in Touch
            </a>
          </article>
        </section>
      )}
      <section className="navBar-icon-logo">
        <article className="navBar-icon" onClick={handleToggleNav}>
          <span></span>
          <span></span>
          <span></span>
        </article>
        <img src="/img/RNDWhite2.svg" alt="RNDKC" className="navBar-logo" />
      </section>
      <article className="navBar-text">
        <Link href="/">
          <img src="/img/webtext.svg" />
        </Link>
      </article>
      <article className="navBar-wideMenu">
        <a href="#home">Home</a>
        <span>|</span>
        <a href="#rentals">Rentals</a>
        <span>|</span>
        <a href="#our-story">Our Story</a>
        <span>|</span>
        <a href="#get-in-touch">Get in Touch</a>
      </article>
    </nav>
  );
};
