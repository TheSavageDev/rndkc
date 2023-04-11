import React, { useState, FC, Dispatch, SetStateAction } from "react";
import { fetchPostJSON } from "../utils/api-helpers";
import { formatAmountForDisplay } from "../utils/stripe-helpers";

import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { PaymentIntent } from "@stripe/stripe-js";
import { CustomerData, FieldError, SubmissionData } from "./bookingForm";
import { useEventTracking } from "../hooks/useEventTracking";
import { useRouter } from "next/router";

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
}) => {
  const goBack = () => {
    fetchPostJSON("/api/paymentIntent", {
      amount: 50,
      payment_intent_id: paymentIntent.id,
      cancel: true,
    }).then(() => setPaymentIntent(null));
  };
  const [paymentType, setPaymentType] = useState("");
  const [payment, setPayment] = useState({ status: "initial" });
  const [errorMessage, setErrorMessage] = useState("");
  const [includeDelivery, setIncludeDelivery] = useState(false);
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
    });
    setPayment(response);
    try {
      // Use your card Element with other Stripe.js APIs
      const { error } = await stripe!.confirmPayment({
        elements,
        redirect: "if_required",
        confirmParams: {
          // return_url: `http://localhost:3000/car/${customerData.vin}`,
          payment_method_data: {
            billing_details: {
              name: customerData.name,
              phone: customerData.phoneNumber,
              email: customerData.email,
            },
          },
        },
      });

      setSuccess(true);

      if (error) {
        setPayment({ status: "error" });
        setErrorMessage(error.message ?? "An unknown error occurred");
      } else if (paymentIntent) {
        setPayment(paymentIntent);
      }

      if (!error) {
        const res = await fetch("/api/booking", {
          body: JSON.stringify({ ...submissionData, includeDelivery }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        });
        const { bokingError } = await res.json();

        if (bokingError) {
          console.error(bokingError);
          setFieldError(fieldError);
          setSubmitting(false);
          return;
        }
        useEventTracking("booking", {
          vehicle: customerData.vehicle,
        });
        setSubmitting(false);
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
          <section className="booking_sub-nav-header">
            <button
              className="booking_sub-nav_header-button"
              onClick={goBack}
              type="button"
            >
              <article className="booking_sub-nav_buttons">
                <img
                  src="/img/back-icon.svg"
                  className="checkout-back-button"
                />{" "}
                Back
              </article>
            </button>
          </section>
          <section className="checkout-form_fields">
            <h4 className="checkout-form_payment-method_header">
              Payment Method
            </h4>
            <section>
              <h5 className="checkout-form_payment-method_subheading">
                Debit cards are not accepted.{" "}
              </h5>
              <p className="checkout-form_payment-method_text">
                A temporary hold of $50 will be placed on your credit card to
                hold your reservation. Final payment will be made day of pickup
                or delivery.
              </p>
            </section>
            {customerData.type === "self" && (
              <>
                <h4 className="checkout-form_delivery">Delivery</h4>
                <label className="checkout-form_delivery-label">
                  <input
                    type="checkbox"
                    name="delivery"
                    id="delivery"
                    className="checkout-form_delivery-checkbox"
                    onClick={(e) => {
                      const { target } = e;
                      setIncludeDelivery((target as HTMLInputElement).checked);
                    }}
                  />
                  Include Delivery
                  <img
                    src="/img/question-icon.svg"
                    className="checkout-form_delivery-icon"
                  />
                </label>
                {includeDelivery && (
                  <p className="checkout-form_delivery_info">
                    Delivery cost $2.00 per mile with a $100 minimum. Maximum of
                    25 miles from downtown Kansas City. Delivery fee wil be
                    separate from rental booking. A representative will contact
                    you to arrange delivery.
                  </p>
                )}
              </>
            )}
            <h4 className="checkout-form_summary_header">Summary</h4>
            <section>
              <h5 className="checkout-form_summary_vehicle">{`${customerData.vehicle.year} ${customerData.vehicle.make} ${customerData.vehicle.model} Rental`}</h5>
              {customerData.type === "self" ? (
                <small className="checkout-form_summary_vehicle--small">{`${new Date(
                  customerData.startDate
                ).toLocaleDateString("en-us")} ${getTwelveHourTime(
                  customerData.startTime
                )} - ${new Date(customerData.endDate).toLocaleDateString(
                  "en-us"
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
          </section>
        </fieldset>
        <button
          className={`checkout-form_button${
            payment.status === "error"
              ? "--form-error"
              : payment.status === "initial"
              ? "--disabled"
              : ""
          }`}
          type="submit"
          disabled={
            !["initial", "succeeded", "error"].includes(payment.status) ||
            !stripe
          }
        >
          Submit Deposit {formatAmountForDisplay(50, "USD")}
        </button>
      </form>
    </>
  );
};
