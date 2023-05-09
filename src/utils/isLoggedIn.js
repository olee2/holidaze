export const isLoggedIn = () => {
  const accessToken = localStorage.getItem("access_token");
  console.log(!!accessToken);
  return !!accessToken;
};
