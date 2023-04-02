import { Form, Formik, useFormikContext } from "formik";
import { useEffect } from "react";
import * as Yup from "yup";
import { TextField } from "./TextField";

export const CarPayForm = ({ handleSubmit, success }) => {
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
    yearMakeModel: Yup.string()
      .min(2)
      .max(50)
      .required("Please enter your vehicle's model year, make, and model."),
  });

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    yearMakeModel: "",
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
              label="Vehicle Year, Make, and Model"
              name="yearMakeModel"
              placeholder="Enter Vehicle Year, Make & Model"
            />

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
