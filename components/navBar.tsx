import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export const NavBar = () => {
  const [open, setOpen] = useState(false);
  const handleToggleNav = () => {
    setOpen(!open);
  };
  const router = useRouter();

  return (
    <nav className="navBar">
      {open && (
        <section className="navBar-mobile-pane">
          <article className="navBar-pane">
            <Link href="/" className="" onClick={handleToggleNav}>
              Home
            </Link>
            <Link href="/car-pay" className="" onClick={handleToggleNav}>
              CarPay
            </Link>
            <Link href="/inventory" className="" onClick={handleToggleNav}>
              Rental Inventory
            </Link>
            <Link href="/our-story" className="" onClick={handleToggleNav}>
              Our Story
            </Link>
            <Link href="/faq" className="" onClick={handleToggleNav}>
              F.A.Q
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
        <Link
          href="/"
          className={`${router.pathname === "/" ? "current-link" : ""}`}
        >
          Home
        </Link>
        <span>|</span>
        <Link
          href="/car-pay"
          className={`${router.pathname === "/car-pay" ? "current-link" : ""}`}
        >
          CarPay
        </Link>
        <span>|</span>
        <Link
          href="/inventory"
          className={`${
            router.pathname === "/inventory" ? "current-link" : ""
          }`}
        >
          Rental Inventory
        </Link>
        <span>|</span>
        <Link
          href="/our-story"
          className={`${
            router.pathname === "/our-story" ? "current-link" : ""
          }`}
        >
          Our Story
        </Link>
        <span>|</span>
        <Link
          href="/faq"
          className={`${router.pathname === "/faq" ? "current-link" : ""}`}
        >
          F.A.Q
        </Link>
        <span>|</span>
        <Link
          href="/contact-us"
          className={`${
            router.pathname === "/contact-us" ? "current-link" : ""
          }`}
        >
          Contact Us
        </Link>
      </article>
    </nav>
  );
};
