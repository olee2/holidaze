export const isLoggedIn = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? !!user.accessToken : null;
};
