import { ErrorMessage, Field, useField, useFormikContext } from "formik";
import moment, { Moment } from "moment";
import { Values } from "./bookingForm";
import { useEffect, useState } from "react";

export const TimePicker = ({
  label,
  name,
  handleTimeChange,
}: {
  label: string;
  name: string;
  handleTimeChange?: (startTime: Moment, endTime: Moment) => void;
}) => {
  const { values }: { values: Values } = useFormikContext();
  const [field, meta, helpers] = useField(name);

  useEffect(() => {
    if (
      values.startDate &&
      values.startTime &&
      values.endTime &&
      handleTimeChange
    ) {
      let startTimestamp = moment(values.startDate).hour(10);
      let endTimestamp = moment(values.startDate).hour(10);
      startTimestamp.hour(parseInt(values.startTime.split(":")[0]));
      startTimestamp.minute(parseInt(values.startTime.split(":")[1]));
      endTimestamp.hour(parseInt(values.endTime.split(":")[0]));
      endTimestamp.minute(parseInt(values.endTime.split(":")[1]));
      handleTimeChange(startTimestamp, endTimestamp);
    }
  }, [values.startDate, values.startTime, values.endTime]);

  return (
    <section className="form-time-picker">
      <label className="booking_information-form-input-label">
        {label}
        <ErrorMessage
          name={name}
          component="article"
          className="car-pay_signup_form_error-message"
        />
      </label>
      <Field
        as="select"
        name={name}
        {...field}
        value={meta.value}
        className="booking_information-form-input--time"
      >
        {/* <option value="00:00">Midnight</option>
        <option value="00:30">12:30 AM</option>
        <option value="01:00">1:00 AM</option>
        <option value="01:30">1:30 AM</option>
        <option value="02:00">2:00 AM</option>
        <option value="02:30">2:30 AM</option>
        <option value="03:00">3:00 AM</option>
        <option value="03:30">3:30 AM</option>
        <option value="04:00">4:00 AM</option>
        <option value="04:30">4:30 AM</option>
        <option value="05:00">5:00 AM</option>
        <option value="05:30">5:30 AM</option>
        <option value="06:00">6:00 AM</option>
        <option value="06:30">6:30 AM</option>
        <option value="07:00">7:00 AM</option>
        <option value="07:30">7:30 AM</option>
        <option value="08:00">8:00 AM</option>
        <option value="08:30">8:30 AM</option>
        <option value="09:00">9:00 AM</option>
        <option value="09:30">9:30 AM</option> */}
        <option value="10:00">10:00 AM</option>
        <option value="10:30">10:30 AM</option>
        <option value="11:00">11:00 AM</option>
        <option value="11:30">11:30 AM</option>
        <option value="12:00">Noon</option>
        <option value="12:30">12:30 PM</option>
        <option value="13:00">1:00 PM</option>
        <option value="13:30">1:30 PM</option>
        <option value="14:00">2:00 PM</option>
        <option value="14:30">2:30 PM</option>
        <option value="15:00">3:00 PM</option>
        <option value="15:30">3:30 PM</option>
        <option value="16:00">4:00 PM</option>
        <option value="16:30">4:30 PM</option>
        <option value="17:00">5:00 PM</option>
        {/* <option value="17:30">5:30 PM</option>
        <option value="18:00">6:00 PM</option>
        <option value="18:30">6:30 PM</option>
        <option value="19:00">7:00 PM</option>
        <option value="19:30">7:30 PM</option>
        <option value="20:00">8:00 PM</option>
        <option value="20:30">8:30 PM</option>
        <option value="21:00">9:00 PM</option>
        <option value="21:30">9:30 PM</option>
        <option value="22:00">10:00 PM</option>
        <option value="22:30">10:30 PM</option>
        <option value="23:00">11:00 PM</option>
        <option value="23:30">11:30 PM</option> */}
      </Field>
    </section>
  );
};
