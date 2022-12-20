import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import Countdown from "react-countdown";

import * as ga from "../lib/ga";

function NewsLetterSignUpForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle");
  const [errorMessage, setErrorMessage] = useState(null);

  const subscribe = async (e) => {
    e.preventDefault();
    setState("loading");

    try {
      const response = await axios.post("/api/subscribeUser", { email });
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
    <form onSubmit={subscribe}>
      <>
        <input
          type="email"
          id="email-input"
          name="email"
          placeholder="Enter your email for updates"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoCapitalize="off"
          autoCorrect="off"
          className="mt-4 mb-10 mr-2 px-4 py-2 rounded font-thin text-black"
        />
        <button
          type="submit"
          disabled={state === "Loading"}
          onClick={subscribe}
          className="border-2 border-accent px-4 py-2 bg-accent text-black rounded hover:bg-secondary hover:text-white hover:border-secondary"
        >
          Sign Up
        </button>
        {state === "Error" && <p>{errorMessage}</p>}
        {state === "Success" && <p>Awesome, you've been subscribed</p>}
      </>
    </form>
  );
}

type CountdownRendererProps = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const countdownRenderer = ({
  days,
  hours,
  minutes,
}: CountdownRendererProps) => {
  return (
    <div className="flex items-center justify-center my-8 w-full px-2">
      <div className="flex flex-col items-center mx-2 md:mx-20">
        <p className="text-3xl font-thin mb-2">Days</p>
        <p className="text-6xl">{days}</p>
      </div>
      <div className="self-end pb-3 mx-4">
        <p className="text-3xl font-thin">:</p>
      </div>
      <div className="flex flex-col items-center mx-2 md:mx-20">
        <p className="text-3xl font-thin mb-2">Hours</p>
        <p className="text-6xl">{hours}</p>
      </div>
      <div className="self-end pb-3 mx-4">
        <p className="text-3xl font-thin">:</p>
      </div>
      <div className="flex flex-col items-center mx-2 md:mx-20">
        <p className="text-3xl font-thin mb-2">Minutes</p>
        <p className="text-6xl">{minutes}</p>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <div className="bg-black min-w-screen">
      <div className="flex min-h-screen flex-col font-akshar font-semibold text-gray-200 bg-stang-skinny bg-cover md:bg-stang md:bg-contain bg-no-repeat md:bg-center md:bg-origin-content">
        <div className="bg-black bg-opacity-60 h-screen inset-0">
          <main className="flex flex-col justify-center items-center w-screen h-screen">
            <Image
              src="/img/RNDWhite1.svg"
              alt="RND KC"
              width="200"
              height="100"
              className="mb-4"
            />
            <h2 className="text-2xl text-center md:text-4xl font-akshar font-thin uppercase">
              Money can't buy happiness
            </h2>
            <h2 className="text-xl text-center md:text-4xl font-akshar font-semibold uppercase">
              But you will be able to rent it in
            </h2>
            <Countdown
              date={new Date("January 15, 2023 00:00:00")}
              renderer={countdownRenderer}
            />

            <div>
              <NewsLetterSignUpForm />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
