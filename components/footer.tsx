import { Social } from "./social";

export const Footer = () => {
  return (
    <nav className="footer">
      <section className="footer-icon-logo">
        <img src="/img/RNDWhite2.svg" alt="RNDKC" className="footer-logo" />
      </section>
      <section className="footer-social">
        <Social fgColor="#222222" bgColor="#fff" text="" justify="center" />
      </section>
    </nav>
  );
};
