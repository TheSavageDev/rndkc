import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Footer } from "../components/footer";
import { NavBar } from "../components/navBar";
import { NavSubheader } from "../components/navSubheader";
import { usePageTracking } from "../hooks/usePageTracking";

export default function CarPay() {
  const router = useRouter();
  usePageTracking(router);

  usePageTracking(router, router.query.id);
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
                Your old ride, a new revenue stream, with CARPAY
              </h2>
            </section>
            <section className="car-pay_cars">
              <p>
                Renting your classic car is a smart and profitable way to turn
                your passion into profit in Kansas City.
              </p>
              <p>
                Stop letting your classic car sit there and collect dust, put it
                to work for you! Renting out your classic car can be a lucrative
                and a low-maintenance way to earn extra income. By letting RND
                rent your classic car, you can offset the costs of ownership
                while maintaining and even restoring your pride and joy.
              </p>
              <p>We take care of everything, you just collect the check.</p>
            </section>
          </section>
        </>
      </section>
      <Footer />
    </>
  );
}
