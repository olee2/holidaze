// AvailableDates.js
import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const AvailableDates = ({ bookings }) => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  const bookedDates = bookings.reduce((dates, booking) => {
    const startDate = new Date(booking.dateFrom);
    const endDate = new Date(booking.dateTo);
    let currentDate = startDate;

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  }, []);

  // const isBooked = (date) => {
  //   return bookedDates.some(
  //     (bookedDate) => bookedDate.toDateString() === date.toDateString()
  //   );
  // };

  return (
    <DateRangePicker
      onChange={(item) => setState([item.selection])}
      showSelectionPreview={true}
      months={2}
      direction="horizontal"
      ranges={state}
      disabledDates={bookedDates}
      minDate={new Date()}
      moveRangeOnFirstSelection={false}
      className="date-range-picker"
      rangeColors={["rgba(0, 166, 152, 1)"]}
    />
  );
};

export default AvailableDates;
