import React, { useState, useEffect } from "react";
import { fetchProfile } from "../../api/fetchProfile";
import { updateAvatar } from "../../api/updateAvatar";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [venues, setVenues] = useState([]);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);

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
          setBookings(profile.bookings);
          setVenues(profile.venues);
        })
        .catch((err) => console.error(err));
      setUser(storedUser);
      console.log(storedUser);
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
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
        <button onClick={() => setIsEditingAvatar(true)}>Change Avatar</button>
      )}
      <h2>Active Bookings</h2>
      {bookings.length > 0 ? (
        bookings.map((booking, index) => (
          <div key={index}>
            <p>{booking.details}</p>{" "}
          </div>
        ))
      ) : (
        <p>No active bookings</p>
      )}
      {user.venueManager && (
        <>
          <h2>Managed Venues</h2>
          {venues.length > 0 ? (
            venues.map((venue, index) => (
              <div key={index}>
                <p>{venue.details}</p>{" "}
              </div>
            ))
          ) : (
            <p>No managed venues</p>
          )}
        </>
      )}
    </div>
  );
};

export default UserProfile;
