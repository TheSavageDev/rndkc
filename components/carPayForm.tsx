import { ErrorMessage, Field, Form, Formik, useFormikContext } from "formik";
import { useEffect } from "react";
import * as Yup from "yup";
import { TextField } from "./TextField";
import { TextArea } from "./TextArea";

export const CarPayForm = ({ handleFileChange, handleSubmit, success }) => {
  const ScrollToFieldError = () => {
    const { errors, isSubmitting, isValidating } = useFormikContext();

    useEffect(() => {
      if (isSubmitting && !isValidating) {
        let keys = Object.keys(errors);
        if (keys.length > 0) {
          const selector = `[name=${keys[0]}]`;
          const errorElement = document.querySelector(selector) as HTMLElement;
          if (errorElement) {
            errorElement.focus();
          }
        }
      }
    }, [errors, isSubmitting, isValidating]);

    return null;
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Please enter your full name."),
    email: Yup.string()
      .email("Invalid Email Address")
      .required("Please enter your email address."),
    phoneNumber: Yup.string().min(10).max(11),
    year: Yup.string()
      .min(2)
      .max(4)
      .required("Please enter your vehicle's model year."),
    makeModel: Yup.string()
      .max(50)
      .required("Please enter your vehicle's make and model."),
    roadWorthy: Yup.string().required(
      "Please indicate if your vehicle is road worthy or not."
    ),
    currentCondition: Yup.string()
      .max(1000)
      .required("Please briefly describe your vehicle's current condition"),
    notes: Yup.string().max(1000),
  });

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    year: "",
    makeModel: "",
    roadWorthy: undefined,
    currentCondition: "",
    notes: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ isSubmitting, errors }) => {
        return (
          <Form className="car-pay_signup_form">
            <ScrollToFieldError />
            <TextField label="Name" name="name" placeholder="Enter Full Name" />
            <TextField
              label="Email"
              name="email"
              placeholder="Enter Email Address"
            />
            <TextField
              label="Phone Number (optional)"
              name="phoneNumber"
              placeholder="(816) 555-1234"
              type="tel"
            />
            <TextField
              label="Year"
              name="year"
              placeholder="Enter Vehicle Year"
            />
            <TextField
              label="Vehicle Make & Model"
              name="makeModel"
              placeholder="Enter Vehicle Make & Model"
            />

            <label htmlFor="roadWorthy" className={`car-pay_signup_form-label`}>
              Is your vehicle currently roadworthy?
            </label>
            <article className="car-pay_signup_form_checkboxes">
              <article className="car-pay_signup_form_checkbox--yes">
                <Field
                  type="radio"
                  name="roadWorthy"
                  value="yes"
                  id="roadWorthyYes"
                />
                <label htmlFor="roadWorthyYes">YES</label>
              </article>
              <article className="car-pay_signup_form_checkbox--no">
                <Field
                  type="radio"
                  name={"roadWorthy"}
                  value="no"
                  id="roadWorthyNo"
                />
                <label htmlFor="roadWorthyNo">NO</label>
              </article>
            </article>
            <ErrorMessage
              component="article"
              className="car-pay_signup_form_error-message"
              name="roadWorthy"
            />
            <TextArea
              label="Describe Your Vehicles Current Condition"
              name="currentCondition"
              placeholder="Enter Your Vehicles Current Condition..."
            />
            <TextArea
              label="Additional Notes, Questions, or Comments"
              name="notes"
              placeholder="Enter Additional Notes, Questions, or Comments..."
            />

            <article className="car-pay_signup_form_file-upload">
              <button className="car-pay_signup_form_file-upload-button">
                <img src="/img/slices/icon_camera.svg" />
                Select Images To Upload
              </button>
              <Field
                type="file"
                name="photos"
                multiple
                onChange={handleFileChange}
              />
            </article>

            <button
              className={
                success
                  ? "car-pay_signup_form_button--success"
                  : Object.keys(errors).length !== 0
                  ? "car-pay_signup_form_button--error"
                  : "car-pay_signup_form_button"
              }
              type="submit"
              disabled={isSubmitting || success}
            >
              {Object.keys(errors).length !== 0
                ? "Please fill out all required fields"
                : isSubmitting
                ? "Submitting..."
                : success
                ? `We'll Be In Touch Shortly`
                : "Submit"}
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};
