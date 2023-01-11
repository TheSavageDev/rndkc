import { SyntheticEvent, useState } from "react";
import axios from "axios";
import * as ga from "../lib/ga";

export const NewsLetterSignUpForm = ({ justify }) => {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle");
  const [errorMessage, setErrorMessage] = useState(null);

  const subscribe = async (e: SyntheticEvent) => {
    e.preventDefault();
    setState("loading");

    try {
      await axios.post("/api/subscribeUser", { email });
      setState("Success");
      setEmail("");
      ga.event({
        action: "subscribe",
        params: {
          email,
        },
      });
    } catch (e) {
      setState("Error");
    }
  };

  return (
    <form onSubmit={subscribe} className={`newsletter-signup`}>
      <input
        type="email"
        id="email-input"
        name="email"
        placeholder="Enter Your Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
        onChange={(e) => setEmail(e.target.value)}
        required
        autoCapitalize="off"
        autoCorrect="off"
        className="newsletter-signup-email--alt"
      />
      <button
        type="submit"
        disabled={state === "Loading"}
        onClick={subscribe}
        className="newsletter-signup-button"
      >
        Notify Me
      </button>
      {state === "Error" && <p>{errorMessage}</p>}
      {state === "Success" && <p>Awesome, you've been subscribed</p>}
    </form>
  );
};
