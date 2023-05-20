import React, { useState, useEffect } from "react";
import { fetchProfile } from "../../api/fetchProfile";
import { updateAvatar } from "../../api/updateAvatar";
import { fetchVenues } from "../../api/fetchVenues";
import { fetchBooking } from "../../api/fetchBooking";
import { ProfileCard } from "../../components/profileCard";
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";
import styles from "./Profile.module.css";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [venues, setVenues] = useState([]);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [venueDetails, setVenueDetails] = useState([]);
  const [bookingDetails, setBookingDetails] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVenue, setCurrentVenue] = useState();

  const handleAvatarSubmit = (event) => {
    event.preventDefault();
    if (user && user.name && avatarUrl) {
      updateAvatar(user.name, avatarUrl)
        .then((updatedUser) => {
          const updatedUserWithToken = {
            ...updatedUser,
            accessToken: user.accessToken,
          };
          setUser(updatedUserWithToken);
          setIsEditingAvatar(false);
          localStorage.setItem("user", JSON.stringify(updatedUserWithToken));
        })
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.name) {
      fetchProfile(storedUser.name)
        .then((profile) => {
          setUser(storedUser);
          if (storedUser.venueManager) {
            Promise.all(profile.venues.map((venue) => fetchVenues(venue.id)))
              .then((venuesData) => {
                setVenues(venuesData);
                setVenueDetails(
                  venuesData.map((venueData) => venueData.bookings)
                );
              })
              .catch((err) => console.error(err));
          } else {
            setBookings(profile.bookings);
            // Fetch each booking details here
            Promise.all(
              profile.bookings.map((booking) => fetchBooking(booking.id))
            )
              .then((bookingData) => {
                setBookingDetails(bookingData);
              })
              .catch((err) => console.error(err));
          }
        })
        .catch((err) => console.error(err));
    }
    console.log(bookingDetails);
  }, []);

  if (!user) {
    return (
      <main>
        <div className="inner-container">Loading...</div>
      </main>
    );
  }

  return (
    <main>
      {" "}
      <div className="inner-container">
        <div className={styles.profile}>
          {" "}
          <div className={styles.nameContainer}>
            {" "}
            <h1>{user.name}</h1>
            <p>{user.venueManager ? "Venues Manager" : ""}</p>
          </div>
          <img src={user.avatar} alt={user.name} />
          {isEditingAvatar ? (
            <form className={styles.avatarForm} onSubmit={handleAvatarSubmit}>
              <div className={styles.avatarInputContainer}>
                {" "}
                <label className={styles.avatarLabel}>New Avatar URL:</label>
                <input
                  className={styles.avatarInput}
                  type="url"
                  value={avatarUrl}
                  onChange={(event) => setAvatarUrl(event.target.value)}
                  required
                />
              </div>

              <div className={styles.avatarButtons}>
                {" "}
                <button className="btn" type="submit">
                  Update Avatar
                </button>
                <button
                  className="btn"
                  type="button"
                  onClick={() => setIsEditingAvatar(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <button
              className="btn-link"
              onClick={() => setIsEditingAvatar(true)}
            >
              Change Avatar
            </button>
          )}
        </div>

        {!user.venueManager && (
          <div className={styles.venuesContainer}>
            {" "}
            <h2>Active Bookings</h2>
            <div className={styles.profileGrid}>
              {" "}
              {bookingDetails.length > 0 ? (
                bookingDetails.map((booking) => (
                  <ProfileCard key={booking.id}>
                    <img
                      className={styles.cardImage}
                      src={booking.venue.media[0]}
                      alt={booking.venue.name}
                    />
                    <div className={styles.profileCardContent}>
                      <div>
                        {" "}
                        <h3> {booking.venue.name}</h3>
                        <p>{booking.venue.description}</p>
                      </div>{" "}
                      <p>Guests: {booking.guests}</p>
                      <div>
                        {" "}
                        <p>
                          Date from:{" "}
                          {new Date(booking.dateFrom).toLocaleDateString(
                            "no-NO",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p>
                        <p>
                          Date to:{" "}
                          {new Date(booking.dateTo).toLocaleDateString(
                            "no-NO",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    </div>
                  </ProfileCard>
                ))
              ) : (
                <p>No active bookings</p>
              )}
            </div>
          </div>
        )}

        {user.venueManager && (
          <div className={styles.venuesContainer}>
            <h2>Managed Venues</h2>{" "}
            <div className={styles.profileGrid}>
              {venues.length > 0 ? (
                venues.map((venue, index) => (
                  <ProfileCard key={index}>
                    <img
                      className={styles.cardImage}
                      src={venue.media[0]}
                      alt={venue.name}
                    />
                    <div className={styles.profileCardContent}>
                      <h3>{venue.name}</h3>
                      <div className={styles.buttonContainer}>
                        {venue.bookings.length ? (
                          <button
                            className="btn-link"
                            onClick={() => {
                              setCurrentVenue(venue);
                              setIsModalOpen(true);
                            }}
                          >
                            View Bookings
                          </button>
                        ) : (
                          <p>No Bookings</p>
                        )}
                        <button className="btn-link">Edit Venue</button>
                      </div>
                    </div>

                    {isModalOpen ? (
                      <Dialog
                        isOpen={isModalOpen}
                        onDismiss={() => setIsModalOpen(false)}
                      >
                        <div className={styles.venueBookingsContainer}>
                          {" "}
                          <h2>Bookings for {currentVenue.name}</h2>
                          {currentVenue.bookings.map((booking) => (
                            <div
                              className={styles.venueBooking}
                              key={booking.id}
                            >
                              <p>Guests: {booking.guests}</p>
                              <p>
                                Date from:{" "}
                                {new Date(booking.dateFrom).toLocaleDateString(
                                  "no-NO",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }
                                )}
                              </p>
                              <p>
                                Date to:{" "}
                                {new Date(booking.dateTo).toLocaleDateString(
                                  "no-NO",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }
                                )}
                              </p>
                            </div>
                          ))}
                          <button
                            className="btn"
                            onClick={() => setIsModalOpen(false)}
                          >
                            Close
                          </button>
                        </div>
                      </Dialog>
                    ) : (
                      ""
                    )}
                  </ProfileCard>
                ))
              ) : (
                <p>No managed venues</p>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default UserProfile;
