import { SyntheticEvent, useState } from "react";

export const NewsLetterSignUpForm = ({
  justify,
  text,
}: {
  justify?: string;
  text?: string;
}) => {
  const [data, setData] = useState({
    email: "",
  });
  const [errors, setErrors] = useState<{ email?: string }>({ email: "" });
  const [buttonText, setButtonText] = useState(text ? text : "Sign Up");
  const [subscribed, setSubscribed] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleValidation = () => {
    let tempErrors = {};
    let isValid = true;

    if (data.email.length <= 0) {
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
          email: data.email,
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
        setButtonText("That's not a valid email");
        return;
      }
      setSuccess(true);
      setError(false);
      setSubscribed(true);
      setButtonText("We'll Keep You Updated!");
      setData({ email: "" });

      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    }
  };

  const handleChange = (e) => {
    setError(false);
    setSuccess(false);
    setSubscribed(false);
    setButtonText("Notify Me");
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <>
      <form onSubmit={subscribe} className="newsletter-signup">
        <input
          type="email"
          name="email"
          placeholder="Enter Your Email"
          id="email"
          value={data.email}
          onChange={(e) => {
            handleChange(e);
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
        <button
          type="submit"
          onClick={subscribe}
          disabled={subscribed}
          className={`newsletter-signup-button${error ? "--error" : ""}${
            subscribed ? "--success" : ""
          }`}
        >
          {buttonText}
        </button>
      </form>
    </>
  );
};
