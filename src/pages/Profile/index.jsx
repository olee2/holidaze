import React, { useState, useEffect } from "react";
import { fetchProfile } from "../../api/fetchProfile";
import { updateAvatar } from "../../api/updateAvatar";
import { fetchVenues } from "../../api/fetchVenues";
import { fetchBooking } from "../../api/fetchBooking";
import styles from "./Profile.module.css";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [venues, setVenues] = useState([]);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [venueDetails, setVenueDetails] = useState([]);
  const [currentVenueId, setCurrentVenueId] = useState(null);
  const [bookingDetails, setBookingDetails] = useState([]);

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
          <h1>{user.name}</h1>
          <img src={user.avatar} alt={user.name} />
          {isEditingAvatar ? (
            <form onSubmit={handleAvatarSubmit}>
              <label>
                New Avatar URL:
                <input
                  type="url"
                  value={avatarUrl}
                  onChange={(event) => setAvatarUrl(event.target.value)}
                  required
                />
              </label>
              <button type="submit">Update Avatar</button>
              <button type="button" onClick={() => setIsEditingAvatar(false)}>
                Cancel
              </button>
            </form>
          ) : (
            <button className="btn" onClick={() => setIsEditingAvatar(true)}>
              Change Avatar
            </button>
          )}
        </div>

        {!user.venueManager && (
          <>
            {" "}
            <h2>Active Bookings</h2>
            {bookingDetails.length > 0 ? (
              bookingDetails.map((booking) => (
                <div key={booking.id}>
                  <p>{booking.details}</p>
                  <p>Venue: {booking.venue.name}</p>
                  <p>Guests: {booking.guests}</p>
                  <p>
                    Date from:{" "}
                    {new Date(booking.dateFrom).toLocaleDateString("no-NO", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p>
                    Date to:{" "}
                    {new Date(booking.dateTo).toLocaleDateString("no-NO", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              ))
            ) : (
              <p>No active bookings</p>
            )}
          </>
        )}

        {user.venueManager && (
          <>
            <div className={styles.managedVenues}>
              <h2>Managed Venues</h2>{" "}
              {venues.length > 0 ? (
                venues.map((venue, index) => (
                  <div className={styles.venue} key={index}>
                    <div>
                      <img src={venue.media[0]} alt={venue.name} />
                      <p>{venue.name}</p>
                    </div>

                    {currentVenueId === venue.id ? (
                      <button onClick={() => setCurrentVenueId(null)}>
                        Hide Bookings
                      </button>
                    ) : (
                      <button onClick={() => setCurrentVenueId(venue.id)}>
                        View Bookings
                      </button>
                    )}
                    {currentVenueId === venue.id &&
                      venue.bookings.map((booking) => (
                        <div className={styles.venueBookings} key={booking.id}>
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
                  </div>
                ))
              ) : (
                <p>No managed venues</p>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default UserProfile;
