import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { Form, Formik, useFormikContext } from "formik";
import * as Yup from "yup";
import * as Moment from "moment";
import { extendMoment } from "moment-range";
import { fetchPostJSON } from "../utils/api-helpers";
import { CheckoutForm } from "./checkoutForm";
import getStripe from "../utils/get-stripejs";
import { TextField } from "./TextField";
import { DatePicker } from "./datePicker";
import { TimePicker } from "./TimePicker";
import {
  DocumentData,
  collection,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase/clientApp";

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

export const BookingForm = ({ vehicle, setPaymentIntent, paymentIntent }) => {
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
    vehicle.bookings.length !== 0 &&
      vehicle.bookings.forEach((booking) => {
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
    const vehicleDoc = collection(db, "vehicles", vehicle.vin, "bookings");
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

  const handleSubmit = async (values) => {
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

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ values }) => {
        return (
          <>
            {!success && paymentIntent && paymentIntent.client_secret ? (
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
                <section className="booking_information-form_contact">
                  <TextField
                    label="Name"
                    name="name"
                    placeholder="Enter Full Name"
                  />
                  <TextField
                    label="Email Address"
                    name="email"
                    placeholder="Enter Email Address"
                    type="email"
                  />
                  <TextField
                    label="Phone Number"
                    name="phoneNumber"
                    placeholder="(816) 555-1234"
                    type="tel"
                  />
                </section>
                <section className="booking_information-form-dates_container">
                  <section className="booking_information-form-date">
                    <section className="booking_information-form-date_inputs">
                      <DatePicker
                        name="startDate"
                        label="Start Date"
                        handleDateChange={handleDateChange}
                      />
                      <TimePicker name="startTime" label="Start Time" />
                    </section>
                  </section>
                  <section className="booking_information-form-date">
                    <section className="booking_information-form-date_inputs">
                      <DatePicker
                        name="endDate"
                        label="End Date"
                        handleDateChange={handleDateChange}
                      />
                      <TimePicker name="endTime" label="End Time" />
                    </section>
                  </section>
                </section>
                <article className="booking_information-form_pricing">
                  <h2 className="booking_information-form_pricing-text">
                    ${vehicle?.rentalCost?.day} Day
                  </h2>
                  <h2 className="booking_information-form_pricing-text--sub">
                    {totalDays >= 0
                      ? `${totalDays} Days for $${
                          vehicle?.rentalCost?.day * totalDays
                        } Total`
                      : `Your start date and time must be before your end date and time`}
                  </h2>
                </article>
                <button
                  className={`booking_information-form-button${
                    Object.keys(formError).length !== 0 ? "--form-error" : ""
                  }${
                    submitting || success || totalDays < 0 ? "--submitting" : ""
                  }`}
                  // onClick={handleSubmit}
                  type="submit"
                  disabled={submitting || success || totalDays < 0}
                >
                  {buttonText}
                </button>
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
  );
};
