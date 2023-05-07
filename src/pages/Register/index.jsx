import React, { useState } from "react";
import styles from "./Register.module.css";
import { registerUser } from "../../api/registerUser";

export const Register = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    avatar: null,
    venueManager: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    setFormValues({ ...formValues, [name]: checked });
  };

  const isValidEmail = (email) => {
    const domainRegex = /^.+@(?:stud\.)?noroff\.no$/;
    return domainRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isValidEmail(formValues.email)) {
      try {
        const response = await registerUser(formValues);

        console.log(response);
      } catch (error) {
        console.log("error");
      }
    } else {
      alert(
        "Please enter a valid email ending with stud.noroff.no or noroff.no."
      );
    }
  };

  return (
    <main>
      {" "}
      <div className="inner-container">
        <div className={styles.formContainer}>
          <h2>Sign Up</h2>
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
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </main>
  );
};
