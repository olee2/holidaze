import React from "react";
import styles from "./Card.module.css";
import placeholder from "../../assets/placeholder.jpeg";

export const Card = (props) => {
  const { media, name, description, price } = props;

  const backgroundImage = media[0] || placeholder;
  return (
    <div className={styles.card}>
      {" "}
      <img
        src={backgroundImage}
        alt=""
        className={styles.cardImage}
        onerror="this.src='placeholder.jpeg'"
      />
      <div className={styles.textContainer}>
        <h2>{name}</h2>
        <p className={styles.description}>{description}</p>
        <div className={styles.priceBtnContainer}>
          <p className={styles.price}>{price} NOK/night</p>
          <button className={`btn`}>View</button>
        </div>
      </div>
    </div>
  );
};
