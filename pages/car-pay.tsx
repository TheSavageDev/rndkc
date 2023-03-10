import { useState } from "react";
import Head from "next/head";
import { ref, uploadBytes } from "firebase/storage";
import { useRouter } from "next/router";
import { Footer } from "../components/footer";
import { NavBar } from "../components/navBar";
import { usePageTracking } from "../hooks/usePageTracking";
import { useEventTracking } from "../hooks/useEventTracking";
import { storage } from "../firebase/clientApp";

export default function CarPay() {
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(false);
  const [buttonText, setButtonText] = useState("Send Message");
  const [photos, setPhotos] = useState(null);
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    year: "",
    makeModel: "",
    roadWorthy: undefined,
    currentCondition: "",
    notes: "",
  });
  const router = useRouter();
  usePageTracking(router);

  usePageTracking(router, router.query.id);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setPhotos(Array.from(e.target.files));
    } else {
      console.log("No files found");
    }
  };

  const handleFirebaseUpload = () => {
    photos.forEach(async (photo) => {
      const path = `/car-pay/${data.name}-${data.year}-${data.makeModel}/${photo.name}`;
      const photosRef = ref(storage, path);

      uploadBytes(photosRef, photo).then((snapshot) => {
        console.log(snapshot);
      });
    });
  };

  const handleCheckChange = (roadWorthy) => {
    setData({
      ...data,
      roadWorthy,
    });
  };

  const handleChange = (e) => {
    setButtonText("Send Message");
    setSuccess(false);
    if (e.target.id === "roadWorthyYes") {
      handleCheckChange(true);
    } else if (e.target.id === "roadWorthyNo") {
      handleCheckChange(false);
    } else {
      setData({
        ...data,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setButtonText("Submitting...");
    if (photos.length !== 0) {
      console.log(photos);
      handleFirebaseUpload();
    }
    if (
      data.email &&
      data.name &&
      data.year &&
      data.makeModel &&
      (data.roadWorthy || !data.roadWorthy) &&
      data.currentCondition &&
      data.notes
    ) {
      const res = await fetch("/api/car-pay", {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const { error } = await res.json();

      if (error) {
        console.error(error);
        setButtonText("Send Message");
        setSubmitting(false);
        setSuccess(false)
        return;
      }
      useEventTracking("CarPay", {
        email: data.email,
      });

      setSubmitting(false);
      setSuccess(true);
      setButtonText("We'll Be In Touch Shortly");
    } else {
      setSuccess(false);
      setSubmitting(false);
      setFormError(true);
      setButtonText("Please Fill out All Required Fields");
    }
  };

  return (
    <>
      <Head>
        <title>RND - CarPay</title>
      </Head>
      <section className="car-pay_container">
        <>
          <NavBar />
          <section className="main">
            <section className="car-pay_header">
              <h2 className="car-pay_header_text">
                Your old ride,
                <br /> a new revenue stream,
                <br /> with
                <span className="car-pay_header-carpay">
                  <span className="car-pay_header-carpay--car">CAR</span>
                  <span className="car-pay_header-carpay--pay">PAY</span>
                </span>
              </h2>
            </section>
            <section className="car-pay_content">
              <h3 className="car-pay_content_heading">
                Renting your classic car is a smart and profitable way to turn
                your passion into profit in Kansas City.
              </h3>
              <p className="car-pay_content_paragraph">
                Stop letting your classic car sit there and collect dust, put it
                to work for you! Renting out your classic car can be a lucrative
                and a low-maintenance way to earn extra income. By letting RND
                rent your classic car, you can offset the costs of ownership
                while maintaining and even restoring your pride and joy.
              </p>
              <p className="car-pay_content_footer-text">
                We take care of everything, you just collect the check.
              </p>
            </section>
            <section className="car-pay_explainer-cards">
              <article className="car-pay_explainer-card">
                <header className="car-pay_explainer-card_header">
                  <img src="/img/slices/icon_shield.svg" />
                  <h3 className="car-pay_explainer-card_header_text">
                    Insurance
                  </h3>
                </header>
                <p className="car-pay_explainer-card_paragraph">
                  RND provides up to $1 million in liability coverage for any
                  losses.
                </p>
              </article>

              <article className="car-pay_explainer-card">
                <header className="car-pay_explainer-card_header">
                  <img src="/img/slices/icon_engine_green.svg" />
                  <h3 className="car-pay_explainer-card_header_text">
                    Roadside Assistance
                  </h3>
                </header>
                <p className="car-pay_explainer-card_paragraph">
                  All rental vehicles come with access to 24/7 emergency
                  roadside assistance.
                </p>
              </article>

              <article className="car-pay_explainer-card">
                <header className="car-pay_explainer-card_header">
                  <img src="/img/slices/icon_brakes.svg" />
                  <h3 className="car-pay_explainer-card_header_text">
                    Maintenance
                  </h3>
                </header>
                <p className="car-pay_explainer-card_paragraph">
                  We take care of all standard maintenance while your vehicle is
                  an active rental.
                </p>
              </article>

              <article className="car-pay_explainer-card">
                <header className="car-pay_explainer-card_header">
                  <img src="/img/slices/icon_shift_green.svg" />
                  <h3 className="car-pay_explainer-card_header_text">
                    Qualified Drivers
                  </h3>
                </header>
                <p className="car-pay_explainer-card_paragraph">
                  We thoroughly vet all RND customers before they get behind the
                  wheel.
                </p>
              </article>

              <article className="car-pay_explainer-card">
                <header className="car-pay_explainer-card_header">
                  <img src="/img/slices/icon_bullhorn.svg" />
                  <h3 className="car-pay_explainer-card_header_text">
                    Marketing
                  </h3>
                </header>
                <p className="car-pay_explainer-card_paragraph">
                  We promote your vehicle so you receive maximum return on your
                  investment.
                </p>
              </article>
            </section>
            <aside className="car-pay_kc">
              <img src="/img/slices/kc.svg" />
            </aside>
            <section className="car-pay_signup">
              <h2 className="car-pay_signup_heading">Let's get started</h2>
              <p className="car-pay_signup_paragraph">
                Simply submit your information and the details of your car
                below, or even a link to a car you’re thinking about buying for
                us to review. If it meets our criteria and we feel like it would
                rent well, we’ll have you in to inspect the vehicle and
                approve/deny it’s entry into our CarPay system.{" "}
              </p>
              <section className="car-pay_signup_form">
                <label className="car-pay_signup_form-label">Name</label>
                <input
                  className="car-pay_signup_form-input"
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter Full Name"
                  value={data.name}
                  onChange={handleChange}
                  required
                />
                <label className="car-pay_signup_form-label">
                  Email Address
                </label>
                <input
                  className="car-pay_signup_form-input"
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Enter Email Address"
                  value={data.email}
                  onChange={handleChange}
                  required
                />
                <label className="car-pay_signup_form-label">
                  Phone Number (optional)
                </label>
                <input
                  className="car-pay_signup_form-input"
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder="Enter Phone Number"
                  value={data.phone}
                  onChange={handleChange}
                />
                <label className="car-pay_signup_form-label">
                  Vehicle Year
                </label>
                <input
                  className="car-pay_signup_form-input"
                  type="text"
                  id="year"
                  name="year"
                  placeholder="Enter Vehicle Year"
                  value={data.year}
                  onChange={handleChange}
                  required
                />
                <label className="car-pay_signup_form-label">
                  Vehicle Make & Model
                </label>
                <input
                  className="car-pay_signup_form-input"
                  type="text"
                  id="makeModel"
                  name="makeModel"
                  placeholder="Enter Vehicle Make & Model"
                  value={data.makeModel}
                  onChange={handleChange}
                  required
                />
                <label className="car-pay_signup_form-label">
                  Is your vehicle currently roadworthy?
                </label>
                <article className="car-pay_signup_form_checkboxes">
                  <article className="car-pay_signup_form_checkbox--yes">
                    <input
                      type="radio"
                      name="roadWorthy"
                      value="yes"
                      id="roadWorthyYes"
                      onChange={handleChange}
                    />
                    <label htmlFor="roadWorthyYes">YES</label>
                  </article>
                  <article className="car-pay_signup_form_checkbox--no">
                    <input
                      type="radio"
                      name="roadWorthy"
                      value="no"
                      id="roadWorthyNo"
                      onChange={handleChange}
                    />
                    <label htmlFor="roadWorthyNo">NO</label>
                  </article>
                </article>
                <label className="car-pay_signup_form-label">
                  Describe Your Vehicles Current Condition
                </label>
                <textarea
                  className="car-pay_signup_form_textarea"
                  placeholder="Enter Vehicle Description..."
                  name="currentCondition"
                  id="currentCondition"
                  onChange={handleChange}
                ></textarea>
                <label className="car-pay_signup_form-label">
                  Additional Notes, Questions, or Comments
                </label>
                <textarea
                  className="car-pay_signup_form_textarea"
                  placeholder="Enter Notes, Questions, or Comments..."
                  id="notes"
                  name="notes"
                  onChange={handleChange}
                ></textarea>
                <article className="car-pay_signup_form_file-upload">
                  <button className="car-pay_signup_form_file-upload-button">
                    <img src="/img/slices/icon_camera.svg" />
                    Select Images To Upload
                  </button>
                  <input
                    type="file"
                    name="photos"
                    multiple
                    onChange={handleFileChange}
                  />
                </article>
                <button
                  className={`${success ? 'car-pay_signup_form_button--success' : "car-pay_signup_form_button"}`}
                  disabled={submitting || success}
                  onClick={handleSubmit}
                >
                  {buttonText}
                </button>
              </section>
              <section className="car-pay_contact">
                <h4>Have Questions?</h4>
                <ul>
                  <li>
                    Visit our <a href="/faq">F.A.Q. Page</a>
                  </li>
                  <li>
                    Contact us at{" "}
                    <a href="mailto:hello@rndkc.com">hello@rndkc.com</a>
                  </li>
                  <li>
                    Call us at <a href="tel:8162001163">816-200-1163</a>
                  </li>
                </ul>
              </section>
            </section>
          </section>
        </>
      </section>
      <Footer />
    </>
  );
}
