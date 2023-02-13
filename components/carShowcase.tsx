import { SocialIcon } from "react-social-icons";
import { ContactForm } from "./contactForm";
import { NavSubheader } from "./navSubheader";

export const CarShowcase = () => {
  const fgColor = "transparent";
  const bgColor = "#fff";
  return (
    <section className="getInTouch-container">
      <NavSubheader title="Contact Us" />
      <section className="getInTouch">
        <h2 id="get-in-touch" className="getInTouch-title">
          Get In Touch
        </h2>
        <section className="flex flex-col md:flex-row md:justify-between">
          <article className="flex flex-col md:w-3/4">
            <h3 className="getInTouch-subtitle">We'd Love to Hear From You!</h3>
            <article className="getInTouch-paragraph">
              <p className="getInTouch-paragraph-questions">
                Have questions about our renting from RND? Need a classic car
                for an upcoming special event or photoshoot? We’re here to help.
                Call, email, or use the form below.
              </p>
              <p>
                Phone:{" "}
                <span className="getInTouch-paragraph--contact">
                  816-200-1163
                </span>
              </p>
              <p>
                Email:{" "}
                <span className="getInTouch-paragraph--contact">
                  hello@rndkc.com
                </span>
              </p>
            </article>
          </article>
          <article className="getInTouch-contactForm md:w-3/5">
            <ContactForm />
            <article className="getInTouch-social">
              <p
                className={`getInTouch-social_text font-gemunuLibre text-xl md:text-2xl font-normal text-white`}
              >
                Follow Us for Updates and Special Offers
              </p>
              <article className="flex space-x-5 pt-2">
                <SocialIcon
                  fgColor={fgColor}
                  bgColor={bgColor}
                  style={{ height: 45, width: 45 }}
                  url="https://facebook.com/RNDKansasCity"
                />
                <SocialIcon
                  fgColor={fgColor}
                  bgColor={bgColor}
                  style={{ height: 45, width: 45 }}
                  url="https://instagram.com/rnd_kc"
                />
                <SocialIcon
                  fgColor={fgColor}
                  bgColor={bgColor}
                  style={{ height: 45, width: 45 }}
                  url="https://twitter.com/RND_KC"
                />
              </article>
            </article>
          </article>
        </section>
      </section>
    </section>
  );
};
