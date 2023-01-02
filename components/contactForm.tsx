import { SyntheticEvent, useState } from "react";
import axios from "axios";
import * as ga from "../lib/ga";

export const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState("idle");
  const [errorMessage, setErrorMessage] = useState(null);

  const contact = async (e: SyntheticEvent) => {
    e.preventDefault();
    setState("loading");

    try {
      await axios.post("/api/contact", { email, name, message });
      setState("Success");
      setEmail("");
      ga.event({
        action: "contact",
        params: {
          name,
          email,
          message,
        },
      });
    } catch (e) {
      setErrorMessage(e.response.data.error);
      setState("Error");
    }
  };

  return (
    <form
      onSubmit={contact}
      className="flex flex-col justify-between space-y-3 w-full"
    >
      <input
        type="name"
        id="name-input"
        name="name"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        autoCapitalize="off"
        autoCorrect="off"
        className="mt-4 px-4 py-2 rounded font-normal font-akshar text-black"
      />
      <input
        type="email"
        id="email-input"
        name="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoCapitalize="off"
        autoCorrect="off"
        className="mt-4 px-4 py-2 rounded font-normal font-akshar text-black"
      />
      <textarea
        placeholder="Message"
        className="mt-4 px-4 py-2 rounded font-normal font-akshar text-black h-40"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      ></textarea>
      <button
        type="submit"
        disabled={state === "Loading"}
        onClick={contact}
        className="border uppercase font-normal font-akshar text-sm text-white border-black px-4 py-2 bg-accent rounded hover:bg-secondary hover:text-white hover:border-secondary"
      >
        Send Message
      </button>
      {state === "Error" && <p>{errorMessage}</p>}
      {state === "Success" && <p>Awesome, we'll be in touch</p>}
    </form>
  );
};
