import React from "react";
import styles from "./Error.module.css";

const Error = () => {
  return (
    <div className={styles.error}>
      <p>An error occured. Please try again later.</p>
    </div>
  );
};

export default Error;
