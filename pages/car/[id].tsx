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
import { usePageTracking } from "../../hooks/usePageTracking";
import { fetchPostJSON } from "../../utils/api-helpers";
import { extendMoment } from "moment-range";
import { VehicleDetails } from "../../components/vehicleDetails";
import { VehicleHeader } from "../../components/vehicleHeader";
import { VehicleImages } from "../../components/vehicleImages";
import { bookingValidCheck } from "../../utils/bookingDateValidCheck";
import { CarPageBottom } from "../../components/carPageBottom";

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
  const [bigImageUrl, setBigImageUrl] = useState("");
  const [showShareModal, setShowShareModal] = useState(false);
  const [paymentIntent, setPaymentIntent] = useState<PaymentIntent | null>(
    null
  );
  const [includeDelivery, setIncludeDelivery] = useState(false);
  const [tab, setTab] = useState("self");
  const [success, setSuccess] = useState(false);
  const [formError, setFormError] = useState(false);
  const [fieldError, setFieldError] = useState<FieldError>({});
  const [bookingBegun, setBookingBegun] = useState(false);
  const [currentBookings, setCurrentBookings] = useState([]);
  const [submissionData, setSubmissionData] = useState<SubmissionData>({
    vin: "",
    startDateTime: moment(),
    endDateTime: moment(),
    endRefitTime: moment(),
    vehicle,
  });

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

  const handleSubmit = async (values) => {
    const validCheckProps = {
      ...values,
      currentBookings,
      refitHours: vehicle.refitHours,
      setFieldError,
      tab,
    };

    const data = bookingValidCheck(validCheckProps);
    if (!data) {
      setFormError(true);
      return;
    }
    setSubmissionData({
      ...values,
      vin: vehicle.vin,
      startDateTime: data.startDateTime,
      endDateTime: data.endDateTime,
      endRefitTime: data.endRefitTime,
      vehicle,
      type: tab,
    });
    if (data.startDateTime && data.endDateTime && data.endRefitTime) {
      fetchPostJSON("/api/paymentIntent", {
        amount: 50,
        contact: {
          name: values.name,
          email: values.email,
          phone: values.phoneNumber,
          startDateTime: submissionData.startDateTime,
          endDateTime: submissionData.endDateTime,
          endRefitTime: submissionData.endRefitTime,
          type: tab,
          delivery: includeDelivery,
          vehicle,
        },
      }).then((data) => {
        setPaymentIntent(data);
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
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
            {`${vehicle.year} ${vehicle.make} ${vehicle.model}`} - RND Kansas
            City Classic Car Rental
          </title>
        ) : (
          <title>RND Kansas City Classic Car Rental</title>
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
              bookingBegun={bookingBegun}
              setBookingBegun={setBookingBegun}
            />
            {bookingBegun ? (
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
                  setFieldError={setFieldError}
                  fieldError={fieldError}
                  setSuccess={setSuccess}
                  bookingBegun={bookingBegun}
                  formError={formError}
                  setPaymentIntent={setPaymentIntent}
                  includeDelivery={includeDelivery}
                  setIncludeDelivery={setIncludeDelivery}
                />
              </section>
            ) : (
              <section className="booking_not_begun">
                <VehicleImages
                  vehicle={vehicle}
                  bigImageUrl={bigImageUrl}
                  setBigImageUrl={setBigImageUrl}
                />
                <section className="booking_container">
                  <VehicleDetails vehicle={vehicle} />
                </section>
                <section className="booking_footer">
                  <section className="booking_footer_text_container">
                    <p className="booking_footer_text">Starting at</p>
                    <p className="booking_footer_cost">
                      {`$${vehicle.rentalCost?.commercial} hr / $${vehicle.rentalCost?.day} day`}
                    </p>
                  </section>
                  <section className="booking_footer_button_container">
                    <button
                      className="booking_footer_button"
                      onClick={() => setBookingBegun(true)}
                      type="button"
                    >
                      Begin Booking
                    </button>
                  </section>
                </section>
              </section>
            )}
          </>
        )}
        {!bookingBegun && <CarPageBottom tab={tab} />}
        <Footer />
      </section>
    </section>
  );
};

export default Car;
