import { useState } from "react";

export const AvailabilitySignUp = ({ vin }) => {
  const [success, setSuccess] = useState(false);
  const [formError, setFormError] = useState(false);
  const [buttonText, setButtonText] = useState("Email Me When It's Available");
  const [data, setData] = useState({
    email: "",
    vin,
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
    if (data.email) {
      const res = await fetch("/api/subscribeToAvailability", {
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
      setButtonText("We'll Keep You Updated!");
    } else {
      setFormError(true);
      setButtonText("Enter a Valid Email");
    }
  };

  return (
    <section className="booking_information-form">
      <label className="booking_information-form-input-label">
        Email Address
      </label>
      <input
        className="booking_information-form-input"
        placeholder="Enter Email Address"
        id="email"
        value={data.email}
        onChange={handleChange}
      />
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
