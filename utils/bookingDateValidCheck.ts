import moment from "moment";

export const bookingValidCheck = ({
  currentBookings,
  startDate,
  startTime,
  endDate,
  endTime,
  refitHours,
  setFieldError,
  ...rest
}) => {
  const startDateTime = moment(startDate)
    .set("hour", parseInt(startTime.split(":")[0]))
    .set("minute", parseInt(startTime.split(":")[1]));
  const endDateTime = moment(endDate)
    .set("hour", parseInt(endTime.split(":")[0]))
    .set("minute", parseInt(endTime.split(":")[1]));
  const endRefitTime = moment(
    moment(endDate)
      .set("hour", parseInt(endTime.split(":")[0]))
      .set("minute", parseInt(endTime.split(":")[1]))
  ).add(refitHours, "h");

  let startDateConflict: boolean;
  let endDateConflict: boolean;
  let startDateRefitConflict: boolean;
  let endDateRefitConflict: boolean;
  if (currentBookings.length !== 0) {
    currentBookings.forEach((booking) => {
      startDateConflict =
        startDateTime.isBetween(
          moment(booking.startDate),
          moment(booking.endRefitDate)
        ) || startDateTime.isSame(booking.startDate);
      endDateConflict =
        endDateTime.isBetween(
          moment(booking.startDate),
          moment(booking.endRefitDate)
        ) || endDateTime.isSame(booking.endDate);
      startDateRefitConflict =
        !startDateConflict &&
        !endDateConflict &&
        startDateTime.isAfter(booking.endDate) &&
        startDateTime.isSameOrBefore(booking.endRefitTime);
      endDateRefitConflict =
        !startDateConflict &&
        !endDateConflict &&
        !startDateRefitConflict &&
        endRefitTime.isSameOrAfter(moment(booking.startDate)) &&
        startDateTime.isBefore(moment(booking.startDate));
    });
  }
  if (
    startDateConflict ||
    endDateConflict ||
    startDateRefitConflict ||
    endDateRefitConflict
  ) {
    setFieldError({
      startDate: startDateConflict
        ? "There is a conflict with your start date"
        : startDateRefitConflict
        ? "The vehicle will not be ready for another rental by this date and time"
        : null,
      endDate: endDateConflict
        ? "There is a conflict with your end date"
        : endDateRefitConflict
        ? "The vehicle won't be able to be prepared for the next rental."
        : null,
    });
    return false;
  } else {
    return { startDateTime, endDateTime, endRefitTime };
  }
};
