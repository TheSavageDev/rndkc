import { SocialIcon } from "react-social-icons";

export const NavSubheader = ({ title }) => {
  return (
    <section className="nav-subheader">
      <h2 className="nav-subheader--text">{title}</h2>
      <article className="nav-subheader-social-container">
        Follow Us:
        <SocialIcon
          fgColor="transparent"
          bgColor="#fff"
          style={{ height: 30, width: 30 }}
          url="https://facebook.com/RNDKansasCity"
        />
        <SocialIcon
          fgColor="transparent"
          bgColor="#fff"
          style={{ height: 30, width: 30 }}
          url="https://instagram.com/rnd_kc"
        />
        <SocialIcon
          fgColor="transparent"
          bgColor="#fff"
          style={{ height: 30, width: 30 }}
          url="https://twitter.com/RND_KC"
        />
      </article>
    </section>
  );
};
