export const registerUser = async (user) => {
  const baseUrl = `https://api.noroff.dev/api/v1/holidaze/auth/register`;

  const options = {
    method: "POST",
    body: JSON.stringify(user),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  };

  try {
    const response = await fetch(baseUrl, options);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
