export const fetchVenues = async (
  id,
  limit = 10,
  offset = 0,
  sort = "created",
  sortOrder = "asc"
) => {
  let url;

  if (id) {
    url = `https://api.noroff.dev/api/v1/holidaze/venues/${id}?_bookings=true`;
  } else {
    url = `https://api.noroff.dev/api/v1/holidaze/venues?_bookings=true&limit=${limit}&offset=${offset}&sort=${sort}&sortOrder=${sortOrder}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("An error occured while fetching the data");
  }
};
