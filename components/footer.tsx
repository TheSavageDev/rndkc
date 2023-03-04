import Link from "next/link";
import { useRouter } from "next/router";
import { Social } from "./social";

export const Footer = () => {
  const router = useRouter();
  return (
    <nav className="footer">
      <section className="footer-icon-logo">
        <img src="/img/RNDWhite2.svg" alt="RNDKC" className="footer-logo" />
      </section>
      <section className="footer-nav">
        <article className="navBar-wideMenu">
          <Link
            href="/"
            className={`${router.pathname === "/" ? "current-link" : ""}`}
          >
            Home
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
            href="contact-us"
            className={`${
              router.pathname === "/contact-us" ? "current-link" : ""
            }`}
          >
            Contact Us
          </Link>
        </article>
      </section>
      <section className="footer-social">
        <Social fgColor="#222222" bgColor="#fff" text="" justify="center" />
      </section>
    </nav>
  );
};
