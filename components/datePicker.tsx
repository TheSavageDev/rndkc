import { ErrorMessage, useField, useFormikContext } from "formik";
import { useEffect } from "react";
import { Values } from "./bookingForm";

export const DatePicker = ({ label, name, handleDateChange, tab }) => {
  const { values }: { values: Values } = useFormikContext();
  const [field, meta] = useField(name);

  useEffect(() => {
    let startTimestamp = new Date(values.startDate);
    let endTimestamp = new Date(values.endDate);
    if (field.name === "startDate" && values.startTime) {
      startTimestamp.setHours(
        startTimestamp.getHours() + parseInt(values.startTime.split(":")[0])
      );
      startTimestamp.setMinutes(
        startTimestamp.getMinutes() + parseInt(values.startTime.split(":")[1])
      );
      if (["chauffeured", "commercial"].includes(tab)) {
        endTimestamp = new Date(values.startDate);
      }
    }
    if (field.name === "endDate" && values.endTime) {
      endTimestamp.setHours(
        endTimestamp.getHours() + parseInt(values.endTime.split(":")[0])
      );
      endTimestamp.setMinutes(
        endTimestamp.getMinutes() + parseInt(values.endTime.split(":")[1])
      );
    }
    if (values.startDate && values.endDate) {
      handleDateChange(startTimestamp, endTimestamp);
    }
  }, [values.startDate, values.endDate, values.startTime, values.endTime]);

  return (
    <section className="form-date-picker">
      <label className="booking_information-form-input-label">
        {label}
        <ErrorMessage
          name={name}
          component="article"
          className="car-pay_signup_form_error-message"
        />
      </label>
      <input
        {...field}
        value={meta.value}
        type="date"
        className="booking_information-form-input--date"
      />
    </section>
  );
};
