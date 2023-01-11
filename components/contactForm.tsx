import { SyntheticEvent, useState } from "react";

export const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({ name: "", email: "", message: "" });
  const [buttonText, setButtonText] = useState("Send Message");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleValidation = () => {
    let tempErrors = {};
    let isValid = true;

    if (name.length <= 0) {
      tempErrors["name"] = true;
      isValid = false;
    }
    if (email.length <= 0) {
      tempErrors["email"] = true;
      isValid = false;
    }
    if (message.length <= 0) {
      tempErrors["message"] = true;
      isValid = false;
    }

    setErrors({ ...tempErrors });
    console.log("errosr", errors);
    return isValid;
  };

  const contact = async (e: SyntheticEvent) => {
    e.preventDefault();
    let isValidForm = handleValidation();

    if (isValidForm) {
      setButtonText("Sending");
      const res = await fetch("/api/contact", {
        body: JSON.stringify({
          email,
          name,
          message,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const { error } = await res.json();
      if (error) {
        console.log(error);
        setShowSuccessMessage(false);
        setShowErrorMessage(true);
        setButtonText("Send");
        return;
      }
      setShowSuccessMessage(true);
      setShowErrorMessage(false);
      setButtonText("Send");
    }
  };

  return (
    <form onSubmit={contact} className="contactForm">
      <input
        type="name"
        id="name-input"
        name="name"
        placeholder="Name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setErrors({ ...errors, name: "" });
        }}
        required
        autoCapitalize="off"
        autoCorrect="off"
        className={`contactForm-name ${
          errors?.name && "contactForm-input--error"
        }`}
      />
      {errors?.name && (
        <p className="contactForm-errorText">Name cannot be empty.</p>
      )}
      <input
        type="email"
        id="email-input"
        name="email"
        placeholder="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setErrors({ ...errors, email: "" });
        }}
        required
        autoCapitalize="off"
        autoCorrect="off"
        className={`contactForm-email ${
          errors?.email && "contactForm-input--error"
        }`}
      />
      {errors?.email && (
        <p className="contactForm-errorText">Email cannot be empty.</p>
      )}
      <textarea
        placeholder="Message"
        className={`contactForm-message ${
          errors?.message && "contactForm-input--error"
        }`}
        onChange={(e) => {
          setMessage(e.target.value);
          setErrors({ ...errors, message: "" });
        }}
        value={message}
      ></textarea>
      {errors?.message && (
        <p className="contactForm-errorText">Message cannot be empty.</p>
      )}
      <button type="submit" onClick={contact} className="contactForm-button">
        {buttonText}
      </button>
      {showErrorMessage && (
        <p className="contactForm-errorMessage">
          Something went wrong, please try again.
        </p>
      )}
      {showSuccessMessage && (
        <p className="contactForm-successMessage">Awesome, we'll be in touch</p>
      )}
    </form>
  );
};
