import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Footer } from "../components/footer";
import { NavBar } from "../components/navBar";
import { usePageTracking } from "../hooks/usePageTracking";
import { useEventTracking } from "../hooks/useEventTracking";
import { CarPayForm } from "../components/carPayForm";

export default function CarPay() {
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  usePageTracking(router);

  usePageTracking(router, router.query.id);

  const handleSubmit = async (values) => {
    const res = await fetch("/api/car-pay", {
      body: JSON.stringify({ ...values }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const { error } = await res.json();

    if (error) {
      console.error(error);
      setSuccess(false);
      return;
    }
    useEventTracking("CarPay", {
      email: values.email,
    });
    setSuccess(true);
  };

  return (
    <>
      <Head>
        <title>RND - CarPay</title>
      </Head>
      <section className="car-pay_container">
        <>
          <NavBar />
          <section className="main">
            <section className="car-pay_header">
              <h2 className="car-pay_header_text">
                Your old ride,
                <br /> a new revenue stream,
                <br /> with
                <span className="car-pay_header-carpay">
                  <span className="car-pay_header-carpay--car">CAR</span>
                  <span className="car-pay_header-carpay--pay">PAY</span>
                </span>
              </h2>
            </section>
            <section className="car-pay_content">
              <h3 className="car-pay_content_heading">
                Renting your classic car is a smart and profitable way to turn
                your passion into profit in Kansas City.
              </h3>
              <p className="car-pay_content_paragraph">
                Stop letting your classic car sit there and collect dust, put it
                to work for you! Renting out your classic car can be a lucrative
                and a low-maintenance way to earn extra income. By letting RND
                rent your classic car, you can offset the costs of ownership
                while maintaining and even restoring your pride and joy.
              </p>
              <p className="car-pay_content_footer-text">
                We take care of everything, you just collect the check.
              </p>
            </section>
            <section className="car-pay_explainer-cards">
              <article className="car-pay_explainer-card">
                <header className="car-pay_explainer-card_header">
                  <img src="/img/slices/icon_shield.svg" />
                  <h3 className="car-pay_explainer-card_header_text">
                    Insurance
                  </h3>
                </header>
                <p className="car-pay_explainer-card_paragraph">
                  RND provides up to $1 million in liability coverage for any
                  losses.
                </p>
              </article>

              <article className="car-pay_explainer-card">
                <header className="car-pay_explainer-card_header">
                  <img src="/img/slices/icon_engine_green.svg" />
                  <h3 className="car-pay_explainer-card_header_text">
                    Roadside Assistance
                  </h3>
                </header>
                <p className="car-pay_explainer-card_paragraph">
                  All rental vehicles come with access to 24/7 emergency
                  roadside assistance.
                </p>
              </article>

              <article className="car-pay_explainer-card">
                <header className="car-pay_explainer-card_header">
                  <img src="/img/slices/icon_brakes.svg" />
                  <h3 className="car-pay_explainer-card_header_text">
                    Maintenance
                  </h3>
                </header>
                <p className="car-pay_explainer-card_paragraph">
                  We take care of all standard maintenance while your vehicle is
                  an active rental.
                </p>
              </article>

              <article className="car-pay_explainer-card">
                <header className="car-pay_explainer-card_header">
                  <img src="/img/slices/icon_shift_green.svg" />
                  <h3 className="car-pay_explainer-card_header_text">
                    Qualified Drivers
                  </h3>
                </header>
                <p className="car-pay_explainer-card_paragraph">
                  We thoroughly vet all RND customers before they get behind the
                  wheel.
                </p>
              </article>

              <article className="car-pay_explainer-card">
                <header className="car-pay_explainer-card_header">
                  <img src="/img/slices/icon_bullhorn.svg" />
                  <h3 className="car-pay_explainer-card_header_text">
                    Marketing
                  </h3>
                </header>
                <p className="car-pay_explainer-card_paragraph">
                  We promote your vehicle so you receive maximum return on your
                  investment.
                </p>
              </article>
            </section>
            <aside className="car-pay_kc">
              <img src="/img/slices/kc.svg" />
            </aside>
            <section className="car-pay_signup">
              <h2 className="car-pay_signup_heading">Let's get started</h2>
              <p className="car-pay_signup_paragraph">
                Simply submit your information and the details of your car
                below, or even a link to a car you’re thinking about buying for
                us to review. If it meets our criteria and we feel like it would
                rent well, we’ll have you in to inspect the vehicle and
                approve/deny it’s entry into our CarPay system.{" "}
              </p>
              <CarPayForm handleSubmit={handleSubmit} success={success} />
              <section className="car-pay_contact">
                <h4>Have Questions?</h4>
                <ul>
                  <li>
                    Visit our <a href="/faq">F.A.Q. Page</a>
                  </li>
                  <li>
                    Contact us at{" "}
                    <a href="mailto:hello@rndkc.com">hello@rndkc.com</a>
                  </li>
                  <li>
                    Call us at <a href="tel:8162001163">816-200-1163</a>
                  </li>
                </ul>
              </section>
            </section>
          </section>
        </>
      </section>
      <Footer />
    </>
  );
}
