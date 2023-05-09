export const loginUser = async (credentials) => {
  const baseUrl = `https://api.noroff.dev/api/v1/holidaze/auth/login`;

  const options = {
    method: "POST",
    body: JSON.stringify(credentials),
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
