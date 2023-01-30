import Image from "next/image";
import { ContactForm } from "./contactForm";
import { Social } from "./social";

export const GetInTouch = () => {
  return (
    <section className="getInTouch-container">
      <section className="getInTouch">
        <h2 id="get-in-touch" className="getInTouch-title">
          Get In Touch
        </h2>
        <section className="flex flex-col md:flex-row md:justify-between">
          <article className="flex flex-col md:w-3/4">
            <Image
              src="/img/RNDWhiteOrange.svg"
              alt="RNDKC"
              height="56"
              width="150"
              className="getInTouch-logo"
            />
            <h3 className="getInTouch-subtitle">We'd Love to Hear From You!</h3>
            <article className="getInTouch-paragraph">
              <p className="getInTouch-paragraph-questions">
                Have questions about our renting from RND? Need a classic car
                for an upcoming special event or photoshoot? We’re here to help.
              </p>
              <p>Phone: 816-200-1163</p>
              <p>Email: hello@rndkc.com</p>
            </article>
            <article className="getInTouch-social hidden md:flex md:mt-10">
              <Social
                bgColor="white"
                fgColor="transparent"
                text="white"
                justify="start"
              />
            </article>
          </article>
          <article className="getInTouch-contactForm md:w-3/5">
            <ContactForm />
          </article>
        </section>
      </section>
    </section>
  );
};
