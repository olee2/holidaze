import React, { useState } from "react";
import styles from "./Register.module.css";
import { registerUser } from "../../api/registerUser";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    avatar: null,
    venueManager: false,
  });

  const [errorMessages, setErrorMessages] = useState({
    email: "",
    password: "",
    other: "",
  });

  const isValidEmail = (email) => {
    const domainRegex = /^.+@(?:stud\.)?noroff\.no$/;
    return domainRegex.test(email);
  };

  const isValidPassword = (password) => {
    return password.length > 8;
  };

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

  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    setFormValues({ ...formValues, [name]: checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formValues);
    if (!errorMessages.email && !errorMessages.password) {
      try {
        const response = await registerUser(formValues);
        if (response.statusCode >= 400) {
          setErrorMessages((prev) => ({
            ...prev,
            other: response.errors[0].message,
          }));
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
        setErrorMessages((prev) => ({
          ...prev,
          other: "An error occured. Please try again later",
        }));
      }
    }
  };

  return (
    <main>
      {" "}
      <div className="inner-container">
        <div className={styles.formContainer}>
          <h2>Sign Up</h2>
          <div className="errorContainer">
            {" "}
            {errorMessages.email && (
              <div className="errorMessage">{errorMessages.email}</div>
            )}
            {errorMessages.password && (
              <div className="errorMessage">{errorMessages.password}</div>
            )}
            {errorMessages.other && (
              <div className="errorMessage">{errorMessages.other}</div>
            )}
          </div>

          <form onSubmit={handleSubmit}>
            <div className={styles.inputContainer}>
              <label htmlFor="name">Username: </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formValues.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="email">Email: </label>
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
              <label htmlFor="password">Password: </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="avatar">Avatar URL: </label>
              <input
                type="url"
                id="avatar"
                name="avatar"
                value={formValues.avatar}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="venueManager">Venue Manager: </label>
              <input
                type="checkbox"
                id="venueManager"
                name="venueManager"
                checked={formValues.venueManager}
                onChange={handleCheckbox}
              />
            </div>
            <button type="submit" className="btn">
              Register
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};
