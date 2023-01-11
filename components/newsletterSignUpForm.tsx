import { SyntheticEvent, useState } from "react";

export const NewsLetterSignUpForm = ({ justify }) => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ email?: string }>({ email: "" });
  const [buttonText, setButtonText] = useState("Notify Me");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleValidation = () => {
    let tempErrors = {};
    let isValid = true;

    if (email.length <= 0) {
      tempErrors["email"] = true;
      isValid = false;
    }

    setErrors({ ...tempErrors });
    console.log("error", errors);
    return isValid;
  };

  const subscribe = async (e: SyntheticEvent) => {
    e.preventDefault();
    let isValidForm = handleValidation();

    if (isValidForm) {
      setShowErrorMessage(false);
      setShowSuccessMessage(false);
      setButtonText("Subscribing");
      const res = await fetch("/api/subscribeUser", {
        body: JSON.stringify({
          email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const { error } = await res.json();

      if (error) {
        console.error(error);
        setShowSuccessMessage(false);
        setShowErrorMessage(true);
        setButtonText("Send");
        return;
      }
      setShowSuccessMessage(true);
      setShowErrorMessage(false);
      setButtonText("Send");

      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
    }
  };

  return (
    <>
      {errors?.email && (
        <p className="contactForm-errorText">Email cannot be empty.</p>
      )}
      {showErrorMessage && (
        <p className="contactForm-errorMessage">
          Something went wrong, please try again.
        </p>
      )}
      {showSuccessMessage && (
        <p className="contactForm-successMessage">Awesome, we'll be in touch</p>
      )}
      <form onSubmit={subscribe} className={`newsletter-signup`}>
        <input
          type="email"
          id="email-input"
          name="email"
          placeholder="Enter Your Email Address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors({ ...errors, email: "" });
          }}
          required
          autoCapitalize="off"
          autoCorrect="off"
          className="newsletter-signup-email"
        />
        <input
          type="email"
          id="email-input"
          name="email"
          placeholder="Enter email to stay updated on inventory & special event"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors({ ...errors, email: "" });
          }}
          required
          autoCapitalize="off"
          autoCorrect="off"
          className="newsletter-signup-email--alt"
        />
        <button
          type="submit"
          onClick={subscribe}
          className="newsletter-signup-button"
        >
          {buttonText}
        </button>
      </form>
    </>
  );
};
