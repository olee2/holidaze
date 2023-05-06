export const fetchVenues = async (id) => {
  const baseUrl = `https://api.noroff.dev/api/v1/holidaze/venues${
    id ? "/" + id : ""
  } `;

  try {
    const response = await fetch(baseUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("An error occured while fetching the data");
  }
};
