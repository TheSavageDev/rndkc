import { useState } from "react";
import axios from "axios";
import * as ga from "../lib/ga";

export const NewsLetterSignUpForm = () => {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle");
  const [errorMessage, setErrorMessage] = useState(null);

  const subscribe = async (e) => {
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
      setErrorMessage(e.response.data.error);
      setState("Error");
    }
  };

  return (
    <form
      onSubmit={subscribe}
      className="flex flex-col justify-between space-y-3 w-full"
    >
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
        className="mt-4 px-4 py-2 rounded font-thin text-black"
      />
      <button
        type="submit"
        disabled={state === "Loading"}
        onClick={subscribe}
        className="border uppercase font-normal text-md text-white border-black px-4 py-2 bg-accent rounded hover:bg-secondary hover:text-white hover:border-secondary"
      >
        Notify Me
      </button>
      {state === "Error" && <p>{errorMessage}</p>}
      {state === "Success" && <p>Awesome, you've been subscribed</p>}
    </form>
  );
};