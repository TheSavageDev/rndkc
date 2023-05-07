import { ErrorMessage, useField, useFormikContext } from "formik";
import { useEffect } from "react";
import moment from "moment";
import { Values } from "./bookingForm";

export const DatePicker = ({ label, name, handleDateChange, tab }) => {
  const { values }: { values: Values } = useFormikContext();
  const [field, meta] = useField(name);

  useEffect(() => {
    let startTimestamp = moment(values.startDate);
    let endTimestamp = moment(values.endDate);
    if (field.name === "startDate" && values.startTime) {
      startTimestamp.add(
        startTimestamp.hours() + parseInt(values.startTime.split(":")[0]),
        "hours"
      );
      startTimestamp.add(
        startTimestamp.minutes() + parseInt(values.startTime.split(":")[1]),
        "minutes"
      );
      if (["chauffeured", "commercial"].includes(tab)) {
        endTimestamp = moment(startTimestamp).add(2, "hours");
      }
    }
    if (field.name === "endDate" && values.endTime) {
      endTimestamp.add(
        endTimestamp.hours() + parseInt(values.endTime.split(":")[0]),
        "hours"
      );
      endTimestamp.add(
        endTimestamp.minutes() + parseInt(values.endTime.split(":")[1]),
        "minutes"
      );
    }
    if (
      (values.startDate && values.endDate) ||
      (values.startDate && ["chauffeured", "commercial"].includes(tab))
    ) {
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
