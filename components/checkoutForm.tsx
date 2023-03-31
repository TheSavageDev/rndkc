import React, { useState, FC, Dispatch, SetStateAction } from "react";
import { fetchPostJSON } from "../utils/api-helpers";
import {
  formatAmountForDisplay,
  formatAmountFromStripe,
} from "../utils/stripe-helpers";
import * as config from "../config";

import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { PaymentIntent } from "@stripe/stripe-js";
import { CustomerData, FieldError, SubmissionData } from "./bookingForm";

type CheckoutFormProps = {
  paymentIntent?: PaymentIntent | null;
  customerData: CustomerData;
  fieldError: FieldError;
  submissionData: SubmissionData;
  setSubmitting: Dispatch<SetStateAction<boolean>>;
  setFieldError: Dispatch<SetStateAction<FieldError>>;
  setButtonText: Dispatch<SetStateAction<string>>;
  setSuccess: Dispatch<SetStateAction<boolean>>;
};

export const CheckoutForm: FC<CheckoutFormProps> = ({
  paymentIntent = null,
  customerData,
  submissionData,
  fieldError,
  setSubmitting,
  setFieldError,
  setButtonText,
  setSuccess,
}) => {
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
      amount: customerData.vehicle.rentalCost.day * customerData.totalDays,
      payment_intent_id: paymentIntent?.id,
    });
    setPayment(response);
    try {
      const res = await fetch("/api/booking", {
        body: JSON.stringify(submissionData),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      const { error } = await res.json();

      if (error) {
        console.error(error);
        setFieldError(fieldError);
        setButtonText("Begin Booking");
        setSubmitting(false);
        return;
      }
      // useEventTracking("booking", {
      //   vehicle,
      // });
      setSubmitting(false);
    } catch (err) {
      console.log(err);
    }
    console.log(response);
    if (response.statusCode === 500) {
      setPayment({ status: "error" });
      setErrorMessage(response.message);
      return;
    }

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

    if (error) {
      setPayment({ status: "error" });
      setErrorMessage(error.message ?? "An unknown error occurred");
    } else if (paymentIntent) {
      setSuccess(true);
      setPayment(paymentIntent);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col pl-4 pr-4">
        <fieldset className="elements-style mb-5">
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
        </fieldset>
        <button
          className={`booking_information-form-button${
            !["initial", "succeeded", "error"].includes(payment.status) ||
            !stripe
              ? "--form-error"
              : ""
          }`}
          type="submit"
          disabled={
            !["initial", "succeeded", "error"].includes(payment.status) ||
            !stripe
          }
        >
          Submit Payment
        </button>
      </form>
    </>
  );
};
