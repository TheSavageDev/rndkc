import { SyntheticEvent, useState } from "react";

export const NewsLetterSignUpForm = ({
  justify,
  text,
}: {
  justify?: string;
  text?: string;
}) => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ email?: string }>({ email: "" });
  const [buttonText, setButtonText] = useState(text ? text : "Sign Up");
  const [subscribed, setSubscribed] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

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
      setError(false);
      setSuccess(false);
      setButtonText("Signing Up...");
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
        setSuccess(false);
        setError(true);
        setButtonText("Notify Me");
        setMessage("That's not a valid email");
        return;
      }
      setSuccess(true);
      setError(false);
      setSubscribed(true);
      setButtonText("We'll Keep You Updated!");
      setMessage("Thanks!");
      setEmail("");

      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    }
  };

  return (
    <>
      <form onSubmit={subscribe} className={`newsletter-signup`}>
        <input
          type="email"
          id="email-input"
          name="email"
          placeholder="Enter Your Email"
          value={success || error ? message : email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors({ ...errors, email: "" });
          }}
          required
          disabled={subscribed}
          autoCapitalize="off"
          autoCorrect="off"
          className={`newsletter-signup-email ${
            subscribed ? "newsletter-signup-email--disabled" : ""
          } ${success ? "newsletter-signup-email--success" : ""} ${
            error ? "newsletter-signup-email--error" : ""
          }`}
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
          disabled={subscribed}
          autoCapitalize="off"
          autoCorrect="off"
          className={`newsletter-signup-email--alt ${
            subscribed ? "newsletter-signup-email--alt--disabled" : ""
          }`}
        />
        <button
          type="submit"
          onClick={subscribe}
          disabled={subscribed}
          className={`newsletter-signup-button ${
            subscribed ? "newsletter-signup-button--disabled" : ""
          }`}
        >
          {buttonText}
        </button>
      </form>
    </>
  );
};
