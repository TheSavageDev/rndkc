import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  collection,
  where,
  query,
  onSnapshot,
  DocumentData,
} from "firebase/firestore";
import { SocialIcon } from "react-social-icons";
import Head from "next/head";
import { PaymentIntent } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { NavBar } from "../../components/navBar";
import { RentalStatus } from "../../components/rentalStatus";
import { db } from "../../firebase/clientApp";
import { Footer } from "../../components/footer";
import { ContactForm } from "../../components/contactForm";
import { ShareModal } from "../../components/shareModal";
import { BookingForm } from "../../components/bookingForm";
import { AvailabilitySignUp } from "../../components/availabilitySignUp";
import { usePageTracking } from "../../hooks/usePageTracking";
import { CheckoutForm } from "../../components/checkoutForm";
import getStripe from "../../utils/get-stripejs";
import { fetchPostJSON } from "../../utils/api-helpers";
import * as config from "../../config";

const Car = () => {
  const router = useRouter();
  const [vehicle, setVehicle] = useState<DocumentData>({});
  const [routerReady, setRouterReady] = useState(false);
  const [bigImageUrl, setBigImageUrl] = useState("");
  const [showShareModal, setShowShareModal] = useState(false);
  const [paymentIntent, setPaymentIntent] = useState<PaymentIntent | null>(
    null
  );
  const [showDetails, setShowDetails] = useState(false);

  // useEffect(() => {
  //   fetchPostJSON("/api/paymentIntent", {
  //     amount: Math.round(config.MAX_AMOUNT / config.AMOUNT_STEP),
  //   }).then((data) => {
  //     setPaymentIntent(data);
  //   });
  // }, [setPaymentIntent]);

  const getVehicle = (id) => {
    const q = query(collection(db, "vehicles"), where("vin", "==", id));
    onSnapshot(q, (snap) => {
      setVehicle(snap.docs[0].data());
      setBigImageUrl(
        (snap.docs[0].data()?.imageUrls && snap.docs[0].data()?.imageUrls[0]) ??
          ""
      );
    });
  };

  useEffect(() => {
    if (router.isReady) {
      setRouterReady(true);
      const { id } = router.query;
      getVehicle(id);
    }
  }, [router.isReady]);

  // usePageTracking(router, router.query.id);

  return (
    <>
      <Head>
        {vehicle.year ? (
          <title>
            RND - {`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          </title>
        ) : (
          <title>RND</title>
        )}
      </Head>
      <section className="booking">
        <NavBar />
        {showShareModal && (
          <ShareModal setShowShareModal={setShowShareModal} car={vehicle.vin} />
        )}
        {vehicle && !paymentIntent && (
          <>
            <section className="booking_sub-nav-header">
              <h2 className="booking_sub-nav_header-text">
                {vehicle.year} {vehicle.model}
              </h2>
              <button
                className="booking_sub-nav_header-button"
                onClick={() => setShowShareModal(true)}
              >
                <img src="/img/slices/icon_share.svg" />
              </button>
            </section>
            <section className="booking_images">
              <section className="booking_images_main-image">
                {vehicle.imageUrls && vehicle.imageUrls.length !== 0 ? (
                  <>
                    <img
                      src={bigImageUrl}
                      className="booking_images_main-image_img"
                    />
                    <section className="booking_images_main-image_icon">
                      <img
                        src="/img/slices/icon_camera.svg"
                        className="booking_images_main-image_icon-svg"
                      />
                      <p className="booking_images_main-image_icon-text">
                        {`${vehicle.imageUrls.indexOf(bigImageUrl) + 1}/${
                          vehicle.imageUrls.length
                        }`}
                      </p>
                    </section>
                  </>
                ) : (
                  <>
                    <img
                      src="/img/car.svg"
                      className="booking_images_main-image_img--placeholder"
                    />
                    <section className="booking_images_main-image_icon--placeholder">
                      <p className="booking_images_main-image_icon-text--placeholder">
                        Pictures Coming Soon...
                      </p>
                    </section>
                  </>
                )}
              </section>
            </section>
            {vehicle.imageUrls && vehicle.imageUrls.length !== 0 && (
              <section className="booking_images-previews">
                {vehicle.imageUrls.map((url) => (
                  <img src={url} onClick={() => setBigImageUrl(url)} />
                ))}
              </section>
            )}
            <section className="booking_container">
              <section className="booking_information">
                <h2 className="booking_information_header">
                  {vehicle.rentalStatus === "D" ? (
                    <>
                      Driving a{" "}
                      <span>
                        {vehicle.year} {vehicle.model}
                      </span>{" "}
                      is an experience like no other.
                    </>
                  ) : (
                    `We'll let you know when it's ready to cruise`
                  )}
                </h2>
                <section className="booking_information_details-button_container">
                  <article className="booking_information_details-button_container-dividers" />
                  <button
                    className="booking_information_details-button"
                    onClick={() => setShowDetails(!showDetails)}
                  >
                    {showDetails ? "hide details " : "view details "}
                    <img
                      src="/img/arrow.svg"
                      className={showDetails ? "up-arrow" : "down-arrow"}
                    />
                  </button>
                  <article className="booking_information_details-button_container-dividers" />
                </section>
                <section
                  className={
                    showDetails
                      ? "booking_information_details_paragraph_container--down"
                      : "booking_information_details_paragraph_container--up"
                  }
                >
                  <article className="booking_information_details_paragraph">
                    With its powerful V8 engine and classic styling, the car
                    feels powerful and responsive on the road. The interior is
                    luxurious and comfortable, with leather seats and chrome
                    accents that give the car an air of sophistication. The
                    exterior is timeless and iconic, with its sharp lines and
                    classic curves. Driving a 1965 Plymouth Satellite is an
                    exhilarating experience that will make you want to keep
                    coming back for more.
                  </article>
                  <section className="booking_information_details_specs">
                    <article>
                      <h3 className="booking_information_details_heading">
                        Included with every rental
                      </h3>
                      <ul className="booking_information_details_specs_list">
                        <li className="booking_information_details_specs_text">
                          200 miles per day
                        </li>
                        <li className="booking_information_details_specs_text">
                          Comprehensive Insurance
                        </li>
                        <li className="booking_information_details_specs_text">
                          24/7 Roadside Assistance
                        </li>
                      </ul>
                    </article>
                    <article>
                      <h3 className="booking_information_details_heading">
                        Vehicle Specs
                      </h3>
                      <article className="booking_information_details_specs_container">
                        <article className="booking_information_details_specs_item">
                          <img src="/img/convertible_icon.svg" />
                          <p className="booking_information_details_specs_text">
                            Convertible
                          </p>
                        </article>
                        <article className="booking_information_details_specs_item">
                          <img src="/img/v8_icon.svg" />
                          <p className="booking_information_details_specs_text">
                            {vehicle.engine} {vehicle.cylinders}
                          </p>
                        </article>
                        <article className="booking_information_details_specs_item">
                          <img src="/img/gear_icon.svg" />
                          <p className="booking_information_details_specs_text">
                            {vehicle.transmission === "M"
                              ? "Manual"
                              : "Automatic"}
                          </p>
                        </article>
                        <article className="booking_information_details_specs_item">
                          <img src="/img/people_icon.svg" />
                          <p className="booking_information_details_specs_text">
                            {vehicle.seats} Passenger
                          </p>
                        </article>
                      </article>
                    </article>
                    <article>
                      <h3 className="booking_information_details_heading">
                        Vehicle Type
                      </h3>
                      <ul>
                        <li
                          className={`booking_information_details_specs_type${
                            vehicle.type === "SHOW" ? "" : "--translucent"
                          }`}
                        >
                          <img src="/img/show_icon.svg" />
                          Show Car - treat it like you own it.
                        </li>
                        <li
                          className={`booking_information_details_specs_type${
                            vehicle.type === "GO" ? "" : "--translucent"
                          }`}
                        >
                          <img src="/img/go_icon.svg" />
                          Go Car - drive it like you stole it.
                        </li>
                      </ul>
                    </article>
                    <article>
                      <h3 className="booking_information_details_heading">
                        Vehicle Status
                      </h3>
                      <article className="booking_information_details_specs_rental-status">
                        <img
                          src={
                            vehicle.rentalStatus === "D"
                              ? "/img/drive_icon.svg"
                              : vehicle.rentalStatus === "N"
                              ? "/img/neutral_icon.svg"
                              : "/img/reverse_icon.svg"
                          }
                          className="booking_information_details_specs_rental-status_icon"
                        />
                        {vehicle.rentalStatus === "D" ? (
                          <p className="booking_information_details_specs_text">
                            Drive - vehicle is in stock, gassed up, inspected
                            for reliability, and is ready to cruise Kansas City.
                          </p>
                        ) : (
                          <p className="booking_information_details_specs_text"></p>
                        )}
                      </article>
                    </article>
                    <section className="booking_information_details-button_container">
                      <article className="booking_information_details-button_container-dividers" />
                      <button
                        className="booking_information_details-button"
                        onClick={() => setShowDetails(!showDetails)}
                      >
                        {showDetails ? "hide details " : "view details "}
                        <img
                          src="/img/arrow.svg"
                          className={showDetails ? "up-arrow" : "down-arrow"}
                        />
                      </button>
                      <article className="booking_information_details-button_container-dividers" />
                    </section>
                  </section>
                </section>
              </section>
              <section className="booking_information_forms">
                {paymentIntent && paymentIntent.client_secret && (
                  <Elements
                    options={{
                      clientSecret: paymentIntent.client_secret,
                      appearance: {
                        theme: "flat",
                      },
                    }}
                    stripe={getStripe()}
                  >
                    <CheckoutForm paymentIntent={paymentIntent} />
                  </Elements>
                )}
                {vehicle.rentalStatus === "D" && (
                  <BookingForm
                    vehicle={vehicle}
                    setPaymentIntent={setPaymentIntent}
                  />
                )}
                {vehicle.rentalStatus === "R" && (
                  <AvailabilitySignUp vin={vehicle.vin} />
                )}
              </section>
            </section>
          </>
        )}
        {!paymentIntent && (
          <section className="getInTouch">
            <section className="delivery">
              <header>
                <h2 className="delivery_header">We Offer Delivery</h2>
                <img src="/img/tow_truck_icon.svg" />
              </header>
              <p className="delivery_subheader">
                Imagine your friends and neighbors reaction when a 1956 Cabover
                pulls up to deliver your ride!{" "}
              </p>
              <article className="delivery_divider" />
            </section>
            <section className="flex flex-col getInTouch_container">
              <article className="flex flex-col">
                <h3 className="booking_questions_header">Have Questions?</h3>
                <article className="">
                  <p className="booking_questions_header-text">
                    At RND we strive to make your classic car rental experience
                    as simple and enjoyable as possible. We offer delivery to
                    your home or work. We can also pick you up from the airport
                    if you are in town visiting. If you have questions visit our{" "}
                    <a
                      href="/faq"
                      className="booking_questions_header-text--bold"
                    >
                      FAQ Page
                    </a>
                    , use the contact form below, or call us at{" "}
                    <a
                      href="tel:8162001163"
                      className="booking_questions_header-text--bold"
                    >
                      816-200-1163
                    </a>
                  </p>
                </article>
              </article>
              <article className="booking_questions_contact-form">
                <ContactForm />
              </article>
            </section>
          </section>
        )}

        {paymentIntent && paymentIntent.client_secret && (
          <Elements
            options={{
              clientSecret: paymentIntent.client_secret,
              appearance: {
                theme: "flat",
              },
            }}
            stripe={getStripe()}
          >
            <header>
              <h2>Payment Method</h2>
              <article />
              <h3>Debit cards are not accepted.</h3>
              <p>
                A temporary hold of $50 will be placed on your credit card to
                hold your reservation. Final payment will be made day of pickup
                or delivery.{" "}
              </p>
            </header>
            <section>
              <CheckoutForm paymentIntent={paymentIntent} />
              <h3>Delivery</h3>
              <input type="checkbox" />
              <label>Include Delivery ?</label>
            </section>
            <section>
              <h3>Summary</h3>
              <h4>
                {vehicle.year} {vehicle.make} {vehicle.model} Rental
              </h4>
              <article>
                <p>Daily Rate</p>
                <p>Price</p>
              </article>
              <article>
                <p>Daily Rate</p>
                <p>Price</p>
              </article>
              <article>
                <p>Duration</p>
                <p>{}</p>
              </article>
              <article>
                <p>Booking Total</p>
                <p>Price</p>
              </article>
              <article>
                <p>Reservation Deposit</p>
                <p>Price</p>
              </article>
              <article>
                <p>Total Due Today</p>
                <p>Price</p>
              </article>
              <button>Submit Payment</button>
            </section>
          </Elements>
        )}
        <Footer />
      </section>
    </>
  );
};

export default Car;
