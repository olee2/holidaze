import React from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";

export const Card = (props) => {
  const { media, name } = props;
  return (
    <div className={styles.card}>
      {" "}
      <div
        className={styles.imageContainer}
        style={{ backgroundImage: `url(${media[0]})` }}
      />
      <h2>{name}</h2>
    </div>
  );
};
