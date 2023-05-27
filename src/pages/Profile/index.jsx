import React, { useState, useEffect } from "react";
import { fetchProfile } from "../../api/fetchProfile";
import { updateAvatar } from "../../api/updateAvatar";
import { fetchVenues } from "../../api/fetchVenues";
import { fetchBooking } from "../../api/fetchBooking";
import { ProfileCard } from "../../components/profileCard";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import styles from "./Profile.module.css";
import ChangeAvatarForm from "../../components/ChangeAvatarForm";
import CreateVenueForm from "../../components/CreateVenueModal";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [venues, setVenues] = useState([]);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [bookingDetails, setBookingDetails] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVenue, setCurrentVenue] = useState();
  const [isCreateVenueOpen, setIsCreateVenueOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [venueDialogOpen, setVenueDialogOpen] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState(null);

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
          setAvatarUrl("");
          setIsEditingAvatar(false);
          localStorage.setItem("user", JSON.stringify(updatedUserWithToken));
        })
        .catch((err) => console.error(err));
    }
  };

  const refreshVenues = async () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.name) {
    }
    fetchProfile(storedUser.name).then((profile) => {
      Promise.all(profile.venues.map((venue) => fetchVenues(venue.id))).then(
        (venuesData) => {
          setVenues(venuesData);
        }
      );
    });
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.name) {
      fetchProfile(storedUser.name)
        .then((profile) => {
          setUser(storedUser);
          setLoading(false);
          if (storedUser.venueManager) {
            Promise.all(profile.venues.map((venue) => fetchVenues(venue.id)))
              .then((venuesData) => {
                setVenues(venuesData);
              })
              .catch((err) => console.error(err));
          } else {
            Promise.all(
              profile.bookings.map((booking) => fetchBooking(booking.id))
            )
              .then((bookingData) => {
                setBookingDetails(bookingData);
              })
              .catch((err) => {
                console.error(err);
                setLoading(false);
              });
          }
        })
        .catch((err) => console.error(err));
    }
  }, []);

  const openVenueDialog = (venue) => {
    setSelectedVenue(venue);
    setVenueDialogOpen(true);
  };

  const closeVenueDialog = () => {
    setVenueDialogOpen(false);
  };

  if (loading) {
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
            <ChangeAvatarForm
              avatarUrl={avatarUrl}
              setAvatarUrl={setAvatarUrl}
              setIsEditingAvatar={setIsEditingAvatar}
              handleAvatarSubmit={handleAvatarSubmit}
            />
          ) : (
            <button
              className="btn-link"
              onClick={() => setIsEditingAvatar(true)}
            >
              Change Avatar
            </button>
          )}
        </div>
        <div className={styles.dividerLine}></div>
        {!user.venueManager && (
          <div className={styles.venuesContainer}>
            <div className={styles.dividerLine}></div> <h2>Active Bookings</h2>
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
                        <p className={styles.profileBookingDescription}>
                          {booking.venue.description}
                        </p>
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
            <button
              className="btn-link"
              onClick={() => setIsCreateVenueOpen(true)}
            >
              Create Venue
            </button>
            <CreateVenueForm
              open={isCreateVenueOpen}
              onClose={() => setIsCreateVenueOpen(false)}
              title={"Create new venue"}
              onVenueChange={refreshVenues}
            />
            <div className={styles.profileGrid}>
              {venues.length > 0 ? (
                venues.map((venue) => (
                  <ProfileCard key={venue.id}>
                    <img
                      className={styles.cardImage}
                      src={venue.media[0]}
                      alt={venue.name}
                    />
                    <div className={styles.profileCardContent}>
                      <Link to={`/venue/${venue.id}`} className={styles.h3Link}>
                        <h3>{venue.name}</h3>
                      </Link>

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

                        <button
                          onClick={() => openVenueDialog(venue)}
                          className="btn-link"
                        >
                          Edit Venue
                        </button>
                        <CreateVenueForm
                          title={"Edit Venue"}
                          open={venueDialogOpen}
                          onClose={closeVenueDialog}
                          venue={selectedVenue}
                          update
                          onVenueChange={refreshVenues}
                        />
                      </div>
                    </div>

                    {isModalOpen && currentVenue === venue ? (
                      <Dialog
                        open={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                      >
                        <DialogTitle>
                          Bookings for {currentVenue && currentVenue.name}
                        </DialogTitle>
                        <DialogContent>
                          <div className={styles.venueBookingsContainer}>
                            {" "}
                            {currentVenue &&
                              currentVenue.bookings.map((booking) => (
                                <div
                                  className={styles.venueBooking}
                                  key={booking.id}
                                >
                                  <p>Guests: {booking.guests}</p>
                                  <p>
                                    Date from:{" "}
                                    {new Date(
                                      booking.dateFrom
                                    ).toLocaleDateString("no-NO", {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    })}
                                  </p>
                                  <p>
                                    Date to:{" "}
                                    {new Date(
                                      booking.dateTo
                                    ).toLocaleDateString("no-NO", {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    })}
                                  </p>
                                </div>
                              ))}
                          </div>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={() => setIsModalOpen(false)}>
                            Close
                          </Button>
                        </DialogActions>
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
