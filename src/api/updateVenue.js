export const updateVenue = async (body, id) => {
  const baseUrl = `https://api.noroff.dev/api/v1/holidaze/venues/${id}`;

  const accessToken = JSON.parse(localStorage.getItem("user")).accessToken;

  const options = {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  try {
    const response = await fetch(baseUrl, options);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("An error occured while fetching the data");
  }
};
