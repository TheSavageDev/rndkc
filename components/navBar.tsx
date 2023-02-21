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
            <Link href="/" className="" onClick={handleToggleNav}>
              Home
            </Link>
            <Link href="/our-story" className="" onClick={handleToggleNav}>
              Our Story
            </Link>
            <Link href="/faq" className="" onClick={handleToggleNav}>
              FAQ
            </Link>
            <Link href="/contact-us" className="" onClick={handleToggleNav}>
              Contact Us
            </Link>
          </article>
        </section>
      )}
      <section className="navBar-icon-logo">
        <article className="navBar-icon" onClick={handleToggleNav}>
          <span></span>
          <span></span>
          <span></span>
        </article>
        <Link href="/">
        <img src="/img/RNDWhite2.svg" alt="RNDKC" className="navBar-logo" />
        </Link>
      </section>
      <article className="navBar-text">
        <Link href="/">
          <img src="/img/webtext.svg" height={15} />
        </Link>
      </article>
      <article className="navBar-wideMenu">
        <Link href="/">Home</Link>
        <span>|</span>
        <Link href="/our-story">Our Story</Link>
        <span>|</span>
        <Link href="/faq">FAQ</Link>
        <span>|</span>
        <Link href="contact-us">Contact Us</Link>
      </article>
    </nav>
  );
};
