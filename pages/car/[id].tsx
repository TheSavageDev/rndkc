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
import { Form, Formik, useFormikContext } from "formik";
import { Elements } from "@stripe/react-stripe-js";
import getStripe from "../../utils/get-stripejs";
import { CheckoutForm } from "../../components/checkoutForm";
import { DatePicker } from "../../components/datePicker";
import { TimePicker } from "../../components/TimePicker";
import { TextField } from "../../components/TextField";

export type FieldError = {
  name?: string;
  startDate?: string;
  startTime?: string;
  endDate?: string;
  endTime?: string;
};

export type CustomerData = {
  name: string;
  email: string;
  phoneNumber: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  totalDays: number;
  vin: string;
  vehicle: DocumentData;
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
  const [fieldError, setFieldError] = useState<FieldError>({});
  const [submitting, setSubmitting] = useState(false);
  const [buttonText, setButtonText] = useState(initialButtonText);
  const [bookingBegun, setBookingBegun] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentBookings, setCurrentBookings] = useState([]);
  const [startDT, setStartDT] = useState<Moment.Moment>();
  const [endDT, setEndDT] = useState<Moment.Moment>();
  const [endRT, setEndRT] = useState<Moment.Moment>();
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
    const vehicleDoc = collection(db, "vehicles", vehicle?.vin, "bookings");
    const vehicleSnap = await getDocs(vehicleDoc);
    vehicleSnap.forEach((doc) => {
      bookings.push(doc.data());
    });
    setCurrentBookings(bookings);
  };

  useEffect(() => {
    getCurrentBookings();
  }, [vehicle]);

  const ScrollToFieldError = () => {
    const { errors, isSubmitting, isValidating } = useFormikContext();

    useEffect(() => {
      if (isSubmitting && !isValidating) {
        let keys = Object.keys(errors);
        if (keys.length > 0) {
          const selector = `[name=${keys[0]}]`;
          const errorElement = document.querySelector(selector) as HTMLElement;
          if (errorElement) {
            errorElement.focus();
          }
        }
      }
    }, [errors, isSubmitting, isValidating]);

    return null;
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Please enter your full name."),
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
    name: "",
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
      setStartDT(startDateTime);
      setEndDT(endDateTime);
      setEndRT(endRefitTime);
      return true;
    }
  };

  const handleBeginBooking = () => {
    setBookingBegun(true);
  };

  const handleSubmit = async (values) => {
    console.log("handleSumit");
    const isValid = bookingValidCheck(values);
    if (!isValid) {
      return;
    }
    if (startDT && endDT && endRT) {
      fetchPostJSON("/api/paymentIntent", {
        amount: 50,
      }).then((data) => {
        setPaymentIntent(data);
      });

      setSubmitting(true);
      setSubmissionData({
        ...values,
        vin: vehicle.vin,
        startDateTime: startDT,
        endDateTime: endDT,
        endRefitTime: endRT,
        vehicle,
        values,
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
                className="booking_sub-nav_header-button"
                onClick={() => setShowShareModal(true)}
              >
                <article className="booking_sub-nav_buttons">
                  <img src="/img/back-icon.svg" /> All Inventory
                </article>
              </button>
              <button
                className="booking_sub-nav_header-button--question"
                onClick={() => setShowShareModal(true)}
              >
                <article className="booking_sub-nav_buttons">Questions</article>
                <img src="/img/mail-icon.svg" />
              </button>
              <button
                className="booking_sub-nav_header-button"
                onClick={() => setShowShareModal(true)}
              >
                <article className="booking_sub-nav_buttons">
                  Share <img src="/img/share-icon.svg" />
                </article>
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
            <section className="booking_container">
              <section className="booking_information">
                <h2 className="booking_information_header">
                  {vehicle.rentalStatus === "D" ? (
                    <>
                      {" "}
                      {`Driving a `}
                      <span>
                        {vehicle.year} {vehicle.model}
                      </span>
                      {` is an experience like no other.`}
                    </>
                  ) : (
                    `We'll let you know when it's ready to cruise`
                  )}
                </h2>

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

                {viewDetailsOpen && (
                  <section className="booking_information-paragraphs">
                    <p className="booking_information-paragraphs-text">
                      With its powerful V8 engine and classic styling, the car
                      feels powerful and responsive on the road. The interior is
                      luxurious and comfortable, with leather seats and chrome
                      accents that give the car an air of sophistication. The
                      exterior is timeless and iconic, with its sharp lines and
                      classic curves. Driving a 1965 Plymouth Satellite is an
                      exhilarating experience that will make you want to keep
                      coming back for more.
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
                                  Manual Transmission
                                </article>
                              </section>
                            </>
                          ) : (
                            <>
                              <section className="vehicle-details_rental-status_section">
                                <img src="/img/auto-icon.svg" />
                                <article className="vehicle-details_section_text">
                                  Automatic Transmission
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
                              Drive - vehicle is in stock, gassed up, inspected
                              for reliability, and is ready to cruise Kansas
                              City.
                            </article>
                          </section>
                        ) : vehicle.rentalStatus === "R" ? (
                          <article className="vehicle-details_section_text">
                            Reverse - vehicle is in stock but not currently
                            available for rent. These vehicles are undergoing
                            maintenance, repairs are being made, or the vehicle
                            is currently rented or otherwise unavailable.
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
                  </section>
                )}
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
                  <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                  >
                    {({ values }) => {
                      return (
                        <>
                          {!success &&
                          paymentIntent &&
                          paymentIntent.client_secret ? (
                            <Elements
                              options={{
                                clientSecret: paymentIntent.client_secret,
                                appearance: {
                                  theme: "flat",
                                  labels: "floating",
                                  variables: {
                                    fontFamily: "Akshar",
                                    fontSizeBase: "1.1rem",
                                  },
                                },
                              }}
                              stripe={getStripe()}
                            >
                              <CheckoutForm
                                customerData={{
                                  ...values,
                                  vehicle,
                                  totalDays,
                                }}
                                submissionData={submissionData}
                                setSubmitting={setSubmitting}
                                setFieldError={setFieldError}
                                setButtonText={setButtonText}
                                fieldError={fieldError}
                                setSuccess={setSuccess}
                              />
                            </Elements>
                          ) : (
                            <Form className="booking_information-form">
                              <ScrollToFieldError />
                              <section className="booking_information-form-dates_container">
                                <section className="booking_information-form-date">
                                  <section className="booking_information-form-date_inputs">
                                    <DatePicker
                                      name="startDate"
                                      label="Start Date"
                                      handleDateChange={handleDateChange}
                                    />
                                    <TimePicker
                                      name="startTime"
                                      label="Start Time"
                                    />
                                  </section>
                                </section>
                                <section className="booking_information-form-date">
                                  <section className="booking_information-form-date_inputs">
                                    <DatePicker
                                      name="endDate"
                                      label="End Date"
                                      handleDateChange={handleDateChange}
                                    />
                                    <TimePicker
                                      name="endTime"
                                      label="End Time"
                                    />
                                  </section>
                                </section>
                              </section>
                              <article className="booking_information-form_pricing">
                                <h2 className="booking_information-form_pricing-text">
                                  ${vehicle?.rentalCost?.day} Day
                                </h2>
                                <h2 className="booking_information-form_pricing-text--sub">
                                  {totalDays > 0
                                    ? `${totalDays} Days for $${
                                        vehicle?.rentalCost?.day * totalDays
                                      } Total`
                                    : totalDays < 0
                                    ? `Your start date and time must be before your end date and time`
                                    : ""}
                                </h2>
                              </article>
                              {bookingBegun && (
                                <section>
                                  <section className="booking_information-form_contact">
                                    <TextField
                                      label="First Name"
                                      name="firstName"
                                      placeholder="Enter First Name"
                                      booking
                                    />
                                    <TextField
                                      label="Last Name"
                                      name="lastName"
                                      placeholder="Enter Last Name"
                                      booking
                                    />
                                    <TextField
                                      label="Email Address"
                                      name="email"
                                      placeholder="Enter Email Address"
                                      type="email"
                                      booking
                                    />
                                    <TextField
                                      label="Phone Number"
                                      name="phoneNumber"
                                      placeholder="(816) 555-1234"
                                      type="tel"
                                      booking
                                    />
                                  </section>
                                </section>
                              )}
                              {bookingBegun ? (
                                <button
                                  className={`booking_information-form-button${
                                    Object.keys(formError).length !== 0
                                      ? "--form-error"
                                      : ""
                                  }${
                                    submitting || success || totalDays <= 0
                                      ? "--submitting"
                                      : ""
                                  }`}
                                  type="submit"
                                  disabled={
                                    submitting || success || totalDays <= 0
                                  }
                                >
                                  Continue To Payment
                                </button>
                              ) : (
                                <button
                                  className={`booking_information-form-button${
                                    Object.keys(formError).length !== 0
                                      ? "--form-error"
                                      : ""
                                  }${
                                    submitting || success || totalDays <= 0
                                      ? "--submitting"
                                      : ""
                                  }`}
                                  onClick={handleBeginBooking}
                                  disabled={
                                    submitting || success || totalDays <= 0
                                  }
                                >
                                  Begin Booking
                                </button>
                              )}
                              {Object.values(fieldError).length !== 0 && (
                                <>
                                  <article className="booking_date-conflict-message">
                                    {fieldError.startDate}
                                  </article>
                                  <article className="booking_date-conflict-message">
                                    {fieldError.endDate}
                                  </article>
                                </>
                              )}
                            </Form>
                          )}
                        </>
                      );
                    }}
                  </Formik>
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
