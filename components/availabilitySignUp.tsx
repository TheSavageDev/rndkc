import { useState } from "react";
import { useEventTracking } from "../hooks/useEventTracking";

export const AvailabilitySignUp = ({ vin }) => {
  const [success, setSuccess] = useState(false);
  const [formError, setFormError] = useState(false);
  const [buttonText, setButtonText] = useState("Email Me When It's Available");
  const [data, setData] = useState({
    fullName: "",
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
      useEventTracking("availabilitySignUp", {
        vehicle: vin,
      });
      setSuccess(true);
      setButtonText("We'll Keep You Updated!");
    } else {
      setFormError(true);
      setButtonText("Check that all forms are filled correctly");
    }
  };

  return (
    <section className="availability-form">
      <label className="availability-form-input-label">Name</label>
      <input
        className="availability-form-input"
        placeholder="Enter Full Name"
        id="fullName"
        value={data.fullName}
        onChange={handleChange}
      />
      <label className="availability-form-input-label">Email Address</label>
      <input
        className="availability-form-input"
        placeholder="Enter Email Address"
        id="email"
        value={data.email}
        onChange={handleChange}
      />
      <button
        className={`availability-form-button${formError ? "--form-error" : ""}`}
        onClick={handleSubmit}
        disabled={success}
      >
        {buttonText}
      </button>
    </section>
  );
};
