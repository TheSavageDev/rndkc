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
import * as Moment from "moment";
import { NavBar } from "../../components/navBar";
import { db } from "../../firebase/clientApp";
import { Footer } from "../../components/footer";
import { ContactForm } from "../../components/contactForm";
import { ShareModal } from "../../components/shareModal";
import { BookingForm } from "../../components/bookingForm";
import { AvailabilitySignUp } from "../../components/availabilitySignUp";
import { usePageTracking } from "../../hooks/usePageTracking";
import { fetchPostJSON } from "../../utils/api-helpers";
import { extendMoment } from "moment-range";
import { VehicleDetails } from "../../components/vehicleDetails";
import { VehicleHeader } from "../../components/vehicleHeader";
import { VehicleImages } from "../../components/vehicleImages";
import { bookingValidCheck } from "../../utils/bookingDateValidCheck";

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
  const [vehicle, setVehicle] = useState<DocumentData>({});
  const [initialValues, setInitialValues] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    startDate: "",
    startTime: "10:00",
    endDate: "",
    endTime: "10:00",
  });
  const [routerReady, setRouterReady] = useState(false);
  const [bigImageUrl, setBigImageUrl] = useState("");
  const [showShareModal, setShowShareModal] = useState(false);
  const [paymentIntent, setPaymentIntent] = useState<PaymentIntent | null>(
    null
  );
  const [tab, setTab] = useState("self");
  const initialButtonText =
    vehicle.rentalStatus === "D"
      ? "Begin Booking"
      : "Email Me When It's Available";
  const [success, setSuccess] = useState(false);
  const [formError, setFormError] = useState(false);
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

  const handleSetTab = (newTab) => {
    setTab(newTab);
    if (["chauffeured", "commercial"].includes(newTab)) {
      setInitialValues({
        fullName: "",
        phoneNumber: "",
        email: "",
        startDate: "",
        startTime: "10:00",
        endDate: "",
        endTime: "12:00",
      });
    }
  };

  const handleSubmit = async (values) => {
    const validCheckProps = {
      ...values,
      currentBookings,
      refitHours: vehicle.refitHours,
      setFieldError,
    };

    const data = bookingValidCheck(validCheckProps);
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
    <section className="main">
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
            <VehicleHeader
              setShowShareModal={setShowShareModal}
              router={router}
            />
            <VehicleImages
              vehicle={vehicle}
              bigImageUrl={bigImageUrl}
              setBigImageUrl={setBigImageUrl}
            />
            <section className="booking_container">
              <VehicleDetails vehicle={vehicle} />
              <section className="booking_information_forms">
                <BookingForm
                  vehicle={vehicle}
                  paymentIntent={paymentIntent}
                  tab={tab}
                  setTab={setTab}
                  initialValues={initialValues}
                  handleSubmit={handleSubmit}
                  success={success}
                  submissionData={submissionData}
                  setSubmitting={setSubmitting}
                  setFieldError={setFieldError}
                  setButtonText={setButtonText}
                  fieldError={fieldError}
                  setSuccess={setSuccess}
                  bookingBegun={bookingBegun}
                  formError={formError}
                  submitting={submitting}
                  setBookingBegun={setBookingBegun}
                  setPaymentIntent={setPaymentIntent}
                />
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
    </section>
  );
};

export default Car;
