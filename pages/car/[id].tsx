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
import { BookingForm } from "../../components/bookingForm";
import { AvailabilitySignUp } from "../../components/availabilitySignUp";

const Car = () => {
  const router = useRouter();
  const [vehicle, setVehicle] = useState<DocumentData>({});
  const [bigImageUrl, setBigImageUrl] = useState("");
  const [showShareModal, setShowShareModal] = useState(false);
  const [driveShare, setDriveShare] = useState("");

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
      const { id, driveShare } = router.query;
      getVehicle(id);
      if (typeof driveShare === "string") {
        setDriveShare(driveShare);
      }
    }
  }, [router.isReady]);

  console.log(vehicle);

  return (
    <section className="booking">
      <NavBar />
      {showShareModal && (
        <ShareModal setShowShareModal={setShowShareModal} car={vehicle.vin} />
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
            {vehicle.type === "SHOW" && (
              <img
                className="booking_information-car-type"
                src="/img/slices/show_car.svg"
              />
            )}
            {vehicle.type === "GO" && (
              <img
                className="booking_information-car-type"
                src="/img/slices/go_car.svg"
              />
            )}
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
              ) : vehicle.rentalStatus === "R" ? (
                <section className="booking_information_status-icon">
                  <img
                    src="/img/slices/icon_reverse.svg"
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
              {vehicle.rentalStatus === "D" && (
                <p className="booking_information-paragraphs-text">
                  Drive your dream with this beautifully restored {vehicle.year}{" "}
                  {vehicle.model}. It’s available and ready to cruise Kansas
                  City! This is a show car so treat it like you own it. Show
                  Cars require enclosed storage for overnight rentals. Enter
                  your contact info and select the dates to begin booking.
                </p>
              )}
              {vehicle.rentalStatus === "R" && (
                <p className="booking_information-paragraphs-text">
                  This {vehicle.year} {vehicle.model} is currently unavailable
                  but will be back soon. Enter your email and we'll let you know
                  as soon as it's ready to go.
                </p>
              )}

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
            {vehicle.rentalStatus === "D" && (
              <BookingForm vehicle={vehicle} driveShare={driveShare} />
            )}
            {vehicle.rentalStatus === "R" && (
              <AvailabilitySignUp vin={vehicle.vin} />
            )}
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
