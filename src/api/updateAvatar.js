export const updateAvatar = async (name, url) => {
  const baseUrl = `https://api.noroff.dev/api/v1/holidaze/profiles/${
    name + "/media"
  } `;

  const accessToken = JSON.parse(localStorage.getItem("user")).accessToken;

  const options = {
    method: "PUT",
    body: JSON.stringify({ avatar: `${url}` }),
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
