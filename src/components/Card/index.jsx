import React, { useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";
import placeholder from "../../assets/placeholder.jpeg";
import ImageCarousel from "../ImageCarousel";

export const Card = (props) => {
  const { media, name, description, price, id } = props;
  const imageRef = useRef();

  const backgroundImage = media[0] || placeholder;
  return (
    <div className={styles.card}>
      {" "}
      <img
        src={backgroundImage}
        alt=""
        ref={imageRef}
        className={styles.cardImage}
        onError={() => (imageRef.current.src = "placeholder.jpeg")}
      />
      <div className={styles.textContainer}>
        <h2>{name}</h2>
        <p className={styles.description}>{description}</p>
        <div className={styles.priceBtnContainer}>
          <p className={styles.price}>{price} NOK/night</p>
          <Link to={`/venue/${id}`} className={`btn`}>
            View
          </Link>
        </div>
      </div>
    </div>
  );
};
