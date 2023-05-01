export const fetchVenues = async (limit, offset) => {
  const baseUrl = "https://api.noroff.dev/api/v1/holidaze/venues";
  const url = `${baseUrl}${limit ? "?limit=" + limit : ""}${
    offset ? "&offset=" + offset : ""
  }`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error("An error occured while fetching the data");
  }
};
