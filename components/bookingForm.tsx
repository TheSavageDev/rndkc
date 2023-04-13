import { useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { Form, Formik, useFormikContext } from "formik";
import * as Moment from "moment";
import { CheckoutForm } from "./checkoutForm";
import getStripe from "../utils/get-stripejs";
import { TextField } from "./TextField";
import { DatePicker } from "./datePicker";
import { TimePicker } from "./TimePicker";
import { DocumentData } from "firebase/firestore";
import { TextArea } from "./TextArea";

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
  totalHours: number;
  type: "self" | "chauffeured" | "commercial";
};

export type SubmissionData = {
  vin: string;
  startDateTime: Moment.Moment;
  endDateTime: Moment.Moment;
  endRefitTime: Moment.Moment;
  vehicle: DocumentData;
  notes: string;
  type: "self" | "chauffeured" | "commercial";
};

export type Values = {
  name: string;
  phoneNumber: string;
  email: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  notes?: string;
};

export const BookingForm = ({
  vehicle,
  paymentIntent,
  tab,
  initialValues,
  handleSubmit,
  validationSchema,
  success,
  totalDays,
  totalHours,
  submissionData,
  setSubmitting,
  setFieldError,
  setButtonText,
  fieldError,
  setSuccess,
  handleDateChange,
  bookingBegun,
  formError,
  submitting,
  handleTimeChange,
  setBookingBegun,
  setPaymentIntent,
}) => {
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

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      className="checkout-container"
    >
      {({ values }) => {
        return (
          <>
            {paymentIntent && paymentIntent.client_secret && (
              <>
                <section className="checkout-modal">
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
                        totalHours,
                        type: tab,
                      }}
                      submissionData={submissionData}
                      setSubmitting={setSubmitting}
                      setFieldError={setFieldError}
                      setButtonText={setButtonText}
                      fieldError={fieldError}
                      setSuccess={setSuccess}
                      success={success}
                      paymentIntent={paymentIntent}
                      setPaymentIntent={setPaymentIntent}
                    />
                  </Elements>
                </section>
              </>
            )}
            <Form className="booking_information-form">
              <ScrollToFieldError />
              <section className="booking_information-form-dates_container">
                {tab === "self" && (
                  <>
                    <section className="booking_information-description-container">
                      <p className="booking_information-description-text">
                        Get behind the wheel for an adrenaline pumping
                        adventure!
                      </p>
                    </section>
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
                  </>
                )}
                {tab === "chauffeured" && (
                  <>
                    <section className="booking_information-description-container">
                      <p className="booking_information-description-text">
                        We’ll take care of the driving, you just sit back and
                        enjoy the ride
                      </p>
                    </section>
                    <section className="booking_information-form-date">
                      <DatePicker
                        name="startDate"
                        label="Date"
                        handleDateChange={handleDateChange}
                      />
                    </section>
                    <section className="booking_information-form-date">
                      <section className="booking_information-form-date_inputs">
                        <TimePicker
                          name="startTime"
                          label="Start Time"
                          handleTimeChange={handleTimeChange}
                        />
                        <TimePicker
                          name="endTime"
                          label="End Time"
                          handleTimeChange={handleTimeChange}
                        />
                      </section>
                    </section>
                  </>
                )}
                {tab === "commercial" && (
                  <>
                    <section className="booking_information-description-container">
                      <p className="booking_information-description-text">
                        We’ll bring the car to you for photoshoots, events, or
                        commercials.
                      </p>
                    </section>
                    <section className="booking_information-form-date">
                      <DatePicker
                        name="startDate"
                        label="Date"
                        handleDateChange={handleDateChange}
                      />
                    </section>
                    <section className="booking_information-form-date">
                      <section className="booking_information-form-date_inputs">
                        <TimePicker
                          name="startTime"
                          label="Start Time"
                          handleTimeChange={handleTimeChange}
                        />
                        <TimePicker
                          name="endTime"
                          label="End Time"
                          handleTimeChange={handleTimeChange}
                        />
                      </section>
                    </section>
                  </>
                )}
              </section>
              <article className="booking_information-form_pricing">
                <h2 className="booking_information-form_pricing-text">
                  {tab === "self" && `$${vehicle?.rentalCost?.day} Day`}
                  {["chauffeured", "commercial"].includes(tab) &&
                    `$${vehicle?.rentalCost?.chauffeured} hr`}
                </h2>
                <h2 className="booking_information-form_pricing-text--sub">
                  {tab === "self" && totalDays > 0
                    ? `${totalDays} Days for $${
                        vehicle?.rentalCost?.day * totalDays
                      } Total`
                    : totalDays < 0
                    ? `Your start date and time must be before your end date and time`
                    : ""}
                  {["chauffeured", "commercial"].includes(tab) && totalHours > 0
                    ? `${totalHours} hrs for $${
                        vehicle?.rentalCost?.chauffeured * totalHours
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
                      label="Full Name"
                      name="fullName"
                      placeholder="Enter Name"
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
                    {tab !== "self" && (
                      <TextArea
                        label="Notes or Special Requests"
                        name="notes"
                        placeholder="Enter Event Details"
                      />
                    )}
                  </section>
                </section>
              )}
              {bookingBegun ? (
                <button
                  className={`booking_information-form-button${
                    Object.keys(formError).length !== 0 ? "--form-error" : ""
                  }${totalDays <= 0 && totalHours <= 0 ? "--submitting" : ""}`}
                  onClick={() => handleSubmit(values)}
                  disabled={totalDays <= 0 && totalHours <= 0}
                  type="button"
                >
                  Continue To Payment
                </button>
              ) : (
                <button
                  className={`booking_information-form-button${
                    Object.keys(formError).length !== 0 ? "--form-error" : ""
                  }${
                    submitting || (totalDays <= 0 && totalHours < 2)
                      ? "--submitting"
                      : ""
                  }`}
                  onClick={() => setBookingBegun(true)}
                  disabled={submitting || (totalDays <= 0 && totalHours < 2)}
                  type="button"
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
          </>
        );
      }}
    </Formik>
  );
};
