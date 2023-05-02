import { ErrorMessage, Field } from "formik";

export const TextField = ({
  label,
  name,
  type,
  placeholder,
  booking,
  length,
}: {
  label: string;
  name: string;
  type?: string;
  booking?: boolean;
  placeholder: string;
  length?: number;
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
        maxlength={length}
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
