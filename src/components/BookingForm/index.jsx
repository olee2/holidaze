import React, { useState } from "react";
import { DateRange } from "react-date-range";
import { createBooking } from "../../api/createBooking";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import styles from "./BookingForm.module.css";
const BookingForm = ({ bookings, venueId }) => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);
  const [guests, setGuests] = useState(1);

  const handleGuestsChange = (e) => {
    setGuests(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestBody = {
      dateFrom: state[0].startDate,
      dateTo: state[0].endDate,
      guests: guests,
      venueId: venueId,
    };

    const response = await createBooking(requestBody);
    console.log(response);
  };

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

  return (
    <>
      <DateRange
        onChange={(item) => setState([item.selection])}
        showSelectionPreview={true}
        direction="horizontal"
        ranges={state}
        editableDateInputs={true}
        disabledDates={bookedDates}
        minDate={new Date()}
        moveRangeOnFirstSelection={false}
        className="date-range-picker"
        rangeColors={["#66a2e7"]}
      />
      <div className={styles.submitContainer}>
        <div>
          <label htmlFor="guests">Number of guests:</label>
          <select id="guests" value={guests} onChange={handleGuestsChange}>
            {[...Array(10)].map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>

        <button className={"btn"} onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </>
  );
};

export default BookingForm;
