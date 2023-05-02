import React, { useState, FC, Dispatch, SetStateAction } from "react";
import { fetchPostJSON } from "../utils/api-helpers";
import { formatAmountForDisplay } from "../utils/stripe-helpers";

import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import moment from "moment";
import { PaymentIntent } from "@stripe/stripe-js";
import { CustomerData, FieldError, SubmissionData } from "./bookingForm";
import { useEventTracking } from "../hooks/useEventTracking";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/clientApp";

type CheckoutFormProps = {
  paymentIntent?: PaymentIntent | null;
  customerData: CustomerData;
  fieldError: FieldError;
  submissionData: SubmissionData;
  setSubmitting: Dispatch<SetStateAction<boolean>>;
  setFieldError: Dispatch<SetStateAction<FieldError>>;
  setButtonText: Dispatch<SetStateAction<string>>;
  setSuccess: Dispatch<SetStateAction<boolean>>;
  success: boolean;
  setPaymentIntent: (paymentIntent: PaymentIntent | null) => void;
  includeDelivery: boolean;
};

export const CheckoutForm: FC<CheckoutFormProps> = ({
  paymentIntent,
  customerData,
  submissionData,
  fieldError,
  setSubmitting,
  setFieldError,
  setSuccess,
  setPaymentIntent,
  success,
  includeDelivery,
}) => {
  const goBack = () => {
    fetchPostJSON("/api/paymentIntent", {
      amount: 50,
      payment_intent_id: paymentIntent.id,
      cancel: true,
      contact: {
        name: customerData.name,
        email: customerData.email,
        phone: customerData.phoneNumber,
        vehicle: submissionData.vehicle,
        type: customerData.type,
        startDate: submissionData.startDateTime,
        endDate: submissionData.endDateTime,
        delivery: customerData.includeDelivery,
      },
    }).then(() => setPaymentIntent(null));
  };
  const [paymentType, setPaymentType] = useState("");
  const [payment, setPayment] = useState({ status: "initial" });
  const [errorMessage, setErrorMessage] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    // Abort if form isn't valid
    if (!e.currentTarget.reportValidity()) return;
    if (!elements) return;
    setPayment({ status: "processing" });

    // Create a PaymentIntent with the specified amount.
    const response = await fetchPostJSON("/api/paymentIntent", {
      amount: 50,
      payment_intent_id: paymentIntent?.id,
      contact: {
        name: customerData.name,
        email: customerData.email,
        phone: customerData.phoneNumber,
        vehicle: submissionData.vehicle,
        type: customerData.type,
        startDate: submissionData.startDateTime,
        endDate: submissionData.endDateTime,
        delivery: customerData.includeDelivery,
        address: customerData.address,
        city: customerData.city,
        zipCode: customerData.zipCode,
      },
    });
    setPayment(response);
    try {
      // Use your card Element with other Stripe.js APIs
      const { error } = await stripe!.confirmPayment({
        elements,
        redirect: "if_required",
        confirmParams: {
          payment_method_data: {
            billing_details: {
              name: customerData.name,
              phone: customerData.phoneNumber,
              email: customerData.email,
            },
          },
        },
      });

      if (error) {
        setPayment({ status: "error" });
        setErrorMessage(error.message ?? "An unknown error occurred");
      } else if (paymentIntent) {
        setPayment(paymentIntent);
      }

      if (!error) {
        const res = await fetch("/api/booking", {
          body: JSON.stringify({
            ...submissionData,
            includeDelivery,
            ...customerData,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        });
        const { bookingError } = await res.json();

        if (bookingError) {
          console.error(bookingError);
          setFieldError(fieldError);
          setSubmitting(false);
          return;
        }
        useEventTracking("booking", {
          vehicle: customerData.vehicle,
        });
        setSuccess(true);
        setSubmitting(false);
      }
      const leadDoc = doc(
        db,
        "leads",
        `${customerData.email}:${customerData.vehicle.year}:${customerData.vehicle.model}`
      );

      try {
        await updateDoc(leadDoc, {
          status: "completed",
        });
      } catch (e) {
        console.error(e);
      }
    } catch (err) {
      console.log(err);
    }
    if (response.statusCode === 500) {
      setPayment({ status: "error" });
      setErrorMessage(response.message);
      return;
    }
  };

  const getTwelveHourTime = (time) => {
    const suffix = parseInt(time) <= 12 ? "AM" : "PM";
    const hours = parseInt(time) <= 12 ? parseInt(time) : parseInt(time) - 12;
    const twelveTime = `${hours}:${time.split(":")[1]} ${suffix}`;
    return twelveTime;
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="checkout-form">
        <fieldset className="elements-style mb-5">
          {" "}
          <section className="booking_sub-nav-header--back">
            <button
              className="booking_sub-nav_header-button"
              onClick={goBack}
              type="button"
            >
              <img src="/img/back-icon.svg" className="checkout-back-button" />{" "}
              Back
            </button>
          </section>
          <section className="checkout-form_fields">
            {success ? (
              <section className="reservation-complete">
                <section className="reservation-complete_success-message">
                  <header className="reservation-complete_success-header">
                    <img src="/img/green-check.svg" />
                    <h2 className="reservation-complete_header">
                      Reservation Complete
                    </h2>
                    <p className="reservation-complete_subheader">
                      A receipt for this transaction has been sent via email for
                      your records
                    </p>
                  </header>
                </section>
              </section>
            ) : (
              <></>
            )}
            <section>
              <h5 className="checkout-form_summary_vehicle">{`${customerData.vehicle.year} ${customerData.vehicle.make} ${customerData.vehicle.model} Rental`}</h5>
              {customerData.type === "self" ? (
                <small className="checkout-form_summary_vehicle--small">{`${moment(
                  customerData.startDate
                ).format("M/D/YYYY")} ${getTwelveHourTime(
                  customerData.startTime
                )} - ${moment(customerData.endDate).format(
                  "M/D/YYYY"
                )} ${getTwelveHourTime(customerData.endTime)}`}</small>
              ) : (
                <small className="checkout-form_summary_vehicle--small">{`${new Date(
                  customerData.startDate
                ).toLocaleDateString("en-us")} ${getTwelveHourTime(
                  customerData.startTime
                )} - ${getTwelveHourTime(customerData.endTime)}`}</small>
              )}
              <article className="checkout-form_summary_line-item">
                <p className="checkout-form_summary_line-item_title">
                  Daily Rate
                </p>
                {customerData.type === "self" ? (
                  <p className="checkout-form_summary_line-item_value">
                    ${customerData.vehicle.rentalCost.day}
                  </p>
                ) : customerData.type === "chauffeured" ? (
                  <p className="checkout-form_summary_line-item_value">
                    ${customerData.vehicle.rentalCost.chauffeured}
                  </p>
                ) : (
                  <p className="checkout-form_summary_line-item_value">
                    ${customerData.vehicle.rentalCost.commercial}
                  </p>
                )}
              </article>
              <article className="checkout-form_summary_line-item">
                <p className="checkout-form_summary_line-item_title">
                  Duration
                </p>
                {customerData.type === "self" ? (
                  <p className="checkout-form_summary_line-item_value">
                    {customerData.totalDays}
                  </p>
                ) : (
                  <p className="checkout-form_summary_line-item_value">
                    {customerData.totalHours}
                  </p>
                )}
              </article>
              <article className="checkout-form_summary_line-item">
                <p className="checkout-form_summary_line-item_title">
                  Booking Total
                </p>
                <p className="checkout-form_summary_line-item_value">
                  {customerData.type === "self" ? (
                    <>
                      $
                      {customerData.totalDays *
                        customerData.vehicle.rentalCost.day}
                    </>
                  ) : customerData.type === "chauffeured" ? (
                    <>
                      $
                      {customerData.totalHours *
                        customerData.vehicle.rentalCost.chauffeured}
                    </>
                  ) : (
                    <>
                      $
                      {customerData.totalHours *
                        customerData.vehicle.rentalCost.commercial}
                    </>
                  )}
                </p>
              </article>
              <article className="checkout-form_summary_line-item">
                <p className="checkout-form_summary_line-item_title">
                  Reservation Deposit
                </p>
                <p className="checkout-form_summary_line-item_value">{`-${formatAmountForDisplay(
                  50,
                  "USD"
                )}`}</p>
              </article>
              <article className="checkout-form_summary_subtotal">
                <p className="checkout-form_summary_line-item_title">
                  Total Due Upon Pickup or Deliver
                </p>
                <p className="checkout-form_summary_line-item_value">
                  {customerData.type === "self" ? (
                    <>
                      $
                      {customerData.totalDays *
                        customerData.vehicle.rentalCost.day -
                        50}
                    </>
                  ) : customerData.type === "chauffeured" ? (
                    <>
                      $
                      {customerData.totalHours *
                        customerData.vehicle.rentalCost.chauffeured -
                        50}
                    </>
                  ) : (
                    <>
                      $
                      {customerData.totalHours *
                        customerData.vehicle.rentalCost.commercial -
                        50}
                    </>
                  )}
                </p>
              </article>
              <article className="checkout-form_summary_total">
                <p className="checkout-form_summary_total_title">
                  Total Due Today
                </p>
                <p className="checkout-form_summary_total_value">
                  {formatAmountForDisplay(50, "USD")}
                </p>
              </article>
            </section>
            {!success && (
              <div className="FormRow elements-style">
                <PaymentElement
                  options={{
                    layout: "accordion",
                  }}
                  onChange={(e) => {
                    setPaymentType(e.value.type);
                  }}
                />
              </div>
            )}
          </section>
        </fieldset>
        {!success ? (
          <button
            className={`checkout-form_button${
              payment.status === "error" ? "--form-error" : ""
            }`}
            type="submit"
            disabled={
              !["initial", "succeeded", "error"].includes(payment.status) ||
              !stripe
            }
          >
            Submit Deposit {formatAmountForDisplay(50, "USD")}
          </button>
        ) : (
          <section className="confirmation_pickup">
            <h2>Pickup Instructions</h2>
            <p>
              On the day of your reservation, you'll need to complete some
              additional paperwork and payment when you arrive to pick up your
              rental vehicle.
            </p>
            <p>
              The pickup address is:
              <br />
              1331 Saline Street
              <br />
              North Kansas City, MO 64116
            </p>
            <p>
              When you arrive pull into the first driveway and continue straight
              back until you reach the loading docks and ramp on the left. The
              office is located just to the right of the garage door and ramp,
              and you can park in front of it.
              <br />
              <br />
              Please remember to bring the following documents with you:
              <br />
              <br />
              <ul>
                <li>A valid driver's license</li>
                <li>A valid credit card (not debit)</li>
                <li>Proof of insurance</li>
              </ul>
            </p>
            <p>
              When you arrive, we'll do a quick walk-around of the vehicle to
              note any current flaws with both the interior and exterior. If
              your rental vehicle has a manual transmission, we may ask you to
              perform a small driving test to ensure you're comfortable driving
              a stick shift.
            </p>
            <h2>Return Instructions</h2>
            <p>
              To return your rental vehicle, simply bring it back to the same
              location where you picked it up at the agreed upon date and time.
              We'll conduct a final walk-around inspection to ensure that the
              vehicle is in the same condition as when you first received it.
              Additionally, please ensure that the vehicle has the same amount
              of gas in the tank as it did when you picked it up. This will help
              us ensure that the next renter receives the vehicle in the same
              condition as you did.
            </p>
            <h2>Delivery</h2>
            <p>
              We offer delivery services within a 25 mile radius of downtown
              Kansas City. Delivery cost $2.00 per mile with a $100 minimum.
              Payment will be made upon delivery.
              <br />
              <br />
              To schedule delivery call: 816-200-1163
            </p>
            <h2>Have Questions?</h2>
            <p>Give us a call at 816-200-1163 or email us at hello@rndkc.com</p>
          </section>
        )}
      </form>
    </>
  );
};
