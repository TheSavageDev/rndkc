import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  collection,
  where,
  query,
  onSnapshot,
  DocumentData,
  getDocs,
} from "firebase/firestore";
import { PaymentIntent } from "@stripe/stripe-js";
import Head from "next/head";
import * as Yup from "yup";
import * as Moment from "moment";
import { NavBar } from "../../components/navBar";
import { db } from "../../firebase/clientApp";
import { Footer } from "../../components/footer";
import { ContactForm } from "../../components/contactForm";
import { ShareModal } from "../../components/shareModal";
import { BookingForm } from "../../components/bookingForm";
import { AvailabilitySignUp } from "../../components/availabilitySignUp";
import { usePageTracking } from "../../hooks/usePageTracking";
import Image from "next/image";
import { fetchPostJSON } from "../../utils/api-helpers";
import { extendMoment } from "moment-range";
import { useFormikContext } from "formik";
import useMediaQuery from "../../hooks/useMediaQuery";

export type FieldError = {
  name?: string;
  startDate?: string;
  startTime?: string;
  endDate?: string;
  endTime?: string;
};

export type SubmissionData = {
  vin: string;
  startDateTime: Moment.Moment;
  endDateTime: Moment.Moment;
  endRefitTime: Moment.Moment;
  vehicle: DocumentData;
};

const moment = extendMoment(Moment);

export type Values = {
  name: string;
  phoneNumber: string;
  email: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
};

