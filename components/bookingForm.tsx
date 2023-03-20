import { useState } from "react";
import { useEventTracking } from "../hooks/useEventTracking";
import { TimeSelect } from "./timeSelect";
import { fetchPostJSON } from "../utils/api-helpers";

export const BookingForm = ({ vehicle, setPaymentIntent }) => {
  const initialButtonText =
    vehicle.rentalStatus === "D"
      ? "Begin Booking"
      : "Email Me When It's Available";
  const [success, setSuccess] = useState(false);
  const [formError, setFormError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [buttonText, setButtonText] = useState(initialButtonText);
  const [data, setData] = useState({
    name: "",
    email: "",
    startDate: "",
    startTime: "10:00",
    endDate: "",
    endTime: "10:00",
    totalDays: 0,
    phoneNumber: "",
    vin: vehicle.vin,
    vehicle,
  });
  const [tab, setTab] = useState<"self" | "chauffeured" | "commercial">("self");
  const [booking, setBooking] = useState(false);

  const handleTabChange = (tabName) => {
    setTab(tabName);
  };

  const handleBeginBooking = () => {
    setButtonText("Continue to Payment");
    setBooking(true);
  };

  const handleChange = (e) => {
    setFormError(false);
    setButtonText(initialButtonText);
    if (["startDate", "endDate"].includes(e.target.id)) {
      let totalDays: number;
      if (data.startDate.length !== 0 && e.target.id === "endDate") {
        const differenceInTime =
          new Date(e.target.value).getTime() -
          new Date(data.startDate).getTime();
        totalDays = differenceInTime / (1000 * 3600 * 24);
        setData({
          ...data,
          totalDays,
          [e.target.id]: e.target.value,
        });
      } else if (data.endDate.length !== 0 && e.target.id === "startDate") {
        const differenceInTime =
          new Date(data.endDate).getTime() - new Date(e.target.value).getTime();
        totalDays = differenceInTime / (1000 * 3600 * 24);
        setData({
          ...data,
          totalDays,
          [e.target.id]: e.target.value,
        });
      } else {
        setData({
          ...data,
          [e.target.id]: e.target.value,
        });
      }
    } else {
      setData({
        ...data,
        [e.target.id]: e.target.value,
      });
    }
  };

  const encodedDate = (date) =>
    encodeURIComponent(
      new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    );

  const encodedTime = (time) => encodeURIComponent(time);

  const handleSubmit = async () => {
    fetchPostJSON("/api/paymentIntent", {
      amount: vehicle?.rentalCost?.day * data.totalDays,
    }).then((data) => {
      setPaymentIntent(data);
    });
    // fetch('/api/paymentIntent', {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json"},
    //   body: JSON.stringify({ booking: {
    //     vehicle,
    //     cost: vehicle?.rentalCost?.day * data.totalDays,
    //   }})
    // }).then((res) => res.json()).then((data) => setClientSecret(data.clientSecret))
    setSubmitting(true);
    if (
      data.email &&
      data.name &&
      data.startDate &&
      data.startTime &&
      data.endDate &&
      data.endTime
    ) {
      // const res = await fetch("/api/booking", {
      //   body: JSON.stringify(data),
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   method: "POST",
      // });

      // const { error } = await res.json();

      // if (error) {
      //   console.error(error);
      //   setButtonText("Sign Up");
      //   setSubmitting(false);
      //   return;
      // }
      // useEventTracking("booking", {
      //   vehicle,
      // });

      // window.open(
      //   `${vehicle.turoLink}?endDate=${encodedDate(
      //     data.endDate
      //   )}&endTime=${encodedTime(data.endTime)}&startDate=${encodedDate(
      //     data.startDate
      //   )}&startTime=${encodedTime(data.startTime)}`,
      //   "_blank"
      // );
      setSubmitting(false);
    } else {
      setSubmitting(false);
      setFormError(true);
      setButtonText("Please Fill out All Fields");
    }
  };

  return (
    <section className="booking_information-form">
      <section className="booking_information-form-tabs">
        <article
          className={`booking_information-form-tab${
            tab === "self" ? "--active" : ""
          }`}
          onClick={() => handleTabChange("self")}
        >
          <img
            src={
              tab === "self"
                ? "/img/gear_icon_dark.svg"
                : "/img/gear_icon_big.svg"
            }
          />
          <p>Self Drive</p>
        </article>
        <article
          className={`booking_information-form-tab${
            tab === "chauffeured" ? "--active" : ""
          }`}
          onClick={() => handleTabChange("chauffeured")}
        >
          <img
            src={
              tab === "chauffeured"
                ? "/img/chauffeured_icon_dark.svg"
                : "/img/chauffeured_icon.svg"
            }
          />
          <p>Chauffeured</p>
        </article>
        <article
          className={`booking_information-form-tab${
            tab === "commercial" ? "--active" : ""
          }`}
          onClick={() => handleTabChange("commercial")}
        >
          <img
            src={
              tab === "commercial"
                ? "/img/camera_icon_dark.svg"
                : "/img/camera_icon.svg"
            }
          />
          <p>Commercial</p>
        </article>
      </section>
      <section className="booking_information-form-dates_container">
        <section className="booking_information-form-date">
          <label className="booking_information-form-input-label">
            Start Date
          </label>
          <section className="booking_information-form-date_inputs">
            <input
              className={`booking_information-form-input--date${
                formError && data.startDate.length === 0 ? "--error" : ""
              }`}
              type="date"
              onChange={handleChange}
              value={data.startDate}
              id="startDate"
              required
            />
            <TimeSelect
              id="startTime"
              handleChange={handleChange}
              formError={formError}
              isFilled={data.startTime.length === 0}
            />
          </section>
        </section>
        <section className="booking_information-form-date">
          <label className="booking_information-form-input-label">
            End Date
          </label>
          <section className="booking_information-form-date_inputs">
            <input
              className={`booking_information-form-input--date${
                formError && data.endDate.length === 0 ? "--error" : ""
              }`}
              type="date"
              onChange={handleChange}
              value={data.endDate}
              id="endDate"
              required
            />
            <TimeSelect
              id="endTime"
              handleChange={handleChange}
              formError={formError}
              isFilled={data.endTime.length === 0}
            />
          </section>
        </section>
      </section>

      <article className="booking_information-form_pricing">
        <h2 className="booking_information-form_pricing-text">
          ${vehicle?.rentalCost?.day} Day
        </h2>
        <h2 className="booking_information-form_pricing-text--sub">
          {data.totalDays !== 0 &&
            `${data.totalDays} Days for $${
              vehicle?.rentalCost?.day * data.totalDays
            } Total`}
        </h2>
      </article>

      {booking && (
        <section className="booking_information-form_contact">
          <label className="booking_information-form-input-label">Name</label>
          <input
            className={`booking_information-form-input${
              formError && data.name.length === 0 ? "--error" : ""
            }`}
            placeholder="Enter Full Name"
            onChange={handleChange}
            value={data.name}
            id="name"
            required
            type="text"
          />
          <label className="booking_information-form-input-label">
            Email Address
          </label>
          <input
            className={`booking_information-form-input${
              formError && data.email.length === 0 ? "--error" : ""
            }`}
            placeholder="Enter Email Address"
            onChange={handleChange}
            value={data.email}
            id="email"
            required
            type="email"
          />
          <label className="booking_information-form-input-label">
            Phone Number
          </label>
          <input
            className={`booking_information-form-input${
              formError && data.email.length === 0 ? "--error" : ""
            }`}
            placeholder="Enter Phone Number"
            onChange={handleChange}
            value={data.phoneNumber}
            id="phoneNumber"
            required
            type="tel"
          />
        </section>
      )}

      <section className="booking_information-form-button_container">
        <button
          className={`booking_information-form-button${
            formError ? "--form-error" : ""
          }${submitting ? "--submitting" : ""}`}
          onClick={booking ? handleSubmit : handleBeginBooking}
          disabled={submitting || success}
        >
          {buttonText}
        </button>
      </section>
    </section>
  );
};
