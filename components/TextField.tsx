import { ErrorMessage, Field } from "formik";

export const TextField = ({
  label,
  name,
  type,
  placeholder,
  booking,
}: {
  label: string;
  name: string;
  type?: string;
  booking?: boolean;
  placeholder: string;
}) => {
  return (
    <>
      <label
        htmlFor={name}
        className={
          booking ? "booking_signup_form-label" : "car-pay_signup_form-label"
        }
      >
        {label}
      </label>
      <Field
        name={name}
        placeholder={placeholder}
        className={
          booking ? "booking_signup_form-input" : "car-pay_signup_form-input"
        }
        type={type ?? "text"}
      />
      <ErrorMessage
        component="article"
        className={
          booking
            ? "booking_signup_form_error-message"
            : "car-pay_signup_form_error-message"
        }
        name={name}
      />
    </>
  );
};
