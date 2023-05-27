export const deleteVenue = async (id) => {
  const baseUrl = `https://api.noroff.dev/api/v1/holidaze/venues/${id}`;

  const accessToken = JSON.parse(localStorage.getItem("user")).accessToken;

  const options = {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  try {
    const response = await fetch(baseUrl, options);
    return response;
  } catch (error) {
    console.log(error);
    throw new Error("An error occured while fetching the data");
  }
};
