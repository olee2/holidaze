import React from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../../utils/isLoggedIn";
import styles from "./AuthButton.module.css";

export const AuthButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className={styles.authBtns}>
      {isLoggedIn() ? (
        <button className="btn" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <>
          <button className="btn" onClick={handleLogin}>
            Login
          </button>
          <button className="btn" onClick={handleRegister}>
            Register
          </button>
        </>
      )}
    </div>
  );
};
