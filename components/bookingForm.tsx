import { useState } from "react";
import { useEventTracking } from "../hooks/useEventTracking";

export const BookingForm = ({ vehicle, driveShare }) => {
  const initialButtonText =
    vehicle.rentalStatus === "D"
      ? "Begin Booking"
      : "Email Me When It's Available";
  const [success, setSuccess] = useState(false);
  const [formError, setFormError] = useState(false);
  const [buttonText, setButtonText] = useState(initialButtonText);
  const [data, setData] = useState({
    name: "",
    email: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    totalDays: 0,
    vin: vehicle.vin,
  });

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

  const handleSubmit = async () => {
    if (
      data.email &&
      data.name &&
      data.startDate &&
      data.startTime &&
      data.endDate &&
      data.endTime
    ) {
      const res = await fetch("/api/booking", {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const { error } = await res.json();

      if (error) {
        console.error(error);
        setButtonText("Sign Up");
        return;
      }
      useEventTracking("booking", {
        vehicle,
      });
      window.open(`${driveShare}`, "_blank");
    } else {
      setFormError(true);
      setButtonText("Please Fill out All Fields");
    }
  };
  return (
    <section className="booking_information-form">
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
            <input
              className={`booking_information-form-input--time${
                formError && data.startTime.length === 0 ? "--error" : ""
              }`}
              type="time"
              onChange={handleChange}
              value={data.startTime}
              id="startTime"
              required
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
            <input
              className={`booking_information-form-input--time${
                formError && data.endTime.length === 0 ? "--error" : ""
              }`}
              type="time"
              onChange={handleChange}
              value={data.endTime}
              id="endTime"
              step={1800}
              required
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
      <button
        className={`booking_information-form-button${
          formError ? "--form-error" : ""
        }`}
        onClick={handleSubmit}
        disabled={success}
      >
        {buttonText}
      </button>
    </section>
  );
};
