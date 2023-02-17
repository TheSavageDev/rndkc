import { useState } from "react";
import options from "../lib/vote-options";

export const Vote = ({}) => {
  const [success, setSuccess] = useState(false);
  const [buttonText, setButtonText] = useState("Vote Now");
  const [data, setData] = useState({
    email: "",
    vehicle: "",
  });

  const handleSubmit = async () => {
    const res = await fetch("/api/vote", {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const { error } = await res.json();

    if (error) {
      console.error(error);
      setSuccess(false);
      setButtonText("Vote Now");
      return;
    }
    setSuccess(true);
    setButtonText("We'll Keep You Posted!");
    setTimeout(() => {
      setSuccess(false);
      setButtonText("Vote Now");
      setData({ ...data, vehicle: "" });
    }, 5000);
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
  };
  return (
    <section className="vote_container">
      <section className="vote_header-container">
        <h2 className="vote_header">
          <span className="vote_header_text--bold">YOU</span> decide what our
          next build will be!
        </h2>
        <p className="vote_paragraph">
          Vote on which car you would like to see us build next. The car with
          the highest votes will be our next build. The winner will be announced
          in our newsletter at the end of the month when all votes are tallied.
        </p>
      </section>
      <section className="vote_form">
        <select
          className="vote_form_select"
          value={data.vehicle}
          id="vehicle"
          onChange={(e) => {
            handleChange(e);
          }}
        >
          <option>Select Vehicle</option>
          {options.map((vehicle) => (
            <option>{vehicle}</option>
          ))}
        </select>
        <section className="vote_form_select--alt">
          {options.map((vehicle) => (
            <article
              key={vehicle}
              className={`vote_form_select--alt_buttons${
                vehicle === data.vehicle ? "--selected" : ""
              }`}
              onClick={() => setData({ ...data, vehicle })}
            >
              {vehicle}
              {vehicle === data.vehicle ? (
                <img src="/img/slices/icon_white_check.svg" />
              ) : (
                ""
              )}
            </article>
          ))}
        </section>
        <input
          className="vote_form_input"
          placeholder="Enter Email Address"
          value={data.email}
          id="email"
          onChange={(e) => handleChange(e)}
        />
        <button
          className={`vote_form_button${success ? "--success" : ""}`}
          onClick={handleSubmit}
        >
          {buttonText}
        </button>
      </section>
    </section>
  );
};
