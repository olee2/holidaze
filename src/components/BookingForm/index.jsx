import React, { useState } from "react";
import { DateRange } from "react-date-range";
import { createBooking } from "../../api/createBooking";
import { isLoggedIn } from "../../utils/isLoggedIn";
import { Link } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import styles from "./BookingForm.module.css";
const BookingForm = ({ bookings, venueId, onBookingMade, maxGuests }) => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);
  const [guests, setGuests] = useState(1);
  const [open, setOpen] = useState(false);

  const handleGuestsChange = (e) => {
    setGuests(e.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestBody = {
      dateFrom: state[0].startDate,
      dateTo: state[0].endDate,
      guests: Number(guests),
      venueId: venueId,
    };

    const newBooking = await createBooking(requestBody);
    onBookingMade(newBooking);
    setOpen(true);
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
      <div className={styles.bookingContainer}>
        <DateRange
          fixedHeight
          styles={{ width: 100 }}
          onChange={(item) => setState([item.selection])}
          showSelectionPreview={true}
          direction="vertical"
          ranges={state}
          editableDateInputs={true}
          disabledDates={bookedDates}
          minDate={new Date()}
          moveRangeOnFirstSelection={false}
          className="date-range-picker"
          rangeColors={["#66a2e7"]}
        />{" "}
        {isLoggedIn() ? (
          <div className={styles.submitContainer}>
            <div>
              <label htmlFor="guests">Number of guests:</label>
              <select id="guests" value={guests} onChange={handleGuestsChange}>
                {[...Array(maxGuests)].map((_, i) => (
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
        ) : (
          <Link to="/login" className={`btn ${styles.loginBtn}`}>
            Login to book
          </Link>
        )}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Booking Confirmation
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Your booking has been made successfully!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <button
              className="btn"
              onClick={handleClose}
              color="primary"
              autoFocus
            >
              OK
            </button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default BookingForm;
