import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchVenues } from "../../api/fetchVenues";
import styles from "./Venue.module.css";
import ImageCarousel from "../../components/ImageCarousel";
import AvailableDates from "../../components/AvailableDates";

const Venue = () => {
  const [venue, setVenue] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const fetchedVenue = await fetchVenues(id);
      setVenue(fetchedVenue);
    };
    fetchData();
  }, [id]);

  if (!venue) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <div className={`${styles.venue} inner-container`}>
        <h1 className={styles.name}>{venue.name}</h1>
        <p className={styles.description}>{venue.description}</p>
        <div className={styles.images}>
          <ImageCarousel images={venue.media} />
        </div>
        <p className={styles.price}>Price: ${venue.price}</p>
        <p className={styles.maxGuests}>Max Guests: {venue.maxGuests}</p>
        <p className={styles.rating}>Rating: {venue.rating}</p>
        <div className={styles.location}>
          <h2>Location</h2>
          <p>Address: {venue.location.address}</p>
          <p>City: {venue.location.city}</p>
          <p>Zip: {venue.location.zip}</p>
          <p>Country: {venue.location.country}</p>
          <p>Continent: {venue.location.continent}</p>
        </div>
        <div className={styles.availableDates}>
          <h2>Available Dates</h2>
          <AvailableDates bookings={venue.bookings} />
        </div>
      </div>
    </main>
  );
};

export default Venue;
