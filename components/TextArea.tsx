import { ErrorMessage, Field } from "formik";

export const TextArea = ({
  label,
  name,
  type,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
}) => {
  return (
    <>
      <label htmlFor={name} className="booking_information-form-input-label">
        {label}
      </label>
      <Field
        name={name}
        placeholder={placeholder}
        className="booking_information_signup_form_textarea"
        as="textarea"
      />
      <ErrorMessage
        component="article"
        className="car-pay_signup_form_error-message"
        name={name}
      />
    </>
  );
};
