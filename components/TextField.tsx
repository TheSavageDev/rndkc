import { ErrorMessage, Field } from "formik";

export const TextField = ({
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
      <label htmlFor={name} className="car-pay_signup_form-label">
        {label}
      </label>
      <Field
        name={name}
        placeholder={placeholder}
        className="car-pay_signup_form-input"
        type={type ?? "text"}
      />
      <ErrorMessage
        component="article"
        className="car-pay_signup_form_error-message"
        name={name}
      />
    </>
  );
};
