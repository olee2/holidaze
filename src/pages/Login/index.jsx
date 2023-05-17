import React, { useState } from "react";
import { loginUser } from "../../api/loginUser";
import styles from "../Register/Register.module.css";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [errorMessages, setErrorMessages] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

    if (name === "email") {
      if (!isValidEmail(value)) {
        setErrorMessages((prev) => ({
          ...prev,
          email:
            "Please enter a valid email ending with stud.noroff.no or noroff.no.",
        }));
      } else {
        setErrorMessages((prev) => ({ ...prev, email: "" }));
      }
    } else if (name === "password") {
      if (!isValidPassword(value)) {
        setErrorMessages((prev) => ({
          ...prev,
          password: "Password must be longer than 8 characters.",
        }));
      } else {
        setErrorMessages((prev) => ({ ...prev, password: "" }));
      }
    }
  };

  const isValidEmail = (email) => {
    const domainRegex = /^.+@(?:stud\.)?noroff\.no$/;
    return domainRegex.test(email);
  };

  const isValidPassword = (password) => {
    return password.length > 8;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(formValues);
      if (response.statusCode >= 400) {
        setErrorMessages({
          ...errorMessages,
          general: response.errors[0].message,
        });
      } else if (response.accessToken) {
        localStorage.setItem("user", JSON.stringify(response));

        navigate("/");
      }
    } catch (error) {
      setErrorMessages([error.message]);
    }
  };

  return (
    <main>
      {" "}
      <div className="inner-container">
        <div className={styles.formContainer}>
          <h2>Login </h2>
          <div className="errorContainer">
            {" "}
            {errorMessages.email && (
              <div className="errorMessage">{errorMessages.email}</div>
            )}
            {errorMessages.password && (
              <div className="errorMessage">{errorMessages.password}</div>
            )}
            {errorMessages.general && (
              <div className="errorMessage">{errorMessages.general}</div>
            )}
          </div>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputContainer}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
                required
              />
            </div>
            <button className="btn" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};
