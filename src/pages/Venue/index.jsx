import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchVenues } from "../../api/fetchVenues";
import styles from "./Venue.module.css";
import ImageCarousel from "../../components/ImageCarousel";
import BookingForm from "../../components/BookingForm";

const Venue = () => {
  const [venue, setVenue] = useState(null);
  const { id } = useParams();

  const [bookings, setBookings] = useState([]);

  const onBookingMade = (newBooking) => {
    setBookings((prevBookings) => [...prevBookings, newBooking]);
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchedVenue = await fetchVenues(id);
      setVenue(fetchedVenue);
      setBookings(fetchedVenue.bookings);
    };
    fetchData();
  }, [id]);

  if (!venue) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <div className={`${styles.venue} inner-container`}>
        <div>
          <ImageCarousel images={venue.media} />
        </div>
        <div className={styles.venueContainer}>
          <div className="flex2">
            <h1 className={styles.name}>{venue.name}</h1>
            <p className={styles.description}>{venue.description}</p>
            <div className="flex  mtb">
              {" "}
              <p className={styles.tag}>Price: ${venue.price} per night</p>
              <p className={styles.tag}>Max Guests: {venue.maxGuests}</p>
              <p className={styles.tag}>Rating: {venue.rating}</p>
            </div>

            <div className={styles.location}>
              <h2>Location</h2>
              {!venue.location.address &&
              !venue.location.city &&
              !venue.location.zip &&
              !venue.location.country ? (
                "Location unknown"
              ) : (
                <>
                  <p>Address: {venue.location.address}</p>
                  <p>City: {venue.location.city}</p>
                  <p>Zip: {venue.location.zip}</p>
                  <p>Country: {venue.location.country}</p>
                </>
              )}
            </div>
          </div>
          <div className={styles.availableDates}>
            <h2>Available Dates</h2>
            <BookingForm
              bookings={bookings}
              venueId={id}
              onBookingMade={onBookingMade}
              maxGuests={venue.maxGuests}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Venue;