const Car = () => {
  const router = useRouter();
  const matches = useMediaQuery("(min-width: 1024px)");
  console.log(matches);
  const [vehicle, setVehicle] = useState<DocumentData>({});
  const [routerReady, setRouterReady] = useState(false);
  const [bigImageUrl, setBigImageUrl] = useState("");
  const [showShareModal, setShowShareModal] = useState(false);
  const [paymentIntent, setPaymentIntent] = useState<PaymentIntent | null>(
    null
  );
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false);
  const [tab, setTab] = useState("self");
  const initialButtonText =
    vehicle.rentalStatus === "D"
      ? "Begin Booking"
      : "Email Me When It's Available";
  const [success, setSuccess] = useState(false);
  const [formError, setFormError] = useState(false);
  const [totalDays, setTotalDays] = useState(0);
  const [totalHours, setTotalHours] = useState(0);
  const [fieldError, setFieldError] = useState<FieldError>({});
  const [submitting, setSubmitting] = useState(false);
  const [buttonText, setButtonText] = useState(initialButtonText);
  const [bookingBegun, setBookingBegun] = useState(false);
  const [currentBookings, setCurrentBookings] = useState([]);
  const [submissionData, setSubmissionData] = useState<SubmissionData>({
    vin: "",
    startDateTime: moment(),
    endDateTime: moment(),
    endRefitTime: moment(),
    vehicle,
  });
  const dateRanges = [];

  const getDisabledDates = () => {
    vehicle?.bookings?.length !== 0 &&
      vehicle?.bookings?.forEach((booking) => {
        const start = moment(booking.startDate).subtract(
          vehicle.refitHours,
          "h"
        );
        const end = moment(booking.endRefitDate);
        const range = moment.range(start, end);
        dateRanges.push(range);
      });
  };

  useEffect(() => {
    getDisabledDates();
  }, []);

  const getCurrentBookings = async () => {
    let bookings = [];
    if (vehicle.vin) {
      const vehicleDoc = collection(db, "vehicles", vehicle.vin, "bookings");
      const vehicleSnap = await getDocs(vehicleDoc);
      vehicleSnap.forEach((doc) => {
        bookings.push(doc.data());
      });
      setCurrentBookings(bookings);
    }
  };

  useEffect(() => {
    getCurrentBookings();
  }, [vehicle]);

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Please enter your full name."),
    email: Yup.string()
      .email("Invalid Email Address")
      .required("Please enter your email address."),
    phoneNumber: Yup.string()
      .min(10)
      .max(11)
      .required("Please enter your phone number."),
    startDate: Yup.string().required("Please choose a pickup date."),
    startTime: Yup.string().required("Please choose a pickup time."),
    endDate: Yup.string().required("Please choose a drop off date."),
    endTime: Yup.string().required("Please choose a drop off time."),
  });

  const initialValues = {
    fullName: "",
    phoneNumber: "",
    email: "",
    startDate: "",
    startTime: "10:00",
    endDate: "",
    endTime: "10:00",
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you're ready"
      );
    }
  }, []);

  const handleDateChange = (startDate, endDate) => {
    setSubmitting(false);
    if (startDate && endDate) {
      let newTotalDays: number;
      const differenceInTime = endDate.getTime() - startDate.getTime();
      newTotalDays = differenceInTime / (1000 * 3600 * 24);
      setTotalDays(Math.round(newTotalDays));
    }
  };

  const handleTimeChange = (startTime, endTime) => {
    setSubmitting(false);
    if (startTime && endTime) {
      const newTotalHours = (endTime - startTime) / (1000 * 3600);
      setTotalHours(newTotalHours);
    }
  };

  const bookingValidCheck = ({
    startDate,
    startTime,
    endDate,
    endTime,
    ...rest
  }) => {
    const startDateTime = moment(startDate)
      .set("hour", parseInt(startTime.split(":")[0]))
      .set("minute", parseInt(startTime.split(":")[1]));
    const endDateTime = moment(endDate)
      .set("hour", parseInt(endTime.split(":")[0]))
      .set("minute", parseInt(endTime.split(":")[1]));
    const endRefitTime = moment(
      moment(endDate)
        .set("hour", parseInt(endTime.split(":")[0]))
        .set("minute", parseInt(endTime.split(":")[1]))
    ).add(vehicle.refitHours, "h");

    let startDateConflict: boolean;
    let endDateConflict: boolean;
    let startDateRefitConflict: boolean;
    let endDateRefitConflict: boolean;
    if (currentBookings.length !== 0) {
      currentBookings.forEach((booking) => {
        startDateConflict =
          startDateTime.isBetween(
            moment(booking.startDate),
            moment(booking.endRefitDate)
          ) || startDateTime.isSame(booking.startDate);
        endDateConflict =
          endDateTime.isBetween(
            moment(booking.startDate),
            moment(booking.endRefitDate)
          ) || endDateTime.isSame(booking.endDate);
        startDateRefitConflict =
          !startDateConflict &&
          !endDateConflict &&
          startDateTime.isAfter(booking.endDate) &&
          startDateTime.isSameOrBefore(booking.endRefitTime);
        endDateRefitConflict =
          !startDateConflict &&
          !endDateConflict &&
          !startDateRefitConflict &&
          endRefitTime.isSameOrAfter(moment(booking.startDate)) &&
          startDateTime.isBefore(moment(booking.startDate));
      });
    }
    if (
      startDateConflict ||
      endDateConflict ||
      startDateRefitConflict ||
      endDateRefitConflict
    ) {
      setFieldError({
        startDate: startDateConflict
          ? "There is a conflict with your start date"
          : startDateRefitConflict
          ? "The vehicle will not be ready for another rental by this date and time"
          : null,
        endDate: endDateConflict
          ? "There is a conflict with your end date"
          : endDateRefitConflict
          ? "The vehicle won't be able to be prepared for the next rental."
          : null,
      });
      return false;
    } else {
      return { startDateTime, endDateTime, endRefitTime };
    }
  };

  const handleSubmit = async (values) => {
    console.log("handleSubmit");
    const data = bookingValidCheck(values);
    if (!data) {
      setFormError(true);
      return;
    }
    if (
      (data.startDateTime && data.endDateTime && data.endRefitTime) ||
      (["chauffeured", "commercial"].includes(tab) && data.startDateTime)
    ) {
      fetchPostJSON("/api/paymentIntent", {
        amount: 50,
      }).then((data) => {
        setPaymentIntent(data);
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
      setSubmitting(true);
      setSubmissionData({
        ...values,
        vin: vehicle.vin,
        startDateTime: data.startDateTime,
        endDateTime: data.endDateTime,
        endRefitTime: data.endRefitTime,
        vehicle,
        type: tab,
      });
    }
  };

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

  usePageTracking(router, router.query.id);

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
        {vehicle && (
          <>
            <section className="booking_sub-nav-header">
              <button
                className="booking_sub-nav_header-button--all-inventory"
                onClick={() => router.push("/inventory")}
              >
                <img src="/img/back-icon.svg" /> All Inventory
              </button>
              <button
                className="booking_sub-nav_header-button--question"
                onClick={() => router.push("/contact-us")}
              >
                Questions?
                <img src="/img/mail-icon.svg" />
              </button>
              <button
                className="booking_sub-nav_header-button--share"
                onClick={() => setShowShareModal(true)}
              >
                Share <img src="/img/share-icon.svg" />
              </button>
            </section>
            <section className="booking_images">
              <section className="booking_images_main-image">
                {vehicle.imageUrls && vehicle.imageUrls.length !== 0 ? (
                  <>
                    <Image
                      src={bigImageUrl}
                      fill
                      alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                      className="booking_images_main-image_img"
                      priority
                    />
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
            <section className="booking_container">
              <section className="booking_information">
                <h2 className="booking_information_header">
                  {vehicle?.blurbs?.title}
                </h2>
                {!matches && (
                  <section
                    className="view-details_container"
                    onClick={() => setViewDetailsOpen(!viewDetailsOpen)}
                  >
                    <article className="view-details_divider" />
                    <article className="view-details_box">
                      {viewDetailsOpen ? (
                        <>
                          hide details
                          <img
                            src="/img/arrow-icon.svg"
                            className="view-details_box_img--up"
                          />
                        </>
                      ) : (
                        <>
                          view details
                          <img
                            src="/img/arrow-icon.svg"
                            className="view-details_box_img"
                          />
                        </>
                      )}
                    </article>
                    <article className="view-details_divider" />
                  </section>
                )}

                {viewDetailsOpen ||
                  (matches && (
                    <section className="booking_information-paragraphs">
                      <p className="booking_information-paragraphs-text">
                        {vehicle.blurbs.description}
                      </p>
                      <section>
                        <header>
                          <h4 className="vehicle-details_section_header">
                            Included with every rental
                          </h4>
                        </header>
                        <ul className="vehicle-details_section_list">
                          <li className="vehicle-details_section_text">
                            200 miles per day
                          </li>
                          <li className="vehicle-details_section_text">
                            Comprehensive Insurance
                          </li>
                          <li className="vehicle-details_section_text">
                            24/7 Roadside Assistance
                          </li>
                        </ul>
                      </section>
                      <section>
                        <header>
                          <h4 className="vehicle-details_section_header">
                            Vehicle Specs
                          </h4>
                        </header>
                        <section className="vehicle-details_rental_specs">
                          <section className="vehicle-details_rental-type">
                            {vehicle.convertible && (
                              <>
                                <section className="vehicle-details_rental-type_section">
                                  <img src="/img/convertible-icon.svg" />
                                  <article className="vehicle-details_section_text">
                                    Convertible
                                  </article>
                                </section>
                              </>
                            )}
                            {vehicle.transmission === "M" ? (
                              <>
                                <section className="vehicle-details_rental-status_section">
                                  <img src="/img/show-icon-grey.svg" />
                                  <article className="vehicle-details_section_text">
                                    Manual
                                  </article>
                                </section>
                              </>
                            ) : (
                              <>
                                <section className="vehicle-details_rental-status_section">
                                  <img src="/img/auto-icon.svg" />
                                  <article className="vehicle-details_section_text">
                                    Automatic
                                  </article>
                                </section>
                              </>
                            )}
                          </section>
                          <section className="vehicle-details_rental-type">
                            {vehicle.cylinders === "V8" ? (
                              <>
                                <section className="vehicle-details_rental-type_section">
                                  <img src="/img/v8-icon.svg" />
                                  <article className="vehicle-details_section_text">
                                    {vehicle.engine} V8
                                  </article>
                                </section>
                              </>
                            ) : (
                              <section className="vehicle-details_rental-type_section">
                                <img src="/img/v6-icon.svg" />
                                <article className="vehicle-details_section_text">
                                  {vehicle.engine} V6
                                </article>
                              </section>
                            )}

                            <section className="vehicle-details_rental-status_section">
                              <img src="/img/pax-icon.svg" />
                              <article className="vehicle-details_section_text">
                                {`${vehicle.seats} Passenger`}
                              </article>
                            </section>
                          </section>
                        </section>
                      </section>
                      <section>
                        <header>
                          <h4 className="vehicle-details_section_header">
                            Vehicle Type
                          </h4>
                        </header>
                        <section className="vehicle-details_rental-type">
                          {vehicle.type === "SHOW" ? (
                            <>
                              <section className="vehicle-details_rental-type_section">
                                <img src="/img/show-icon.svg" />
                                <article className="vehicle-details_section_text">
                                  Show Car - treat it like you own it.
                                </article>
                              </section>
                              <section className="vehicle-details_rental-type_section">
                                <img src="/img/go-icon-grey.svg" />
                                <article className="vehicle-details_section_text">
                                  Go Car - drive it like you stole it.
                                </article>
                              </section>
                            </>
                          ) : (
                            <>
                              <section className="vehicle-details_rental-status_section">
                                <img src="/img/show-icon-grey.svg" />
                                <article className="vehicle-details_section_text">
                                  Show Car - treat it like you own it.
                                </article>
                              </section>
                              <section className="vehicle-details_rental-status_section">
                                <img src="/img/go-icon.svg" />
                                <article className="vehicle-details_section_text">
                                  Go Car - drive it like you stole it.
                                </article>
                              </section>
                            </>
                          )}
                        </section>
                      </section>
                      <section>
                        <header>
                          <h4 className="vehicle-details_section_header">
                            Vehicle Status
                          </h4>
                        </header>
                        <section className="vehicle-details_rental-status">
                          {vehicle.rentalStatus === "D" ? (
                            <section className="vehicle-details_rental-status_section">
                              <img src="/img/d-icon.svg" />
                              <article className="vehicle-details_section_text">
                                Drive - vehicle is in stock, gassed up,
                                inspected for reliability, and is ready to
                                cruise Kansas City.
                              </article>
                            </section>
                          ) : vehicle.rentalStatus === "R" ? (
                            <article className="vehicle-details_section_text">
                              Reverse - vehicle is in stock but not currently
                              available for rent. These vehicles are undergoing
                              maintenance, repairs are being made, or the
                              vehicle is currently rented or otherwise
                              unavailable.
                            </article>
                          ) : (
                            <article className="vehicle-details_section_text">
                              Neutral - vehicle is in stock and is available for
                              rent but unable to be driven. These vehicles are
                              primarily rented as props for photoshoots,
                              commercials, and special events.
                            </article>
                          )}
                        </section>
                      </section>
                      <section>
                        <header>
                          <h4 className="vehicle-details_section_header">
                            Requirements
                          </h4>
                        </header>
                        <section className="vehicle-details_rental-status">
                          <section className="vehicle-details_rental-status_section">
                            <img src="/img/license.svg" />
                            <article className="vehicle-details_section_text">
                              All self-drive renters must be 30+ years old and
                              have a relatively clean driving record.
                            </article>
                          </section>
                          <section className="vehicle-details_rental-status_section">
                            <img src="/img/creditcard.svg" />
                            <article className="vehicle-details_section_text">
                              All bookings must be made with a valid Credit
                              Card. Debit Cards are not accepted.
                            </article>
                          </section>
                        </section>
                      </section>
                      {!matches && (
                        <section
                          className="view-details_container"
                          onClick={() => setViewDetailsOpen(!viewDetailsOpen)}
                        >
                          <article className="view-details_divider" />
                          <article className="view-details_box">
                            {viewDetailsOpen ? (
                              <>
                                hide details
                                <img
                                  src="/img/arrow-icon.svg"
                                  className="view-details_box_img--up"
                                />
                              </>
                            ) : (
                              <>
                                view details
                                <img
                                  src="/img/arrow-icon.svg"
                                  className="view-details_box_img"
                                />
                              </>
                            )}
                          </article>
                          <article className="view-details_divider" />
                        </section>
                      )}
                    </section>
                  ))}
              </section>
              <section className="booking_information_forms">
                <section className="booking_information_forms_header">
                  <article
                    className={`booking_information_forms_header_tab${
                      tab === "self" ? "--active" : ""
                    }`}
                    onClick={() => setTab("self")}
                  >
                    <img
                      src={`/img/gear-icon${tab === "self" ? "-grey" : ""}.svg`}
                      className="booking_information_forms_header_tab_img"
                    />
                    Self Drive
                  </article>
                  <article
                    className={`booking_information_forms_header_tab-chauffeured${
                      tab === "chauffeured" ? "--active" : ""
                    }`}
                    onClick={() => setTab("chauffeured")}
                  >
                    <img
                      src={`/img/chauffeured-icon${
                        tab === "chauffeured" ? "-grey" : ""
                      }.svg`}
                      className="booking_information_forms_header_tab_img"
                    />
                    Chauffeured
                  </article>
                  <article
                    className={`booking_information_forms_header_tab-commercial${
                      tab === "commercial" ? "--active" : ""
                    }`}
                    onClick={() => setTab("commercial")}
                  >
                    <img
                      src={`/img/camera-icon${
                        tab === "commercial" ? "-grey" : ""
                      }.svg`}
                      className="booking_information_forms_header_tab_img"
                    />
                    Commercial
                  </article>
                </section>
                {vehicle.rentalStatus === "D" && (
                  <BookingForm
                    vehicle={vehicle}
                    paymentIntent={paymentIntent}
                    tab={tab}
                    initialValues={initialValues}
                    handleSubmit={handleSubmit}
                    validationSchema={validationSchema}
                    success={success}
                    totalDays={totalDays}
                    totalHours={totalHours}
                    submissionData={submissionData}
                    setSubmitting={setSubmitting}
                    setFieldError={setFieldError}
                    setButtonText={setButtonText}
                    fieldError={fieldError}
                    setSuccess={setSuccess}
                    handleDateChange={handleDateChange}
                    bookingBegun={bookingBegun}
                    formError={formError}
                    submitting={submitting}
                    setBookingBegun={setBookingBegun}
                    handleTimeChange={handleTimeChange}
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
        {/* <section className="getInTouch">
          <section className="flex flex-col getInTouch_container">
            <article className="flex flex-col">
              <h3 className="booking_questions_header">Have Questions?</h3>
              <article className="">
                <p className="booking_questions_header-text">
                  At RND we strive to make your classic car rental experience as
                  simple and enjoyable as possible. We offer delivery to your
                  home or work. We can also pick you up from the airport if you
                  are in town visiting. If you have questions visit our{" "}
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
        </section> */}
        <Footer />
      </section>
    </>
  );
};

export default Car;
