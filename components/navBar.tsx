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
          <article className="navBar-pane">
            <a href="/" className="" onClick={handleToggleNav}>
              Home
            </a>
            <a href="/our-story" className="" onClick={handleToggleNav}>
              Our Story
            </a>
            <a href="/faq" className="" onClick={handleToggleNav}>
              FAQ
            </a>
            <a href="/contact-us" className="" onClick={handleToggleNav}>
              Contact Us
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
          <img src="/img/webtext.svg" height={15} />
        </Link>
      </article>
      <article className="navBar-wideMenu">
        <a href="/">Home</a>
        <span>|</span>
        <a href="/our-story">Our Story</a>
        <span>|</span>
        <a href="/faq">FAQ</a>
        <span>|</span>
        <a href="contact-us">Contact Us</a>
      </article>
    </nav>
  );
};
