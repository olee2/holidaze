import React from "react";
import styles from "../Card/Card.module.css";

export const ProfileCard = ({ children }) => {
  return <div className={styles.card}>{children}</div>;
};
