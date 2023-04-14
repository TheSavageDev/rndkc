import { useState } from "react";
import { Social } from "./social";

export const ShareModal = ({ setShowShareModal, car }) => {
  const [success, setSuccess] = useState(false);
  const [buttonText, setButtonText] = useState("Send Message");
  const [data, setData] = useState({
    name: "",
    fromEmail: "",
    toEmail: "",
    message: "Check out this rental I found on RNDKC.com",
    car,
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (success) {
      const res = await fetch("/api/subscribeUser", {
        body: JSON.stringify(data.fromEmail),
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
      setButtonText("We'll Keep You Updated!");
      setTimeout(() => {
        setShowShareModal(false);
        setSuccess(false);
        setButtonText("Send Message");
        setData({
          name: "",
          fromEmail: "",
          toEmail: "",
          car,
          message: "Check out this rental I found on RNDKC.com",
        });
      }, 5000);
    } else {
      const res = await fetch("/api/share", {
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
        setButtonText("Send Message");
        return;
      }
      setSuccess(true);
      setButtonText("Send Message");
    }
  };

  return (
    <section className="share-modal">
      <header className="share-modal_header">
        <h2 className="share-modal_header_text">Cruise with a friend</h2>
        <img
          className="share-modal_header_close-icon"
          src="/img/slices/icon_close.svg"
          onClick={() => setShowShareModal(false)}
        />
      </header>
      {success && (
        <section className="share-modal_submission-success">
          <section className="share-modal_submission-success_icon">
            <img
              className="share-modal_header_close-icon"
              src="/img/slices/icon_check.svg"
            />
          </section>
          <p className="share-modal_submission-success_text">
            Your Email has been Sent!
          </p>
        </section>
      )}
      <section className="share-modal_form">
        {success ? (
          <section className="share-modal_form--success">
            <p className="share-modal_form--success-paragraph">
              Our inventory is always changing so make sure to sign up and
              follow us to stay up-to-date on new classic rides, great
              discounts, and special events.
            </p>
            <label className="share-modal_form_label">Sign Up Now</label>
            <input
              className="share-modal_form_input"
              value={data.fromEmail}
              id="name"
              onChange={handleChange}
            />
          </section>
        ) : (
          <>
            <label className="share-modal_form_label">Your Name</label>
            <input
              className="share-modal_form_input"
              type="text"
              placeholder="Enter Name"
              value={data.name}
              id="name"
              onChange={handleChange}
            />
            <label className="share-modal_form_label">Your Email</label>
            <input
              className="share-modal_form_input"
              type="text"
              placeholder="Email Address"
              value={data.fromEmail}
              id="fromEmail"
              onChange={handleChange}
            />
            <label className="share-modal_form_label">Friend's Email</label>
            <input
              className="share-modal_form_input"
              type="text"
              placeholder="Email Address"
              value={data.toEmail}
              id="toEmail"
              onChange={handleChange}
            />
            <label className="share-modal_form_label">Message</label>
            <textarea
              className="share-modal_form_textarea"
              value={data.message}
              id="message"
              onChange={handleChange}
            ></textarea>
          </>
        )}
        <button
          className={`share-modal_form_button${success ? "--success" : ""}`}
          onClick={handleSubmit}
        >
          {buttonText}
        </button>
        {success && (
          <section className="share-modal_social">
            <Social fgColor="#fff" bgColor="#000" justify="center" />
          </section>
        )}
      </section>
    </section>
  );
};
