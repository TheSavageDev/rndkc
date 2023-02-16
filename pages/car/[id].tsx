import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  collection,
  where,
  query,
  onSnapshot,
  DocumentData,
} from "firebase/firestore";
import { NavBar } from "../../components/navBar";
import { RentalStatus } from "../../components/rentalStatus";
import { db } from "../../firebase/clientApp";
import { Footer } from "../../components/footer";
import { ContactForm } from "../../components/contactForm";
import { SocialIcon } from "react-social-icons";
import { ShareModal } from "../../components/shareModal";

const Car = () => {
  const router = useRouter();
  const { id } = router.query;
  const [vehicle, setVehicle] = useState<DocumentData>({});
  const [bigImageUrl, setBigImageUrl] = useState("");
  const [showShareModal, setShowShareModal] = useState(false);

  const getVehicle = () => {
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
    getVehicle();
  }, [id]);

  console.log(vehicle);

  return (
    <section className="booking">
      <NavBar />
      {showShareModal && (
        <ShareModal setShowShareModal={setShowShareModal} car={id} />
      )}
      {vehicle && (
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
          <section className="booking_information">
            <img
              className="booking_information-car-type"
              src="/img/slices/show_car.svg"
            />
            <h2 className="booking_information_header">
              Buckle up and get ready to cruise Kansas City!
            </h2>
            <section className="booking_information_status">
              {vehicle.rentalStatus === "D" ? (
                <section className="booking_information_status-icon">
                  <img
                    src="/img/slices/drive_status.svg"
                    className="booking_information_status-icon-svg"
                  />
                </section>
              ) : (
                ""
              )}
              {vehicle.convertible ? (
                <>
                  <section className="booking_information_status_divider"></section>
                  <section className="booking_information_status-icon">
                    <img
                      src="/img/slices/icon_convertible.svg"
                      className="booking_information_status-icon-svg"
                    />
                  </section>
                </>
              ) : (
                ""
              )}
              <section className="booking_information_status_divider"></section>
              {vehicle.transmission === "M" ? (
                <section className="booking_information_status-icon">
                  <img
                    src="/img/slices/icon_manual.svg"
                    className="booking_information_status-icon-svg"
                  />
                  <p className="booking_information_status-text">Manual</p>
                </section>
              ) : (
                <section className="booking_information_status-icon">
                  <img
                    src="/img/slices/icon_auto.svg"
                    className="booking_information_status-icon-svg"
                  />
                  <p className="booking_information_status-text">Auto</p>
                </section>
              )}
              <section className="booking_information_status_divider"></section>
              {vehicle.cylinders === "V8" ? (
                <section className="booking_information_status-icon">
                  <img
                    src="/img/slices/icon_v8.svg"
                    className="booking_information_status-icon-svg"
                  />
                </section>
              ) : (
                <section className="booking_information_status-icon">
                  <img
                    src="/img/slices/icon_v6.svg"
                    className="booking_information_status-icon-svg"
                  />
                </section>
              )}
            </section>
            <section className="booking_information-paragraphs">
              <p className="booking_information-paragraphs-text">
                Drive your dream with this beautifully restored 1958 Corvette.
                It’s available and ready to cruise Kansas City! This is a show
                car so treat it like you own it. Show Cars require enclosed
                storage for overnight rentals. Enter your contact info and
                select the dates to begin booking.
              </p>

              <p className="booking_information-paragraphs-text--bottom">
                For questions about this rental visit our{" "}
                <a
                  href="/faq"
                  className="booking_information-paragraphs-text--link"
                >
                  F.A.Q. page
                </a>{" "}
                or contact us at{" "}
                <a
                  href="mailto:hello@rndkc.com"
                  className="booking_information-paragraphs-text--link"
                >
                  hello@rndkc.com
                </a>
              </p>
            </section>
            <section className="booking_information-form">
              <label className="booking_information-form-input-label">
                Name
              </label>
              <input
                className="booking_information-form-input"
                placeholder="Enter Full Name"
              />
              <label className="booking_information-form-input-label">
                Email Address
              </label>
              <input
                className="booking_information-form-input"
                placeholder="Enter Email Address"
              />
              <section className="booking_information-form-date">
                <label className="booking_information-form-input-label">
                  Start Date
                </label>
                <section className="booking_information-form-date_inputs">
                  <input
                    className="booking_information-form-input"
                    placeholder="Enter Email Address"
                    type="date"
                  />
                  <input
                    className="booking_information-form-input"
                    placeholder="Enter Email Address"
                    type="time"
                  />
                </section>
              </section>
              <section className="booking_information-form-date">
                <label className="booking_information-form-input-label">
                  End Date
                </label>
                <section className="booking_information-form-date_inputs">
                  <input
                    className="booking_information-form-input"
                    placeholder="Enter Email Address"
                    type="date"
                  />
                  <input
                    className="booking_information-form-input"
                    placeholder="Enter Email Address"
                    type="time"
                  />
                </section>
              </section>
              <article className="booking_information-form_pricing">
                <h2 className="booking_information-form_pricing-text">
                  ${vehicle?.rentalCost?.day} Day
                </h2>
                <h2 className="booking_information-form_pricing-text--sub">
                  2 Days for $ {vehicle?.rentalCost?.day * 2} Total
                </h2>
              </article>
              <button className="booking_information-form-button">
                Begin Booking
              </button>
            </section>
          </section>
        </>
      )}
      <RentalStatus />
      <section className="getInTouch">
        <section className="flex flex-col md:flex-row md:justify-between">
          <article className="flex flex-col md:w-3/4">
            <h3 className="booking_questions_header">Have Questions?</h3>
            <article className="">
              <p className="booking_questions_header-text">
                At RND we strive to make your classic car rental experience as
                simple and enjoyable as possible. We offer delivery to your home
                or work. We can also pick you up from the airport if you are in
                town visiting. If you have questions visit our{" "}
                <a href="/faq" className="booking_questions_header-text--bold">
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
            <article className="getInTouch-social">
              <p className="booking_questions_social">
                Follow Us for Updates and Special Offers
              </p>
              <article className="flex space-x-5 pt-2">
                <SocialIcon
                  fgColor="transparent"
                  bgColor="#fff"
                  style={{ height: 45, width: 45 }}
                  url="https://facebook.com/RNDKansasCity"
                />
                <SocialIcon
                  fgColor="transparent"
                  bgColor="#fff"
                  style={{ height: 45, width: 45 }}
                  url="https://instagram.com/rnd_kc"
                />
                <SocialIcon
                  fgColor="transparent"
                  bgColor="#fff"
                  style={{ height: 45, width: 45 }}
                  url="https://twitter.com/RND_KC"
                />
              </article>
            </article>
          </article>
        </section>
      </section>
      <Footer />
    </section>
  );
};

export default Car;
