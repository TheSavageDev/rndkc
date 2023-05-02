import * as Yup from "yup";
import moment from "moment";

export const validationSchema = Yup.object({
  fullName: Yup.string().required("Please enter your full name."),
  email: Yup.string()
    .email("Invalid Email Address")
    .required("Please enter your email address."),
  phoneNumber: Yup.string()
    .min(10)
    .max(11)
    .required("Please enter your phone number."),
  startDate: Yup.date()
    .min(moment().toDate(), "Start Date must be later than today.")
    .required("Please choose a pickup date."),
  startTime: Yup.string().required("Please choose a pickup time."),
  endDate: Yup.date()
    .min(moment().toDate(), "End Date must be later than today.")
    .required("Please choose a drop off date."),
  endTime: Yup.string().required("Please choose a drop off time."),
  address: Yup.string(),
  city: Yup.string(),
  zipCode: Yup.string().min(5).max(5),
});
