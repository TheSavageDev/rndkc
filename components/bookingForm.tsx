import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { Form, Formik, useFormikContext } from "formik";
import { Moment } from "moment";
import { CheckoutForm } from "./checkoutForm";
import getStripe from "../utils/get-stripejs";
import { TextField } from "./TextField";
import { DatePicker } from "./datePicker";
import { TimePicker } from "./TimePicker";
import { DocumentData } from "firebase/firestore";
import { TextArea } from "./TextArea";
import { validationSchema } from "../utils/bookingValidationSchema";
import { AvailabilitySignUp } from "./availabilitySignUp";

export type FieldError = {
  name?: string;
  startDate?: string;
  startTime?: string;
  endDate?: string;
  endTime?: string;
  address?: string;
  city?: string;
  zipCode?: string;
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
  includeDelivery: boolean;
  address?: string;
  city?: string;
  zipCode?: string;
};

export type SubmissionData = {
  vin: string;
  startDateTime: Moment;
  endDateTime: Moment;
  endRefitTime: Moment;
  vehicle: DocumentData;
  includeDelivery: boolean;
  address?: string;
  city?: string;
  zipCode?: string;
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
  includeDelivery: boolean;
  address?: string;
  city?: string;
  zipCode: string;
  notes?: string;
};

export const BookingForm = ({
  vehicle,
  paymentIntent,
  tab,
  setTab,
  initialValues,
  handleSubmit,
  success,
  submissionData,
  setFieldError,
  fieldError,
  setSuccess,
  bookingBegun,
  formError,
  setPaymentIntent,
}) => {
  const [totalDays, setTotalDays] = useState(0);
  const [totalHours, setTotalHours] = useState(0);
  const [includeDelivery, setIncludeDelivery] = useState(false);

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
  const Tabs = () => {
    const { values, setFieldValue } = useFormikContext();

    const handleSetTab = (newTab) => {
      setTab(newTab);
      if (["chauffeured", "commercial"].includes(newTab)) {
        setFieldValue("endTime", "12:00");
        setFieldValue("endDate", (values as Values).startDate);
      }
    };

    return (
      <section className="booking_information_forms_header">
        <article
          className={`booking_information_forms_header_tab${
            tab === "self" ? "--active" : ""
          }`}
          onClick={() => handleSetTab("self")}
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
          onClick={() => handleSetTab("chauffeured")}
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
          onClick={() => handleSetTab("commercial")}
        >
          <img
            src={`/img/camera-icon${tab === "commercial" ? "-grey" : ""}.svg`}
            className="booking_information_forms_header_tab_img"
          />
          Commercial
        </article>
      </section>
    );
  };

  const handleDateChange = (startDate, endDate) => {
    if (startDate && endDate) {
      let newTotalDays: number;
      const differenceInTime = endDate.getTime() - startDate.getTime();
      newTotalDays = differenceInTime / (1000 * 3600 * 24);
      setTotalDays(Math.round(newTotalDays));
    }
  };

  const handleTimeChange = (startTime, endTime) => {
    if (startTime && endTime) {
      const newTotalHours = (endTime - startTime) / (1000 * 3600);
      setTotalHours(newTotalHours);
    }
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
                      setFieldError={setFieldError}
                      fieldError={fieldError}
                      setSuccess={setSuccess}
                      success={success}
                      paymentIntent={paymentIntent}
                      setPaymentIntent={setPaymentIntent}
                      includeDelivery={includeDelivery}
                    />
                  </Elements>
                </section>
              </>
            )}
            <Form className="booking_information-form" autoComplete="on">
              <ScrollToFieldError />
              <Tabs />
              {(vehicle.rentalStatus === "D" ||
                ["commercial"].includes(tab)) && (
                <>
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
                            <TimePicker
                              name="startTime"
                              label="Start Time"
                              tab={tab}
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
                              tab={tab}
                            />
                          </section>
                        </section>
                      </>
                    )}
                    {tab === "chauffeured" && (
                      <>
                        <section className="booking_information-description-container">
                          <p className="booking_information-description-text">
                            We’ll take care of the driving, you just sit back
                            and enjoy the ride
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
                              tab={tab}
                            />
                            <TimePicker
                              name="endTime"
                              label="End Time"
                              handleTimeChange={handleTimeChange}
                              tab={tab}
                            />
                          </section>
                          <label className="checkout-form_delivery-label">
                            <input
                              type="checkbox"
                              name="delivery"
                              id="delivery"
                              className="checkout-form_delivery-checkbox"
                              onClick={(e) => {
                                const { target } = e;
                                setIncludeDelivery(
                                  (target as HTMLInputElement).checked
                                );
                              }}
                            />
                            Include Delivery
                            {/* <img
                              src="/img/question-icon.svg"
                              className="checkout-form_delivery-icon"
                            /> */}
                          </label>
                          {includeDelivery && (
                            <p className="checkout-form_delivery_info">
                              Delivery fee is $100 and includes drop-off and
                              pickup. Maximum of 20 miles from downtown Kansas
                              City
                            </p>
                          )}
                        </section>
                      </>
                    )}
                    {tab === "commercial" && (
                      <>
                        <section className="booking_information-description-container">
                          <p className="booking_information-description-text">
                            We’ll bring the car to you for photoshoots, events,
                            or commercials.
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
                              tab={tab}
                            />
                            <TimePicker
                              name="endTime"
                              label="End Time"
                              handleTimeChange={handleTimeChange}
                              tab={tab}
                            />
                          </section>
                          <label className="checkout-form_delivery-label">
                            <input
                              type="checkbox"
                              name="delivery"
                              id="delivery"
                              className="checkout-form_delivery-checkbox"
                              onClick={(e) => {
                                const { target } = e;
                                setIncludeDelivery(
                                  (target as HTMLInputElement).checked
                                );
                              }}
                            />
                            Include Delivery
                            {/* <img
                              src="/img/question-icon.svg"
                              className="checkout-form_delivery-icon"
                            /> */}
                          </label>
                          {includeDelivery && (
                            <p className="checkout-form_delivery_info">
                              Delivery fee is $100 and includes drop-off and
                              pickup. Maximum of 20 miles from downtown Kansas
                              City
                            </p>
                          )}
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
                    <h2
                      className={
                        (["chauffeured", "commercial"].includes(tab) &&
                          totalHours < 2 &&
                          totalHours > 0) ||
                        totalHours < 0 ||
                        (tab === "self" && totalDays < 0)
                          ? "booking_information-form_pricing-text--sub--issue"
                          : "booking_information-form_pricing-text--sub"
                      }
                    >
                      {tab === "self" && totalDays > 0
                        ? `${totalDays} Days for $${
                            vehicle?.rentalCost?.day * totalDays
                          } Total`
                        : totalDays < 0
                        ? `Your start date and time must be before your end date and time`
                        : ""}
                      {["chauffeured", "commercial"].includes(tab) &&
                      totalHours >= 2
                        ? `${totalHours} hrs for $${
                            vehicle?.rentalCost?.chauffeured * totalHours
                          } Total`
                        : ["chauffeured", "commercial"].includes(tab) &&
                          totalHours < 2 &&
                          totalHours > 0
                        ? `You must rent the vehicle for at least 2 hours.`
                        : totalHours < 0
                        ? "Your end time must be after your start time."
                        : ""}
                    </h2>
                    <img
                      src="/img/cards.png"
                      className="booking_information_card_image"
                    />
                    <p className="booking_information_small">
                      (debit cards are not accepted)
                    </p>
                  </article>
                  {bookingBegun && (
                    <section>
                      <section className="booking_information-form_contact">
                        <TextField
                          label="Full Name"
                          name="name"
                          placeholder="Enter Full Name"
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
                        {includeDelivery && (
                          <>
                            <TextField
                              label="Delivery Address"
                              name="address"
                              placeholder="Enter Street Address"
                              booking
                            />
                            <TextField
                              label="City"
                              name="city"
                              placeholder="Enter City"
                              booking
                            />
                            <TextField
                              label="Zip Code"
                              name="zipCode"
                              placeholder="64116"
                              length={5}
                              booking
                            />
                          </>
                        )}
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
                  <section className="booking_information-form-button-container">
                    <button
                      className={`booking_information-form-button${
                        Object.keys(formError).length !== 0
                          ? "--form-error"
                          : ""
                      }${
                        (tab === "self" && totalDays <= 0) ||
                        (["chauffeured", "commercial"].includes(tab) &&
                          totalHours < 2)
                          ? "--submitting"
                          : ""
                      }`}
                      onClick={() => handleSubmit(values)}
                      disabled={
                        (tab === "self" && totalDays <= 0) ||
                        (["chauffeured", "commercial"].includes(tab) &&
                          totalHours < 2)
                      }
                      type="button"
                    >
                      Continue To Payment
                    </button>
                  </section>
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
                </>
              )}
              {vehicle.rentalStatus === "N" &&
                ["self", "chauffeured"].includes(tab) && (
                  <AvailabilitySignUp vin={vehicle.vin} />
                )}
            </Form>
          </>
        );
      }}
    </Formik>
  );
};
