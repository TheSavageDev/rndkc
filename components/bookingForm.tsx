import { useRouter } from "next/router";
import { useState } from "react";

export const BookingForm = ({ vehicle, driveShare }) => {
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const [formError, setFormError] = useState(false);
  const [buttonText, setButtonText] = useState("Begin Booking");
  const [data, setData] = useState({
    name: "",
    email: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    vin: vehicle.vin,
  });

  const handleChange = (e) => {
    setFormError(false);
    setButtonText("Email Me When It's Available");
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
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
          className="booking_information-form-input"
          placeholder="Enter Full Name"
          onChange={handleChange}
          value={data.name}
          id="name"
        />
        <label className="booking_information-form-input-label">
          Email Address
        </label>
        <input
          className="booking_information-form-input"
          placeholder="Enter Email Address"
          onChange={handleChange}
          value={data.email}
          id="email"
        />
      </section>
      <section className="booking_information-form-dates_container">
        <section className="booking_information-form-date">
          <label className="booking_information-form-input-label">
            Start Date
          </label>
          <section className="booking_information-form-date_inputs">
            <input
              className="booking_information-form-input"
              placeholder="Enter Email Address"
              type="date"
              onChange={handleChange}
              value={data.startDate}
              id="startDate"
            />
            <input
              className="booking_information-form-input"
              placeholder="Enter Email Address"
              type="time"
              onChange={handleChange}
              value={data.startTime}
              id="startTime"
            />
          </section>
        </section>
        <section className="booking_information-form-date">
          <label className="booking_information-form-input-label">
            End Date
          </label>
          <section className="booking_information-form-date_inputs">
            <input
              className="booking_information-form-input"
              placeholder="Enter Email Address"
              type="date"
              onChange={handleChange}
              value={data.endDate}
              id="endDate"
            />
            <input
              className="booking_information-form-input"
              placeholder="Enter Email Address"
              type="time"
              onChange={handleChange}
              value={data.endTime}
              id="endTime"
            />
          </section>
        </section>
      </section>
      <article className="booking_information-form_pricing">
        <h2 className="booking_information-form_pricing-text">
          ${vehicle?.rentalCost?.day} Day
        </h2>
        <h2 className="booking_information-form_pricing-text--sub">
          2 Days for $ {vehicle?.rentalCost?.day * 2} Total
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
